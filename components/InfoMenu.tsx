"use client";

import { Info, X, FileText, Mail, Shield, Scale } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const links = [
  { href: "about", icon: FileText, labelEn: "About", labelAr: "عن التطبيق" },
  { href: "contact", icon: Mail, labelEn: "Contact Us", labelAr: "تواصل معنا" },
  { href: "privacy", icon: Shield, labelEn: "Privacy Policy", labelAr: "سياسة الخصوصية" },
  { href: "terms", icon: Scale, labelEn: "Terms of Service", labelAr: "شروط الاستخدام" },
];

export function InfoMenu() {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isAr = locale === "ar";

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleClick);
    return () => document.removeEventListener("pointerdown", handleClick);
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        data-parent-ui="true"
        aria-label="Info"
        onClick={() => setOpen((v) => !v)}
        className={`group flex items-center gap-2 rounded-xl border px-3 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition ${
          open
            ? "border-white/25 bg-black/50 text-white"
            : "border-white/15 bg-black/35 text-white/80 hover:bg-black/45 hover:text-white/95"
        }`}
      >
        {open ? (
          <X className="h-5 w-5" strokeWidth={2} />
        ) : (
          <Info className="h-5 w-5" strokeWidth={2} />
        )}
      </button>

      {open ? (
        <div
          data-parent-ui="true"
          className="absolute left-0 top-full mt-2.5 z-50 w-56 rounded-2xl border border-white/12 bg-[#0b1528]/97 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        >
          <div className="px-4 py-2 text-[10px] uppercase tracking-wider text-white/30">
            {isAr ? "صفحات" : "Pages"}
          </div>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={`/${locale}/${link.href}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/8 hover:text-white"
              >
                <Icon className="h-4 w-4 text-white/40" strokeWidth={1.8} />
                {isAr ? link.labelAr : link.labelEn}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
