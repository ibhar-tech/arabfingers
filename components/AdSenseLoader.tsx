"use client";

import { useEffect } from "react";

const PUBLISHER_ID = "ca-pub-9623110963718326";

export function AdSenseLoader() {
  useEffect(() => {
    // Load AdSense after page is interactive
    const timer = setTimeout(() => {
      if (document.querySelector('script[src*="adsbygoogle"]')) return;

      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }, 3000); // 3s delay — page is fully interactive by then

    return () => clearTimeout(timer);
  }, []);

  return null;
}
