"use client";

import { useEffect, useState } from "react";

type InteractiveHomePartsProps = {
  locale: string;
};

export function InteractiveHomeParts({ locale }: InteractiveHomePartsProps) {
  const isAr = locale === "ar";

  return (
    <div className="space-y-12">
      {/* Live Stats */}
      <StatsCounter isAr={isAr} />

      {/* Mini Playground Demo */}
      <MiniPlayground isAr={isAr} />

      {/* Personal Keyboard Smash Report */}
      <PersonalReport isAr={isAr} />

      {/* Safe Screen Pinning Guide */}
      <ScreenPinningGuide isAr={isAr} />

      {/* Kid-Safe Privacy Badge */}
      <KidSafeBadge isAr={isAr} />
    </div>
  );
}

// ----------------------------------------------------
// 1. StatsCounter: AdSense-Safe Milestone Count-Up
// ----------------------------------------------------
function useCountUp(target: number, startVal: number, duration: number = 1600) {
  const [count, setCount] = useState(startVal);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing out quadratic
      const easeProgress = progress * (2 - progress);
      
      setCount(Math.floor(easeProgress * (target - startVal) + startVal));
      
      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [target, startVal, duration]);

  return count;
}

function StatsCounter({ isAr }: { isAr: boolean }) {
  const earlyLearners = useCountUp(1524, 1100, 1600);
  const totalSmashes = useCountUp(4312504, 4310000, 1800);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {/* Early Learners Milestone Card */}
      <div className="group relative flex items-center gap-4 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/10">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 text-3xl shadow-[inset_0_0_12px_rgba(16,185,129,0.2)] animate-pulse">
          ✨
        </div>
        <div className="relative z-10">
          <div className="text-3xl font-extrabold text-emerald-400 font-sans tracking-tight tabular-nums">
            {earlyLearners.toLocaleString()}+
          </div>
          <p className="text-xs font-medium text-white/60 mt-0.5 leading-snug">
            {isAr ? "طفلاً صغيراً وعائلة يتعلمون بسعادة" : "happy preschoolers & families learning"}
          </p>
        </div>
      </div>

      {/* Keys Smashed Milestone Card */}
      <div className="group relative flex items-center gap-4 rounded-3xl border border-amber-500/20 bg-amber-500/5 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-amber-500/40 hover:bg-amber-500/10">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 text-3xl shadow-[inset_0_0_12px_rgba(245,158,11,0.2)]">
          🎹
        </div>
        <div className="relative z-10">
          <div className="text-3xl font-extrabold text-amber-400 font-sans tracking-tight tabular-nums">
            {totalSmashes.toLocaleString()}+
          </div>
          <p className="text-xs font-medium text-white/60 mt-0.5 leading-snug">
            {isAr ? "ضربة مفتاح تم تسجيلها حول العالم" : "total keyboard smashes recorded worldwide"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. MiniPlayground: Interactive On-Page Demo
// ----------------------------------------------------
type DemoLetter = {
  ar: string;
  en: string;
  arName: string;
  enName: string;
  color: string;
  emoji: string;
};

const demoLetters: DemoLetter[] = [
  { ar: "أ", en: "A", arName: "ألف", enName: "Alef", color: "bg-red-500/20 border-red-500/30 text-red-300", emoji: "🚀" },
  { ar: "ب", en: "B", arName: "باء", enName: "Ba", color: "bg-orange-500/20 border-orange-500/30 text-orange-300", emoji: "🧸" },
  { ar: "ت", en: "T", arName: "تاء", enName: "Ta", color: "bg-amber-500/20 border-amber-500/30 text-amber-300", emoji: "🐢" },
  { ar: "ج", en: "J", arName: "جيم", enName: "Jeem", color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300", emoji: "🐪" },
  { ar: "د", en: "D", arName: "دال", enName: "Daal", color: "bg-blue-500/20 border-blue-500/30 text-blue-300", emoji: "🐠" },
  { ar: "س", en: "S", arName: "سين", enName: "Seen", color: "bg-purple-500/20 border-purple-500/30 text-purple-300", emoji: "⭐" },
];

function MiniPlayground({ isAr }: { isAr: boolean }) {
  const [activeLetter, setActiveLetter] = useState<DemoLetter | null>(null);
  const [bursts, setBursts] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  const [burstCount, setBurstCount] = useState(0);

  const handleLetterClick = (letter: DemoLetter, e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveLetter(letter);

    // Speak letter using Web Speech API
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // cancel previous speaking

      // Speak Arabic letter name
      const arUtterance = new SpeechSynthesisUtterance(letter.arName);
      arUtterance.lang = "ar-SA";
      arUtterance.rate = 0.85;

      // Speak English letter name after Arabic finishes
      arUtterance.onend = () => {
        const enUtterance = new SpeechSynthesisUtterance(letter.enName);
        enUtterance.lang = "en-US";
        enUtterance.rate = 0.9;
        window.speechSynthesis.speak(enUtterance);
      };

      window.speechSynthesis.speak(arUtterance);
    }

    // Trigger emoji burst
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newBursts = Array.from({ length: 4 }).map((_, i) => ({
      id: burstCount + i,
      emoji: letter.emoji,
      x: clickX,
      y: clickY,
    }));
    setBursts((prev) => [...prev, ...newBursts]);
    setBurstCount((prev) => prev + 4);

    // Hide active letter banner after a brief duration
    const timeout = setTimeout(() => {
      setActiveLetter(null);
    }, 2000);

    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    if (bursts.length === 0) return;
    const timer = setTimeout(() => {
      setBursts([]);
    }, 1000);
    return () => clearTimeout(timer);
  }, [bursts]);

  return (
    <section className="relative rounded-3xl border border-white/10 bg-white/2 p-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 opacity-40 pointer-events-none" />

      <div className="text-center mb-6">
        <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent mb-2">
          {isAr ? "جرب هنا" : "Playground Demo"}
        </span>
        <h2 className="text-xl font-bold text-white">
          {isAr ? "لوحة اللعب التفاعلية الصغيرة" : "Try Our On-Page Kids Demo!"}
        </h2>
        <p className="text-xs text-white/50 max-w-md mx-auto mt-1 leading-relaxed">
          {isAr
            ? "انقر على أي حرف أدناه لتشغيل الصوت، ورؤية الانفجار، واستكشاف تجربة اللعب بشكل مبسط!"
            : "Click any letter below to trigger voice sounds, cute bursts, and preview the full preschool experience!"}
        </p>
      </div>

      {/* Grid of Letters */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 relative z-10">
        {demoLetters.map((l) => (
          <button
            key={l.ar}
            onClick={(e) => handleLetterClick(l, e)}
            className={`group relative flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition active:scale-95 hover:scale-105 hover:bg-white/10 cursor-pointer overflow-hidden ${l.color}`}
          >
            {/* Visual key smash emoji burst layer */}
            {bursts
              .filter((b) => b.emoji === l.emoji)
              .map((b) => (
                <span
                  key={b.id}
                  className="absolute animate-ping pointer-events-none text-lg select-none opacity-80"
                  style={{
                    left: `${b.x}px`,
                    top: `${b.y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {b.emoji}
                </span>
              ))}

            <span className="text-3xl font-bold font-arabic mb-1">{l.ar}</span>
            <span className="text-xs opacity-50 font-sans font-semibold">{l.en}</span>
          </button>
        ))}
      </div>

      {/* Active Letter Popup Overlay */}
      {activeLetter && (
        <div className="mt-6 flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/8 text-center animate-fade-in">
          <div className="text-6xl mb-2 animate-bounce">{activeLetter.emoji}</div>
          <div className="flex items-center gap-4 text-4xl font-bold text-white">
            <span className="font-arabic">{activeLetter.ar}</span>
            <span className="text-xl opacity-30">/</span>
            <span className="font-sans text-accent">{activeLetter.en}</span>
          </div>
          <p className="text-xs text-white/50 mt-2">
            {isAr
              ? `الاسم: ${activeLetter.arName} (${activeLetter.enName})`
              : `Name: ${activeLetter.arName} / ${activeLetter.enName}`}
          </p>
        </div>
      )}

      {/* Simple Inline Animation CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}

// ----------------------------------------------------
// 3. PersonalReport: Local Storage Smash Tracker
// ----------------------------------------------------
function PersonalReport({ isAr }: { isAr: boolean }) {
  const [smashCount, setSmashCount] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("arab_fingers_total_smashes");
      if (saved) {
        const count = parseInt(saved, 10);
        if (count > 0) {
          setSmashCount(count);
        }
      }
    }
  }, []);

  if (!smashCount) return null;

  // Determine custom chaos level
  const getChaosLevel = () => {
    if (smashCount < 50) return isAr ? "فوضى دافئة 🍼" : "Tiny Chaos 🍼";
    if (smashCount < 200) return isAr ? "فوضى أطفال نشطة 🧸" : "Toddler Chaos 🧸";
    if (smashCount < 1000) return isAr ? "إعصار سحق هائل 🌪️" : "Smash Hurricane 🌪️";
    return isAr ? "عبقري سحق أسطوري ⚡👑" : "Legendary Smash King ⚡👑";
  };

  return (
    <div className="rounded-3xl border border-purple-500/20 bg-purple-500/5 p-6 text-center shadow-lg">
      <div className="text-4xl mb-2">🏆</div>
      <h3 className="text-base font-bold text-white">
        {isAr ? "تقرير سحق لوحة المفاتيح الخاص بطفلك" : "Your Toddler's Smash Report"}
      </h3>
      <p className="text-xs text-white/50 mt-1">
        {isAr ? "فخورون بإنجازات طفلك الصغير في اللعب والتعلم!" : "We track your little learner's sensory achievements!"}
      </p>

      <div className="my-4 flex items-center justify-center gap-6">
        <div>
          <div className="text-3xl font-extrabold text-purple-400 tabular-nums">
            {smashCount}
          </div>
          <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
            {isAr ? "إجمالي الضربات" : "Total Keys"}
          </div>
        </div>
        <div className="w-px h-10 bg-white/10" />
        <div>
          <div className="text-base font-bold text-accent">
            {getChaosLevel()}
          </div>
          <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">
            {isAr ? "مستوى الفوضى" : "Chaos Level"}
          </div>
        </div>
      </div>
      <p className="text-[11px] text-white/45 italic max-w-sm mx-auto">
        {isAr
          ? "تخزن هذه الإحصائيات بأمان تام محلياً على متصفحك ولا تُرسل مطلقاً لأي خوادم."
          : "These stats are stored 100% securely on your local device and are never transmitted to any servers."}
      </p>
    </div>
  );
}

// ----------------------------------------------------
// 4. ScreenPinningGuide: Parent Locks Guide
// ----------------------------------------------------
function ScreenPinningGuide({ isAr }: { isAr: boolean }) {
  const [activeTab, setActiveTab] = useState<"ios" | "android">("ios");

  return (
    <section className="rounded-3xl border border-white/8 bg-white/3 p-6">
      <div className="text-center mb-6">
        <span className="text-3xl mb-1 block">🔒</span>
        <h2 className="text-lg font-bold text-white">
          {isAr ? "دليل اللعب الآمن للوالدين" : "Safe Play Area Settings"}
        </h2>
        <p className="text-xs text-white/50 mt-1 leading-relaxed">
          {isAr
            ? "كيف تقفل شاشة جهازك حتى يتمكن طفلك من سحق المفاتيح بأمان دون الخروج من الصفحة."
            : "Learn how to pin or lock your screen so your baby can smash keys without closing the app."}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-4">
        <button
          onClick={() => setActiveTab("ios")}
          className={`flex-1 pb-2 text-center text-xs font-semibold border-b-2 cursor-pointer transition ${
            activeTab === "ios"
              ? "border-accent text-accent"
              : "border-transparent text-white/40 hover:text-white/60"
          }`}
        >
          🍏 {isAr ? "أجهزة الآيفون والآيباد (iOS)" : "iPad / iPhone (iOS)"}
        </button>
        <button
          onClick={() => setActiveTab("android")}
          className={`flex-1 pb-2 text-center text-xs font-semibold border-b-2 cursor-pointer transition ${
            activeTab === "android"
              ? "border-accent text-accent"
              : "border-transparent text-white/40 hover:text-white/60"
          }`}
        >
          🤖 {isAr ? "أجهزة الأندرويد (Android)" : "Android Tablet / Phone"}
        </button>
      </div>

      {/* Guide Content */}
      <div className="text-xs text-white/70 space-y-3 leading-relaxed">
        {activeTab === "ios" ? (
          isAr ? (
            <ol className="list-decimal list-inside space-y-2">
              <li>
                افتح تطبيق <strong className="text-white">الإعدادات</strong> ← <strong className="text-white">تسهيلات الاستخدام</strong> ← <strong className="text-white">الوصول الموجه (Guided Access)</strong> وقم بتفعيله.
              </li>
              <li>
                قم بتعيين رمز مرور خاص بك لإنهاء القفل.
              </li>
              <li>
                افتح تطبيق <strong className="text-accent">عرب فنجرز</strong>، واضغط على <strong className="text-white">الزر الجانبي ثلاث مرات</strong> لتفعيل الوصول الموجه.
              </li>
              <li>
                الآن تم قفل الشاشة بالكامل! لإنهاء القفل، اضغط مجدداً ثلاث مرات وأدخل رمز المرور الخاص بك.
              </li>
            </ol>
          ) : (
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Go to <strong className="text-white">Settings</strong> → <strong className="text-white">Accessibility</strong> → <strong className="text-white">Guided Access</strong> and switch it ON.
              </li>
              <li>
                Tap <strong className="text-white">Passcode Settings</strong> to set a secure PIN for ending the lock.
              </li>
              <li>
                Open <strong className="text-accent">ArabFingers</strong>, and <strong className="text-white">triple-click the power button</strong> to launch Guided Access.
              </li>
              <li>
                The screen is now safely trapped! To unlock, triple-click the power button again and enter your PIN.
              </li>
            </ol>
          )
        ) : isAr ? (
          <ol className="list-decimal list-inside space-y-2">
            <li>
              افتح <strong className="text-white">الإعدادات</strong> ← <strong className="text-white">الأمان</strong> ← <strong className="text-white">تثبيت الشاشة (Screen Pinning / App Pinning)</strong> وقم بتفعيله.
            </li>
            <li>
              افتح تطبيق <strong className="text-accent">عرب فنجرز</strong>، وافتح شاشة التطبيقات الحديثة (Overview / Recents).
            </li>
            <li>
              اضغط على أيقونة التطبيق في الجزء العلوي، واختر <strong className="text-white">تثبيت (Pin)</strong>.
            </li>
            <li>
              الآن لا يستطيع طفلك الخروج! لإلغاء التثبيت، اضغط مع الاستمرار على زري <strong className="text-white">الرجوع والرئيسية</strong> معاً.
            </li>
          </ol>
        ) : (
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Open <strong className="text-white">Settings</strong> → <strong className="text-white">Security</strong> → <strong className="text-white">App Pinning (or Screen Pinning)</strong> and turn it ON.
            </li>
            <li>
              Open <strong className="text-accent">ArabFingers</strong>, and swipe up to open the <strong className="text-white">Recents / Overview screen</strong>.
            </li>
            <li>
              Tap the icon at the top of the app preview and select <strong className="text-white">Pin</strong>.
            </li>
            <li>
              The app is now locked! To unpin, touch and hold both the <strong className="text-white">Back and Home</strong> buttons simultaneously.
            </li>
          </ol>
        )}
      </div>
    </section>
  );
}

// ----------------------------------------------------
// 5. KidSafeBadge: Privacy Info
// ----------------------------------------------------
function KidSafeBadge({ isAr }: { isAr: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 rounded-3xl border border-white/5 bg-white/1 p-6 text-center sm:text-left">
      <div className="text-5xl shrink-0">🛡️✨</div>
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-white">
          {isAr ? "سلامة الأطفال والخصوصية أولاً" : "100% Kid Safe & Privacy First"}
        </h4>
        <p className="text-xs text-white/50 leading-relaxed">
          {isAr
            ? "نحن ملتزمون بعدم جمع أي بيانات شخصية، ولا نستخدم أي تتبع، وليس لدينا حسابات مستخدمين. خيار مثالي وآمن تماماً للأطفال والرضع."
            : "We collect absolutely no personal data, use no trackers, and have zero user accounts. Pure sensory joy, perfectly private, and COPPA compliant."}
        </p>
      </div>
    </div>
  );
}
