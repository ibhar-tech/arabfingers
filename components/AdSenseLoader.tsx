"use client";

import { useEffect } from "react";

const PUBLISHER_ID = "ca-pub-9623110963718326";

export function AdSenseLoader() {
  useEffect(() => {
    let loaded = false;

    const loadAdSense = () => {
      if (loaded) return;
      loaded = true;

      if (document.querySelector('script[src*="adsbygoogle"]')) return;

      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`;
      script.async = true;
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
  }, []);

  return null;
}
