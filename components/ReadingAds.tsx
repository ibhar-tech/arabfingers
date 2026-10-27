"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const READING_ROUTES = ["/blog", "/learn", "/printables", "/glossary", "/resources", "/stories"];
const INTERACTIVE_LESSONS = ["/learn/gravity", "/learn/water-cycle", "/learn/solar-system", "/learn/states-of-matter"];
// Adsterra moved the 728x90 and 320x50 units to a new script host; the 300x250 is still on the old one.
const BANNERS = {
  desktop: { key: "cece0b3529426d2e6735cd25160f61e9", width: 728, height: 90, src: "https://bauval.org/22/cece0b3529426d2e6735cd25160f61e9" },
  mobile: { key: "3c908dfc062a31ebcf0682182915df0c", width: 320, height: 50, src: "https://bauval.org/22/3c908dfc062a31ebcf0682182915df0c" },
  rectangle: { key: "490db964007730ea5d4f938f3227bb4c", width: 300, height: 250, src: "https://fortunateambiguous.com/490db964007730ea5d4f938f3227bb4c/invoke.js" },
};
// Page-wide formats (Popunder, Social Bar): loaded once, never per slot.
const PAGE_TAGS = [
  "https://abscloud.org/1/69f57dff979e2cc9f5717056a2cee719",
  "https://bauval.org/14/a8ab4bb9d880ee09f1dd19d745e14642",
];
let pageTagsLoaded = false;
// The vendor reads one global options object; serialize tags to avoid a race
// between differently sized placements on the same page.
let bannerQueue = Promise.resolve();

export function ReadingAds({ placement = "bottom" }: { placement?: "top" | "bottom" }) {
  const pathname = usePathname();
  const path = `/${pathname.split("/").slice(2).join("/")}`;
  const allowed = (path === "/" || READING_ROUTES.some((route) => path === route || path.startsWith(`${route}/`))) && !INTERACTIVE_LESSONS.includes(path);
  useEffect(() => {
    // ponytail: these tags leave document-wide listeners we cannot remove, so a client-side
    // move to a game or colouring page reloads it clean. Costs one reload on that hop.
    if (!allowed) { if (pageTagsLoaded) window.location.reload(); return; }
    if (pageTagsLoaded) return;
    pageTagsLoaded = true;
    for (const src of PAGE_TAGS) {
      const script = document.createElement("script");
      script.dataset.cfasync = "false";
      script.src = src;
      document.body.appendChild(script);
    }
  }, [allowed]);
  return allowed ? <ReadingAdSlot key={`${pathname}-${placement}`} locale={pathname.startsWith("/ar") ? "ar" : "en"} placement={placement} /> : null;
}

function ReadingAdSlot({ locale, placement }: { locale: string; placement: "top" | "bottom" }) {
  const slot = useRef<HTMLElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const [format, setFormat] = useState<keyof typeof BANNERS | null>(placement === "bottom" ? "rectangle" : null);
  const [visible, setVisible] = useState(placement === "top");

  useEffect(() => {
    if (placement !== "top") return;
    const media = window.matchMedia("(min-width: 800px)");
    const selectFormat = () => setFormat(media.matches ? "desktop" : "mobile");
    selectFormat();
    media.addEventListener("change", selectFormat);
    return () => media.removeEventListener("change", selectFormat);
  }, [placement]);

  useEffect(() => {
    const element = slot.current;
    if (!element || visible) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: "250px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    const container = host.current;
    if (!visible || !format || !container) return;
    let cancelled = false;
    bannerQueue = bannerQueue.then(() => new Promise<void>((resolve) => {
      if (cancelled || !container.isConnected) { resolve(); return; }
      const { src, ...options } = BANNERS[format];
      (window as Window & { atOptions?: object }).atOptions = { ...options, format: "iframe", params: {} };
      const script = document.createElement("script");
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = src;
      script.referrerPolicy = "strict-origin-when-cross-origin";
      // A slow tag must finish before another placement changes its global options.
      script.onload = script.onerror = () => resolve();
      container.appendChild(script);
    }));
    return () => { cancelled = true; container.replaceChildren(); };
  }, [format, visible]);

  return <aside ref={slot} className={`reading-ad-slot reading-ad-${placement} print:hidden`} aria-label={locale === "ar" ? "إعلان" : "Advertisement"}>
    <span>{locale === "ar" ? "إعلان" : "Advertisement"}</span>
    <div ref={host} className="reading-ad-content" style={format ? { width: BANNERS[format].width, minHeight: BANNERS[format].height } : undefined} />
  </aside>;
}
