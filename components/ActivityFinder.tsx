"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Bookmark, Check, Search } from "lucide-react";
import type { ActivityKind, LearningActivity } from "@/lib/activityCatalog";

const STORAGE_KEY = "arabfingers:saved-activities:v1";
const labels = {
  en: { all: "Everything", worksheets: "Print & practice", games: "Play & learn", stories: "Story time", science: "Little scientists" },
  ar: { all: "كل الأنشطة", worksheets: "اطبع وتدرّب", games: "العب وتعلّم", stories: "وقت القصة", science: "علماء صغار" },
};

function normalizeSearch(query: string) {
  return query.toLowerCase().normalize("NFKD").replace(/[\u064B-\u065F\u0670\u0640]/g, "").replace(/[أإآ]/g, "ا").trim();
}

export function ActivityFinder({ locale, activities }: { locale: string; activities: LearningActivity[] }) {
  const ar = locale === "ar";
  const copy = ar ? labels.ar : labels.en;
  const kinds = new Set(activities.map((activity) => activity.kind));
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<ActivityKind | "all">("all");
  const [age, setAge] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const initialLimit = activities.every((activity) => activity.kind === "worksheets") ? activities.length : 6;
  const [limit, setLimit] = useState(initialLimit);
  const [storageReady, setStorageReady] = useState(false);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(stored)) setSaved(stored.filter((href): href is string => typeof href === "string"));
    } catch { setStorageError(true); }
    setStorageReady(true);
  }, []);

  function toggleSaved(href: string) {
    const nextSaved = saved.includes(href) ? saved.filter((entry) => entry !== href) : [...saved, href];
    setSaved(nextSaved);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSaved)); }
    catch { setStorageError(true); }
  }

  const words = normalizeSearch(query).split(/\s+/).filter(Boolean);
  const matches = activities.filter((activity) =>
    (kind === "all" || activity.kind === kind) &&
    (!age || (Number(age) >= activity.ages[0] && Number(age) <= activity.ages[1])) &&
    (!savedOnly || saved.includes(activity.href)) &&
    words.every((word) => normalizeSearch(activity.searchText).includes(word)));

  function resetFilters() {
    setQuery(""); setKind("all"); setAge(""); setSavedOnly(false); setLimit(initialLimit);
  }

  return (
    <div className="activity-finder">
      <div className="finder-controls">
        <label className="finder-search">
          <Search size={20} aria-hidden />
          <span className="sr-only">{ar ? "ابحث عن نشاط" : "Search activities"}</span>
          <input type="search" value={query} placeholder={ar ? "حروف، أرقام، حيوانات… ما الذي نكتشفه؟" : "Letters, numbers, animals… what shall we discover?"} onChange={(event) => { setQuery(event.target.value); setLimit(initialLimit); }} />
        </label>
        <label className="finder-age">
          <span className="sr-only">{ar ? "عمر الطفل" : "Child's age"}</span>
          <select value={age} onChange={(event) => { setAge(event.target.value); setLimit(initialLimit); }}>
            <option value="">{ar ? "كل الأعمار" : "All ages"}</option>
            {[3, 4, 5, 6, 7, 8].map((years) => <option key={years} value={years}>{ar ? `${years.toLocaleString("ar-u-nu-latn")} سنوات` : `Age ${years}`}</option>)}
          </select>
        </label>
        <button className="finder-saved" aria-pressed={savedOnly} onClick={() => { setSavedOnly(!savedOnly); setLimit(initialLimit); }}><Bookmark size={18} aria-hidden />{ar ? "المحفوظات" : "Saved"} <span>{saved.length}</span></button>
      </div>
      {kinds.size > 1 && <div className="finder-categories" role="group" aria-label={ar ? "نوع النشاط" : "Activity type"}>
        {Object.entries(copy).filter(([key]) => key === "all" || kinds.has(key as ActivityKind)).map(([key, label]) => <button key={key} aria-pressed={kind === key} onClick={() => { setKind(key as ActivityKind | "all"); setLimit(initialLimit); }}>{label}</button>)}
      </div>}
      <div className="finder-summary">
        <p role="status">{ar ? `${matches.length.toLocaleString("ar-u-nu-latn")} نشاط متاح · مجاناً وبدون تسجيل` : `${matches.length} activities to explore · Free, no sign-up`}</p>
        {(query || age || savedOnly || kind !== "all") && <button onClick={resetFilters}>{ar ? "مسح الفلاتر" : "Clear filters"}</button>}
      </div>
      {storageError && <p className="storage-notice" role="status">{ar ? "المحفوظات متاحة لهذه الزيارة فقط؛ تعذّر الوصول إلى تخزين المتصفّح." : "Saved activities are available for this visit only; browser storage is unavailable."}</p>}
      <div className="activity-grid">
        {matches.slice(0, limit).map((activity) => <ActivityCard key={activity.href} activity={activity} locale={locale} saved={saved.includes(activity.href)} storageReady={storageReady} onSave={() => toggleSaved(activity.href)} />)}
      </div>
      {matches.length === 0 && <div className="finder-empty"><Search size={32} aria-hidden /><h3>{ar ? "لنبحث عن شيء آخر" : "Let's try another discovery"}</h3><p>{savedOnly ? (ar ? "احفظ نشاطاً بعلامة المرجع ليظهر هنا." : "Use the bookmark on an activity to keep it here.") : (ar ? "جرّب كلمة أقصر أو اختر كل الأعمار." : "Try a shorter search or choose all ages.")}</p><button className="discovery-button secondary" onClick={resetFilters}>{ar ? "استكشف كل الأنشطة" : "Explore all activities"}</button></div>}
      {matches.length > limit && <button className="finder-more" onClick={() => setLimit(limit + 9)}>{ar ? "اكتشف المزيد من الأنشطة" : "Discover more activities"} <span>+</span></button>}
      <p className="finder-note">{ar ? "الأعمار إرشادية. تُحفظ المفضّلة في هذا المتصفّح فقط." : "Ages are a guide. Your saved activities stay in this browser only."}</p>
    </div>
  );
}

function ActivityCard({ activity, locale, saved, storageReady, onSave }: { activity: LearningActivity; locale: string; saved: boolean; storageReady: boolean; onSave: () => void }) {
  const ar = locale === "ar";
  return (
    <article className={`discovery-card activity-${activity.kind}`}>
      <div className="activity-art">
        <Link href={`/${locale}${activity.href}`} tabIndex={-1} aria-hidden="true" className="activity-art-link">
          {activity.preview ? <Image src={activity.preview} alt="" width={349} height={494} unoptimized className="worksheet-preview" /> : <span className="activity-symbol">{activity.artwork}</span>}
        </Link>
        <span className="activity-kind">{(ar ? labels.ar : labels.en)[activity.kind]}</span>
        <button className="save-activity" disabled={!storageReady} aria-label={`${saved ? (ar ? "إزالة من المحفوظات" : "Unsave") : (ar ? "حفظ" : "Save")} ${activity.title}`} aria-pressed={saved} onClick={onSave}>{saved ? <Check size={19} /> : <Bookmark size={19} />}</button>
      </div>
      <div className="activity-copy">
        <p className="activity-detail">{activity.detail} <span>·</span> {ar ? `عمر ${activity.ages[0].toLocaleString("ar-u-nu-latn")}–${activity.ages[1].toLocaleString("ar-u-nu-latn")}` : `Ages ${activity.ages[0]}–${activity.ages[1]}`}</p>
        <h3><Link href={`/${locale}${activity.href}`}>{activity.title}<ArrowUpRight size={20} aria-hidden /></Link></h3>
        <p className="activity-description">{activity.description}</p>
        {activity.kind === "worksheets" && <a className="activity-download" href={`${activity.href}.pdf`} download>{ar ? "تحميل PDF" : "Download PDF"}<span aria-hidden>↓</span></a>}
      </div>
    </article>
  );
}
