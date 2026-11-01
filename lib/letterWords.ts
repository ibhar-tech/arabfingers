import type { LetterGuideEntry } from "./letterGuide";

/* Picture words for each letter, grouped by where the letter sits in the word.
   Arabic parents search exactly this way ("كلمات تبدأ بحرف الثاء", "صور بحرف
   الجيم", "أشكال حرف الجيم"), and teachers drill the three positions because
   the letter changes shape in each. The "start" words are the worksheet's own
   examples, topped up where a letter has fewer than three that start with it.
   tests/letterWords.test.ts checks every word really has its letter in the
   claimed position. */

export type PositionWord = { word: string; en: string; emoji: string };
export type LetterPositions = { start: PositionWord[]; middle: PositionWord[]; end: PositionWord[] };

const w = (word: string, en: string, emoji: string): PositionWord => ({ word, en, emoji });

const extraStart: Record<string, PositionWord[]> = {
  ا: [w("إبريق", "teapot", "🫖"), w("أناناس", "pineapple", "🍍")],
  ر: [w("رجل", "man", "👨")],
  و: [w("وجه", "face", "🙂")],
};

const POSITIONS: Record<string, Pick<LetterPositions, "middle" | "end">> = {
  ا: { middle: [w("باب", "door", "🚪"), w("نار", "fire", "🔥"), w("تاج", "crown", "👑")], end: [w("ماما", "mum", "👩"), w("بابا", "dad", "👨"), w("عصا", "stick", "🪵")] },
  ب: { middle: [w("زبدة", "butter", "🧈"), w("دبوس", "pin", "📌"), w("قبعة", "hat", "👒")], end: [w("كتاب", "book", "📖"), w("عنب", "grapes", "🍇"), w("كلب", "dog", "🐕")] },
  ت: { middle: [w("كتاب", "book", "📖"), w("فستان", "dress", "👗"), w("مفتاح", "key", "🔑")], end: [w("بيت", "house", "🏠"), w("حوت", "whale", "🐳"), w("كتكوت", "chick", "🐥")] },
  ث: { middle: [w("كمثرى", "pear", "🍐"), w("مثلجات", "ice cream", "🍦"), w("اثنان", "two", "2️⃣")], end: [w("مثلث", "triangle", "🔺"), w("أثاث", "furniture", "🛋️"), w("ليث", "lion", "🦁")] },
  ج: { middle: [w("دجاجة", "hen", "🐔"), w("نجمة", "star", "⭐"), w("شجرة", "tree", "🌳")], end: [w("ثلج", "snow", "❄️"), w("تاج", "crown", "👑"), w("برج", "tower", "🗼")] },
  ح: { middle: [w("بحر", "sea", "🌊"), w("نحلة", "bee", "🐝"), w("لحم", "meat", "🥩")], end: [w("مفتاح", "key", "🔑"), w("تفاح", "apples", "🍎"), w("ملح", "salt", "🧂")] },
  خ: { middle: [w("نخلة", "palm tree", "🌴"), w("صخرة", "rock", "🪨"), w("دخان", "smoke", "💨")], end: [w("بطيخ", "watermelon", "🍉"), w("مطبخ", "kitchen", "🍳"), w("خوخ", "peaches", "🍑")] },
  د: { middle: [w("هدية", "gift", "🎁"), w("مدرسة", "school", "🏫"), w("ضفدع", "frog", "🐸")], end: [w("قرد", "monkey", "🐒"), w("أسد", "lion", "🦁"), w("يد", "hand", "✋")] },
  ذ: { middle: [w("أذن", "ear", "👂"), w("حذاء", "shoe", "👞"), w("نافذة", "window", "🪟")], end: [w("قنفذ", "hedgehog", "🦔"), w("تلميذ", "pupil", "🧑‍🎓"), w("لذيذ", "tasty", "😋")] },
  ر: { middle: [w("قرد", "monkey", "🐒"), w("برتقال", "orange", "🍊"), w("شجرة", "tree", "🌳")], end: [w("قمر", "moon", "🌙"), w("نمر", "tiger", "🐯"), w("بحر", "sea", "🌊")] },
  ز: { middle: [w("جزر", "carrots", "🥕"), w("غزال", "gazelle", "🦌"), w("مزرعة", "farm", "🚜")], end: [w("موز", "bananas", "🍌"), w("خبز", "bread", "🍞"), w("أرز", "rice", "🍚")] },
  س: { middle: [w("مسجد", "mosque", "🕌"), w("بسكويت", "biscuit", "🍪"), w("كرسي", "chair", "🪑")], end: [w("شمس", "sun", "☀️"), w("فرس", "horse", "🐎"), w("جرس", "bell", "🔔")] },
  ش: { middle: [w("فراشة", "butterfly", "🦋"), w("عشب", "grass", "🌿"), w("ريشة", "feather", "🪶")], end: [w("كبش", "ram", "🐏"), w("قرش", "shark", "🦈"), w("خفاش", "bat", "🦇")] },
  ص: { middle: [w("عصفور", "sparrow", "🐦"), w("قصر", "palace", "🏰"), w("مصباح", "lamp", "💡")], end: [w("مقص", "scissors", "✂️"), w("قميص", "shirt", "👕"), w("رقص", "dancing", "💃")] },
  ض: { middle: [w("خضار", "vegetables", "🥦"), w("بيضة", "egg", "🥚"), w("مضرب", "racket", "🏸")], end: [w("أرض", "earth", "🌍"), w("مريض", "ill", "🤒"), w("حوض", "basin", "🛁")] },
  ط: { middle: [w("بطة", "duck", "🦆"), w("قطة", "cat", "🐱"), w("مطر", "rain", "🌧️")], end: [w("قط", "cat", "🐈"), w("خيط", "thread", "🧵"), w("بلوط", "acorns", "🌰")] },
  ظ: { middle: [w("نظارة", "glasses", "👓"), w("مظلة", "umbrella", "☂️"), w("عظم", "bone", "🦴")], end: [w("حظ", "luck", "🍀"), w("استيقظ", "woke up", "⏰"), w("لفظ", "pronunciation", "🗣️")] },
  ع: { middle: [w("شمعة", "candle", "🕯️"), w("ملعقة", "spoon", "🥄"), w("بعوضة", "mosquito", "🦟")], end: [w("ضفدع", "frog", "🐸"), w("إصبع", "finger", "☝️"), w("شارع", "street", "🛣️")] },
  غ: { middle: [w("ببغاء", "parrot", "🦜"), w("مغناطيس", "magnet", "🧲"), w("صغير", "small", "👶")], end: [w("دماغ", "brain", "🧠"), w("صمغ", "glue", "🧴"), w("مبلغ", "sum of money", "💰")] },
  ف: { middle: [w("سفينة", "ship", "🚢"), w("تفاحة", "apple", "🍎"), w("قفاز", "glove", "🧤")], end: [w("خروف", "sheep", "🐑"), w("سيف", "sword", "🗡️"), w("أنف", "nose", "👃")] },
  ق: { middle: [w("بقرة", "cow", "🐄"), w("برتقال", "orange", "🍊"), w("عقرب", "scorpion", "🦂")], end: [w("صندوق", "box", "📦"), w("إبريق", "teapot", "🫖"), w("ورق", "paper", "📄")] },
  ك: { middle: [w("سمكة", "fish", "🐟"), w("سكين", "knife", "🔪"), w("بسكويت", "biscuit", "🍪")], end: [w("ديك", "rooster", "🐓"), w("ملك", "king", "🤴"), w("شباك", "window", "🪟")] },
  ل: { middle: [w("نحلة", "bee", "🐝"), w("علم", "flag", "🚩"), w("ولد", "boy", "👦")], end: [w("فيل", "elephant", "🐘"), w("جمل", "camel", "🐫"), w("برتقال", "orange", "🍊")] },
  م: { middle: [w("سمكة", "fish", "🐟"), w("نملة", "ant", "🐜"), w("شمس", "sun", "☀️")], end: [w("قلم", "pen", "🖊️"), w("لحم", "meat", "🥩"), w("فم", "mouth", "👄")] },
  ن: { middle: [w("أنف", "nose", "👃"), w("عنب", "grapes", "🍇"), w("قنفذ", "hedgehog", "🦔")], end: [w("ليمون", "lemon", "🍋"), w("زيتون", "olives", "🫒"), w("حصان", "horse", "🐴")] },
  ه: { middle: [w("زهرة", "flower", "🌷"), w("نهر", "river", "🏞️"), w("فهد", "cheetah", "🐆")], end: [w("وجه", "face", "🙂"), w("فواكه", "fruit", "🍒"), w("مياه", "water", "💧")] },
  و: { middle: [w("حوت", "whale", "🐳"), w("موز", "bananas", "🍌"), w("نور", "light", "💡")], end: [w("دلو", "bucket", "🪣"), w("جرو", "puppy", "🐶"), w("حلو", "sweet", "🍬")] },
  ي: { middle: [w("بيت", "house", "🏠"), w("فيل", "elephant", "🐘"), w("سيارة", "car", "🚗")], end: [w("كرسي", "chair", "🪑"), w("شاي", "tea", "🍵"), w("ظبي", "gazelle", "🦌")] },
};

const HARAKAT = /[ً-ْٰ]/g;
/** The letter as it is written at the start of a word: alef usually carries a hamza. */
const startForms = (ar: string) => (ar === "ا" ? ["ا", "أ", "إ", "آ"] : [ar]);

export const bare = (word: string) => word.replace(HARAKAT, "");
export const startsWithLetter = (word: string, ar: string) => startForms(ar).includes(bare(word)[0]);

export function letterPositions(entry: LetterGuideEntry): LetterPositions {
  const start = [
    ...entry.examples.filter((ex) => startsWithLetter(ex.word, entry.ar)).map((ex) => w(ex.word, ex.meaningEn, ex.emoji)),
    ...(extraStart[entry.ar] ?? []),
  ];
  return { start, ...POSITIONS[entry.ar] };
}
