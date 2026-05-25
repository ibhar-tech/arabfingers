"use client";

import Link from "next/link";
import { useState } from "react";
import { arabicLetters } from "@/lib/arabicMap";

type PrintablesClientProps = {
  locale: string;
};

type ActiveTab = "letters" | "numbers" | "colors" | "animals";

// 1. Numbers & Fingers Data
type NumberItem = {
  num: string;
  en: string;
  arName: string;
  enName: string;
  fingers: string;
  countText: string;
  countTextAr: string;
};

const numbersData: NumberItem[] = [
  { num: "١", en: "1", arName: "واحد", enName: "One", fingers: "☝️", countText: "1 Finger", countTextAr: "إصبع واحد" },
  { num: "٢", en: "2", arName: "اثنان", enName: "Two", fingers: "✌️", countText: "2 Fingers", countTextAr: "إصبعان اثنان" },
  { num: "٣", en: "3", arName: "ثلاثة", enName: "Three", fingers: "🤟", countText: "3 Fingers", countTextAr: "ثلاثة أصابع" },
  { num: "٤", en: "4", arName: "أربعة", enName: "Four", fingers: "🖖", countText: "4 Fingers", countTextAr: "أربعة أصابع" },
  { num: "٥", en: "5", arName: "خمسة", enName: "Five", fingers: "✋", countText: "5 Fingers", countTextAr: "خمسة أصابع" },
  { num: "٦", en: "6", arName: "ستة", enName: "Six", fingers: "✋☝️", countText: "6 Fingers", countTextAr: "ستة أصابع" },
  { num: "٧", en: "7", arName: "سبعة", enName: "Seven", fingers: "✋✌️", countText: "7 Fingers", countTextAr: "سبعة أصابع" },
  { num: "٨", en: "8", arName: "ثمانية", enName: "Eight", fingers: "✋🤟", countText: "8 Fingers", countTextAr: "ثمانية أصابع" },
  { num: "٩", en: "9", arName: "تسعة", enName: "Nine", fingers: "✋🖖", countText: "9 Fingers", countTextAr: "تسعة أصابع" },
  { num: "١٠", en: "10", arName: "عشرة", enName: "Ten", fingers: "✋✋", countText: "10 Fingers", countTextAr: "عشرة أصابع" },
];

// 2. Colors Data
type ColorItem = {
  ar: string;
  en: string;
  shape: string;
  shapeAr: string;
  outlineEmoji: string;
};

const colorsData: ColorItem[] = [
  { ar: "أحمر", en: "Red", shape: "Heart", shapeAr: "قلب", outlineEmoji: "❤️" },
  { ar: "أزرق", en: "Blue", shape: "Droplet", shapeAr: "قطرة", outlineEmoji: "💧" },
  { ar: "أخضر", en: "Green", shape: "Leaf", shapeAr: "ورقة شجر", outlineEmoji: "🍀" },
  { ar: "أصفر", en: "Yellow", shape: "Star", shapeAr: "نجمة", outlineEmoji: "⭐" },
  { ar: "برتقالي", en: "Orange", shape: "Circle", shapeAr: "دائرة", outlineEmoji: "⭕" },
  { ar: "بنفسجي", en: "Purple", shape: "Diamond", shapeAr: "معين", outlineEmoji: "💎" },
];

// 3. Animals Data
type AnimalItem = {
  arName: string;
  enName: string;
  emoji: string;
  desc: string;
  descAr: string;
};

const animalsData: AnimalItem[] = [
  { arName: "أسد", enName: "Lion", emoji: "🦁", desc: "The King of the Jungle", descAr: "ملك الغابة الشجاع" },
  { arName: "أرنب", enName: "Rabbit", emoji: "🐰", desc: "Loves eating carrots", descAr: "يحب أكل الجزر ويقفز بمرح" },
  { arName: "فيل", enName: "Elephant", emoji: "🐘", desc: "Has a very long trunk", descAr: "كبير الحجم وله خرطوم طويل" },
  { arName: "قرد", enName: "Monkey", emoji: "🐵", desc: "Loves climbing trees", descAr: "شقي ومرح يحب الموز والتسلق" },
  { arName: "قطة", enName: "Cat", emoji: "🐱", desc: "Loves playing and milk", descAr: "صديقة لطيفة تحب اللعب والحليب" },
  { arName: "كلب", enName: "Dog", emoji: "🐶", desc: "Loyal and guards the house", descAr: "صديق وفي يحرس البيت بذكاء" },
  { arName: "عصفور", enName: "Bird", emoji: "🐦", desc: "Sings beautiful melodies", descAr: "يغرد بصوت جميل ويطير في السماء" },
  { arName: "سمكة", enName: "Fish", emoji: "🐟", desc: "Swims deep in the ocean", descAr: "تسبح بمهارة وتعيش في الماء" },
];

export function PrintablesClient({ locale }: PrintablesClientProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("letters");
  const isAr = locale === "ar";

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <>
      {/* 1. Print Controller & Instructions */}
      <div className="print:hidden rounded-3xl border border-accent/20 bg-white/2 p-6 mb-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 opacity-30 pointer-events-none" />
        
        <span className="text-5xl mb-3 block animate-bounce">🖨️✨</span>
        <h1 className="text-2xl font-bold text-white mb-2">
          {isAr ? "أوراق عمل وكراسات تلوين للأطفال مجاناً" : "Free Children's Printables & Tracing Books"}
        </h1>
        <p className="text-xs text-white/55 leading-relaxed max-w-xl mx-auto mb-6">
          {isAr
            ? "اختر تصنيفاً من التبويبات أدناه واضغط على زر الطباعة للحصول على كراسة أنشطة خالية من الشاشات ومثالية للمنزل أو الحضانة!"
            : "Looking for engaging, screen-free educational activities? Pick a worksheet category below and click print to create a gorgeous, custom physical activity booklet for your toddler!"}
        </p>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 border-b border-white/10 pb-4">
          {[
            { id: "letters", labelEn: "🔤 Letters Tracing", labelAr: "🔤 تتبع الحروف" },
            { id: "numbers", labelEn: "🔢 Numbers & Fingers", labelAr: "🔢 الأرقام والأصابع" },
            { id: "colors", labelEn: "🎨 Colors & Shapes", labelAr: "🎨 الألوان والأشكال" },
            { id: "animals", labelEn: "🦁 Animals Coloring", labelAr: "🦁 تلوين الحيوانات" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition active:scale-95 ${
                activeTab === tab.id
                  ? "bg-accent text-[#050816] shadow-lg"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {isAr ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-xs font-bold text-[#050816] shadow-[0_6px_24px_rgba(159,225,203,0.3)] hover:scale-105 transition cursor-pointer"
        >
          🖨️ {isAr ? "اطبع التصنيف المحدد الآن" : "Print Current Category Now"}
        </button>
      </div>

      {/* 2. Print Header (Visible only on print layout) */}
      <div className="hidden print:block text-black text-center mb-8 border-b-2 border-black pb-4" dir={isAr ? "rtl" : "ltr"}>
        <h1 className="text-3xl font-extrabold tracking-wide">Arab Fingers Workbook</h1>
        <p className="text-sm text-black/60 mt-1">
          {activeTab === "letters" && (isAr ? "كراسة أنشطة وتتبع كتابة الحروف العربية كاملة" : "Arabic Alphabet Writing & Tracing Practice")}
          {activeTab === "numbers" && (isAr ? "كراسة تتبع وكتابة الأرقام وعد الأصابع التفاعلية" : "Planetary Numbers & Hand Finger Counting Practice")}
          {activeTab === "colors" && (isAr ? "ورقة تلوين الأشكال وتعرف الألوان ثنائية اللغة" : "Bilingual Color Recognition & Geometric Shapes Tracing")}
          {activeTab === "animals" && (isAr ? "كتاب تلوين الحيوانات وتتبع أسمائها باللغتين" : "Bilingual Animals Coloring & Name Tracing Activity Book")}
        </p>
        <div className="mt-5 flex justify-between text-xs font-semibold text-black/50">
          <span>{isAr ? "الاسم: ________________________" : "Name: ________________________"}</span>
          <span>{isAr ? "التاريخ: ________________________" : "Date: ________________________"}</span>
        </div>
      </div>

      {/* 3. DYNAMIC CONTENT AREAS */}
      <div className="relative z-10" dir={isAr ? "rtl" : "ltr"}>
        
        {/* CATEGORY A: LETTERS */}
        {activeTab === "letters" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-6">
            {arabicLetters.map((letter) => (
              <div
                key={letter.ar}
                className="rounded-2xl border border-white/8 bg-white/3 p-5 flex flex-col justify-between print:bg-white print:border-black/20 print:text-black print:shadow-none"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 print:border-black/5">
                  <div>
                    <span className="text-xs font-semibold text-accent print:text-black/60 uppercase">
                      {isAr ? `حرف ${letter.soundId}` : `Letter ${letter.soundId}`}
                    </span>
                    <h3 className="text-lg font-bold text-white print:text-black mt-0.5">
                      {letter.arName} <span className="text-xs font-normal text-white/45 print:text-black/40">({letter.enName})</span>
                    </h3>
                  </div>
                  <div className="text-4xl font-bold font-arabic text-accent print:text-black">
                    {letter.ar}
                  </div>
                </div>

                {/* Tracing Grid */}
                <div className="flex items-center justify-between gap-2 mt-2">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">{isAr ? "دليل" : "Guide"}</span>
                    <div className="w-12 h-12 rounded-lg border-2 border-dashed border-accent/20 flex items-center justify-center bg-white/2 print:bg-black/2 print:border-black/20">
                      <span className="text-3xl font-bold font-arabic text-white/25 print:text-black/25 select-none">{letter.ar}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">{isAr ? "تتبع" : "Trace"}</span>
                    <div className="w-12 h-12 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center bg-white/1 print:border-black/15">
                      <span className="text-3xl font-bold font-arabic text-white/10 print:text-black/10 select-none">{letter.ar}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">{isAr ? "تتبع" : "Trace"}</span>
                    <div className="w-12 h-12 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center bg-white/1 print:border-black/15">
                      <span className="text-3xl font-bold font-arabic text-white/10 print:text-black/10 select-none">{letter.ar}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">{isAr ? "اكتب" : "Write"}</span>
                    <div className="w-12 h-12 rounded-lg border-2 border-solid border-white/5 flex items-center justify-center bg-white/1 print:border-black/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CATEGORY B: NUMBERS & FINGERS */}
        {activeTab === "numbers" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-6">
            {numbersData.map((item) => (
              <div
                key={item.en}
                className="rounded-2xl border border-white/8 bg-white/3 p-5 flex flex-col justify-between print:bg-white print:border-black/20 print:text-black print:shadow-none"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 print:border-black/5">
                  <div>
                    <h3 className="text-lg font-bold text-white print:text-black">
                      {item.arName} <span className="text-xs font-normal text-white/45 print:text-black/40">({item.enName})</span>
                    </h3>
                    <span className="text-[10px] font-semibold text-accent print:text-black/60 uppercase">
                      {isAr ? item.countTextAr : item.countText}
                    </span>
                  </div>
                  <div className="text-4xl font-bold font-arabic text-accent print:text-black flex gap-2">
                    <span>{item.num}</span>
                    <span className="text-xs text-white/30 print:text-black/30 self-center">/</span>
                    <span className="font-sans text-white/80 print:text-black/80">{item.en}</span>
                  </div>
                </div>

                {/* Interactive finger counting coloring graphic */}
                <div className="flex items-center justify-between gap-4 mt-2">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">{isAr ? "عد ولون" : "Count & Color"}</span>
                    <div className="w-20 h-12 rounded-lg border border-dashed border-accent/20 flex items-center justify-center bg-white/2 print:bg-black/2 print:border-black/15 text-2xl filter grayscale print:grayscale-0">
                      {item.fingers}
                    </div>
                  </div>

                  {/* Tracing Grid */}
                  <div className="flex-1 flex justify-around gap-1.5">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">{isAr ? "تتبع" : "Trace"}</span>
                      <div className="w-12 h-12 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center bg-white/1 print:border-black/15">
                        <span className="text-2xl font-extrabold text-white/15 print:text-black/15 select-none">{item.num}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">{isAr ? "تتبع" : "Trace"}</span>
                      <div className="w-12 h-12 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center bg-white/1 print:border-black/15">
                        <span className="text-2xl font-extrabold text-white/15 print:text-black/15 select-none">{item.num}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">{isAr ? "اكتب" : "Write"}</span>
                      <div className="w-12 h-12 rounded-lg border-2 border-solid border-white/5 flex items-center justify-center bg-white/1 print:border-black/10" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CATEGORY C: COLORS */}
        {activeTab === "colors" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-6">
            {colorsData.map((color) => (
              <div
                key={color.en}
                className="rounded-2xl border border-white/8 bg-white/3 p-5 flex flex-col justify-between print:bg-white print:border-black/20 print:text-black print:shadow-none"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 print:border-black/5">
                  <div>
                    <h3 className="text-lg font-bold text-white print:text-black">
                      {color.ar} <span className="text-xs font-normal text-white/45 print:text-black/40">({color.en})</span>
                    </h3>
                    <span className="text-[10px] font-semibold text-accent print:text-black/60 uppercase">
                      {isAr ? `تلوين شكل: ${color.shapeAr}` : `Color the shape: ${color.shape}`}
                    </span>
                  </div>
                  <span className="text-4xl filter grayscale print:grayscale-0">{color.outlineEmoji}</span>
                </div>

                <div className="flex items-center justify-between gap-4 mt-2">
                  {/* Outer hollow shape to color */}
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">{isAr ? "تلوين" : "Color"}</span>
                    <div className="w-full h-16 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center bg-white/1 print:border-black/20 relative overflow-hidden group">
                      <span className="absolute text-4xl filter grayscale opacity-15 print:opacity-20 select-none transition-transform duration-300 group-hover:scale-110">
                        {color.outlineEmoji}
                      </span>
                      <span className="relative z-10 text-[10px] font-bold text-white/40 print:text-black/50 uppercase tracking-widest">
                        {isAr ? color.ar : color.en}
                      </span>
                    </div>
                  </div>

                  {/* Tracing Arabic and English names */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase w-10">{isAr ? "عربي" : "AR"}</span>
                      <div className="w-24 h-8 rounded-lg border border-dashed border-white/10 flex items-center justify-center bg-white/1 print:border-black/15">
                        <span className="text-sm font-bold text-white/15 print:text-black/15 select-none font-arabic">{color.ar}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase w-10">{isAr ? "إنجليزي" : "EN"}</span>
                      <div className="w-24 h-8 rounded-lg border border-dashed border-white/10 flex items-center justify-center bg-white/1 print:border-black/15">
                        <span className="text-xs font-semibold text-white/15 print:text-black/15 select-none">{color.en}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CATEGORY D: ANIMALS */}
        {activeTab === "animals" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-6">
            {animalsData.map((animal) => (
              <div
                key={animal.enName}
                className="rounded-2xl border border-white/8 bg-white/3 p-5 flex flex-col justify-between print:bg-white print:border-black/20 print:text-black print:shadow-none"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 print:border-black/5">
                  <div>
                    <h3 className="text-lg font-bold text-white print:text-black">
                      {animal.arName} <span className="text-xs font-normal text-white/45 print:text-black/40">({animal.enName})</span>
                    </h3>
                    <p className="text-[10px] text-white/50 print:text-black/55 mt-0.5 font-medium leading-tight">
                      {isAr ? animal.descAr : animal.desc}
                    </p>
                  </div>
                  <span className="text-5xl filter grayscale print:grayscale-0 select-none">{animal.emoji}</span>
                </div>

                <div className="flex items-center justify-between gap-4 mt-2">
                  {/* Outer hollow frame for coloring child drawings */}
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">{isAr ? "لون حيوان الـ" : "Color The"} {animal.enName}</span>
                    <div className="w-full h-20 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center bg-white/1 print:border-black/20 overflow-hidden relative group">
                      <span className="text-5xl filter grayscale opacity-20 print:opacity-25 select-none transition-transform duration-300 group-hover:scale-110">
                        {animal.emoji}
                      </span>
                    </div>
                  </div>

                  {/* Tracing Grid */}
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">{isAr ? "تتبع بالعربية" : "Trace Arabic"}</span>
                      <div className="w-28 h-8 rounded-lg border border-dashed border-white/10 flex items-center justify-center bg-white/1 print:border-black/15">
                        <span className="text-sm font-bold text-white/15 print:text-black/15 select-none font-arabic">{animal.arName}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-[9px] text-white/30 print:text-black/30 font-semibold uppercase">{isAr ? "تتبع بالإنجليزية" : "Trace English"}</span>
                      <div className="w-28 h-8 rounded-lg border border-dashed border-white/10 flex items-center justify-center bg-white/1 print:border-black/15">
                        <span className="text-xs font-semibold text-white/15 print:text-black/15 select-none">{animal.enName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* 4. Print Footer Details (Only visible in Print) */}
      <div className="hidden print:block text-center mt-12 pt-4 border-t border-black/15 text-xs text-black/45" dir={isAr ? "rtl" : "ltr"}>
        <p>
          {isAr
            ? "© ٢٠٢٦ عرب فنجرز (www.arabfingers.site). أوراق عمل مجانية بالكامل للمدارس والمنازل."
            : "© 2026 Arab Fingers (www.arabfingers.site). Free to distribute for classroom and family use."}
        </p>
      </div>

      {/* screen layout footer direct links */}
      <div className="print:hidden text-center py-8 relative z-10">
        <Link href={`/${locale}/play`} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-base font-semibold text-[#050816] transition hover:scale-105">
          🚀 {isAr ? "جاهز للعب التفاعلي؟ افتح شاشة اللعب والتعلم" : "Screen Time Ready? Open interactive Play Mode"}
        </Link>
      </div>
    </>
  );
}
