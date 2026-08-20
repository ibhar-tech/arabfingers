"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * adsbygoogle is a plain array until the tag loads and drains it; the flags are
 * read off the same object. Only the members this file sets are typed.
 */
type AdsByGoogle = Array<Record<string, unknown>> & {
  requestNonPersonalizedAds?: number;
  pauseAdRequests?: number;
};

declare global {
  interface Window {
    adsbygoogle: AdsByGoogle;
  }
}

/**
 * Full-bleed stages a one-to-six-year-old drives by smashing the screen.
 *
 * Auto ads put anchor and vignette units over exactly that surface, so a
 * mistimed tap becomes a click nobody intended. Google calls that invalid
 * traffic and it is the quickest way to lose the account outright — and the
 * Publisher Policies separately forbid ads that "overlay navigational elements
 * causing unintended clicks". The written content on these routes sits below
 * the stage and still gets crawled and indexed; it just does not carry ads.
 *
 * Match on the path after the locale, so /en/play and /ar/play both count.
 */
const STAGE_ROUTES = ["/play", "/coloring", "/games/trace", "/games/tap"];

function isStageRoute(pathname: string) {
  return STAGE_ROUTES.some((route) => pathname.endsWith(route));
}

/** Module scope, so it survives re-renders but resets on a real page load. */
let configured = false;
let tagRequested = false;

const ADSENSE_SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9623110963718326";

/**
 * Inject the AdSense tag after the page has loaded and gone idle.
 *
 * It used to sit in <head>. Measured on a cold load of /en that was 643 KB —
 * the single largest thing on the page, ahead of every first-party chunk, and
 * on a phone it was 55% of the whole visit. Async only means "do not block
 * parsing"; the request still starts immediately and competes with our own CSS,
 * fonts and JS for the connection.
 *
 * Deferring past `load` means ads request once the content a parent came for is
 * already on screen. The pauseAdRequests flag below is set before this runs, so
 * toddler stages still never request an ad.
 */
function injectAdSense() {
  if (tagRequested) return;
  tagRequested = true;

  const add = () => {
    const el = document.createElement("script");
    el.async = true;
    el.src = ADSENSE_SRC;
    el.crossOrigin = "anonymous";
    el.dataset.privacyTreatments = "disablePersonalization";
    document.head.appendChild(el);
  };

  // ponytail: requestIdleCallback where it exists, a short timer where it does
  // not (Safari). Either way the tag lands after first paint, which is the point.
  const schedule = () =>
    typeof window.requestIdleCallback === "function"
      ? window.requestIdleCallback(add, { timeout: 3000 })
      : window.setTimeout(add, 1500);

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
}

export function AdSenseLoader() {
  const pathname = usePathname();

  useEffect(() => {
    const onStage = isStageRoute(pathname);
    const adsbygoogle = (window.adsbygoogle = window.adsbygoogle || []);

    if (!configured) {
      configured = true;
      adsbygoogle.requestNonPersonalizedAds = 1;
    }

    // Stop ad requests on toddler stages
    adsbygoogle.pauseAdRequests = onStage ? 1 : 0;

    // Stages already refuse to request an ad, so on a direct landing there is
    // nothing for the tag to do — and it was still pulling 775 KB onto the one
    // page a child actually plays on. Arriving from a content route leaves the
    // tag already loaded, where pauseAdRequests above keeps it quiet.
    if (!onStage) injectAdSense();
  }, [pathname]);

  return null;
}
