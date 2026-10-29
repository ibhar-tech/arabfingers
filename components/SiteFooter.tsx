import Link from "next/link";
import styles from "./SiteFooter.module.css";

const resourcesLink = { href: "/resources", labelEn: "Resources", labelAr: "المصادر" };

export const footerInfoLinks = [
  { href: "/about", labelEn: "About", labelAr: "عن الموقع" },
  { href: "/author", labelEn: "Author", labelAr: "المؤلف" },
  resourcesLink,
  { href: "/contact", labelEn: "Contact", labelAr: "تواصل معنا" },
  { href: "/privacy", labelEn: "Privacy", labelAr: "الخصوصية" },
  { href: "/terms", labelEn: "Terms", labelAr: "الشروط" },
];

const footerGroups = [
  {
    labelEn: "Explore & play", labelAr: "اكتشف والعب",
    links: [
      { href: "/printables", labelEn: "Free printables", labelAr: "أوراق عمل مجانية" },
      { href: "/games", labelEn: "Learning games", labelAr: "ألعاب تعليمية" },
      { href: "/coloring", labelEn: "Coloring studio", labelAr: "مرسم التلوين" },
      { href: "/stories", labelEn: "Children’s stories", labelAr: "قصص الأطفال" },
    ],
  },
  {
    labelEn: "For curious families", labelAr: "للأهل والمعلّمين",
    links: [
      { href: "/learn", labelEn: "Learning guides", labelAr: "أدلة تعلّم العربية" },
      { href: "/glossary", labelEn: "Arabic word list", labelAr: "قائمة الكلمات العربية" },
      { href: "/blog", labelEn: "Ideas & activities", labelAr: "أفكار وأنشطة" },
      resourcesLink,
    ],
  },
];

function FooterBrand({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  return (
    <div className={styles.brand}>
      <Link href={`/${locale}`} className={styles.brandLink} aria-label={isAr ? "عرب فنجرز — الرئيسية" : "Arab Fingers — home"}>
        <span className={styles.mark} aria-hidden="true">أ<span>✦</span></span>
        <span>{isAr ? "عرب فنجرز" : "arab fingers"}</span>
      </Link>
      <p>{isAr ? "لحظات صغيرة من اللعب، وعالم من العربية." : "A little play. A world of Arabic."}</p>
    </div>
  );
}

function FooterNavigation({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  return footerGroups.map((group) => (
    <nav key={group.labelEn} className={styles.group} aria-label={isAr ? group.labelAr : group.labelEn}>
      <h2>{isAr ? group.labelAr : group.labelEn}</h2>
      <ul>
        {group.links.map((link) => (
          <li key={link.href}><Link href={`/${locale}${link.href}`}>{isAr ? link.labelAr : link.labelEn}</Link></li>
        ))}
      </ul>
    </nav>
  ));
}

export function SiteFooter({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  return (
    <footer className={`${styles.footer} relative z-10 mt-auto print:hidden`}>
      <div className={styles.inner}>
        <div className={styles.main}>
          <FooterBrand locale={locale} />
          <FooterNavigation locale={locale} />
        </div>
        <div className={styles.bottom}>
          <p>© 2026 {isAr ? "عرب فنجرز. جميع الحقوق محفوظة." : "Arab Fingers. All rights reserved."}</p>
          <nav aria-label={isAr ? "عن الموقع وروابط مهمة" : "About and legal"}>
            {footerInfoLinks.filter((link) => link.href !== "/resources").map((link) => (
              <Link key={link.href} href={`/${locale}${link.href}`}>{isAr ? link.labelAr : link.labelEn}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
