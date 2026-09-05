// lib/stories.ts
//
// Original illustrated mini-stories for beginning Arabic readers.
//
// Imported by BOTH the Next app (app/[locale]/stories) and the story PDF
// generator (scripts/build-stories.mjs), which runs under Node's native TS
// stripping — same discipline as lib/worksheets.ts: data only, no imports.
//
// Writing rules, chosen for a child that is still decoding:
//   - every Arabic sentence carries full tashkeel (harakat), because guessing
//     vowels is exactly what a beginner cannot do yet;
//   - sentences repeat their structures from scene to scene, so confidence
//     grows faster than difficulty;
//   - each sentence is short enough to read aloud in one breath.

export type StoryScene = {
  emoji: string;
  /** Fully vocalised Arabic sentence. */
  ar: string;
  translit: string;
  en: string;
};

export type Story = {
  /** URL slug + PDF basename. */
  slug: string;
  emoji: string;
  titleEn: string;
  titleAr: string;
  introEn: string;
  introAr: string;
  agesEn: string;
  agesAr: string;
  scenes: StoryScene[];
  moralEn: string;
  moralAr: string;
  /** Arabic reading time shown on the card, e.g. "٣ دقائق". */
  minutesEn: string;
  minutesAr: string;
};

export const stories: Story[] = [
  {
    slug: "al-arnab-al-saeed",
    emoji: "🐰",
    titleEn: "The Happy Rabbit",
    titleAr: "الأَرْنَبُ السَّعِيد",
    introEn:
      "A little rabbit wants someone to play with. Every animal in the forest is busy — until he finds a friend where he least expected. A repeating story that teaches forest-animal words and the names of the animals in your Animals coloring book.",
    introAr:
      "أرنبٌ صغير يبحث عمّن يلعب معه. كل حيوانات الغابة مشغولة — حتى وجد صديقاً حيث لا يتوقّع. قصة مكرّرة الأسطر تعلّم أسماء حيوانات الغابة ذاتها الموجودة في كتاب تلوين الحيوانات.",
    agesEn: "Ages 3–6",
    agesAr: "من ٣ إلى ٦ سنوات",
    minutesEn: "3 min",
    minutesAr: "٣ دقائق",
    scenes: [
      { emoji: "🌳", ar: "فِي الْغَابَةِ أَرْنَبٌ صَغِيرٌ.", translit: "fee-l-ghaabati arnabun Saghiir.", en: "In the forest there is a little rabbit." },
      { emoji: "😢", ar: "قَالَ الْأَرْنَبُ: أَنَا وَحْيدٌ. أَيْنَ أَصْدِقَائِي؟", translit: "qaala-l-arnabu: anaa waHid. ayna aSdiqaa'i?", en: "The rabbit said: I am alone. Where are my friends?" },
      { emoji: "🐱", ar: "قَالَ لِلْقِطَّةِ: هَلْ تُرِيدِينَ اللَّعِبَ مَعِي؟", translit: "qaala li-l-qitti: hal turiidiina-l-la'ba ma'i?", en: "He asked the cat: do you want to play with me?" },
      { emoji: "🥛", ar: "قَالَتِ الْقِطَّةُ: لا، أَنَا أَشْرَبُ اللَّبَنَ.", translit: "qaalati-l-qittatu: laa, anaa ashrabu-l-laban.", en: "The cat said: no, I am drinking my milk." },
      { emoji: "🐒", ar: "قَالَ لِلْقِرْدِ: هَلْ تُرِيدُ اللَّعِبَ مَعِي؟", translit: "qaala li-l-qirdi: hal turiidu-l-la'ba ma'i?", en: "He asked the monkey: do you want to play with me?" },
      { emoji: "🍌", ar: "قَالَ الْقِرْدُ: لا، أَنَا آكُلُ الْمَوْزَةَ.", translit: "qaala-l-qirdu: laa, anaa aakulu-l-mawza.", en: "The monkey said: no, I am eating a banana." },
      { emoji: "🐦", ar: "قَالَ لِلْعُصْفُورِ: هَلْ تُرِيدُ اللَّعِبَ مَعِي؟", translit: "qaala li-l-'usfuuri: hal turiidu-l-la'ba ma'i?", en: "He asked the bird: do you want to play with me?" },
      { emoji: "🎵", ar: "قَالَ الْعُصْفُورُ: لا، أَنَا أُغَنِّي فَوْقَ الشَّجَرَةِ.", translit: "qaala-l-'usfuuru: laa, anaa ughannii fawqa-sh-shajarati.", en: "The bird said: no, I am singing on the tree." },
      { emoji: "💧", ar: "جَلَسَ الْأَرْنَبُ عِنْدَ الْبَرْكَةِ، وَهُوَ حَزِينٌ.", translit: "jalasa-l-arnabu 'inda-l-barkati, wa huwa Haziin.", en: "The rabbit sat by the pond, feeling sad." },
      { emoji: "🐟", ar: "قَالَتِ السَّمَكَةُ: أَنَا أُرِيدُ اللَّعِبَ مَعَكَ!", translit: "qaalati-s-samakatu: anaa uriidu-l-la'ba ma'ak!", en: "The fish said: I want to play with you!" },
      { emoji: "😃", ar: "فَرِحَ الْأَرْنَبُ، وَلَعِبا مَعاً عِنْدَ الْبَرْكَةِ.", translit: "faRiHa-l-arnabu, wa la'ibaa ma'an 'inda-l-barkati.", en: "The rabbit was happy, and they played together by the pond." },
      { emoji: "🎉", ar: "ثُمَّ جَاءَتِ الْقِطَّةُ وَالْقِرْدُ وَالْعُصْفُورُ، وَلَعِبُوا جَمِيعاً.", translit: "thumma jaa'ati-l-qittu wa-l-qirdu wa-l-'usfuuru, wa la'ibuu jamiian.", en: "Then the cat, the monkey and the bird came, and they all played together." },
    ],
    moralEn: "A friend is closer than you think — so keep asking, and keep being kind.",
    moralAr: "الصَّدِيقُ أَقْرَبُ مِمَّا تَظُنُّ — فَوَاصِلِ السُّؤَالَ، وَوَاصِلِ الطِّيبَةَ.",
  },
  {
    slug: "al-fanoos-al-sagheer",
    emoji: "🏮",
    titleEn: "The Little Lantern",
    titleAr: "الْفَانُوسُ الصَّغِير",
    introEn:
      "Ramadan is here and Ahmad hangs his little lantern on the door. When guests arrive, he learns that the sweetest part of the month is sharing it. A gentle Ramadan story for the days when the house smells of qatayef.",
    introAr:
      "جاء رمضان، وعقّق أحمد فانوسه الصغير على الباب. وحين حضر الضيوف تعلّم أنّ أجمل ما في الشهر هو مشاركته. قصة رمضانية لطيفة لأيام يكون فيها البيت فوحاه بالقطايف.",
    agesEn: "Ages 4–7",
    agesAr: "من ٤ إلى ٧ سنوات",
    minutesEn: "3 min",
    minutesAr: "٣ دقائق",
    scenes: [
      { emoji: "🌙", ar: "جَاءَ شَهْرُ رَمَضَانَ، وَزَيَّنَ أَحْمَدُ الْمَنْزِلَ.", translit: "jaa'a shahru ramaDaana, wa zayyana aHmadu-l-manzil.", en: "The month of Ramadan came, and Ahmad decorated the house." },
      { emoji: "🏮", ar: "عَلَّقَ فَانُوساً صَغِيراً عَلَى الْبَابِ.", translit: "'allaqa faanuusan Saghiiran 'ala-l-baab.", en: "He hung a little lantern on the door." },
      { emoji: "👵", ar: "قَالَتِ الْجَدَّةُ: الْفَانُوسُ يُضِيءُ الطَّرِيقَ لِلضُّيُوفِ.", translit: "qaalati-l-jaddatu:-l-faanuusu yuDii'u-T-Tariiqa li-D-Duyuuf.", en: "Grandma said: the lantern lights the way for our guests." },
      { emoji: "🥟", ar: "صَنَعَتِ الْأُمُّ قَطَايِفَ لَذِيذَةً فِي الْمَطْبَخِ.", translit: "sana'ati-l-ummu qaTaayifa ladhiidatan fi-l-maTbakh.", en: "Mother made delicious qatayef in the kitchen." },
      { emoji: "🚪", ar: "طَرَقَ الضُّيُوفُ الْبَابَ، فَرِحَ أَحْمَدُ وَرَكَضَ إِلَيْهِمْ.", translit: "Taraqa-D-Duyuufu-l-baaba, faRiHa aHmadu wa rakada ilayhim.", en: "The guests knocked on the door, and Ahmad ran to them, delighted." },
      { emoji: "🍽️", ar: "جَلَسَ الْعَائِلَةُ وَالضُّيُوفُ عَلَى مَائِدَةٍ وَاسِعَةٍ.", translit: "jalasa-l-'aa'ilatu wa-D-Duyuufu 'alaa maa'idatin waasi'a.", en: "The family and the guests sat at a wide table." },
      { emoji: "🤝", ar: "شَارَكَ أَحْمَدُ الْقَطَايِفَ مَعَ صَدِيقِهِ.", translit: "shaaraka aHmadu-l-qaTaayifa ma'a Sadiiqih.", en: "Ahmad shared the qatayef with his friend." },
      { emoji: "😊", ar: "قَالَتِ الْجَدَّةُ: أَلْذُّ طَعَامٍ هُوَ الَّذِي نُشَارِكُهُ.", translit: "qaalati-l-jaddatu: adhdhu Ta'aamin huwa-l-ladhii nushaarikuh.", en: "Grandma said: the tastiest food is the food we share." },
    ],
    moralEn: "Sharing is what turns a good month into a beautiful one.",
    moralAr: "الْمُشَارَكَةُ تَجْعَلُ الشَّهْرَ الْجَمِيلَ أَجْمَلَ.",
  },
  {
    slug: "rihla-ila-l-qamar",
    emoji: "🚀",
    titleEn: "A Trip to the Moon",
    titleAr: "رِحْلَةٌ إِلَى الْقَمَر",
    introEn:
      "Salem builds a rocket from a cardboard box — and travels through the stars to the Moon and back in time for dinner. Read it after our Solar System lesson, then colour the rocket in the Solar System coloring book.",
    introAr:
      "صنع سالم صاروخاً من كرتونة — وسافر بين النجوم إلى القمر وعاد قبل العشاء. اقرأوها بعد درس المجموعة الشمسية، ثم لوّنوا الصاروخ في كتاب تلوين المجموعة الشمسية.",
    agesEn: "Ages 4–7",
    agesAr: "من ٤ إلى ٧ سنوات",
    minutesEn: "4 min",
    minutesAr: "٤ دقائق",
    scenes: [
      { emoji: "📦", ar: "صَنَعَ سَالِمٌ صَارُوخاً مِنْ كَارْتُونَةٍ كَبِيرَةٍ.", translit: "sana'a saalimun Saaruukhan min kaartuunatin kabiira.", en: "Salem made a rocket from a big cardboard box." },
      { emoji: "🚀", ar: "صَعِدَ إِلَى الصَّارُوخِ وَقَالَ: انْطِلَاق!", translit: "sa'ida ila-S-Saaruukhi wa qaala: inTilaaq!", en: "He climbed into the rocket and said: liftoff!" },
      { emoji: "⭐", ar: "رَأَى النُّجُومَ تَتَلَأْلَأُ حَوْلَهُ.", translit: "ra'a-n-nujuuma tatala'lalu Hawlah.", en: "He saw the stars twinkling around him." },
      { emoji: "🪐", ar: "رَأَى زُحَلَ وَخَاتَمَهُ الْجَمِيلَ.", translit: "ra'a zuHala wa khaatamahu-l-jamiil.", en: "He saw Saturn and its beautiful ring." },
      { emoji: "🌕", ar: "وَصَلَ سَالِمٌ إِلَى الْقَمَرِ.", translit: "waSala saalimun ila-l-qamar.", en: "Salem reached the Moon." },
      { emoji: "🏃", ar: "قَفَزَ عَلَى الْقَمَرِ، فَهُوَ يَطِيرُ كَالطَّائِرِ.", translit: "qafaza 'ala-l-qamari, fa huwa yatiiru ka-T-Taa'ir.", en: "He bounced on the Moon, flying like a bird with every jump." },
      { emoji: "🌍", ar: "نَظَرَ إِلَى الْأَرْضِ وَقَالَ: كَوْكَبُنَا جَمِيلٌ!", translit: "naZara ila-l-arDi wa qaala: kawkabunaa jamiil!", en: "He looked at the Earth and said: our planet is beautiful!" },
      { emoji: "🏠", ar: "عَادَ إِلَى بَيْتِهِ وَحَكَى لِأُمِّهِ كُلَّ شَيْءٍ.", translit: "'aada ila baytihi wa Haka li-ummihii kulla shay'.", en: "He came home and told his mother everything." },
    ],
    moralEn: "Every big dream starts with one small, cardboard step.",
    moralAr: "كُلُّ حُلْمٍ كَبِيرٍ يَبْدَأُ بِخُطْوَةٍ صَغِيرَةٍ.",
  },
];
