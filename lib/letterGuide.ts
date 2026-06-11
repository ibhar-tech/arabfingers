// lib/letterGuide.ts
// Deep teaching content for all 28 Arabic letters, used by
// app/[locale]/learn/arabic-alphabet-guide. English fields teach Arabic
// to English-speaking families; Arabic fields are native pedagogy for
// Arabic-speaking parents (NOT translations of the English).

export type LetterExample = {
  word: string;       // Arabic script, e.g. "باب"
  translit: string;   // simple transliteration, e.g. "baab"
  meaningEn: string;  // e.g. "door"
  meaningAr: string;  // kid-friendly gloss, e.g. "مدخل البيت"
  emoji: string;      // single pictorial emoji for the word, e.g. "🚪"
};

export type LetterGuideEntry = {
  ar: string;           // isolated glyph, e.g. "ب"
  enName: string;       // "Ba"
  arName: string;       // "باء"
  translit: string;     // "bāʾ"
  difficulty: "easy" | "medium" | "hard"; // for English-speaking learners
  soundHowToEn: string; // physical instructions: lips/tongue/throat
  soundHowToAr: string; // مخرج الحرف وكيفية نطقه، موجه للوالدين
  comparisonEn: string; // nearest English sound AND how it differs
  comparisonAr: string; // تمييز الحرف عن الحروف المشابهة له صوتاً أو شكلاً
  examples: LetterExample[]; // exactly 2 or 3 entries
  mistakeEn: string;    // the most common learner mistake + how to fix it
  mistakeAr: string;    // الخطأ الشائع عند الأطفال وكيفية تصحيحه
  parentTipEn: string;  // one concrete activity/tip for parents
  parentTipAr: string;  // نصيحة عملية للوالدين
};

export const letterGuide: LetterGuideEntry[] = [
  {
    ar: "ا", enName: "Alef", arName: "ألف", translit: "alif", difficulty: "easy",
    soundHowToEn:
      "Open your mouth gently and let a long, relaxed 'aaa' flow out — like the doctor asking you to say 'aah'. No tongue movement, no lip rounding: alif is the simplest sound in the alphabet, which is why children always learn it first.",
    soundHowToAr:
      "مخرج الألف من الجوف: يخرج الصوت ممدوداً من وسط الفم دون أي حركة من اللسان أو الشفتين. اطلب من طفلك أن يفتح فمه ويقول «آآآ» كأنه عند الطبيب — هذا هو صوت الألف الممدود.",
    comparisonEn:
      "Like the long 'a' in 'father', never the short 'a' in 'cat'. When alif carries the hamza (أ / إ) it becomes a glottal stop — the tiny catch in the middle of 'uh-oh'. English has this sound; it just never writes it down.",
    comparisonAr:
      "يخلط الصغار بين الألف اللينة (ا) والهمزة (أ). درّب طفلك على الفرق بين «آآآ» الممدودة الهادئة وبين القطع المفاجئ في «أَ» كما في كلمة «أَسَد» — الأولى نَفَس طويل والثانية نقرة قصيرة.",
    examples: [
      { word: "أسد", translit: "asad", meaningEn: "lion", meaningAr: "ملك الغابة", emoji: "🦁" },
      { word: "أرنب", translit: "arnab", meaningEn: "rabbit", meaningAr: "حيوان قافز طويل الأذنين", emoji: "🐰" },
      { word: "باب", translit: "baab", meaningEn: "door (alif in the middle)", meaningAr: "الألف في وسط الكلمة", emoji: "🚪" },
    ],
    mistakeEn:
      "Learners often cut the long alif short, saying 'bab' instead of 'baab'. Arabic vowel length changes meaning, so stretch the sound: count two beats on every alif.",
    mistakeAr:
      "كثير من الأطفال يقصّرون المدّ فيقولون «بَب» بدل «باب». علّم طفلك أن يَعُدّ حركتين بأصابعه كلما رأى ألف المد حتى يعتاد إطالة الصوت.",
    parentTipEn:
      "Play 'stretch the sound': say a word with alif and have your child pull an imaginary piece of elastic while the 'aaa' lasts. Body movement locks in vowel length better than repetition alone.",
    parentTipAr:
      "العبا لعبة «مدّ الصوت»: انطقا كلمة فيها ألف واطلب من طفلك أن يشدّ خيطاً خيالياً بيديه طوال مدة الصوت. ربط الحركة بالصوت يثبّت المدّ أسرع من التكرار وحده.",
  },
  {
    ar: "ب", enName: "Ba", arName: "باء", translit: "bāʾ", difficulty: "easy",
    soundHowToEn:
      "Press your lips together, then pop them open with your voice on — exactly like the English 'b' in 'ball'. It is one of the first sounds babies babble, so it makes a perfect early win for young learners.",
    soundHowToAr:
      "مخرج الباء من الشفتين: تنطبق الشفتان ثم تنفتحان مع خروج الصوت، كما في «بابا». وهو من أوائل الأصوات التي ينطقها الرضّع، لذلك يكتسبه الطفل بسرعة وثقة.",
    comparisonEn:
      "Identical to English 'b'. The trap is the other direction: Arabic has no 'p' sound at all, so don't let a final ba fade into a whispered 'p' — keep your voice humming right to the end of words like 'baab'.",
    comparisonAr:
      "شكل الباء بنقطة واحدة تحتها هو ما يميزها عن أختيها التاء (نقطتان فوق) والثاء (ثلاث نقاط فوق). درّب طفلك على قاعدة بسيطة: «النقطة تحت السطر = باء».",
    examples: [
      { word: "باب", translit: "baab", meaningEn: "door", meaningAr: "مدخل البيت", emoji: "🚪" },
      { word: "بطة", translit: "baTTa", meaningEn: "duck", meaningAr: "طائر يسبح في الماء", emoji: "🦆" },
      { word: "برتقال", translit: "burtuqaal", meaningEn: "orange (fruit)", meaningAr: "فاكهة لذيذة لونها برتقالي", emoji: "🍊" },
    ],
    mistakeEn:
      "Mixing up ب, ت and ث — three identical shapes that differ only by dots. Teach the dots first: one dot BELOW is ba; the sound 'b' lives in the basement.",
    mistakeAr:
      "الخلط بين ب وت وث بسبب تشابه الشكل. اجعل طفلك يرسم الحرف بإصبعه في الهواء وينطق اسمه مع عدّ النقاط بصوت عالٍ: «نقطة واحدة تحت — باء!».",
    parentTipEn:
      "Go on a 'B hunt' around the house: door (baab), and any toy duck (baTTa). Saying the Arabic word while touching the real object builds vocabulary twice as fast as flashcards.",
    parentTipAr:
      "قوما بجولة «صيد الباء» في البيت: الباب، البطانية، البرتقال. لمس الشيء الحقيقي أثناء نطق الكلمة يثبّت المفردات أسرع بكثير من البطاقات.",
  },
  {
    ar: "ت", enName: "Ta", arName: "تاء", translit: "tāʾ", difficulty: "easy",
    soundHowToEn:
      "Touch the tip of your tongue to the ridge just behind your top front teeth, then release it with a soft puff — like the 't' in 'table'. Keep it light and crisp; the voice does not buzz, only the breath escapes.",
    soundHowToAr:
      "مخرج التاء من طرف اللسان مع أصول الثنايا العليا: يلامس طرف اللسان منبت الأسنان الأمامية ثم ينفصل بنفَس خفيف. وهو حرف مهموس لا اهتزاز فيه، كما في «تفاحة».",
    comparisonEn:
      "Very close to English 't', but softer and more dental — your tongue sits right against the teeth, not further back as in English. Avoid the heavy, breathy American 't'; keep it gentle.",
    comparisonAr:
      "ميّز بين التاء المهموسة الخفيفة والطاء المُفخّمة الثقيلة. قارن «تين» (خفيفة على طرف اللسان) بـ«طين» (مُفخّمة ممتلئة الفم). والشكل: التاء نقطتان فوق، أما الباء فنقطة واحدة تحت.",
    examples: [
      { word: "تفاحة", translit: "tuffaaHa", meaningEn: "apple", meaningAr: "فاكهة حمراء أو خضراء", emoji: "🍎" },
      { word: "تمر", translit: "tamr", meaningEn: "dates", meaningAr: "ثمر النخلة الحلو", emoji: "🌴" },
      { word: "تاج", translit: "taaj", meaningEn: "crown", meaningAr: "يلبسه الملك على رأسه", emoji: "👑" },
    ],
    mistakeEn:
      "Confusing ta with the emphatic ط and making it too heavy. Keep ta light: smile slightly while you say it, which pulls the tongue forward and away from the deep emphatic sound.",
    mistakeAr:
      "ينطق بعض الأطفال التاء ثقيلة كالطاء. علّم طفلك أن يبتسم قليلاً أثناء نطقها ليبقى اللسان أماماً، فتخرج التاء خفيفة رقيقة كما ينبغي.",
    parentTipEn:
      "Make a 'crown' (taaj) from paper and crown your child while you both repeat 'ta-ta-taaj'. Linking the letter to a fun prop they wear cements the sound and the word together.",
    parentTipAr:
      "اصنعا «تاجاً» من الورق وضعاه على رأس طفلك وأنتما تردّدان «تـ تـ تاج». ربط الحرف بشيء ممتع يرتديه يثبّت الصوت والكلمة معاً في ذاكرته.",
  },
  {
    ar: "ث", enName: "Tha", arName: "ثاء", translit: "thāʾ", difficulty: "medium",
    soundHowToEn:
      "Place the tip of your tongue lightly between your top and bottom front teeth and blow air through the gap — exactly the 'th' in 'think' or 'three'. No voice buzz, just a soft hiss of breath over the tongue tip.",
    soundHowToAr:
      "مخرج الثاء من طرف اللسان مع أطراف الثنايا العليا: يخرج طرف اللسان قليلاً بين الأسنان الأمامية ويمرّ الهواء فوقه بنفَس خفيف. وهو حرف مهموس، كما في «ثعلب».",
    comparisonEn:
      "Identical to the voiceless 'th' in 'thumb'. Many non-Arabic accents replace it with 's' or 't' — resist that; the tongue must peek out between the teeth, not hide behind them.",
    comparisonAr:
      "يخلط الأطفال بين الثاء والسين فيقولون «سعلب» بدل «ثعلب»؛ الفرق أن طرف اللسان يخرج بين الأسنان في الثاء ويبقى داخل الفم في السين. والشكل: ثلاث نقاط فوق الثاء تميّزها عن التاء (نقطتان).",
    examples: [
      { word: "ثعلب", translit: "thaʿlab", meaningEn: "fox", meaningAr: "حيوان ماكر ذكي", emoji: "🦊" },
      { word: "ثلج", translit: "thalj", meaningEn: "snow", meaningAr: "ماء متجمّد أبيض بارد", emoji: "❄️" },
      { word: "ثوب", translit: "thawb", meaningEn: "robe / dress", meaningAr: "لباس يُرتدى", emoji: "👗" },
    ],
    mistakeEn:
      "Swapping th for 's' or 't' (saying 'salj' instead of 'thalj'). Have your child stick the tongue tip slightly out and feel the cold air on it — that physical cue prevents the substitution.",
    mistakeAr:
      "أشهر خطأ هو نطق الثاء سيناً أو تاءً. اطلب من طفلك أن يُخرج طرف لسانه قليلاً بين أسنانه ويشعر بالهواء البارد عليه — هذا الإحساس يمنع الخلط.",
    parentTipEn:
      "Stand in front of a mirror and check whether the tongue tip shows between the teeth on every 'th'. Children love watching their own mouth, and the mirror gives instant feedback.",
    parentTipAr:
      "قفا أمام المرآة وتأكّدا أنّ طرف اللسان يظهر بين الأسنان عند كل «ثـ». الأطفال يحبّون مراقبة أفواههم، والمرآة تعطي تصحيحاً فورياً.",
  },
  {
    ar: "ج", enName: "Jeem", arName: "جيم", translit: "jīm", difficulty: "medium",
    soundHowToEn:
      "Raise the middle of your tongue to the roof of your mouth and release with your voice on — like the 'j' in 'jam' or 'g' in 'giraffe'. It is a soft, buzzing sound made with the body of the tongue, not the tip.",
    soundHowToAr:
      "مخرج الجيم من وسط اللسان مع وسط الحنك الأعلى: يرتفع وسط اللسان إلى سقف الفم ثم ينفصل مع جريان الصوت. وهو حرف مجهور، كما في «جمل».",
    comparisonEn:
      "Closest to the 'j' in 'jump'. Note that in Egyptian Arabic it can sound like a hard 'g' in 'go', but the classical and most widely taught sound is the soft 'j'. Keep your voice buzzing throughout.",
    comparisonAr:
      "ميّز الجيم عن أختيها في الشكل: الجيم نقطة واحدة تحتها، والحاء بلا نقطة، والخاء نقطة فوقها. كرّرا «جـ حـ خـ» مع الإشارة إلى موضع النقطة في كل مرة.",
    examples: [
      { word: "جمل", translit: "jamal", meaningEn: "camel", meaningAr: "سفينة الصحراء", emoji: "🐫" },
      { word: "جبل", translit: "jabal", meaningEn: "mountain", meaningAr: "أرض مرتفعة عالية", emoji: "⛰️" },
      { word: "جزر", translit: "jazar", meaningEn: "carrots", meaningAr: "خضار برتقالي يحبه الأرنب", emoji: "🥕" },
    ],
    mistakeEn:
      "Confusing the shape of ج, ح and خ since they share the same body. Anchor each by its dot: ج has a dot underneath — picture it hanging below the curve like a hammock.",
    mistakeAr:
      "الخلط بين ج وح وخ في الشكل. ثبّت كل حرف بنقطته: «الجيم نقطتها تحت تنام في الأسفل». اجعل طفلك يرسمها ويضع النقطة في مكانها وهو ينطق الاسم.",
    parentTipEn:
      "Read a picture book about a camel (jamal) and have your child roar 'jjj' like an engine each time the camel appears. Tying the sound to a story character makes it memorable.",
    parentTipAr:
      "اقرآ قصة مصوّرة عن الجمل، واطلبا من الطفل أن يردّد «جـ جـ جمل» كلما ظهر في الصفحة. ربط الصوت بشخصية القصة يجعله أسهل للحفظ.",
  },
  {
    ar: "ح", enName: "Hha", arName: "حاء", translit: "ḥāʾ", difficulty: "hard",
    soundHowToEn:
      "Push a strong, warm breath out from deep in your throat — like fogging up a cold window or a mirror, but stronger and more constricted. Tighten the middle of the throat so the air rasps as it passes. No voice buzz; it is pure controlled breath.",
    soundHowToAr:
      "مخرج الحاء من وسط الحلق: ينقبض الحلق ويخرج نفَس قويّ حارّ مهموس دون اهتزاز الصوت. اطلب من طفلك أن يتخيّل أنه يُدفئ يديه بنفَسه في يوم بارد، مع شدّ الحلق قليلاً.",
    comparisonEn:
      "There is no English equivalent — it is far stronger than the soft English 'h' in 'hello'. The key difference: English 'h' is breath from the mouth, while ح is a tight rasp from the throat. Don't soften it into a plain 'h'.",
    comparisonAr:
      "يخلط الأطفال بين الحاء (من وسط الحلق، نفَس قويّ) والهاء (من أقصى الحلق، نفَس خفيف). قارنا «حوت» بـ«هدهد»: الأولى مشدودة من الحلق والثانية رقيقة. وفي الشكل تشبه الجيم لكن بلا نقطة.",
    examples: [
      { word: "حوت", translit: "Huut", meaningEn: "whale", meaningAr: "أكبر حيوان في البحر", emoji: "🐳" },
      { word: "حصان", translit: "HiSaan", meaningEn: "horse", meaningAr: "حيوان سريع يُركب", emoji: "🐴" },
      { word: "حليب", translit: "Haliib", meaningEn: "milk", meaningAr: "شراب أبيض مفيد للعظام", emoji: "🥛" },
    ],
    mistakeEn:
      "Replacing ح with a soft English 'h' or the harsher خ. Have your child breathe on a cold mirror to make fog; that warm, throat-deep breath is exactly the ح posture without any harshness from the back.",
    mistakeAr:
      "أكثر خطأ هو نطق الحاء هاءً ضعيفة. اطلب من طفلك أن ينفخ على المرآة ليُضبّبها بنفَس حارّ من الحلق — هذا تماماً مخرج الحاء، فيشعر بالفرق عن الهاء الخفيفة.",
    parentTipEn:
      "Play 'fog the glass': both breathe a long warm 'ḥaaa' onto a window and draw a smiley in the mist. The game naturally produces the deep throat breath ح needs, with lots of giggles.",
    parentTipAr:
      "العبا «تضبيب الزجاج»: انفخا معاً «حـاااا» حارّة على النافذة وارسما وجهاً ضاحكاً في البخار. اللعبة تُخرج نفَس الحلق المطلوب للحاء وسط الضحك.",
  },
  {
    ar: "خ", enName: "Kha", arName: "خاء", translit: "khāʾ", difficulty: "hard",
    soundHowToEn:
      "Raise the back of your tongue toward the soft roof at the very back of your mouth — almost touching — and force air through the narrow gap so it scrapes. It is the sound of clearing your throat softly, or the 'ch' in the Scottish 'loch' and German 'Bach'.",
    soundHowToAr:
      "مخرج الخاء من أدنى الحلق ممّا يلي الفم: يرتفع أقصى اللسان نحو أقصى الحنك ويمرّ الهواء خشناً بينهما. اطلب من طفلك أن يتخيّل صوت الغرغرة الخفيفة أو حكّ الحلق برفق، كما في «خروف».",
    comparisonEn:
      "No English equivalent, but the Scottish 'loch' or German 'Bach' has it exactly. Learners often substitute a plain 'k' — but 'k' fully blocks the air while خ lets it scrape continuously. Keep the air flowing, don't stop it.",
    comparisonAr:
      "ميّز الخاء (نقطة فوق) عن الحاء (بلا نقطة) شكلاً، وعن الغين (نقطة فوق أيضاً لكن مجهورة) صوتاً. الخاء مهموسة خشنة والغين مجهورة كصوت الغرغرة. كرّرا «خـ غـ» لسماع الفرق.",
    examples: [
      { word: "خروف", translit: "kharuuf", meaningEn: "sheep", meaningAr: "حيوان صوفه دافئ", emoji: "🐑" },
      { word: "خبز", translit: "khubz", meaningEn: "bread", meaningAr: "نأكله كل يوم", emoji: "🍞" },
      { word: "خيمة", translit: "khayma", meaningEn: "tent", meaningAr: "بيت من قماش في الصحراء", emoji: "⛺" },
    ],
    mistakeEn:
      "Turning خ into a hard 'k' (saying 'karuuf' instead of 'kharuuf'). Show that 'k' is a stop and خ is a scrape: have your child make a continuous gargle-like 'khhh', then add the word.",
    mistakeAr:
      "أشهر خطأ نطق الخاء كافاً. أسمِع طفلك صوت الغرغرة المستمر «خّخّخ» ثم صِلْه بالكلمة، ليفهم أن الخاء صوت متّصل يجري لا قطع مثل الكاف.",
    parentTipEn:
      "Pretend to be a sleepy dragon clearing its throat before a tiny 'kh' of smoke comes out. Make it silly — the playful gargle is precisely the airflow خ requires.",
    parentTipAr:
      "تظاهرا بأنكما تنّينان نعسانان يُحدثان صوت «خّ» قبل أن يخرج الدخان. اللعب يجعل صوت الغرغرة الخشن سهلاً، وهو نفسه مخرج الخاء.",
  },
  {
    ar: "د", enName: "Dal", arName: "دال", translit: "dāl", difficulty: "easy",
    soundHowToEn:
      "Touch the tip of your tongue to the ridge behind your top front teeth, then release it with your voice buzzing — like the 'd' in 'dog'. It is the voiced partner of 'ta': same tongue position, but the voice is switched on.",
    soundHowToAr:
      "مخرج الدال من طرف اللسان مع أصول الثنايا العليا: يلامس طرف اللسان منبت الأسنان الأمامية ثم ينفصل مع جريان الصوت. وهو حرف مجهور، كما في «دب».",
    comparisonEn:
      "Like English 'd' but more dental — the tongue rests right against the teeth, not pulled back. Don't confuse it with the heavy emphatic ض; د is light and forward, ض fills the whole mouth.",
    comparisonAr:
      "ميّز الدال (نقطة لا تحملها، حرف خفيف) عن الذال (نقطة فوقها). والصوت: الدال خفيفة، أما الضاد فمُفخّمة ثقيلة. قارنا «دار» بـ«ضار» ليسمع الطفل الفرق بين الخفيف والمُفخّم.",
    examples: [
      { word: "دب", translit: "dubb", meaningEn: "bear", meaningAr: "حيوان كبير يحب العسل", emoji: "🐻" },
      { word: "ديك", translit: "diik", meaningEn: "rooster", meaningAr: "يصيح في الصباح الباكر", emoji: "🐓" },
      { word: "دجاجة", translit: "dajaaja", meaningEn: "hen", meaningAr: "طائر يبيض في المزرعة", emoji: "🐔" },
    ],
    mistakeEn:
      "Forgetting to voice it, so 'dubb' slips toward 'tubb'. Have your child place a hand on the throat and feel the buzz on 'd' that disappears on 't' — voicing is the whole difference.",
    mistakeAr:
      "ينسى بعض الأطفال جهر الدال فتقترب من التاء. اطلب من طفلك أن يضع يده على حلقه ليشعر بالاهتزاز عند «د» وغيابه عند «ت»، فالجهر هو الفارق.",
    parentTipEn:
      "Act out a bear (dubb) waking from hibernation while saying 'd-d-dubb' with a deep voice. The deep growl naturally engages the voicing that distinguishes د from ت.",
    parentTipAr:
      "مثّلا دباً (دب) يستيقظ من نومه وأنتما تردّدان «د د دب» بصوت عميق. الصوت العميق يُفعّل الجهر الذي يميّز الدال عن التاء.",
  },
  {
    ar: "ذ", enName: "Thal", arName: "ذال", translit: "dhāl", difficulty: "medium",
    soundHowToEn:
      "Place the tongue tip lightly between your front teeth and buzz with your voice on — the 'th' in 'this', 'that', and 'mother'. It is the voiced partner of ث: same tongue-between-teeth posture, but now the voice hums.",
    soundHowToAr:
      "مخرج الذال من طرف اللسان مع أطراف الثنايا العليا: يخرج طرف اللسان بين الأسنان ويجري الصوت معه مجهوراً. وهو نظير الثاء لكنه مجهور، كما في «ذئب».",
    comparisonEn:
      "Identical to the voiced 'th' in 'they'. Don't mix it with the voiceless ث ('thin'): feel the throat — ذ buzzes, ث only hisses. Avoid replacing it with a plain 'z'.",
    comparisonAr:
      "يخلط الأطفال بين الذال والزاي فيقولون «زئب» بدل «ذئب»؛ في الذال يخرج اللسان بين الأسنان، وفي الزاي يبقى داخل الفم. ويُميَّز الذال (نقطة فوق) عن الدال (بلا نقطة) شكلاً.",
    examples: [
      { word: "ذئب", translit: "dhiʾb", meaningEn: "wolf", meaningAr: "حيوان بري يشبه الكلب", emoji: "🐺" },
      { word: "ذرة", translit: "dhura", meaningEn: "corn", meaningAr: "حبوب صفراء لذيذة", emoji: "🌽" },
      { word: "ذهب", translit: "dhahab", meaningEn: "gold", meaningAr: "معدن لامع ثمين", emoji: "🥇" },
    ],
    mistakeEn:
      "Saying it as 'z' or as the voiceless ث. Cue the tongue out between the teeth and a hand on the throat to feel the buzz — both checks must pass for a correct ذ.",
    mistakeAr:
      "أشهر خطأ نطق الذال زاياً أو ثاءً. اجمعا بين علامتين: خروج طرف اللسان بين الأسنان، واهتزاز الحلق تحت اليد — إن تحققتا فالنطق صحيح.",
    parentTipEn:
      "Play 'wolf and corn': hold up a toy wolf (dhiʾb) and a corn cob (dhura) and have your child name each with the tongue poking out. Pairing two ذ words back to back reinforces the posture.",
    parentTipAr:
      "العبا «الذئب والذرة»: ارفعا صورة ذئب وأخرى لذرة واطلبا من الطفل تسميتهما وطرف لسانه بين أسنانه. تتابع كلمتين بالذال يثبّت المخرج.",
  },
  {
    ar: "ر", enName: "Ra", arName: "راء", translit: "rāʾ", difficulty: "hard",
    soundHowToEn:
      "Tap or trill the tip of your tongue against the ridge behind your top teeth — a quick flick, like the rolled 'r' in Spanish 'perro' or the tapped 'r' in 'butter' said quickly. Let the tongue tip bounce; it never glides like the English 'r'.",
    soundHowToAr:
      "مخرج الراء من طرف اللسان قريباً من ظهره: يرتفع طرف اللسان إلى ما خلف الثنايا العليا ويرتجف ارتجافة خفيفة (تكرار). وهو حرف مجهور مكرّر، كما في «رمان».",
    comparisonEn:
      "Not the English 'r' in 'red' — that one glides with the tongue pulled back. Arabic ر is a tapped/rolled 'r' where the tongue tip vibrates against the ridge. Think of a purring cat or a small motor.",
    comparisonAr:
      "ميّز الراء (نقطة لا تحملها) عن الزاي (نقطة فوقها) شكلاً. والصوت: الراء مكرّرة يرتجف فيها اللسان، أما الزاي فصفير ثابت. كرّرا «ر ر ر» مثل صوت محرّك صغير ليتقن الطفل التكرار.",
    examples: [
      { word: "رمان", translit: "rummaan", meaningEn: "pomegranate", meaningAr: "فاكهة حمراء بحبّات كثيرة", emoji: "🍎" },
      { word: "رأس", translit: "raʾs", meaningEn: "head", meaningAr: "أعلى الجسم وفيه الوجه", emoji: "🧠" },
      { word: "ربيع", translit: "rabiiʿ", meaningEn: "spring (season)", meaningAr: "فصل الأزهار والدفء", emoji: "🌸" },
    ],
    mistakeEn:
      "Using the soft English 'r' that glides instead of taps. Have your child say a fast 'tdtdtd' against the ridge first, then turn on the voice — the tapping muscle memory becomes the rolled ر.",
    mistakeAr:
      "ينطق بعض الأطفال الراء كالراء الإنجليزية المنزلقة. درّب طفلك أولاً على طرقات سريعة بطرف اللسان «دددد» خلف الأسنان، ثم أَضِف الصوت لتصير راءً مكرّرة.",
    parentTipEn:
      "Pretend to be a purring cat or a revving motorbike: 'rrrr-rummaan!'. The playful trill builds the tongue vibration far more easily than asking a child to 'roll the r'.",
    parentTipAr:
      "تظاهرا بأنكما قطة تخرخر أو دراجة نارية: «ررر — رمان!». الخرخرة المرحة تبني ارتجاف اللسان أسهل بكثير من مجرد طلب «كرّر الراء».",
  },
  {
    ar: "ز", enName: "Zay", arName: "زاي", translit: "zāy", difficulty: "easy",
    soundHowToEn:
      "Bring the tip of your tongue close to the ridge behind your lower front teeth and push a buzzing stream of air through — like the 'z' in 'zebra' or 'zoo'. The voice is on and the air hisses with a buzz.",
    soundHowToAr:
      "مخرج الزاي من طرف اللسان قريباً من الثنايا السفلى: يقترب طرف اللسان منها ويمرّ الهواء بصفير مجهور. وهو من حروف الصفير، كما في «زرافة».",
    comparisonEn:
      "Same as English 'z'. It is the voiced partner of 's': identical tongue position, but the voice buzzes for z and stays off for s. Don't let it harden into 's' at the ends of words.",
    comparisonAr:
      "ميّز الزاي (نقطة فوقها) عن الراء (بلا نقطة) شكلاً، وعن السين صوتاً: الزاي مجهورة فيها اهتزاز، والسين مهموسة بلا اهتزاز. قارنا «زين» بـ«سين» ليسمع الطفل الفرق.",
    examples: [
      { word: "زرافة", translit: "zaraafa", meaningEn: "giraffe", meaningAr: "حيوان طويل الرقبة جداً", emoji: "🦒" },
      { word: "زهرة", translit: "zahra", meaningEn: "flower", meaningAr: "نبتة جميلة ملوّنة", emoji: "🌷" },
      { word: "زيتون", translit: "zaytuun", meaningEn: "olives", meaningAr: "ثمر يُعصر منه الزيت", emoji: "🫒" },
    ],
    mistakeEn:
      "Devoicing it into 's'. Place your child's hand on the throat: the buzz must stay on through the whole 'zzz'. Stretching the sound ('zzzebra') makes the voicing obvious.",
    mistakeAr:
      "ينطق بعض الأطفال الزاي سيناً لفقدان الجهر. ضعا يد الطفل على حلقه ليشعر بالاهتزاز طوال «زّز». إطالة الصوت «زّزرافة» تُظهر الجهر بوضوح.",
    parentTipEn:
      "Buzz around the room like a bee or a tiny plane saying 'zzz' until you 'land' on a flower (zahra). The continuous buzz trains the voicing that separates z from s.",
    parentTipAr:
      "طِيرا في الغرفة كالنحلة وأنتما تُصدران «زّز» حتى تحطّا على زهرة. الطنين المستمر يدرّب على الجهر الذي يفصل الزاي عن السين.",
  },
  {
    ar: "س", enName: "Seen", arName: "سين", translit: "sīn", difficulty: "easy",
    soundHowToEn:
      "Bring the tip of your tongue near the ridge behind your lower front teeth and hiss a thin stream of air through the narrow gap — the 's' in 'sun' or 'snake'. The voice stays off; it is a clean, light hiss.",
    soundHowToAr:
      "مخرج السين من طرف اللسان قريباً من الثنايا السفلى: يقترب طرف اللسان منها ويمرّ الهواء بصفير خفيف مهموس. وهو من حروف الصفير، كما في «سمكة».",
    comparisonEn:
      "Identical to English 's'. The key is to keep it light and thin — don't let it turn into the heavy emphatic ص, which fills the mouth and darkens the vowel after it. س stays bright and forward.",
    comparisonAr:
      "ميّز السين (خفيفة رقيقة) عن الصاد (مُفخّمة ممتلئة). قارنا «سيف» بـ«صيف»: الأولى رقيقة والثانية ثقيلة. وفي الشكل: السين ثلاث أسنان بلا نقاط، والشين مثلها مع ثلاث نقاط فوق.",
    examples: [
      { word: "سمكة", translit: "samaka", meaningEn: "fish", meaningAr: "تعيش في الماء وتسبح", emoji: "🐟" },
      { word: "سيارة", translit: "sayyaara", meaningEn: "car", meaningAr: "مركبة تسير على الطريق", emoji: "🚗" },
      { word: "سماء", translit: "samaaʾ", meaningEn: "sky", meaningAr: "ما فوقنا وفيه الشمس والنجوم", emoji: "☁️" },
    ],
    mistakeEn:
      "Letting س drift into the heavy ص. Keep a slight smile and a thin airstream; if the vowel after it sounds dark and round, the child has slipped into the emphatic by mistake.",
    mistakeAr:
      "ينطق بعض الأطفال السين مُفخّمة كالصاد. حافظا على ابتسامة خفيفة وهواء رفيع؛ إذا صار الصوت بعدها مظلماً ثقيلاً فقد انزلق الطفل إلى الصاد.",
    parentTipEn:
      "Be a quiet snake sliding through the grass with a long 'sssss' before naming a fish (samaka). The hiss game keeps the sound thin and light, away from the emphatic.",
    parentTipAr:
      "تظاهرا بأنكما ثعبان هادئ ينزلق بصوت «سّسّس» طويل قبل أن تسمّيا «سمكة». لعبة الصفير تُبقي الصوت رفيعاً خفيفاً بعيداً عن التفخيم.",
  },
  {
    ar: "ش", enName: "Sheen", arName: "شين", translit: "shīn", difficulty: "medium",
    soundHowToEn:
      "Spread the middle of your tongue toward the roof of your mouth and let air spread out in a soft, wide hiss — the 'sh' in 'ship' or 'shoe'. The sound is broad and breathy, with no voice buzzing.",
    soundHowToAr:
      "مخرج الشين من وسط اللسان مع وسط الحنك الأعلى: ينتشر وسط اللسان نحو سقف الفم ويتفشّى الهواء بصوت عريض مهموس. وهي من الحروف المتفشّية، كما في «شمس».",
    comparisonEn:
      "Identical to English 'sh'. The difference from س is the tongue position: س is a thin tip-hiss, while ش spreads wider and softer. Tell children 'sh' is the quiet sound, like asking someone to hush.",
    comparisonAr:
      "ميّز الشين عن السين شكلاً: كلتاهما ثلاث أسنان، لكن الشين تحمل ثلاث نقاط فوقها. وصوتاً: السين صفير رفيع والشين صوت عريض متفشٍّ. كرّرا «سـ شـ» للتمييز.",
    examples: [
      { word: "شمس", translit: "shams", meaningEn: "sun", meaningAr: "تُضيء النهار وتدفّئنا", emoji: "☀️" },
      { word: "شجرة", translit: "shajara", meaningEn: "tree", meaningAr: "نبتة كبيرة لها أغصان وأوراق", emoji: "🌳" },
      { word: "شاي", translit: "shaay", meaningEn: "tea", meaningAr: "شراب دافئ نشربه", emoji: "🍵" },
    ],
    mistakeEn:
      "Flattening ش into س (saying 'sams' for 'shams'). Have your child round the lips slightly and widen the tongue — the 'quiet, hushing' sound — to keep ش distinct from the thin s.",
    mistakeAr:
      "ينطق بعض الأطفال الشين سيناً. اطلب من طفلك أن يدوّر شفتيه قليلاً ويوسّع لسانه ليُصدر صوت «هَسّ» العريض، فيبقى مميّزاً عن السين الرفيعة.",
    parentTipEn:
      "Play 'shhh, the sun is sleeping': whisper 'shhh' with a finger on the lips before shouting 'shams!' when it rises. The hush gesture cements the wide sh sound.",
    parentTipAr:
      "العبا «هسّ، الشمس نائمة»: همسا «شّش» وإصبعكما على الشفتين ثم اهتفا «شمس!» عند شروقها. حركة الهمس تثبّت صوت الشين العريض.",
  },
  {
    ar: "ص", enName: "Sad", arName: "صاد", translit: "ṣād", difficulty: "hard",
    soundHowToEn:
      "Make an 's' sound, but pull the back of your tongue up and back so the whole mouth feels full and the sound turns dark and heavy. This is the emphatic 's' — same tip position as س, but the throat and tongue body raise to deepen it.",
    soundHowToAr:
      "مخرج الصاد من طرف اللسان مع الثنايا السفلى كالسين، لكنها مُطبَقة مُفخّمة: يرتفع أقصى اللسان نحو الحنك فيمتلئ الفم ويثقل الصوت. وهي من حروف الإطباق، كما في «صقر».",
    comparisonEn:
      "No exact English equivalent — start from 's' and make it heavy and hollow. The trap is saying a plain 's' instead; listen to the vowel after it — after ص it sounds deep and round ('SaH'), after س it stays bright.",
    comparisonAr:
      "ميّز الصاد المُفخّمة عن السين المرقّقة. قارنا «صار» بـ«سار»: الصاد ممتلئة الفم والسين رفيعة. علّم طفلك أن يشعر بامتلاء الفم وثِقل الصوت علامةً على الصاد الصحيحة.",
    examples: [
      { word: "صقر", translit: "Saqr", meaningEn: "falcon", meaningAr: "طائر قوي حاد البصر", emoji: "🦅" },
      { word: "صندوق", translit: "Sanduuq", meaningEn: "box", meaningAr: "نضع فيه الأشياء", emoji: "📦" },
      { word: "صابون", translit: "Saabuun", meaningEn: "soap", meaningAr: "ننظّف به أيدينا", emoji: "🧼" },
    ],
    mistakeEn:
      "Saying a plain 's' so 'Saqr' becomes 'saqr'. Have your child puff the cheeks slightly and let the sound 'sit heavy' in the mouth — the fuller posture is what makes ص emphatic.",
    mistakeAr:
      "أشهر خطأ نطق الصاد سيناً خفيفة. اطلب من طفلك أن ينفخ خدّيه قليلاً ويجعل الصوت «ثقيلاً ممتلئاً» في فمه، فالامتلاء هو سرّ التفخيم.",
    parentTipEn:
      "Play 'big falcon, small snake': say 'Saqr' in a big, deep falcon voice and 'samaka' in a thin snake voice. Contrasting heavy and light back to back trains the ص vs س distinction.",
    parentTipAr:
      "العبا «الصقر الكبير والثعبان الصغير»: انطقا «صقر» بصوت كبير عميق و«سمكة» بصوت رفيع. تقابُل الثقيل والخفيف يدرّب التمييز بين الصاد والسين.",
  },
  {
    ar: "ض", enName: "Dad", arName: "ضاد", translit: "ḍād", difficulty: "hard",
    soundHowToEn:
      "Press the side of your tongue firmly against your upper back teeth and release with your voice on, keeping the whole mouth heavy and full. It is the emphatic, dark partner of د — Arabic is even nicknamed 'the language of the ض' because the sound is so distinctive.",
    soundHowToAr:
      "مخرج الضاد من حافة اللسان مع ما يليها من الأضراس العليا: تنضغط حافة اللسان على الأضراس مع الإطباق والتفخيم، ويجري الصوت مجهوراً ثقيلاً. وتُسمّى العربية «لغة الضاد»، كما في «ضفدع».",
    comparisonEn:
      "No English equivalent at all — it is the heaviest, fullest sound in the language. Start from a 'd', then make it deep and emphatic. Don't flatten it into a plain 'd'; the mouth must feel full and the vowel after it sounds dark.",
    comparisonAr:
      "ميّز الضاد (نقطة فوقها) عن الصاد (بلا نقطة) شكلاً، وعن الدال المرقّقة صوتاً. قارنا «ضرب» بـ«درب»: الضاد ثقيلة مُطبَقة والدال خفيفة. الامتلاء والثِّقل علامة الضاد.",
    examples: [
      { word: "ضفدع", translit: "Difdaʿ", meaningEn: "frog", meaningAr: "حيوان أخضر يقفز قرب الماء", emoji: "🐸" },
      { word: "ضوء", translit: "Dawʾ", meaningEn: "light", meaningAr: "ما يُنير لنا الظلام", emoji: "💡" },
      { word: "ضرس", translit: "Dirs", meaningEn: "molar (tooth)", meaningAr: "سنّ خلفي نمضغ به الطعام", emoji: "🦷" },
    ],
    mistakeEn:
      "Replacing ض with a plain 'd'. Cue your child to push the tongue hard against the upper side teeth and 'make it heavy' — the firm side contact plus a full mouth is what produces a true ض.",
    mistakeAr:
      "أشهر خطأ نطق الضاد دالاً خفيفة. اطلب من طفلك أن يضغط حافة لسانه على أضراسه العليا بقوة ويجعل الصوت ثقيلاً ممتلئاً، فهذا ما يميّز الضاد.",
    parentTipEn:
      "Be a big jumping frog: each jump lands with a heavy, deep 'Dif-daʿ!'. The forceful, full-bodied jump matches the forceful, full-mouth posture the ض needs.",
    parentTipAr:
      "كونا ضفدعاً كبيراً يقفز: كل قفزة تنتهي بصوت ثقيل عميق «ضِفـ دع!». القفزة القوية الممتلئة تشبه امتلاء الفم المطلوب لنطق الضاد.",
  },
  {
    ar: "ط", enName: "Tah", arName: "طاء", translit: "ṭāʾ", difficulty: "hard",
    soundHowToEn:
      "Press the tip of your tongue firmly against the ridge behind your top teeth — like a 't' — but raise the back of the tongue and make the whole mouth heavy and full. It is the emphatic, deep partner of ت, released with a solid, dark pop.",
    soundHowToAr:
      "مخرج الطاء من طرف اللسان مع أصول الثنايا العليا كالتاء، لكنها مُطبَقة مُفخّمة: يرتفع أقصى اللسان فيمتلئ الفم ويثقل الصوت. وهي من حروف الإطباق، كما في «طائرة».",
    comparisonEn:
      "No English equivalent — start from 't' and make it deep and heavy. The common slip is a plain 't'; listen to the vowel — after ط it is dark and full ('Taa'), after ت it stays light and bright.",
    comparisonAr:
      "ميّز الطاء المُفخّمة عن التاء المرقّقة. قارنا «طين» بـ«تين»: الطاء ممتلئة ثقيلة والتاء خفيفة. وفي الشكل تشبه الظاء لكن الظاء تحمل نقطة فوقها. الامتلاء علامة الطاء.",
    examples: [
      { word: "طائرة", translit: "Taaʾira", meaningEn: "airplane", meaningAr: "تطير بنا في السماء", emoji: "✈️" },
      { word: "طبل", translit: "Tabl", meaningEn: "drum", meaningAr: "آلة نقرعها فتُصدر صوتاً", emoji: "🥁" },
      { word: "طماطم", translit: "TamaaTim", meaningEn: "tomatoes", meaningAr: "خضار أحمر نضعه في السلطة", emoji: "🍅" },
    ],
    mistakeEn:
      "Saying a plain light 't' instead of the heavy ط. Have your child stamp a foot on each 'T' to feel the weight — pairing the strong stamp with the sound builds the emphatic posture.",
    mistakeAr:
      "أشهر خطأ نطق الطاء تاءً خفيفة. اطلب من طفلك أن يدُقّ بقدمه مع كل «طـ» ليشعر بالثِّقل، فربط الدقّة القوية بالصوت يبني التفخيم المطلوب.",
    parentTipEn:
      "Beat a toy drum (Tabl) on every ط and a light tap for ت. The heavy beat versus the light tap turns the emphatic-vs-plain contrast into a fun rhythm game.",
    parentTipAr:
      "اقرعا طبلاً (طبل) قرعة قوية مع كل «طـ» وقرعة خفيفة مع «تـ». القرعة الثقيلة مقابل الخفيفة تحوّل الفرق بين المُفخّم والمرقّق إلى لعبة إيقاعية ممتعة.",
  },
  {
    ar: "ظ", enName: "Zah", arName: "ظاء", translit: "ẓāʾ", difficulty: "hard",
    soundHowToEn:
      "Place the tongue tip between your front teeth like the 'th' in 'this', but make it heavy and dark by raising the back of the tongue and filling the mouth. It is the emphatic, voiced partner of ذ — a deep 'th' with weight behind it.",
    soundHowToAr:
      "مخرج الظاء من طرف اللسان مع أطراف الثنايا العليا كالذال، لكنها مُطبَقة مُفخّمة: يخرج طرف اللسان بين الأسنان مع ارتفاع أقصى اللسان وامتلاء الفم. وهي من حروف الإطباق، كما في «ظبي».",
    comparisonEn:
      "No English equivalent — it is the 'th' of 'this' made heavy and dark. Don't flatten it into a plain voiced 'th' or a 'z'; keep the tongue between the teeth and the mouth full and deep.",
    comparisonAr:
      "ميّز الظاء (نقطة فوق الطاء، يخرج فيها اللسان بين الأسنان) عن الذال (مرقّقة) صوتاً. قارنا «ظِلّ» بـ«ذلّ»: الظاء مُفخّمة ممتلئة والذال خفيفة. وفي الشكل تشبه الطاء مع نقطة فوقها.",
    examples: [
      { word: "ظبي", translit: "Zaby", meaningEn: "gazelle", meaningAr: "حيوان رشيق سريع العَدْو", emoji: "🦌" },
      { word: "ظل", translit: "Zill", meaningEn: "shadow", meaningAr: "ما يتكوّن خلفنا في الشمس", emoji: "🌑" },
      { word: "ظرف", translit: "Zarf", meaningEn: "envelope", meaningAr: "نضع فيه الرسالة", emoji: "✉️" },
    ],
    mistakeEn:
      "Confusing ظ with ز or with the light ذ. Remind the child the tongue must show between the teeth (not behind them like z), and the sound must be heavy and full (not light like ذ).",
    mistakeAr:
      "أشهر خطأ الخلط بين الظاء والزاي أو الذال. ذكّرا الطفل بعلامتين: خروج طرف اللسان بين الأسنان (لا كالزاي)، وثِقل الصوت وامتلاء الفم (لا كالذال الخفيفة).",
    parentTipEn:
      "Play shadow puppets (Zill) on the wall and name the deep 'Zaby' gazelle shape with a big, heavy voice. Linking ظ to a dark, deep shadow reinforces its heavy quality.",
    parentTipAr:
      "العبا بخيال الظِّل (ظل) على الجدار وسمّيا شكل الظبي بصوت كبير ثقيل. ربط الظاء بالظِّل العميق يثبّت ثِقلها وتفخيمها في ذهن الطفل.",
  },
  {
    ar: "ع", enName: "Ain", arName: "عين", translit: "ʿayn", difficulty: "hard",
    soundHowToEn:
      "Squeeze the very back of your throat — the muscles you feel when you gently start a swallow — and let your voice buzz through that squeeze. It feels strange at first because English never uses this muscle group for speech. Go slowly: whisper 'ah', then repeat it while tightening the throat until the sound turns deep and pressed.",
    soundHowToAr:
      "مخرج العين من وسط الحلق: ينقبض الحلق قليلاً ويخرج الصوت مجهوراً وعميقاً. اطلب من طفلك أن يضع يده برفق على رقبته ليشعر بالاهتزاز عندما يقول «عَين» — الاهتزاز العميق علامة النطق الصحيح.",
    comparisonEn:
      "There is no English equivalent — this is the famous sound that gives Arabic its depth. The closest description: an 'ah' pronounced while flexing the throat. Do NOT replace it with a plain 'a' — 'ʿain' (eye) and 'ain' would become different words.",
    comparisonAr:
      "يخلط الأطفال بين العين (ع) والهمزة (ء) فيقولون «أَين» بدل «عَين». الفرق أن العين صوت عميق متصل من الحلق، بينما الهمزة نقرة قصيرة مقطوعة. كرّرا الثنائيات: «عَلَم/أَلَم» و«عَين/أَين» حتى يسمع الفرق.",
    examples: [
      { word: "عين", translit: "ʿayn", meaningEn: "eye", meaningAr: "نرى بها العالم", emoji: "👁️" },
      { word: "عسل", translit: "ʿasal", meaningEn: "honey", meaningAr: "غذاء حلو تصنعه النحلة", emoji: "🍯" },
      { word: "عنب", translit: "ʿinab", meaningEn: "grapes", meaningAr: "فاكهة صغيرة في عناقيد", emoji: "🍇" },
    ],
    mistakeEn:
      "Substituting a plain glottal stop or 'a' sound. Don't worry if your child needs months for ʿain — even heritage speakers refine it over years. Praise attempts, model often, never drill to frustration.",
    mistakeAr:
      "نطق العين همزةً هو أشهر خطأ عند الصغار، وهو طبيعي في بداية تعلم الكلام. لا تُكثرا من التصحيح المباشر؛ يكفي أن يسمع طفلك النطق الصحيح منكما مراراً في كلمات محببة مثل «عسل» و«عصير».",
    parentTipEn:
      "Make it physical and funny: pretend to be 'sleepy lions' — yawn wide and let the deep throat sound out as you stretch. The yawning posture naturally opens the throat where ʿain is made.",
    parentTipAr:
      "حوّلا التدريب إلى لعبة «الأسد النعسان»: تثاءبا بعمق مع إخراج صوت من الحلق. وضعية التثاؤب تفتح الحلق طبيعياً من نفس مخرج العين، فيتقن الطفل الصوت وهو يضحك.",
  },
  {
    ar: "غ", enName: "Ghain", arName: "غين", translit: "ghayn", difficulty: "hard",
    soundHowToEn:
      "Raise the back of your tongue toward the soft back roof and let your voice gargle through — like the French 'r' in 'Paris' or the sound of gargling water. It is the voiced partner of خ: same back-of-mouth position, but the voice is switched on and buzzes.",
    soundHowToAr:
      "مخرج الغين من أدنى الحلق ممّا يلي الفم: يرتفع أقصى اللسان نحو أقصى الحنك ويجري الصوت مجهوراً كصوت الغرغرة. وهي نظير الخاء لكنها مجهورة، كما في «غزال».",
    comparisonEn:
      "No English equivalent — closest is the French gargled 'r'. Learners often replace it with a hard 'g' (as in 'go'), but 'g' is a full stop while غ is a continuous gargle. Keep the air and voice flowing.",
    comparisonAr:
      "ميّز الغين (مجهورة، فيها اهتزاز) عن الخاء (مهموسة، بلا اهتزاز) صوتاً، مع تشابه الشكل (كلتاهما نقطة فوق). ضعا اليد على الحلق: الغين تهتزّ والخاء لا تهتزّ. كرّرا «غـ خـ» للتمييز.",
    examples: [
      { word: "غزال", translit: "ghazaal", meaningEn: "gazelle", meaningAr: "حيوان جميل رشيق", emoji: "🦌" },
      { word: "غيمة", translit: "ghayma", meaningEn: "cloud", meaningAr: "تطفو في السماء وتُمطر", emoji: "☁️" },
      { word: "غراب", translit: "ghuraab", meaningEn: "crow", meaningAr: "طائر أسود يصيح بصوت عالٍ", emoji: "🐦‍⬛" },
    ],
    mistakeEn:
      "Hardening غ into a 'g' stop. Have your child gargle a little water first, then say the word without water — the gargling muscle memory produces the continuous غ instead of a clipped 'g'.",
    mistakeAr:
      "أشهر خطأ نطق الغين كافاً مُعقّدة أو قطعاً يابساً. اطلب من طفلك أن يتغرغر بقليل من الماء أولاً، ثم ينطق الكلمة بلا ماء، فيخرج صوت الغين المتّصل لا القطع.",
    parentTipEn:
      "Make it a bathroom game: gargle 'ghhh' at the sink, then chase it with 'ghazaal!'. The real gargle teaches the throat exactly where غ lives, with plenty of laughs.",
    parentTipAr:
      "اجعلاها لعبة عند المغسلة: تغرغرا «غّغّ» ثم اتبِعاها بـ«غزال!». الغرغرة الحقيقية تُعلّم الحلق مكان الغين تماماً، وسط كثير من الضحك.",
  },
  {
    ar: "ف", enName: "Fa", arName: "فاء", translit: "fāʾ", difficulty: "easy",
    soundHowToEn:
      "Rest your top front teeth lightly on your lower lip and blow air through the gap — the 'f' in 'fish' or 'fun'. The voice stays off; it is just breath escaping between teeth and lip.",
    soundHowToAr:
      "مخرج الفاء من باطن الشفة السفلى مع أطراف الثنايا العليا: تلامس الأسنان العليا الشفة السفلى ويمرّ الهواء بينهما مهموساً. وهو حرف مهموس، كما في «فيل».",
    comparisonEn:
      "Identical to English 'f'. The one thing to watch: Arabic has no 'v' sound, so don't let voicing creep in and turn 'f' into 'v' — keep the throat silent, only the breath hisses.",
    comparisonAr:
      "الفاء صوت واضح قريب من نطق كثير من اللغات، وميزته في الشكل النقطة الواحدة فوقه. درّب طفلك على ملامسة الأسنان العليا للشفة السفلى مع نفخ الهواء، فهذا يضمن نطقاً صحيحاً.",
    examples: [
      { word: "فيل", translit: "fiil", meaningEn: "elephant", meaningAr: "أكبر حيوان على اليابسة", emoji: "🐘" },
      { word: "فراشة", translit: "faraasha", meaningEn: "butterfly", meaningAr: "حشرة جميلة ملوّنة الأجنحة", emoji: "🦋" },
      { word: "فأر", translit: "faʾr", meaningEn: "mouse", meaningAr: "حيوان صغير سريع", emoji: "🐭" },
    ],
    mistakeEn:
      "Adding voice and saying 'v' instead of 'f' (there is no 'v' in Arabic). Place a hand on the throat — for 'f' there should be no buzz at all, only a quiet stream of air.",
    mistakeAr:
      "نادراً ما يُخطئ الأطفال في الفاء، لكن قد يُدخلون عليها صوتاً. ضعا يد الطفل على الحلق ليتأكّد أنه لا اهتزاز، بل نفَس هادئ فقط بين الأسنان والشفة.",
    parentTipEn:
      "Pretend to blow out birthday candles with a long 'ffff' before naming a butterfly (faraasha). The blowing action sets up the teeth-on-lip airflow perfectly.",
    parentTipAr:
      "تظاهرا بإطفاء شموع عيد ميلاد بنفخة «فّفّ» طويلة قبل تسمية «فراشة». النفخ يهيّئ ملامسة الأسنان للشفة وجريان الهواء تماماً كما تحتاج الفاء.",
  },
  {
    ar: "ق", enName: "Qaf", arName: "قاف", translit: "qāf", difficulty: "hard",
    soundHowToEn:
      "Touch the very back of your tongue against the soft, deep part of the roof of your mouth — much further back than a 'k' — and release with a deep, hollow pop. It comes from the uvula at the very back of the throat, giving it a dark, heavy quality.",
    soundHowToAr:
      "مخرج القاف من أقصى اللسان مع ما فوقه من الحنك واللهاة: يرتفع أقصى اللسان من الخلف العميق ثم ينفصل بصوت عميق مُفخّم. وهو أعمق مخرجاً من الكاف، كما في «قمر».",
    comparisonEn:
      "There is no English equivalent — it is like 'k' but made much deeper, from the throat rather than the mouth. The common mistake is saying a plain 'k'; ق sits far back and sounds dark and hollow, while 'k' is forward and light.",
    comparisonAr:
      "ميّز القاف (من أقصى الحلق، عميقة مُفخّمة) عن الكاف (من أقرب إلى الفم، خفيفة) صوتاً. قارنا «قلب» بـ«كلب»: القاف عميقة والكاف خفيفة. علّم طفلك أن يستشعر عمق الصوت في حلقه.",
    examples: [
      { word: "قمر", translit: "qamar", meaningEn: "moon", meaningAr: "يضيء السماء في الليل", emoji: "🌙" },
      { word: "قطة", translit: "qiTTa", meaningEn: "cat", meaningAr: "حيوان أليف يموء", emoji: "🐱" },
      { word: "قلم", translit: "qalam", meaningEn: "pen", meaningAr: "نكتب به", emoji: "🖊️" },
    ],
    mistakeEn:
      "Saying 'k' instead of ق ('kamar' for 'qamar'). Have your child make the sound as far back as they can — like a tiny cough deep in the throat — to feel how much deeper ق is than 'k'.",
    mistakeAr:
      "أشهر خطأ نطق القاف كافاً. اطلب من طفلك أن يُخرج الصوت من أعمق نقطة في حلقه كأنه سعال خفيف من الخلف، ليشعر كم هي أعمق من الكاف.",
    parentTipEn:
      "Point at the moon (qamar) every night and say its name from deep in the throat. The nightly ritual gives daily practice and ties ق to something your child loves looking at.",
    parentTipAr:
      "أشيرا إلى القمر (قمر) كل ليلة وانطقا اسمه من عمق الحلق. الطقس الليلي يمنح تدريباً يومياً ويربط القاف بشيء يحب طفلك النظر إليه.",
  },
  {
    ar: "ك", enName: "Kaf", arName: "كاف", translit: "kāf", difficulty: "easy",
    soundHowToEn:
      "Touch the back of your tongue to the roof of your mouth (the soft area, but not as deep as ق) and release with a light, crisp pop — the 'k' in 'kite' or 'cat'. The voice stays off; it is a clean, forward stop.",
    soundHowToAr:
      "مخرج الكاف من أقصى اللسان مع ما يليه من الحنك، وهو أقرب إلى الفم من القاف: يرتفع مؤخّر اللسان إلى سقف الفم ثم ينفصل بصوت خفيف مهموس، كما في «كتاب».",
    comparisonEn:
      "Identical to English 'k'. The contrast to learn is with ق: keep ك light and forward in the mouth. If the sound starts to feel deep and hollow, the child has slipped toward the heavier ق.",
    comparisonAr:
      "ميّز الكاف (خفيفة، أقرب إلى الفم) عن القاف (عميقة مُفخّمة). قارنا «كلب» بـ«قلب»: الكاف خفيفة أمامية والقاف عميقة. حافظا على خفّة الكاف وعدم دفعها إلى عمق الحلق.",
    examples: [
      { word: "كتاب", translit: "kitaab", meaningEn: "book", meaningAr: "نقرأ فيه القصص والمعلومات", emoji: "📖" },
      { word: "كلب", translit: "kalb", meaningEn: "dog", meaningAr: "حيوان وفيّ يحرس البيت", emoji: "🐕" },
      { word: "كرة", translit: "kura", meaningEn: "ball", meaningAr: "نلعب بها ونركلها", emoji: "⚽" },
    ],
    mistakeEn:
      "Pushing ك too far back so it blurs into ق. Have your child say 'k' with a slight smile, which keeps the tongue forward and the sound light and crisp.",
    mistakeAr:
      "قد يدفع بعض الأطفال الكاف إلى الخلف فتقترب من القاف. اطلب من طفلك أن ينطقها مع ابتسامة خفيفة، فيبقى اللسان أماماً والصوت خفيفاً واضحاً.",
    parentTipEn:
      "Read a book (kitaab) together and tap the cover saying 'k-k-kitaab' each time you open it. Connecting ك to a daily object makes the sound stick effortlessly.",
    parentTipAr:
      "اقرآ كتاباً (كتاب) معاً واطرقا على غلافه قائلَين «كـ كـ كتاب» كلما فتحتماه. ربط الكاف بشيء يومي يجعل الصوت يرسخ دون عناء.",
  },
  {
    ar: "ل", enName: "Lam", arName: "لام", translit: "lām", difficulty: "easy",
    soundHowToEn:
      "Touch the tip of your tongue to the ridge behind your top front teeth and let the voice flow around the sides of the tongue — the 'l' in 'lion' or 'leaf'. It is a smooth, flowing sound with the voice on.",
    soundHowToAr:
      "مخرج اللام من طرف اللسان مع ما يحاذيه من اللثة قرب الثنايا العليا: يلامس طرف اللسان اللثة ويجري الصوت من جانبَيه مجهوراً. وهو حرف منحرف سلس، كما في «ليمون».",
    comparisonEn:
      "Very close to English 'l'. Keep it light and clear (the 'l' in 'leaf', not the darker 'l' at the end of 'ball'). In Arabic, ل stays bright and forward in most words.",
    comparisonAr:
      "اللام صوت واضح سلس، ويميّزه شكله الطويل النازل. درّب طفلك على ملامسة طرف اللسان للثة العليا مع جريان الصوت، وانتبها لئلا يقلبها نوناً عند بعض الصغار.",
    examples: [
      { word: "ليمون", translit: "laymuun", meaningEn: "lemon", meaningAr: "فاكهة صفراء حامضة", emoji: "🍋" },
      { word: "لبن", translit: "laban", meaningEn: "milk / yogurt", meaningAr: "شراب أبيض من الحليب", emoji: "🥛" },
      { word: "لعبة", translit: "luʿba", meaningEn: "toy / game", meaningAr: "نلهو بها ونمرح", emoji: "🧸" },
    ],
    mistakeEn:
      "Some children swap ل and ن (saying 'naymuun' for 'laymuun'). Show that for ل the air flows around the tongue sides, while for ن it goes through the nose — pinch the nose and ل still sounds clear.",
    mistakeAr:
      "قد يبدّل بعض الأطفال اللام بالنون. أظهرا أن اللام يجري صوتها من جانبَي اللسان لا من الأنف؛ إذا أمسكتما الأنف بقيت اللام واضحة بينما تتأثّر النون.",
    parentTipEn:
      "Squeeze a lemon (laymuun) together and make a sour face while saying 'l-l-laymuun'. The funny face anchors the word, and squeezing gives a memorable multisensory cue.",
    parentTipAr:
      "اعصرا ليمونة (ليمون) معاً مع تكشيرة الحموضة قائلَين «لـ لـ ليمون». الوجه المضحك يثبّت الكلمة، والعصر يمنح إشارة حسّية لا تُنسى.",
  },
  {
    ar: "م", enName: "Meem", arName: "ميم", translit: "mīm", difficulty: "easy",
    soundHowToEn:
      "Close your lips gently and hum, letting the sound come out through your nose — the 'm' in 'mama' or 'moon'. The lips stay shut while the voice buzzes through the nose. It is one of the very first sounds babies make.",
    soundHowToAr:
      "مخرج الميم من الشفتين مع خروج الصوت من الخيشوم (الأنف): تنطبق الشفتان ويجري الصوت غُنّةً من الأنف. وهو من أوائل ما ينطقه الطفل، كما في «ماما».",
    comparisonEn:
      "Identical to English 'm'. The only check: make sure the lips fully close so the hum routes through the nose. If the lips stay open, the nasal hum disappears.",
    comparisonAr:
      "الميم صوت سهل قريب من «ماما»، ويميّزه شكله المستدير الصغير. درّب طفلك على إطباق الشفتين تماماً مع الطنين من الأنف؛ إن بقيت الشفتان مفتوحتين ضاعت الغُنّة.",
    examples: [
      { word: "موز", translit: "mawz", meaningEn: "banana", meaningAr: "فاكهة صفراء طويلة حلوة", emoji: "🍌" },
      { word: "ماء", translit: "maaʾ", meaningEn: "water", meaningAr: "نشربه لنعيش", emoji: "💧" },
      { word: "مفتاح", translit: "miftaaH", meaningEn: "key", meaningAr: "نفتح به الباب", emoji: "🔑" },
    ],
    mistakeEn:
      "Rarely mispronounced, but children may open the lips too soon and lose the nasal hum. Have them hum 'mmm' with lips sealed and a hand on the nose to feel the vibration before adding the word.",
    mistakeAr:
      "نادراً ما يُخطئ الأطفال في الميم، لكنهم قد يفتحون الشفتين مبكراً. اطلبا منهم أن يطنّوا «مّم» والشفتان مغلقتان ويد على الأنف ليشعروا بالاهتزاز قبل إضافة الكلمة.",
    parentTipEn:
      "Rub your tummy and hum 'mmm, mawz!' when eating a banana. The 'yummy mmm' sound is exactly the ميم posture, and the snack makes it a happy memory.",
    parentTipAr:
      "افركا بطنيكما وطنّا «مّم، موز!» عند أكل الموز. صوت «مّم» اللذيذ هو نفسه مخرج الميم، والوجبة تجعل التعلّم ذكرى سعيدة.",
  },
  {
    ar: "ن", enName: "Noon", arName: "نون", translit: "nūn", difficulty: "easy",
    soundHowToEn:
      "Touch the tip of your tongue to the ridge behind your top front teeth and hum so the sound comes out through your nose — the 'n' in 'nose' or 'net'. The voice is on and routes through the nose, just like ميم but with the tongue up instead of the lips closed.",
    soundHowToAr:
      "مخرج النون من طرف اللسان مع ما يحاذيه من اللثة قرب الثنايا العليا، مع خروج الصوت من الخيشوم (الأنف): يلامس طرف اللسان اللثة ويجري الصوت غُنّةً، كما في «نحلة».",
    comparisonEn:
      "Identical to English 'n'. Distinguish it from ل: both touch the same ridge, but ن sends the hum through the nose while ل lets air flow around the tongue sides. Pinch the nose and ن changes, ل does not.",
    comparisonAr:
      "ميّز النون عن اللام: كلتاهما من طرف اللسان عند اللثة، لكن النون يخرج صوتها من الأنف غُنّةً واللام من جانبَي اللسان. وفي الشكل: النون نقطة فوق كأسٍ صغير. أمسكا الأنف يتغيّر صوت النون.",
    examples: [
      { word: "نحلة", translit: "naHla", meaningEn: "bee", meaningAr: "حشرة تصنع العسل", emoji: "🐝" },
      { word: "نجمة", translit: "najma", meaningEn: "star", meaningAr: "تلمع في سماء الليل", emoji: "⭐" },
      { word: "نمر", translit: "namir", meaningEn: "tiger", meaningAr: "حيوان مفترس مخطّط", emoji: "🐯" },
    ],
    mistakeEn:
      "Swapping ن and ل in either direction. Have your child pinch the nose: ن becomes blocked and muffled, proving its nasal nature, while ل stays clear — an instant, memorable test.",
    mistakeAr:
      "قد يبدّل بعض الأطفال النون باللام. اطلبا منهم أن يمسكوا الأنف: تنحبس النون وتُكتم لأنها أنفية، بينما تبقى اللام واضحة — اختبار سريع لا يُنسى.",
    parentTipEn:
      "Buzz like a bee (naHla) flying nose-first, humming 'nnn' before it lands. The nose-buzz play makes the nasal quality of ن obvious and fun.",
    parentTipAr:
      "طِيرا كالنحلة (نحلة) وأنتما تطنّان «نّن» من الأنف قبل أن تحطّا. لعبة طنين الأنف تُبرز صفة النون الأنفية بطريقة مرحة.",
  },
  {
    ar: "ه", enName: "Ha", arName: "هاء", translit: "hāʾ", difficulty: "easy",
    soundHowToEn:
      "Let a soft, gentle puff of breath out from deep at the bottom of your throat — the 'h' in 'hat' or 'hello'. There is no tongue or lip action; it is simply relaxed breath with the throat open. Light and airy.",
    soundHowToAr:
      "مخرج الهاء من أقصى الحلق: يخرج نفَس خفيف لطيف من أعمق الحلق دون انقباض، دون حركة من اللسان أو الشفتين. وهو حرف مهموس خفيف، كما في «هدهد».",
    comparisonEn:
      "Identical to the soft English 'h' in 'hello'. The key is to keep it gentle — don't tighten the throat into the rasping ح. ه is relaxed and breathy; ح is squeezed and strong.",
    comparisonAr:
      "ميّز الهاء (من أقصى الحلق، نفَس خفيف لطيف) عن الحاء (من وسط الحلق، نفَس قويّ مشدود). قارنا «هواء» بـ«حصان»: الهاء رخوة سهلة والحاء مشدودة قوية. لا تشدّا الحلق عند الهاء.",
    examples: [
      { word: "هدهد", translit: "hudhud", meaningEn: "hoopoe (bird)", meaningAr: "طائر جميل له تاج من الريش", emoji: "🐦" },
      { word: "هلال", translit: "hilaal", meaningEn: "crescent", meaningAr: "القمر في أول الشهر", emoji: "🌙" },
      { word: "هرم", translit: "haram", meaningEn: "pyramid", meaningAr: "بناء قديم ضخم في مصر", emoji: "🏔️" },
    ],
    mistakeEn:
      "Over-tightening ه into the harsh ح. Have your child sigh as if relieved ('haah') with a relaxed open throat — that easy breath is exactly the gentle ه, with no strain at all.",
    mistakeAr:
      "قد ينطق بعض الأطفال الهاء حاءً بشدّ الحلق. اطلبا منهم أن يتنهّدوا براحة «هاه» والحلق مسترخٍ مفتوح؛ هذا النفَس السهل هو الهاء بلا أي شدّ.",
    parentTipEn:
      "Play 'warm your hands': breathe a soft 'haah' onto cold fingers, then name the hoopoe bird (hudhud). The gentle warming breath is the relaxed ه sound itself.",
    parentTipAr:
      "العبا «تدفئة اليدين»: انفخا «هاه» لطيفة على الأصابع الباردة ثم سمّيا «هدهد». نفَس التدفئة الرقيق هو صوت الهاء المسترخي نفسه.",
  },
  {
    ar: "و", enName: "Waw", arName: "واو", translit: "wāw", difficulty: "easy",
    soundHowToEn:
      "Round your lips into a small circle and let the voice glide out — the 'w' in 'water' or the long 'oo' in 'moon' when it stretches. The lips push forward and round; no teeth or tongue contact is needed.",
    soundHowToAr:
      "مخرج الواو من الشفتين مع انضمامهما: تستديران إلى الأمام ويجري الصوت مجهوراً. وهو حرف مدّ إذا أُشبع (ووو) وحرف لِين إذا تحرّك (وَ)، كما في «وردة».",
    comparisonEn:
      "Like English 'w' (consonant, as in 'window') or long 'oo' (vowel, as in 'food'). The only caution: Arabic has no 'v', so never let و turn into a 'v' — keep the lips rounded, not biting the lip.",
    comparisonAr:
      "الواو صوت سهل من الشفتين، ويميّزه شكله المستدير بذيل. درّب طفلك على ضمّ الشفتين ودفعهما للأمام، وميّزا بين الواو المتحرّكة «وَ» وواو المدّ الممدودة «ووو» كما في «نور».",
    examples: [
      { word: "وردة", translit: "warda", meaningEn: "rose / flower", meaningAr: "زهرة جميلة عطرة", emoji: "🌹" },
      { word: "ولد", translit: "walad", meaningEn: "boy", meaningAr: "طفل ذكر صغير", emoji: "👦" },
      { word: "نور", translit: "nuur", meaningEn: "light (waw stretched)", meaningAr: "ضياء، والواو ممدودة هنا", emoji: "💡" },
    ],
    mistakeEn:
      "Confusing the consonant و ('w') with the long vowel و ('oo'), or shortening the long one. Have your child round the lips and stretch 'ooo' for two beats whenever و is a vowel of length.",
    mistakeAr:
      "قد يخلط الأطفال بين الواو الساكنة المتحرّكة وواو المدّ. علّم طفلك أن يضمّ شفتيه ويمدّ «ووو» حركتين كلما كانت الواو ممدودة كما في «نور» و«فول».",
    parentTipEn:
      "Smell a rose (warda) and say a long 'wooo' as if catching the scent. Rounding the lips to 'smell' naturally forms the واو shape and links it to a lovely word.",
    parentTipAr:
      "شمّا وردة (وردة) وقولا «وووه» كأنكما تشمّان عبيرها. ضمّ الشفتين للشمّ يكوّن مخرج الواو طبيعياً ويربطه بكلمة جميلة.",
  },
  {
    ar: "ي", enName: "Ya", arName: "ياء", translit: "yāʾ", difficulty: "easy",
    soundHowToEn:
      "Raise the middle of your tongue toward the roof of your mouth and let the voice glide out — the 'y' in 'yes' or the long 'ee' in 'see' when it stretches. The lips are relaxed and slightly spread; the tongue body does the work.",
    soundHowToAr:
      "مخرج الياء من وسط اللسان مع وسط الحنك الأعلى: يرتفع وسط اللسان نحو سقف الفم ويجري الصوت مجهوراً. وهي حرف مدّ إذا أُشبعت (ييي) وحرف لِين إذا تحرّكت (يَ)، كما في «يد».",
    comparisonEn:
      "Like English 'y' (consonant, as in 'yellow') or long 'ee' (vowel, as in 'green'). The caution: don't shorten the long vowel — Arabic vowel length changes meaning, so stretch 'ee' for two beats when ي lengthens.",
    comparisonAr:
      "الياء صوت سهل، وتميّزها نقطتان تحتها في الشكل. ميّزا بين الياء المتحرّكة «يَ» وياء المدّ الممدودة «ييي» كما في «فيل»؛ علّما طفلك إطالة المدّ حركتين حين تكون ممدودة.",
    examples: [
      { word: "يد", translit: "yad", meaningEn: "hand", meaningAr: "نمسك بها الأشياء", emoji: "✋" },
      { word: "يمامة", translit: "yamaama", meaningEn: "dove", meaningAr: "طائر أبيض رمز السلام", emoji: "🕊️" },
      { word: "ياسمين", translit: "yaasamiin", meaningEn: "jasmine", meaningAr: "زهرة بيضاء عطرة", emoji: "🌼" },
    ],
    mistakeEn:
      "Shortening the long ي so 'fiil' (elephant) sounds like 'fil'. Have your child smile slightly and hold the 'eee' for two beats whenever ي is a long vowel — vowel length carries meaning.",
    mistakeAr:
      "قد يقصّر الأطفال ياء المدّ فتصير «فيل» كـ«فِل». اطلبا منهم أن يبتسموا قليلاً ويمدّوا «ييي» حركتين كلما كانت الياء ممدودة، فطول الصوت يغيّر المعنى.",
    parentTipEn:
      "Wave your hand (yad) and stretch 'yyy' as you say goodbye. The wave plus the stretched sound ties ي to a daily gesture your child already loves doing.",
    parentTipAr:
      "لوّحا باليد (يد) ومُدّا «ييي» عند الوداع. التلويح مع مدّ الصوت يربط الياء بحركة يومية يحبّ طفلك القيام بها.",
  },
];
