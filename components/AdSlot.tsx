"use client";

import { useEffect, useRef } from "react";

const PUBLISHER_ID = "ca-pub-9623110963718326";

/**
 * A single responsive AdSense display unit for CONTENT pages only
 * (blog, learn guides, home below-the-fold). Never use this inside the child
 * play area (/play, /coloring, /printables) — those must stay ad-free.
 *
 * Renders nothing until you pass a real `slot` ID. After your site is approved
 * by AdSense, create an ad unit in the AdSense dashboard and pass its slot ID:
 *   <AdSlot slot="1234567890" />
 * The <ins> is only emitted when a slot is provided, so no empty/broken units
 * appear during the AdSense review.
 */
export function AdSlot({
  slot,
  className = "",
  format = "auto",
}: {
  slot?: string;
  className?: string;
  format?: string;
}) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!slot || pushed.current) return;
    pushed.current = true;
    try {
      // adsbygoogle is injected by AdSenseLoader once the script loads.
      // @ts-expect-error - adsbygoogle is added to window by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* script not loaded yet — the unit will fill once it is */
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <div className={`my-8 text-center ${className}`} aria-hidden="true">
      <span className="block text-[10px] uppercase tracking-wider text-white/25 mb-1">
        Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
