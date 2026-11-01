"use client";

import { useEffect, useState } from "react";

/**
 * A download bar pinned to the bottom of the screen on phones, shown once the
 * page's own download button (`watchId`) has scrolled out of view. The PDF is
 * what most visitors came for; on a long page it should stay one tap away.
 */
export function StickyDownload({ href, label, watchId }: { href: string; label: string; watchId: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      // Only once it has gone off the top, not while it is still below the fold.
      setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [watchId]);

  return (
    <>
    {/* Room at the end of the page so the bar never covers the last lines. */}
    <div aria-hidden className="h-20 sm:hidden" />
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-card/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-200 sm:hidden print:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <a href={href} download tabIndex={show ? 0 : -1} className="btn-chunky flex w-full justify-center text-sm">
        ⬇ {label}
      </a>
    </div>
    </>
  );
}
