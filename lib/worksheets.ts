// lib/worksheets.ts
// Single source of truth for the printable worksheet packs.
//
// Imported by BOTH the Next app (app/[locale]/printables) and the PDF generator
// (scripts/build-worksheets.mjs), which runs under Node's native TS stripping.
// Keep this file free of imports and of any runtime that isn't plain data — the
// generator loads it directly.

export type WorksheetSet = {
  /** URL slug + basename of the generated PDF. */
  id: string;
  emoji: string;
  titleEn: string;
  titleAr: string;
  /** What the child actually does — shown on the card and used in the PDF subtitle. */
  descEn: string;
  descAr: string;
  /** Page count of the generated PDF, shown to users before they download. */
  pages: number;
  ageEn: string;
  ageAr: string;
  /**
   * True for the pack that simply collects the others. Its first page is the
   * alphabet chart, so its preview is byte-identical to the chart's — the card
   * draws stacked sheets behind the thumbnail rather than looking like a repeat.
   */
  bundle?: boolean;
};

/** The packs we generate as real PDFs into /public/printables. */
export const worksheetSets: WorksheetSet[] = [
  {
    id: "arabic-alphabet-tracing",
    emoji: "🔤",
    titleEn: "Arabic Alphabet Tracing Worksheets",
    titleAr: "أوراق تتبّع الحروف العربية",
    descEn:
      "One full page for every letter of the Arabic alphabet: the letter shown large, its four joined forms, three graded tracing rows, and two example words to trace.",
    descAr:
      "صفحة كاملة لكل حرف من حروف الأبجدية: الحرف بحجم كبير، وأشكاله الأربعة في الكلمة، وثلاثة صفوف تتبّع متدرّجة، وكلمتان للتتبّع.",
    pages: 28,
    ageEn: "Ages 4–7",
    ageAr: "من ٤ إلى ٧ سنوات",
  },
  {
    id: "arabic-alphabet-chart",
    emoji: "📜",
    titleEn: "Arabic Alphabet Chart (1 page)",
    titleAr: "لوحة الحروف العربية (صفحة واحدة)",
    descEn:
      "All 28 letters on a single sheet with names and transliteration — print once and pin it above the desk as a reference while your child works.",
    descAr:
      "الحروف الثمانية والعشرون في ورقة واحدة مع الأسماء والنطق — اطبعها مرّة وعلّقها فوق الطاولة ليعود إليها الطفل أثناء التمرين.",
    pages: 1,
    ageEn: "All ages",
    ageAr: "لكل الأعمار",
  },
  {
    id: "arabic-numbers-tracing",
    emoji: "🔢",
    titleEn: "Arabic Numbers 1–10 Tracing Worksheets",
    titleAr: "أوراق تتبّع الأرقام العربية ١–١٠",
    descEn:
      "A page per number showing the Eastern Arabic numeral and the Western digit side by side, finger-counting dots to colour, and tracing rows for both the numeral and its Arabic name.",
    descAr:
      "صفحة لكل رقم تعرض الرقم العربي المشرقي والرقم الغربي جنباً إلى جنب، مع دوائر عدّ بالأصابع للتلوين، وصفوف تتبّع للرقم ولاسمه.",
    pages: 10,
    ageEn: "Ages 3–6",
    ageAr: "من ٣ إلى ٦ سنوات",
  },
  {
    id: "arabic-numbers-11-20",
    emoji: "🔟",
    titleEn: "Arabic Numbers 11–20 Tracing Worksheets",
    titleAr: "أوراق تتبّع الأرقام العربية ١١–٢٠",
    descEn:
      "The second decade in the same format: Eastern and Western numerals side by side, counting dots to colour, and tracing rows for the numeral and its full Arabic name — the part children find hardest past ten.",
    descAr:
      "العقد الثاني بالصيغة نفسها: الرقمان المشرقي والغربي جنباً إلى جنب، ودوائر عدّ للتلوين، وصفوف تتبّع للرقم ولاسمه العربي الكامل — وهو أصعب ما بعد العشرة.",
    pages: 10,
    ageEn: "Ages 4–7",
    ageAr: "من ٤ إلى ٧ سنوات",
  },
  {
    id: "arabic-harakat",
    emoji: "🎵",
    titleEn: "Arabic Short Vowels (Harakat) Worksheets",
    titleAr: "أوراق الحركات (الفتحة والكسرة والضمة)",
    descEn:
      "Five sheets covering fatha, kasra, damma, sukoon and tanween: each mark traced onto real letters, with an example word and how the mark changes its sound.",
    descAr:
      "خمس أوراق تغطّي الفتحة والكسرة والضمة والسكون والتنوين: كل حركة تُتتبّع على حروف حقيقية، مع كلمة مثال وكيف تغيّر الحركة الصوت.",
    pages: 5,
    ageEn: "Ages 5–8",
    ageAr: "من ٥ إلى ٨ سنوات",
  },
  {
    id: "arabic-colors",
    emoji: "🎨",
    titleEn: "Arabic Colours & Shapes Worksheets",
    titleAr: "أوراق الألوان والأشكال بالعربية",
    descEn:
      "Six colour words paired with a geometric shape to colour in, plus tracing lines for the Arabic and English name of each colour.",
    descAr:
      "ستّ كلمات لونية مع شكل هندسي للتلوين، وأسطر تتبّع لاسم اللون بالعربية والإنجليزية.",
    pages: 6,
    ageEn: "Ages 3–6",
    ageAr: "من ٣ إلى ٦ سنوات",
  },
  {
    id: "arabic-animals-coloring",
    emoji: "🦁",
    titleEn: "Arabic Animals Colouring & Word Tracing",
    titleAr: "تلوين الحيوانات وتتبّع أسمائها",
    descEn:
      "Eight animals with a large outline to colour and the animal's name to trace in both Arabic and English, with a one-line fact a parent can read aloud.",
    descAr:
      "ثمانية حيوانات برسم كبير للتلوين واسم الحيوان للتتبّع بالعربية والإنجليزية، مع معلومة قصيرة يقرأها الوالد بصوت عالٍ.",
    pages: 8,
    ageEn: "Ages 3–7",
    ageAr: "من ٣ إلى ٧ سنوات",
  },
  {
    id: "arabic-complete-workbook",
    emoji: "📚",
    titleEn: "Complete Arabic Workbook (everything above)",
    titleAr: "الكرّاسة العربية الكاملة (كل ما سبق)",
    descEn:
      "Every pack in this library bound into one file, in teaching order — the alphabet chart first, then letters, harakat, numbers, colours and animals. One download, one print job.",
    descAr:
      "كل المجموعات في ملف واحد مرتّبة تعليمياً — اللوحة أولاً ثم الحروف فالحركات فالأرقام فالألوان فالحيوانات. تنزيل واحد وطباعة واحدة.",
    pages: 68,
    ageEn: "Ages 3–7",
    ageAr: "من ٣ إلى ٧ سنوات",
    bundle: true,
  },
];

export type NumberItem = {
  /** Eastern Arabic numeral, e.g. "٣". */
  ar: string;
  /** Western digit, e.g. "3". */
  en: string;
  arName: string;
  enName: string;
  translit: string;
};

export const numbersData: NumberItem[] = [
  { ar: "١", en: "1", arName: "واحد", enName: "One", translit: "waahid" },
  { ar: "٢", en: "2", arName: "اثنان", enName: "Two", translit: "ithnaan" },
  { ar: "٣", en: "3", arName: "ثلاثة", enName: "Three", translit: "thalaatha" },
  { ar: "٤", en: "4", arName: "أربعة", enName: "Four", translit: "arbaʿa" },
  { ar: "٥", en: "5", arName: "خمسة", enName: "Five", translit: "khamsa" },
  { ar: "٦", en: "6", arName: "ستة", enName: "Six", translit: "sitta" },
  { ar: "٧", en: "7", arName: "سبعة", enName: "Seven", translit: "sabʿa" },
  { ar: "٨", en: "8", arName: "ثمانية", enName: "Eight", translit: "thamaaniya" },
  { ar: "٩", en: "9", arName: "تسعة", enName: "Nine", translit: "tisʿa" },
  { ar: "١٠", en: "10", arName: "عشرة", enName: "Ten", translit: "ʿashara" },
];

/** The 11–20 companion pack: same sheet format, the next decade. */
export const numbers11to20Data: NumberItem[] = [
  { ar: "١١", en: "11", arName: "أحد عشر", enName: "Eleven", translit: "aḥada ʿashar" },
  { ar: "١٢", en: "12", arName: "اثنا عشر", enName: "Twelve", translit: "ithnaa ʿashar" },
  { ar: "١٣", en: "13", arName: "ثلاثة عشر", enName: "Thirteen", translit: "thalaathata ʿashar" },
  { ar: "١٤", en: "14", arName: "أربعة عشر", enName: "Fourteen", translit: "arbaʿata ʿashar" },
  { ar: "١٥", en: "15", arName: "خمسة عشر", enName: "Fifteen", translit: "khamsata ʿashar" },
  { ar: "١٦", en: "16", arName: "ستة عشر", enName: "Sixteen", translit: "sittata ʿashar" },
  { ar: "١٧", en: "17", arName: "سبعة عشر", enName: "Seventeen", translit: "sabʿata ʿashar" },
  { ar: "١٨", en: "18", arName: "ثمانية عشر", enName: "Eighteen", translit: "thamaaniyata ʿashar" },
  { ar: "١٩", en: "19", arName: "تسعة عشر", enName: "Nineteen", translit: "tisʿata ʿashar" },
  { ar: "٢٠", en: "20", arName: "عشرون", enName: "Twenty", translit: "ʿishruun" },
];

export type HarakahItem = {
  id: string;
  /** The combining mark alone (rendered on a dotted circle placeholder in copy). */
  mark: string;
  nameEn: string;
  nameAr: string;
  translit: string;
  soundEn: string;
  soundAr: string;
  /** Example word that uses the mark, shown + traced on the sheet. */
  word: string;
  wordTranslit: string;
  wordMeaningEn: string;
  wordMeaningAr: string;
};

/** The short vowels (harakat) — the SERP for practice sheets here is weak
    (Weebly pages, Scribd), and no free bilingual page pairs the marks with
    a guide. Data only; the sheet layout lives in the generator. */
export const harakatData: HarakahItem[] = [
  {
    id: "fatha", mark: "\u064E", nameEn: "Fatha", nameAr: "فتحة", translit: "a",
    soundEn: "a short 'a' — like the a in 'amber', never the long 'a' of 'father' (that is the letter alef).",
    soundAr: "فتحة قصيرة تُنطق كما في «أَرنب» — أقصر من ألف المدّ.",
    word: "بَطَة", wordTranslit: "baTTa", wordMeaningEn: "duck", wordMeaningAr: "طائر يسبح في الماء",
  },
  {
    id: "kasra", mark: "\u0650", nameEn: "Kasra", nameAr: "كسرة", translit: "i",
    soundEn: "a short 'i' — like the i in 'in', never the long 'ee' of 'see' (that is the letter ya).",
    soundAr: "كسرة قصيرة تُنطق كما في «بِنْت» — أقصر من ياء المدّ.",
    word: "بِنْت", wordTranslit: "bint", wordMeaningEn: "girl", wordMeaningAr: "أنثى صغيرة",
  },
  {
    id: "damma", mark: "\u064F", nameEn: "Damma", nameAr: "ضمة", translit: "u",
    soundEn: "a short 'u' — like the u in 'put', never the long 'oo' of 'moon' (that is the letter waw).",
    soundAr: "ضمة قصيرة تُنطق كما في «بُرْج» — أقصر من واو المدّ.",
    word: "بُرْج", wordTranslit: "burj", wordMeaningEn: "tower", wordMeaningAr: "بناء عالٍ",
  },
  {
    id: "sukoon", mark: "\u0652", nameEn: "Sukoon", nameAr: "سكون", translit: "—",
    soundEn: "no vowel at all — the letter closes the syllable with a firm stop, like the 'b' at the end of 'cub'.",
    soundAr: "لا حركة بعده — يقطع الصوت كما في آخر «قَلْب».",
    word: "قَلْب", wordTranslit: "qalb", wordMeaningEn: "heart", wordMeaningAr: "عضو ينبض في الصدر",
  },
  {
    id: "tanween", mark: "\u064C", nameEn: "Tanween", nameAr: "تنوين", translit: "an / in / un",
    soundEn: "a fatha, kasra or damma doubled — the sound ends with a light 'n'. It is the sound at the end of 'shukran' (شكراً).",
    soundAr: "حركة مضعّفة يتبعها صوت النون خفيفاً، كما في آخر «شُكْراً».",
    word: "شُكْراً", wordTranslit: "shukran", wordMeaningEn: "thank you", wordMeaningAr: "كلمة شكر",
  },
];

export type ColorItem = {
  ar: string;
  en: string;
  translit: string;
  shapeEn: string;
  shapeAr: string;
  /** Which shape the PDF draws as an outline to colour in. */
  shape: "heart" | "droplet" | "leaf" | "star" | "circle" | "diamond";
  /** Screen-only swatch; the PDF stays black-and-white to save ink. */
  hex: string;
};

export const colorsData: ColorItem[] = [
  { ar: "أحمر", en: "Red", translit: "ahmar", shapeEn: "Heart", shapeAr: "قلب", shape: "heart", hex: "#e23b3b" },
  { ar: "أزرق", en: "Blue", translit: "azraq", shapeEn: "Droplet", shapeAr: "قطرة", shape: "droplet", hex: "#2f6fd0" },
  { ar: "أخضر", en: "Green", translit: "akhdar", shapeEn: "Leaf", shapeAr: "ورقة", shape: "leaf", hex: "#3a9a54" },
  { ar: "أصفر", en: "Yellow", translit: "asfar", shapeEn: "Star", shapeAr: "نجمة", shape: "star", hex: "#e8b400" },
  { ar: "برتقالي", en: "Orange", translit: "burtuqaali", shapeEn: "Circle", shapeAr: "دائرة", shape: "circle", hex: "#e07b26" },
  { ar: "بنفسجي", en: "Purple", translit: "banafsaji", shapeEn: "Diamond", shapeAr: "معيّن", shape: "diamond", hex: "#7d4bb5" },
];

export type AnimalItem = {
  ar: string;
  en: string;
  translit: string;
  /** Which outline drawing the PDF renders for colouring. */
  shape: "lion" | "rabbit" | "elephant" | "monkey" | "cat" | "dog" | "bird" | "fish";
  factEn: string;
  factAr: string;
};

export const animalsData: AnimalItem[] = [
  { ar: "أسد", en: "Lion", translit: "asad", shape: "lion", factEn: "A lion's roar can be heard five kilometres away.", factAr: "زئير الأسد يُسمع من مسافة خمسة كيلومترات." },
  { ar: "أرنب", en: "Rabbit", translit: "arnab", shape: "rabbit", factEn: "A rabbit's ears turn to catch sound from any direction.", factAr: "أذنا الأرنب تدوران لتلتقطا الصوت من كل اتجاه." },
  { ar: "فيل", en: "Elephant", translit: "fiil", shape: "elephant", factEn: "An elephant drinks with its trunk, then pours the water into its mouth.", factAr: "يشرب الفيل بخرطومه ثم يصبّ الماء في فمه." },
  { ar: "قرد", en: "Monkey", translit: "qird", shape: "monkey", factEn: "Monkeys use their tails like an extra hand when climbing.", factAr: "يستعمل القرد ذيله كأنه يد إضافية أثناء التسلّق." },
  { ar: "قطة", en: "Cat", translit: "qitta", shape: "cat", factEn: "A cat's whiskers measure whether a gap is wide enough to squeeze through.", factAr: "شوارب القطة تقيس إن كانت الفتحة تكفي لمرورها." },
  { ar: "كلب", en: "Dog", translit: "kalb", shape: "dog", factEn: "A dog smells about ten thousand times better than a person.", factAr: "حاسة الشمّ عند الكلب أقوى من الإنسان بعشرة آلاف مرة." },
  { ar: "عصفور", en: "Bird", translit: "ʿusfuur", shape: "bird", factEn: "Birds have hollow bones, which is part of how they stay light enough to fly.", factAr: "عظام الطيور مجوّفة، ولهذا تبقى خفيفة بما يكفي للطيران." },
  { ar: "سمكة", en: "Fish", translit: "samaka", shape: "fish", factEn: "Fish breathe by pulling oxygen out of the water through their gills.", factAr: "تتنفّس السمكة بسحب الأكسجين من الماء عبر خياشيمها." },
];
