// Arabic vocabulary pages: /learn/<slug> for animals, fruit and vegetables,
// body parts, days and months, and shapes.
//
// Why (Search Console, Nov 2026): Arabic parents search for whole word lists
// ("جميع الألوان واسمائها بالعربي" was the colours page's top query), and
// the Arab-country audience grew fastest. Each page is a picture list grouped
// the way a parent teaches it, with English and transliteration for parents
// who do not read Arabic, and a link to the matching colouring pack.
//
// Counts in titles and copy come from the arrays (see vocabCount).

export type VocabWord = { ar: string; en: string; tr: string; emoji: string };
/** phrases: a group of sentences (animal sounds), left out of the word count. */
export type VocabGroup = { id: string; en: string; ar: string; words: VocabWord[]; phrases?: boolean };
export type VocabFaq = { qEn: string; aEn: string; qAr: string; aAr: string };

export type VocabTopic = {
  slug: string;
  published: string;
  titleEn: (n: number) => string;
  titleAr: (n: number) => string;
  h1En: string;
  h1Ar: string;
  descEn: (n: number) => string;
  descAr: (n: number) => string;
  introEn: string[];
  introAr: string[];
  groups: VocabGroup[];
  tipsEn: string[];
  tipsAr: string[];
  faq: VocabFaq[];
  keywords: string[];
  /** Matching colouring pack in lib/worksheets.ts, if there is one. */
  packId?: string;
};

const w = (ar: string, en: string, tr: string, emoji: string): VocabWord => ({ ar, en, tr, emoji });

export const vocabTopics: VocabTopic[] = [
  {
    slug: "arabic-animals",
    published: "2026-11-01",
    titleEn: (n) => `Animals in Arabic for Kids: ${n} Animal Names with Pictures`,
    titleAr: (n) => `أسماء الحيوانات بالعربي للأطفال: ${n} حيواناً بالصور`,
    h1En: "Animals in Arabic for Kids",
    h1Ar: "أسماء الحيوانات بالعربي للأطفال",
    descEn: (n) => `${n} animal names in Arabic with pictures, English and pronunciation — farm, pets, wild animals, birds, insects and the sea — plus the sound each animal makes and a free colouring pack.`,
    descAr: (n) => `${n} اسماً من أسماء الحيوانات بالعربي مع الصور: حيوانات المزرعة والبيت والغابة والطيور والحشرات والبحر، وأصوات الحيوانات، مع حزمة تلوين مجانية.`,
    introEn: [
      "Animals are often a child's first Arabic words after mama and baba: they are fun to say, easy to point at in a picture book and come with a sound to copy.",
      "The names below are grouped the way children meet animals — on the farm, at home, in the zoo, in the sky and in the sea. Start with the animals your child already loves.",
    ],
    introAr: [
      "الحيوانات من أوائل الكلمات التي يتعلّمها الطفل بعد ماما وبابا: ممتعة في النطق، وسهلة الإشارة إليها في كتاب مصوّر، ولكلّ منها صوت يقلّده.",
      "رتّبنا الأسماء كما يلقاها الطفل: في المزرعة، وفي البيت، وفي الغابة، وفي السماء، وفي البحر. ابدأ بالحيوانات التي يحبّها طفلك.",
    ],
    groups: [
      { id: "farm", en: "Farm animals", ar: "حيوانات المزرعة", words: [
        w("بقرة", "cow", "baqara", "🐄"), w("حصان", "horse", "hisaan", "🐴"), w("خروف", "sheep", "kharuuf", "🐑"),
        w("ماعز", "goat", "maa'iz", "🐐"), w("دجاجة", "hen", "dajaaja", "🐔"), w("ديك", "rooster", "diik", "🐓"),
        w("بطة", "duck", "batta", "🦆"), w("حمار", "donkey", "himaar", "🫏"), w("جمل", "camel", "jamal", "🐫"),
        w("أرنب", "rabbit", "arnab", "🐰"),
      ] },
      { id: "home", en: "Animals at home", ar: "حيوانات البيت", words: [
        w("قطة", "cat", "qitta", "🐱"), w("كلب", "dog", "kalb", "🐶"), w("سمكة", "fish", "samaka", "🐟"),
        w("عصفور", "sparrow", "'usfuur", "🐦"), w("ببغاء", "parrot", "babbaghaa'", "🦜"), w("سلحفاة", "tortoise", "sulahfaa", "🐢"),
        w("فأر", "mouse", "fa'r", "🐭"),
      ] },
      { id: "wild", en: "Wild animals", ar: "حيوانات الغابة والبرّية", words: [
        w("أسد", "lion", "asad", "🦁"), w("نمر", "tiger", "namir", "🐯"), w("فيل", "elephant", "fiil", "🐘"),
        w("زرافة", "giraffe", "zaraafa", "🦒"), w("قرد", "monkey", "qird", "🐒"), w("دب", "bear", "dubb", "🐻"),
        w("ذئب", "wolf", "dhi'b", "🐺"), w("ثعلب", "fox", "tha'lab", "🦊"), w("غزال", "gazelle", "ghazaal", "🦌"),
        w("حمار وحشي", "zebra", "himaar wahshi", "🦓"), w("فرس النهر", "hippo", "faras an-nahr", "🦛"),
        w("تمساح", "crocodile", "timsaah", "🐊"), w("ثعبان", "snake", "thu'baan", "🐍"), w("كنغر", "kangaroo", "kanghar", "🦘"),
      ] },
      { id: "birds-insects", en: "Birds and insects", ar: "الطيور والحشرات", words: [
        w("نسر", "eagle", "nasr", "🦅"), w("بومة", "owl", "buuma", "🦉"), w("بطريق", "penguin", "batriiq", "🐧"),
        w("حمامة", "dove", "hamaama", "🕊️"), w("نحلة", "bee", "nahla", "🐝"), w("فراشة", "butterfly", "faraasha", "🦋"),
        w("نملة", "ant", "namla", "🐜"), w("دعسوقة", "ladybird", "du'suuqa", "🐞"),
      ] },
      { id: "sea", en: "Sea animals", ar: "حيوانات البحر", words: [
        w("حوت", "whale", "huut", "🐳"), w("دلفين", "dolphin", "dulfiin", "🐬"), w("أخطبوط", "octopus", "ukhtubuut", "🐙"),
        w("سلطعون", "crab", "sulta'uun", "🦀"), w("قرش", "shark", "qirsh", "🦈"),
      ] },
      { id: "sounds", en: "What does it say? Animal sounds", ar: "أصوات الحيوانات", phrases: true, words: [
        w("الأسد يزأر", "the lion roars", "al-asad yaz'ar", "🦁"), w("الكلب ينبح", "the dog barks", "al-kalb yanbah", "🐶"),
        w("القطة تموء", "the cat meows", "al-qitta tamuu'", "🐱"), w("البقرة تخور", "the cow moos", "al-baqara takhuur", "🐄"),
        w("الحصان يصهل", "the horse neighs", "al-hisaan yas-hal", "🐴"), w("الديك يصيح", "the rooster crows", "ad-diik yasiih", "🐓"),
        w("الحمار ينهق", "the donkey brays", "al-himaar yanhaq", "🫏"), w("الذئب يعوي", "the wolf howls", "adh-dhi'b ya'wi", "🐺"),
        w("العصفور يغرّد", "the bird sings", "al-'usfuur yugharrid", "🐦"),
      ] },
    ],
    tipsEn: [
      "Make the sound first, then say the name: 'moo… بقرة'. The sound is the hook the word hangs on.",
      "Sort toy animals into a farm pile and a wild pile, naming each one in Arabic as it goes in.",
      "On a picture book page, ask 'أين الأسد؟' (where is the lion?) and let your child point before they can say it.",
    ],
    tipsAr: [
      "قلّد الصوت أولاً ثم قل الاسم: «مووو… بقرة». الصوت هو الخطّاف الذي تتعلّق به الكلمة.",
      "صنّفا ألعاب الحيوانات إلى كومة للمزرعة وكومة للغابة، وسمّيا كلّ حيوان وأنتما تضعانه.",
      "في كتاب مصوّر اسأل «أين الأسد؟» ودع طفلك يشير قبل أن يستطيع النطق.",
    ],
    faq: [
      { qEn: "What are the first animals to teach in Arabic?", aEn: "Start with animals your child sees or loves: قطة (cat), كلب (dog), بقرة (cow), أسد (lion), فيل (elephant) and سمكة (fish). Six names are plenty for the first week.", qAr: "ما أوّل الحيوانات التي أعلّمها لطفلي بالعربية؟", aAr: "ابدأ بالحيوانات التي يراها طفلك أو يحبّها: قطة، كلب، بقرة، أسد، فيل، سمكة. ستّة أسماء تكفي للأسبوع الأول." },
      { qEn: "How do you say the sounds animals make in Arabic?", aEn: "Arabic has a verb for each: the lion يزأر (roars), the dog ينبح (barks), the cat تموء (meows), the cow تخور (moos), the horse يصهل (neighs), the rooster يصيح (crows) and the donkey ينهق (brays).", qAr: "ما أسماء أصوات الحيوانات بالعربية؟", aAr: "لكلّ حيوان فعل: الأسد يزأر، والكلب ينبح، والقطة تموء، والبقرة تخور، والحصان يصهل، والديك يصيح، والحمار ينهق، والذئب يعوي، والعصفور يغرّد." },
      { qEn: "Why do some animal names change, like قطة and قط?", aEn: "Arabic marks male and female: قط is a tom cat and قطة a female cat; the same goes for كلب/كلبة and أسد/لبؤة. Children usually learn the everyday form first — قطة, دجاجة, بقرة — and that is fine.", qAr: "لماذا يتغيّر اسم بعض الحيوانات، مثل قط وقطة؟", aAr: "العربية تميّز المذكّر من المؤنّث: القطّ ذكر والقطّة أنثى، ومثلها كلب وكلبة، وأسد ولبؤة. ويتعلّم الأطفال عادةً الاسم الشائع أولاً — قطة، دجاجة، بقرة — ولا بأس بذلك." },
    ],
    keywords: ["animals in arabic for kids", "أسماء الحيوانات بالعربي", "arabic animal names with pictures", "أسماء الحيوانات للأطفال بالصور", "أصوات الحيوانات بالعربي"],
    packId: "arabic-animals-coloring",
  },
  {
    slug: "arabic-fruits-vegetables",
    published: "2026-11-01",
    titleEn: (n) => `Fruits and Vegetables in Arabic for Kids: ${n} Names with Pictures`,
    titleAr: (n) => `أسماء الفواكه والخضروات بالعربي للأطفال: ${n} اسماً بالصور`,
    h1En: "Fruits and Vegetables in Arabic for Kids",
    h1Ar: "أسماء الفواكه والخضروات بالعربي للأطفال",
    descEn: (n) => `${n} fruit and vegetable names in Arabic with pictures, English and pronunciation, the regional names you will hear (بندورة, بطاطس), kitchen games and a free colouring pack.`,
    descAr: (n) => `${n} اسماً للفواكه والخضروات بالعربي مع الصور والإنجليزية، والأسماء المحلّية المختلفة بين البلدان، وألعاب في المطبخ، مع حزمة تلوين مجانية.`,
    introEn: [
      "Food is the easiest vocabulary to practise because it comes back three times a day. Every snack is a chance to name one fruit in Arabic.",
      "Some foods have different names from one Arab country to the next — tomato is طماطم in Egypt and the Gulf but بندورة in the Levant. The list uses the common name and the FAQ gives the others.",
    ],
    introAr: [
      "الطعام أسهل المفردات تدريباً لأنه يعود ثلاث مرّات كلّ يوم، وكلّ وجبة خفيفة فرصة لتسمية فاكهة بالعربية.",
      "لبعض الأطعمة أسماء تختلف بين البلدان العربية — فالطماطم في مصر والخليج هي البندورة في الشام. استعملنا الاسم الأشهر، وفي الأسئلة أدناه الأسماء الأخرى.",
    ],
    groups: [
      { id: "fruits", en: "Fruits", ar: "الفواكه", words: [
        w("تفاحة", "apple", "tuffaaha", "🍎"), w("موزة", "banana", "mawza", "🍌"), w("برتقالة", "orange", "burtuqaala", "🍊"),
        w("عنب", "grapes", "'inab", "🍇"), w("فراولة", "strawberry", "faraawla", "🍓"), w("بطيخ", "watermelon", "battiikh", "🍉"),
        w("ليمون", "lemon", "laymuun", "🍋"), w("أناناس", "pineapple", "anaanaas", "🍍"), w("مانجو", "mango", "manga", "🥭"),
        w("كرز", "cherries", "karaz", "🍒"), w("خوخ", "peach", "khawkh", "🍑"), w("كمثرى", "pear", "kummathraa", "🍐"),
        w("كيوي", "kiwi", "kiiwi", "🥝"), w("جوز الهند", "coconut", "jawz al-hind", "🥥"), w("شمّام", "melon", "shammaam", "🍈"),
        w("توت", "berries", "tuut", "🫐"), w("تمر", "dates", "tamr", "🌴"),
      ] },
      { id: "vegetables", en: "Vegetables", ar: "الخضروات", words: [
        w("جزر", "carrot", "jazar", "🥕"), w("طماطم", "tomato", "tamaatim", "🍅"), w("خيار", "cucumber", "khiyaar", "🥒"),
        w("بطاطا", "potato", "bataata", "🥔"), w("بصل", "onion", "basal", "🧅"), w("ثوم", "garlic", "thuum", "🧄"),
        w("فلفل", "pepper", "filfil", "🫑"), w("فلفل حار", "chilli", "filfil haarr", "🌶️"), w("ذرة", "corn", "dhura", "🌽"),
        w("باذنجان", "aubergine", "baadhinjaan", "🍆"), w("خس", "lettuce", "khass", "🥬"), w("بروكلي", "broccoli", "brokli", "🥦"),
        w("فطر", "mushroom", "fitr", "🍄"), w("بازلاء", "peas", "baazillaa'", "🫛"),
      ] },
    ],
    tipsEn: [
      "At snack time, name the fruit before handing it over and wait for your child to repeat it — then it is theirs.",
      "Play 'fruit or vegetable?' (فاكهة أم خضار؟) while unpacking the shopping.",
      "Cut an apple, an orange and a cucumber across the middle and compare the patterns inside, naming each in Arabic.",
    ],
    tipsAr: [
      "في وقت الوجبة الخفيفة سمِّ الفاكهة قبل أن تعطيها لطفلك، وانتظر أن يردّدها.",
      "العبا «فاكهة أم خضار؟» وأنتما ترتّبان مشتريات البيت.",
      "اقطعا تفاحة وبرتقالة وخيارة من الوسط وقارنا الرسم في داخلها، مع تسمية كلّ منها بالعربية.",
    ],
    faq: [
      { qEn: "Why are there two words for tomato and potato in Arabic?", aEn: "Different countries use different everyday names. Tomato is طماطم in Egypt, the Gulf and North Africa and بندورة in Syria, Lebanon, Jordan and Palestine. Potato is بطاطا in most countries and بطاطس in Egypt. Teach the one your family uses.", qAr: "لماذا للطماطم والبطاطا اسمان بالعربية؟", aAr: "لكلّ بلد اسمه الشائع: الطماطم في مصر والخليج والمغرب العربي هي البندورة في سوريا ولبنان والأردن وفلسطين، والبطاطا في أكثر البلدان هي البطاطس في مصر. علّم طفلك الاسم الذي تستعمله أسرتك." },
      { qEn: "How do you say fruit and vegetables in Arabic?", aEn: "Fruit is فاكهة (faakiha), plural فواكه (fawaakih). Vegetables are خضار (khudaar) or خضروات (khudrawaat).", qAr: "ما معنى فاكهة وخضار؟", aAr: "الفاكهة كلّ ثمر حلو يؤكل نيّئاً غالباً، وجمعها فواكه. والخضار أو الخضروات نباتات تؤكل مطبوخة أو في السلطة، مثل الجزر والخيار والبصل." },
      { qEn: "Is a tomato a fruit or a vegetable?", aEn: "A tomato is a fruit to a botanist, because it grows from the flower and holds the seeds — but everyone cooks it as a vegetable, so most children's books list it with the vegetables, as we do.", qAr: "هل الطماطم فاكهة أم خضار؟", aAr: "الطماطم فاكهة في علم النبات، لأنها تنمو من الزهرة وتحمل البذور — لكنّ الناس يطبخونها خضاراً، ولذلك تضعها كتب الأطفال مع الخضروات كما فعلنا." },
    ],
    keywords: ["fruits in arabic for kids", "أسماء الفواكه بالعربي", "vegetables in arabic", "أسماء الخضروات بالعربي للأطفال", "fruits and vegetables names in arabic"],
    packId: "arabic-fruits-vegetables-coloring",
  },
  {
    slug: "arabic-body-parts",
    published: "2026-11-01",
    titleEn: (n) => `Body Parts in Arabic for Kids: ${n} Words with Pictures`,
    titleAr: (n) => `أعضاء جسم الإنسان بالعربي للأطفال: ${n} كلمة بالصور`,
    h1En: "Body Parts in Arabic for Kids",
    h1Ar: "أعضاء جسم الإنسان بالعربي للأطفال",
    descEn: (n) => `${n} body-part words in Arabic with pictures, English and pronunciation: the face, the body, inside the body and the five senses, with games and a free colouring pack.`,
    descAr: (n) => `${n} كلمة لأعضاء جسم الإنسان بالعربي مع الصور: الوجه، والجسم، وما في داخل الجسم، والحواسّ الخمس، مع ألعاب وحزمة تلوين مجانية.`,
    introEn: [
      "Body parts are words a child can learn by touching: point to your nose, say أنف, and your child points to theirs. No pictures or toys needed.",
      "Several Arabic body parts come in pairs and have a special pair form ending in ـان: عين (an eye) becomes عينان (two eyes). The list shows the single word; the FAQ explains the pairs.",
    ],
    introAr: [
      "أعضاء الجسم كلمات يتعلّمها الطفل باللمس: أشِر إلى أنفك وقل «أنف»، فيشير طفلك إلى أنفه. لا حاجة إلى صور ولا ألعاب.",
      "كثير من الأعضاء زوجية، ولها في العربية صيغة المثنّى: عين ← عينان، أذن ← أذنان، يد ← يدان. القائمة تعرض المفرد، وفي الأسئلة شرح المثنّى.",
    ],
    groups: [
      { id: "face", en: "The face", ar: "الوجه", words: [
        w("وجه", "face", "wajh", "🙂"), w("شعر", "hair", "sha'r", "💇"), w("عين", "eye", "'ayn", "👁️"),
        w("أذن", "ear", "udhun", "👂"), w("أنف", "nose", "anf", "👃"), w("فم", "mouth", "fam", "👄"),
        w("أسنان", "teeth", "asnaan", "🦷"), w("لسان", "tongue", "lisaan", "👅"),
      ] },
      { id: "body", en: "The body", ar: "الجسم", words: [
        w("رأس", "head", "ra's", "🧑"), w("ذراع", "arm", "dhiraa'", "💪"), w("يد", "hand", "yad", "✋"),
        w("إصبع", "finger", "isba'", "☝️"), w("أظافر", "nails", "azaafir", "💅"), w("رجل", "leg", "rijl", "🦵"),
        w("قدم", "foot", "qadam", "🦶"),
      ] },
      { id: "inside", en: "Inside the body", ar: "داخل الجسم", words: [
        w("قلب", "heart", "qalb", "🫀"), w("دماغ", "brain", "dimaagh", "🧠"), w("رئتان", "lungs", "ri'ataan", "🫁"),
        w("عظام", "bones", "'izaam", "🦴"),
      ] },
      { id: "senses", en: "The five senses", ar: "الحواسّ الخمس", words: [
        w("البصر", "sight — with the eyes", "al-basar", "👁️"), w("السمع", "hearing — with the ears", "as-sam'", "👂"),
        w("الشمّ", "smell — with the nose", "ash-shamm", "👃"), w("التذوّق", "taste — with the tongue", "at-tadhawwuq", "👅"),
        w("اللمس", "touch — with the skin", "al-lams", "✋"),
      ] },
    ],
    tipsEn: [
      "Play 'Simon says' in Arabic: المس أنفك (touch your nose), المس أذنك (touch your ear).",
      "At bath time, name each part as you wash it.",
      "Draw round your child's hand on paper and write يد inside, then a finger and إصبع.",
    ],
    tipsAr: [
      "العبا «المس…»: المس أنفك، المس أذنك، المس رأسك — وبدّلا الأدوار.",
      "وقت الاستحمام سمِّ كلّ عضو وأنت تغسله.",
      "ارسما حول يد الطفل على ورقة واكتبا «يد» في داخلها، ثم «إصبع» على إصبع.",
    ],
    faq: [
      { qEn: "Why do Arabic words for eyes and ears end in -aan?", aEn: "Arabic has a pair form (the dual). One eye is عين, two eyes are عينان; one ear أذن, two ears أذنان; one hand يد, two hands يدان. It is one of the first grammar patterns children pick up, because the body shows it to them.", qAr: "ما المثنّى في أعضاء الجسم؟", aAr: "للأعضاء الزوجية صيغة المثنّى: عين ← عينان، أذن ← أذنان، يد ← يدان، قدم ← قدمان. وهي من أوّل قواعد العربية التي يلتقطها الطفل لأنّ جسمه يريه إياها." },
      { qEn: "What are the five senses in Arabic?", aEn: "البصر (sight), السمع (hearing), الشمّ (smell), التذوّق (taste) and اللمس (touch).", qAr: "ما الحواسّ الخمس؟", aAr: "البصر بالعين، والسمع بالأذن، والشمّ بالأنف، والتذوّق باللسان، واللمس بالجلد." },
      { qEn: "What age can children learn body parts in Arabic?", aEn: "By about age 2 most children can point to two or more body parts when asked, and saying the words follows soon after. Keep asking 'أين أنفك؟' (where is your nose?) every day.", qAr: "في أيّ عمر يتعلّم الطفل أعضاء الجسم؟", aAr: "في نحو السنة الثانية يستطيع أكثر الأطفال أن يشيروا إلى عضوين أو أكثر حين يُسألون، ويأتي النطق بعد ذلك بقليل. استمرّ في السؤال كلّ يوم: «أين أنفك؟»." },
    ],
    keywords: ["body parts in arabic for kids", "أعضاء جسم الإنسان للأطفال", "أعضاء الجسم بالعربي بالصور", "arabic body parts with pictures", "الحواس الخمس للأطفال"],
    packId: "arabic-body-parts-coloring",
  },
  {
    slug: "arabic-days-months",
    published: "2026-11-01",
    titleEn: () => "Days of the Week and Months in Arabic for Kids",
    titleAr: () => "أيام الأسبوع والأشهر بالعربي للأطفال: الميلادية والهجرية",
    h1En: "Days of the Week and Months in Arabic",
    h1Ar: "أيام الأسبوع والأشهر بالعربي",
    descEn: () => "The seven days of the week in Arabic and why they are numbered, the twelve months in both naming systems (يناير and كانون الثاني), the Hijri months and the four seasons, with pronunciation.",
    descAr: () => "أيام الأسبوع السبعة ولماذا سُمّيت بالأعداد، والأشهر الميلادية بتسميتيها (يناير وكانون الثاني)، والأشهر الهجرية، والفصول الأربعة.",
    introEn: [
      "The Arabic days of the week are a counting lesson in disguise: الأحد comes from واحد (one), الاثنين from اثنان (two), and so on to الخميس, from خمسة (five). Once a child knows the numbers, five of the seven days make sense on their own.",
      "Months have two sets of names. Egypt, the Gulf and North Africa use يناير، فبراير… while Syria, Lebanon, Jordan, Palestine and Iraq use كانون الثاني، شباط… Both are below, with the Hijri months used for Ramadan and Eid.",
    ],
    introAr: [
      "أسماء أيام الأسبوع درس في العدّ: الأحد من واحد، والاثنين من اثنين، والثلاثاء من ثلاثة، والأربعاء من أربعة، والخميس من خمسة. فإذا عرف الطفل الأعداد فهم خمسة أيام من سبعة وحده.",
      "وللأشهر الميلادية تسميتان: يناير وفبراير… في مصر والخليج والمغرب العربي، وكانون الثاني وشباط… في الشام والعراق. تجدهما أدناه، مع الأشهر الهجرية التي نعرف بها رمضان والعيد.",
    ],
    groups: [
      { id: "days", en: "Days of the week", ar: "أيام الأسبوع", words: [
        w("الأحد", "Sunday — from واحد, one", "al-ahad", "1️⃣"), w("الاثنين", "Monday — from اثنان, two", "al-ithnayn", "2️⃣"),
        w("الثلاثاء", "Tuesday — from ثلاثة, three", "ath-thulaathaa'", "3️⃣"), w("الأربعاء", "Wednesday — from أربعة, four", "al-arbi'aa'", "4️⃣"),
        w("الخميس", "Thursday — from خمسة, five", "al-khamiis", "5️⃣"), w("الجمعة", "Friday — the day of gathering", "al-jum'a", "🕌"),
        w("السبت", "Saturday", "as-sabt", "📅"),
      ] },
      { id: "months", en: "The months (two names each)", ar: "الأشهر الميلادية", words: [
        w("يناير — كانون الثاني", "January", "yanaayir / kaanuun ath-thaani", "❄️"), w("فبراير — شباط", "February", "fibraayir / shubaat", "🌧️"),
        w("مارس — آذار", "March", "maaris / aadhaar", "🌱"), w("أبريل — نيسان", "April", "abriil / niisaan", "🌷"),
        w("مايو — أيار", "May", "maayu / ayyaar", "🌼"), w("يونيو — حزيران", "June", "yuunyu / haziiraan", "☀️"),
        w("يوليو — تموز", "July", "yuulyu / tammuuz", "🏖️"), w("أغسطس — آب", "August", "aghustus / aab", "🍉"),
        w("سبتمبر — أيلول", "September", "sibtambar / ayluul", "🎒"), w("أكتوبر — تشرين الأول", "October", "uktuubar / tishriin al-awwal", "🍂"),
        w("نوفمبر — تشرين الثاني", "November", "nuufambar / tishriin ath-thaani", "🌬️"), w("ديسمبر — كانون الأول", "December", "disambar / kaanuun al-awwal", "⛄"),
      ] },
      { id: "hijri", en: "The Hijri (Islamic) months", ar: "الأشهر الهجرية", words: [
        w("محرّم", "Muharram — the new year", "muharram", "🌙"), w("صفر", "Safar", "safar", "🌙"),
        w("ربيع الأول", "Rabi' al-Awwal", "rabii' al-awwal", "🌙"), w("ربيع الآخر", "Rabi' al-Akhir", "rabii' al-aakhir", "🌙"),
        w("جمادى الأولى", "Jumada al-Ula", "jumaadaa al-uulaa", "🌙"), w("جمادى الآخرة", "Jumada al-Akhira", "jumaadaa al-aakhira", "🌙"),
        w("رجب", "Rajab", "rajab", "🌙"), w("شعبان", "Sha'ban", "sha'baan", "🌙"),
        w("رمضان", "Ramadan — the month of fasting", "ramadaan", "🏮"), w("شوّال", "Shawwal — Eid al-Fitr", "shawwaal", "🎉"),
        w("ذو القعدة", "Dhu al-Qa'da", "dhuu al-qa'da", "🌙"), w("ذو الحجّة", "Dhu al-Hijja — Hajj and Eid al-Adha", "dhuu al-hijja", "🕋"),
      ] },
      { id: "seasons", en: "The four seasons", ar: "الفصول الأربعة", words: [
        w("الربيع", "spring", "ar-rabii'", "🌸"), w("الصيف", "summer", "as-sayf", "☀️"),
        w("الخريف", "autumn", "al-khariif", "🍂"), w("الشتاء", "winter", "ash-shitaa'", "❄️"),
      ] },
    ],
    tipsEn: [
      "Each morning ask 'ما اليوم؟' (what day is it?) and answer together: اليوم الأحد.",
      "Link days to something that happens on them: الجمعة, the family lunch; السبت, the park.",
      "Sing the days in order every evening for a week — the order sticks long before the meaning does.",
    ],
    tipsAr: [
      "كلّ صباح اسأل «ما اليوم؟» وأجيبا معاً: اليوم الأحد.",
      "اربط كلّ يوم بشيء يحدث فيه: الجمعة غداء العائلة، والسبت الحديقة.",
      "ردّدا الأيام بالترتيب كلّ مساء أسبوعاً كاملاً — فالترتيب يثبت قبل المعنى بكثير.",
    ],
    faq: [
      { qEn: "Why are the Arabic days of the week named after numbers?", aEn: "The week is counted from Sunday: الأحد is day one (واحد), الاثنين day two, الثلاثاء day three, الأربعاء day four and الخميس day five. الجمعة means the day of gathering, for the Friday prayer, and السبت is the Sabbath.", qAr: "لماذا سُمّيت أيام الأسبوع بالأعداد؟", aAr: "يُعدّ الأسبوع من الأحد: الأحد اليوم الأول، والاثنين الثاني، والثلاثاء الثالث، والأربعاء الرابع، والخميس الخامس. والجمعة يوم الاجتماع لصلاة الجمعة، والسبت من السَّبْت بمعنى الراحة." },
      { qEn: "Which month names should I teach: يناير or كانون الثاني?", aEn: "The ones used where your family is from. Egypt, the Gulf, Sudan and North Africa say يناير، فبراير، مارس…; Syria, Lebanon, Jordan, Palestine and Iraq say كانون الثاني، شباط، آذار… Both are correct Arabic.", qAr: "أيّ الأسماء أعلّم: يناير أم كانون الثاني؟", aAr: "علّم الأسماء المستعملة في بلدك: مصر والخليج والسودان والمغرب العربي تقول يناير وفبراير ومارس…، والشام والعراق تقول كانون الثاني وشباط وآذار… وكلاهما صحيح." },
      { qEn: "What are the Hijri months?", aEn: "The twelve months of the Islamic lunar calendar, from محرّم to ذو الحجّة. Each starts with the new crescent moon, so they move about eleven days earlier every year — which is why Ramadan comes at a different time each year.", qAr: "ما الأشهر الهجرية؟", aAr: "هي أشهر التقويم القمري الاثنا عشر، من محرّم إلى ذي الحجّة. يبدأ كلّ شهر برؤية الهلال، ولذلك تتقدّم نحو أحد عشر يوماً كلّ سنة، فيأتي رمضان في وقت مختلف كلّ عام." },
    ],
    keywords: ["days of the week in arabic", "أيام الأسبوع بالعربي للأطفال", "months in arabic", "الأشهر الميلادية والهجرية", "أسماء الشهور بالعربي"],
    packId: "arabic-seasons-coloring",
  },
  {
    slug: "arabic-shapes",
    published: "2026-11-01",
    titleEn: (n) => `Shapes in Arabic for Kids: ${n} Shape Names with Pictures`,
    titleAr: (n) => `الأشكال الهندسية بالعربي للأطفال: ${n} شكلاً بالصور`,
    h1En: "Shapes in Arabic for Kids",
    h1Ar: "الأشكال الهندسية بالعربي للأطفال",
    descEn: (n) => `${n} shape names in Arabic with pictures, English and pronunciation — flat shapes and solid shapes — with everyday examples and a shape hunt to play at home.`,
    descAr: (n) => `${n} شكلاً هندسياً بالعربي مع الصور والإنجليزية: الأشكال المسطّحة والمجسّمة، مع أمثلة من الحياة ولعبة البحث عن الأشكال في البيت.`,
    introEn: [
      "Shapes are everywhere a child looks: the round plate, the square window, the triangle slice of cake. That makes them easy to practise without any materials.",
      "Several Arabic shape names are built from numbers, just like the days: مثلث (triangle) comes from ثلاثة (three) and مربع (square) from أربعة (four).",
    ],
    introAr: [
      "الأشكال في كلّ مكان ينظر إليه الطفل: الصحن الدائري، والنافذة المربّعة، وقطعة الكعك المثلّثة. ولذلك يسهل التدرّب عليها بلا أيّ أدوات.",
      "وبعض أسماء الأشكال مأخوذ من الأعداد كأيام الأسبوع: المثلّث من ثلاثة، والمربّع من أربعة، والخماسي من خمسة.",
    ],
    groups: [
      { id: "flat", en: "Flat shapes", ar: "الأشكال المسطّحة", words: [
        w("دائرة", "circle — like a plate", "daa'ira", "⚪"), w("مربع", "square — four equal sides", "murabba'", "🟦"),
        w("مثلث", "triangle — three sides", "muthallath", "🔺"), w("مستطيل", "rectangle — like a door", "mustatiil", "🚪"),
        w("معيّن", "diamond (rhombus)", "mu'ayyan", "🔷"), w("بيضاوي", "oval — like an egg", "baydaawi", "🥚"),
        w("نجمة", "star", "najma", "⭐"), w("قلب", "heart", "qalb", "❤️"), w("هلال", "crescent", "hilaal", "🌙"),
        w("ثماني", "octagon — like a stop sign", "thumaani", "🛑"),
      ] },
      { id: "solid", en: "Solid shapes", ar: "الأشكال المجسّمة", words: [
        w("مكعب", "cube — like an ice cube", "muka''ab", "🧊"), w("كرة", "sphere — like a ball", "kura", "⚽"),
        w("أسطوانة", "cylinder — like a can", "ustuwaana", "🥫"), w("مخروط", "cone — like an ice-cream cone", "makhruut", "🍦"),
        w("هرم", "pyramid", "haram", "🔺"),
      ] },
    ],
    tipsEn: [
      "Shape hunt: pick one shape, say its Arabic name, and find five around the room. دائرة: the clock, a plate, a button…",
      "Cut shapes from coloured paper and build a picture — a house from a مربع and a مثلث, a sun from a دائرة.",
      "Trace shapes in the air with a finger while saying the name, the same way you trace letters.",
    ],
    tipsAr: [
      "لعبة البحث: اختارا شكلاً وقولا اسمه، ثم ابحثا عن خمسة أشياء بشكله في الغرفة. دائرة: الساعة، والصحن، والزرّ…",
      "قصّا أشكالاً من ورق ملوّن وكوّنا بها صورة: بيت من مربّع ومثلّث، وشمس من دائرة.",
      "ارسما الأشكال في الهواء بالإصبع مع قول الاسم، كما تتتبّعان الحروف.",
    ],
    faq: [
      { qEn: "What are the basic shapes in Arabic?", aEn: "دائرة (circle), مربع (square), مثلث (triangle) and مستطيل (rectangle) are the four to start with. Then add معيّن (diamond), بيضاوي (oval) and نجمة (star).", qAr: "ما الأشكال الأساسية بالعربية؟", aAr: "ابدأ بأربعة: الدائرة، والمربّع، والمثلّث، والمستطيل. ثم أضف المعيّن، والشكل البيضاوي، والنجمة." },
      { qEn: "Why does مثلث sound like ثلاثة?", aEn: "Because it comes from it: a مثلث is the shape with three (ثلاثة) sides, a مربع the shape with four (أربعة). The same pattern gives خماسي (pentagon, five) and سداسي (hexagon, six).", qAr: "لماذا يشبه اسم المثلّث كلمة ثلاثة؟", aAr: "لأنه مأخوذ منها: المثلّث شكل له ثلاثة أضلاع، والمربّع له أربعة، وعلى الوزن نفسه الخماسي (خمسة أضلاع) والسداسي (ستّة)." },
      { qEn: "When do children learn shapes?", aEn: "Many children match a circle, square and triangle between 2 and 3 and start naming them between 3 and 4. Learning the names in two languages does not slow this down.", qAr: "متى يتعلّم الطفل الأشكال؟", aAr: "يطابق كثير من الأطفال الدائرة والمربّع والمثلّث بين سنتين وثلاث، ويبدؤون تسميتها بين ثلاث وأربع سنوات، وتعلّم الأسماء بلغتين لا يؤخّر ذلك." },
    ],
    keywords: ["shapes in arabic for kids", "الأشكال الهندسية للأطفال", "اسماء الاشكال بالعربي", "arabic shape names", "الأشكال الهندسية بالصور"],
  },
];

export const vocabCount = (topic: VocabTopic) => topic.groups.reduce((n, g) => n + (g.phrases ? 0 : g.words.length), 0);

export function getVocabTopic(slug: string) {
  return vocabTopics.find((t) => t.slug === slug);
}
