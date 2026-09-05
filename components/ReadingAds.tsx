"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adsterra units, rendered once from PageLayout and shown only on the
 * parent-facing reading routes.
 *
 * The gating is ALLOW-LIST based: ads render on blog / learn / printables /
 * glossary / resources and nowhere else, so a route added tomorrow is ad-free
 * by default. DENY_PREFIXES is a second lock that wins over the allow list —
 * the activities a toddler drives must never show an ad, because a mistimed
 * tap near an ad is an accident waiting to happen and networks count those
 * clicks as junk traffic.
 *
 * Units are injected only after the page has loaded and gone idle (the same
 * discipline the previous ad tag used): on a phone the ad request must never
 * compete with the CSS, fonts and chunks the parent came for.
 */

const AD_HOST = "https://fortunateambiguous.com";

const ALLOW_PREFIXES = ["/blog", "/learn", "/printables", "/glossary", "/resources"];
const DENY_PREFIXES = ["/play", "/coloring", "/games"];

const NATIVE_KEY = "f27a5cb770440a7a8791cf8b7e53bc13";

const BANNERS = [
  { key: "cece0b3529426d2e6735cd25160f61e9", width: 728, height: 90, className: "hidden lg:block" },
  { key: "3c908dfc062a31ebcf0682182915df0c", width: 320, height: 50, className: "lg:hidden" },
  { key: "490db964007730ea5d4f938f3227bb4c", width: 300, height: 250, className: "hidden md:block" },
];

/** Path without the locale segment, e.g. "/en/blog/x" -> "/blog/x". */
function withoutLocale(pathname: string) {
  return `/${pathname.split("/").slice(2).join("/")}`;
}

function isReadingRoute(pathname: string) {
  const path = withoutLocale(pathname);
  if (DENY_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))) return false;
  return ALLOW_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

/** Module scope, so the four units are requested once per page load. */
let unitsInjected = false;

function injectUnits() {
  if (unitsInjected) return;
  unitsInjected = true;

  // Native banner: the invoke script fills #container-<key> wherever it sits,
  // so the script is appended inside its own container.
  const native = document.createElement("script");
  native.async = true;
  native.dataset.cfasync = "false";
  native.src = `${AD_HOST}/${NATIVE_KEY}/invoke.js`;
  document.getElementById(`container-${NATIVE_KEY}`)?.appendChild(native);

  // Banner zones read the single window.atOptions global, so the only way
  // three zones can coexist on one page is one browsing context each: each
  // iframe gets its own copy of the snippet via srcdoc.
  for (const banner of BANNERS) {
    const atOptions = JSON.stringify({
      key: banner.key,
      format: "iframe",
      height: banner.height,
      width: banner.width,
      params: {},
    });
    const frame = document.createElement("iframe");
    frame.width = String(banner.width);
    frame.height = String(banner.height);
    frame.title = "Advertisement";
    frame.loading = "lazy";
    frame.style.border = "0";
    frame.srcdoc =
      `<script>atOptions=${atOptions};</script>` +
      `<script src="${AD_HOST}/${banner.key}/invoke.js"></script>`;
    document.getElementById(`adsterra-banner-${banner.width}x${banner.height}`)?.appendChild(frame);
  }
}

export function ReadingAds() {
  const pathname = usePathname() ?? "/";
  const allowed = isReadingRoute(pathname);

  useEffect(() => {
    if (!allowed || unitsInjected) return;

    let idle = 0;
    let timer = 0;
    const schedule = () => {
      // requestIdleCallback where it exists, a short timer where it does not
      // (Safari). Either way the ad requests land after first paint.
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(injectUnits, { timeout: 3000 });
      } else {
        timer = window.setTimeout(injectUnits, 1500);
      }
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      if (idle) window.cancelIdleCallback(idle);
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("load", schedule);
    };
  }, [allowed]);

  // Kept mounted on every page so an injected unit survives client-side
  // navigation between reading routes; on non-reading routes the whole block
  // is hidden (display:none) — nothing visible, nothing tappable, and on a
  // direct landing on a game the scripts are never requested at all.
  const isAr = pathname.startsWith("/ar");
  return (
    <aside
      aria-label={isAr ? "إعلانات" : "Advertisements"}
      className={`my-10 space-y-8 text-center print:hidden ${allowed ? "" : "hidden"}`}
    >
      {BANNERS.map((banner) => (
        <div
          key={banner.key}
          id={`adsterra-banner-${banner.width}x${banner.height}`}
          className={`flex justify-center ${banner.className}`}
        />
      ))}
      <div id={`container-${NATIVE_KEY}`} className="w-full" />
    </aside>
  );
}
