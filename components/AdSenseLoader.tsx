"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PUBLISHER_ID = "ca-pub-9623110963718326";

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

    // Arab Fingers is written for children aged 1–6, so every ad request is
    // child-directed under COPPA whatever the visitor's own age. Personalised
    // ads are therefore never permissible here: Google's Publisher Policies
    // forbid targeting on "users under 13 or children's site/app activity".
    //
    // This has to be set before the tag loads, and only once — a repeated push
    // is at best wasted, and a bare push({}) is how you ask for an ad, which is
    // not what this is. Verify it by looking for npa=1 on the /pagead/ads
    // request in devtools.
    if (!configured) {
      configured = true;
      adsbygoogle.requestNonPersonalizedAds = 1;
    }

    // Belt and braces for client-side navigation: once adsbygoogle.js is in the
    // document it stays there, so a visitor who reaches a stage from an article
    // would still have a live tag. pauseAdRequests stops it asking for ads.
    adsbygoogle.pauseAdRequests = onStage ? 1 : 0;

    if (onStage) return;

    let loaded = false;

    const loadAdSense = () => {
      if (loaded) return;
      loaded = true;

      if (document.querySelector('script[src*="adsbygoogle"]')) return;

      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      // Restricted data processing on top of non-personalisation. The push-API
      // form of this (push({params:{google_privacy_treatments:...}})) is
      // documented but silently does nothing for Auto ads — measured, no ppt=1
      // on the outgoing request. The header-tag attribute is what actually
      // lands, so set it on the tag we inject.
      script.setAttribute("data-privacy-treatments", "disablePersonalization");
      document.head.appendChild(script);

      cleanup();
    };

    const events = ["scroll", "mousemove", "touchstart", "keydown"];

    const cleanup = () => {
      events.forEach((event) => {
        window.removeEventListener(event, loadAdSense);
      });
    };

    // Load AdSense on first user interaction for super-fast PageSpeed ranking
    events.forEach((event) => {
      window.addEventListener(event, loadAdSense, { passive: true });
    });

    // Fallback load after 3.5 seconds of idle time
    const timer = setTimeout(loadAdSense, 3500);

    return () => {
      cleanup();
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
