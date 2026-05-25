"use client";

import { useEffect } from "react";

const PUBLISHER_ID = "ca-pub-9623110963718326";

export function AdSenseLoader() {
  useEffect(() => {
    if (document.querySelector('script[src*="adsbygoogle"]')) return;

    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return null;
}
