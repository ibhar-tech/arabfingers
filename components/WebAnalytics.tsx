"use client";

import { useEffect } from "react";

/**
 * Cloudflare Web Analytics — the one measurement option compatible with this
 * site's privacy stance: cookieless, no fingerprinting, no profiles, and
 * Cloudflare explicitly does not track individuals across sites.
 *
 * Disabled entirely unless NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN is set at build
 * time; the owner opts in by adding their zone's token in wrangler/env config.
 */
export function WebAnalytics() {
  const token = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;

  useEffect(() => {
    if (!token) return;
    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.dataset.cfBeacon = JSON.stringify({ token });
    document.body.appendChild(script);
  }, [token]);

  return null;
}
