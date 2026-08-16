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
  }, [pathname]);

  return null;
}
