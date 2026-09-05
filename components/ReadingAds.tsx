"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Adsterra units, rendered once from PageLayout and shown only on the
 * parent-facing reading routes.
 *
 * PLACEMENT — the four units are distributed through the page, not stacked:
 *
 *   leaderboard (728×90 desktop / 320×50 mobile) → top of the content,
 *     right after the breadcrumbs + title block;
 *   native banner → mid-content, beside the later sections;
 *   300×250 rectangle → near the end, above the last block.
 *
 * The containers are React-rendered once inside a hidden staging <aside>
 * (which never unmounts, so loaded ads survive client-side navigation).
 * After the tags load — and again after every route change — a relocator
 * moves each container out of staging into its computed position in <main>.
 * Moving a node preserves the loaded ad inside it. Non-reading routes get
 * the containers moved back into staging, which is display:none, so nothing
 * is visible or tappable there; on a direct landing on a game the scripts
 * are never requested at all.
 *
 * The gating is ALLOW-LIST based: ads render on blog / learn / printables /
 * glossary / resources / stories and nowhere else, so a route added tomorrow
 * is ad-free by default. DENY_PREFIXES is a second lock that wins over the
 * allow list — the activities a toddler drives must never show an ad,
 * because a mistimed tap near an ad is an accident waiting to happen and
 * networks count those clicks as junk traffic.
 */

const AD_HOST = "https://fortunateambiguous.com";

const ALLOW_PREFIXES = ["/blog", "/learn", "/printables", "/glossary", "/resources", "/stories"];
const DENY_PREFIXES = ["/play", "/coloring", "/games"];

const NATIVE_KEY = "f27a5cb770440a7a8791cf8b7e53bc13";

/** Unit id → slot position. Desktop/mobile leaderboard pairs resolve below. */
const UNITS = [
  { id: "adsterra-leaderboard", pos: "top" },
  { id: `container-${NATIVE_KEY}`, pos: "mid" },
  { id: "adsterra-banner-300x250", pos: "end" },
] as const;

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

  appendBannerFrames();
}

/**
 * Append each banner zone's srcdoc iframe — exactly once per container.
 * Banner zones read the single window.atOptions global, so the only way
 * three zones can coexist on one page is one browsing context each: each
 * iframe gets its own copy of the snippet via srcdoc. Called from inject
 * AND re-called from the relocator, so a container that was mid-hydration
 * (or otherwise unavailable) on the first pass self-heals on the next.
 * No loading="lazy": end-of-page placements would never load off-viewport,
 * and impression counting needs the request to fire on load.
 */
function appendBannerFrames() {
  for (const banner of BANNERS) {
    const host = document.getElementById(`adsterra-banner-${banner.width}x${banner.height}`);
    if (!host || host.dataset.filled) continue;
    host.dataset.filled = "1";
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
    frame.style.border = "0";
    frame.srcdoc =
      `<script>atOptions=${atOptions};</script>` +
      `<script src="${AD_HOST}/${banner.key}/invoke.js"></script>`;
    host.appendChild(frame);
  }
}

/**
 * Move each unit container to its slot in the current page — or back into
 * staging when the route is not a reading page. Idempotent: containers carry
 * data-ad-container and are excluded from the insertion-point scan.
 */
function relocateUnits(pathname: string) {
  const staging = document.getElementById("adsterra-staging");
  const main = document.querySelector("main");
  if (!staging || !main) return;

  const allowed = unitsInjected && isReadingRoute(pathname);
  if (!allowed) {
    for (const { id } of UNITS) {
      const el = document.getElementById(id);
      if (el && !staging.contains(el)) staging.appendChild(el);
    }
    return;
  }

  const kids = Array.from(main.children).filter(
    (el) =>
      !(el instanceof HTMLElement && el.dataset.adContainer) && el.id !== "adsterra-staging",
  );
  if (kids.length < 2) return;

  const slotFor = (pos: string): Element | null => {
    if (pos === "top") return kids[Math.min(1, kids.length - 1)]; // after title block
    if (pos === "mid") return kids[Math.max(2, Math.floor(kids.length * 0.6))]; // before ~60%
    return kids[kids.length - 1]; // end: before the last block
  };

  for (const { id, pos } of UNITS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const target = slotFor(pos);
    if (target && !target.contains(el)) target.before(el);
  }

  // Self-heal: if any banner container was unavailable during the original
  // injection pass, it gets its frame now that it is placed and connected.
  appendBannerFrames();
}

const BANNERS = [
  { key: "cece0b3529426d2e6735cd25160f61e9", width: 728, height: 90, className: "hidden lg:flex justify-center" },
  { key: "3c908dfc062a31ebcf0682182915df0c", width: 320, height: 50, className: "flex justify-center lg:hidden" },
];

export function ReadingAds() {
  const pathname = usePathname() ?? "/";
  const allowed = isReadingRoute(pathname);
  const stagingRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!allowed || unitsInjected) return;

    let idle = 0;
    let timer = 0;
    const schedule = () => {
      // requestIdleCallback where it exists, a short timer where it does not
      // (Safari). Either way the ad requests land after first paint.
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(() => {
          injectUnits();
          relocateUnits(window.location.pathname);
        }, { timeout: 3000 });
      } else {
        timer = window.setTimeout(() => {
          injectUnits();
          relocateUnits(window.location.pathname);
        }, 1500);
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

  // Re-place the units whenever the route changes: the new page's content
  // renders first (this effect runs after commit), then the containers move
  // into it. Also stashes them on non-reading routes.
  useEffect(() => {
    relocateUnits(pathname);
  }, [pathname]);

  const isAr = pathname.startsWith("/ar");
  return (
    <>
      {/* Staging: containers are rendered here once and relocated into the
          page after load. display:none here does not affect them once moved. */}
      <aside
        id="adsterra-staging"
        ref={stagingRef}
        aria-hidden
        data-ad-container="1"
        className="hidden"
      >
        <div id="adsterra-leaderboard" data-ad-container="1" className="my-8 flex-col items-center gap-8">
          {BANNERS.map((banner) => (
            <div
              key={banner.key}
              id={`adsterra-banner-${banner.width}x${banner.height}`}
              className={`w-full ${banner.className}`}
            />
          ))}
        </div>
        <div id={`container-${NATIVE_KEY}`} data-ad-container="1" className="my-8 w-full" />
        <div id="adsterra-banner-300x250" data-ad-container="1" className="my-8 flex justify-center" />
      </aside>
      {/* Accessible label for the relocated units, kept out of the flow. */}
      <span aria-hidden data-ad-container="1" className="hidden">
        {isAr ? "إعلانات" : "Advertisements"}
      </span>
    </>
  );
}
