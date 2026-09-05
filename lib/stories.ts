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
  {
    slug: "al-huut-al-sagheer",
    emoji: "🐋",
    titleEn: "The Little Whale",
    titleAr: "الْحُوتُ الصَّغِير",
    introEn:
      "A little whale wonders what the world above the water looks like. The octopus is busy, the crab is busy — but the turtle knows. Read it, then colour the whale, octopus and turtle in the Sea Animals coloring book.",
    introAr:
      "حوتٌ صغير يتساءل كيف تبدو الدنيا فوق الماء. الأخطبوط مشغول، والسلطعون مشغول — لكنّ السلحفاة تعرف. اقرأوها ثم لوّنوا الحوت والأخطبوط والسلحفاة في كتاب تلوين حيوانات البحر.",
    agesEn: "Ages 3–6",
    agesAr: "من ٣ إلى ٦ سنوات",
    minutesEn: "3 min",
    minutesAr: "٣ دقائق",
    scenes: [
      { emoji: "🌊", ar: "فِي الْبَحْرِ الْوَاسِعِ حُوتٌ صَغِيرٌ مَعَ أُمِّهِ.", translit: "fi-l-baHri-l-waasi'i Huutun Saghiirun ma'a ummih.", en: "In the wide sea there is a little whale with his mother." },
      { emoji: "🤔", ar: "قَالَ الْحُوتُ الصَّغِيرُ: أُرِيدُ أَنْ أَرَى مَا فَوْقَ الْمَاءِ!", translit: "qaala-l-Huutu-S-Saghiiru: uriidu an araa maa fawqa-l-maa'!", en: "The little whale said: I want to see what is above the water!" },
      { emoji: "🐙", ar: "سَأَلَ الْأُخْطَبُوطَ: مَاذَا يُوجَدُ فَوْقَ الْمَاءِ؟", translit: "sa'ala-l-ukhTubuuTa: maadhaa yujadu fawqa-l-maa'?", en: "He asked the octopus: what is above the water?" },
      { emoji: "🪨", ar: "قَالَ الْأُخْطَبُوطُ: لَا أَدْرِي، أَنَا أَخْتَبِئُ بَيْنَ الصُّخُورِ.", translit: "qaala-l-ukhTubuuTu: laa adrii, anaa akhtabii bayna-S-Sukhuur.", en: "The octopus said: I don't know — I hide between the rocks." },
      { emoji: "🦀", ar: "سَأَلَ السَّلْطَعُونَ: مَاذَا يُوجَدُ فَوْقَ الْمَاءِ؟", translit: "sa'ala-s-sulT'uuna: maadhaa yujadu fawqa-l-maa'?", en: "He asked the crab: what is above the water?" },
      { emoji: "🏖️", ar: "قَالَ السَّلْطَعُونُ: لَا أَدْرِي، أَنَا أَمْشِي عَلَى الرَّمْلِ.", translit: "qaala-s-sulT'uuna: laa adrii, anaa amshii 'ala-r-raml.", en: "The crab said: I don't know — I walk on the sand." },
      { emoji: "🐢", ar: "سَأَلَ السَّلْحَفَاةَ، فَقَالَتْ: أَنَا أَعْرِفُ!", translit: "sa'ala-s-sulahfaata, fa qaalat: anaa a'rif!", en: "He asked the turtle, and she said: I know!" },
      { emoji: "☀️", ar: "فَوْقَ الْمَاءِ شَمْسٌ مُشْرِقَةٌ وَسَمَاءٌ زَرْقَاءُ وَطُيُورٌ.", translit: "fawqa-l-maa'i shamsun mushriqatun wa samaa'un zarqaa'u wa Tuyuur.", en: "Above the water there is a shining sun, a blue sky and birds." },
      { emoji: "⛵", ar: "صَعِدَ الْحُوتُ الصَّغِيرُ فَوْقَ الْمَاءِ، فَرِحَ بِالشَّمْسِ.", translit: "sa'ida-l-Huutu-S-Saghiiru fawqa-l-maa'i, faRiHa bi-sh-shams.", en: "The little whale rose above the water and delighted in the sun." },
      { emoji: "🐋", ar: "عَادَ إِلَى أُمِّهِ وَقَالَ: الْبَحْرُ جَمِيلٌ، وَفَوْقَهُ أَجْمَلُ!", translit: "'aada ila ummihii wa qaala:-l-baHru jamiil, wa fawqahu ajmal!", en: "He returned to his mother and said: the sea is beautiful — and above it is even more beautiful!" },
    ],
    moralEn: "Whoever asks questions, arrives. Keep asking — that is how the sea gets bigger.",
    moralAr: "مَنْ سَأَلَ وَصَلَ — فَوَاصِلِ السُّؤَالَ، هَكَذَا يَتَوَسَّعُ الْبَحْرُ.",
  },
  {
    slug: "iidun-saeed",
    emoji: "🎁",
    titleEn: "Happy Eid",
    titleAr: "عِيدٌ سَعِيد",
    introEn:
      "The morning of Eid: new clothes, the Eid prayer, gifts from grandma and balloons in the street. A simple story that walks a child through the day and its words — read it with the Ramadan & Eid coloring book.",
    introAr:
      "صباح العيد: ثوبٌ جديد، وصلاةُ العيد، وهديةٌ من الجدّة، وبالوناتٌ في الشارع. قصة بسيطة تمرّ مع الطفل على يوم العيد وكلماته — اقرأوها مع كتاب تلوين رمضان والعيد.",
    agesEn: "Ages 3–7",
    agesAr: "من ٣ إلى ٧ سنوات",
    minutesEn: "3 min",
    minutesAr: "٣ دقائق",
    scenes: [
      { emoji: "🌙", ar: "انْتَهَى شَهْرُ رَمَضَانَ، وَجَاءَ صَبَاحُ الْعِيدِ.", translit: "intahaa shahru ramaDaana, wa jaa'a Sabaahu-l-'iid.", en: "The month of Ramadan ended, and the morning of Eid arrived." },
      { emoji: "👕", ar: "لَبِسَ سَالِمٌ ثَوْباً جَدِيداً وَحِذَاءً جَدِيداً.", translit: "labisa saalimun thawban jadiidan wa HiDhaa'an jadiid.", en: "Salem put on new clothes and new shoes." },
      { emoji: "🕌", ar: "ذَهَبَ مَعَ أَبِيهِ إِلَى صَلَاةِ الْعِيدِ.", translit: "dhahaba ma'a abiihi ilaa Salaati-l-'iid.", en: "He went with his father to the Eid prayer." },
      { emoji: "🤲", ar: "صَلَّى النَّاسُ مَعاً، ثُمَّ تَبَادَلُوا التَّهَانِي: عِيدٌ سَعِيد!", translit: "Sallaa-n-naasu ma'an, thumma tabaadalu-t-tahaaniiid: 'iidun saeed!", en: "The people prayed together, then exchanged greetings: Happy Eid!" },
      { emoji: "👵", ar: "أَعْطَتْهُ الْجَدَّةُ هَدِيَّةً وَقَالَتْ: كُلُّ عَامٍ وَأَنْتَ بِخَيْر.", translit: "a'Tat-hu-l-jaddatu hadiyyatan wa qaalat: kullu 'aamin wa anta bi-khayr.", en: "Grandma gave him a gift and said: may every year find you well." },
      { emoji: "🎈", ar: "لَعِبَ الْأَطْفَالُ فِي الشَّارِعِ بِالْبَالُونَاتِ الْمُلَوَّنَةِ.", translit: "la'iba-l-aTfaalu fi-sh-shaari'i bi-l-baaluunaati-l-mulawwana.", en: "The children played in the street with colourful balloons." },
      { emoji: "🍪", ar: "وَزَّعَ الْأَهَالِي الحَلَوِيَّاتِ عَلَى الْأَطْفَالِ.", translit: "wazza'a-l-ahaalii-l-Halawiyyaati 'ala-l-aTfaal.", en: "The grown-ups handed out sweets to the children." },
      { emoji: "😊", ar: "عَادَ سَالِمٌ إِلَى الْبَيْتِ فَرِحاً، وَقَالَ: أَجْمَلُ يَوْمٍ!", translit: "'aada saalimun ila-l-bayti fariHan, wa qaala: ajmalu yawm!", en: "Salem came home happy and said: what a wonderful day!" },
    ],
    moralEn: "Eid's joy doubles when it is shared — with family, neighbours and friends.",
    moralAr: "فَرَحُ الْعِيدِ يَتَضَاعَفُ حِينَ نَشْتَرِكُهُ — مَعَ الْأَهْلِ وَالْجِيرَانِ وَالْأَصْدِقَاءِ.",
  },
  {
    slug: "al-ghuraabu-aldhakiy",
    emoji: "🐦",
    titleEn: "The Clever Crow",
    titleAr: "الْغُرَابُ الذَّكِي",
    introEn:
      "A thirsty crow finds a pitcher with just a little water at the bottom. His beak cannot reach it — but his mind can. A timeless fable, retold here in simple, fully vocalised Arabic.",
    introAr:
      "غُرابٌ عطشان يجد إبريقاً فيه ماءٌ قليل في أسفله. منقارُه لا يصل — لكنّ عقله يصل. حكاية خالدة معاد سردُها هنا بعربية بسيطة مشكولة بالكامل.",
    agesEn: "Ages 4–8",
    agesAr: "من ٤ إلى ٨ سنوات",
    minutesEn: "3 min",
    minutesAr: "٣ دقائق",
    scenes: [
      { emoji: "☀️", ar: "فِي يَوْمٍ حَارٍّ، كَانَ غُرَابٌ عَطْشَانُ.", translit: "fii yawmin Haarrin, kaana ghuraabun 'aTshaan.", en: "On a hot day, there was a thirsty crow." },
      { emoji: "🏺", ar: "طَارَ فَوْقَ الْحُقُولِ حَتَّى رَأَى إِبْرِيقاً فِيهِ مَاءٌ.", translit: "Taara fawqa-l-Huquuli Hattaa ra'aa ibriiqan fiihi maa'.", en: "He flew over the fields until he saw a pitcher with water in it." },
      { emoji: "😮", ar: "اقْتَرَبَ مِنَ الْإِبْرِيقِ، لَكِنَّ الْمَاءَ فِي أَسْفَلِهِ!", translit: "iqtaraba mina-l-ibriiqi, laakinna-l-maa'a fii asfalih!", en: "He came close to the pitcher — but the water was at the very bottom!" },
      { emoji: "🤏", ar: "حَاوَلَ أَنْ يَصِلَ بِمِنْقَارِهِ، فَلَمْ يَسْتَطِعْ.", translit: "Haawala an yaSila biminqaarih, fa lam yastaTi'.", en: "He tried to reach it with his beak, but he could not." },
      { emoji: "🤔", ar: "فَكَّرَ الْغُرَابُ وَفَكَّرَ... ثُمَّ رَأَى الْحَصَى عَلَى الْأَرْضِ!", translit: "fakkara-l-ghuraabu wa fakkara... thumma ra'a-l-Hasaa 'ala-l-arD!", en: "The crow thought and thought... then he saw the pebbles on the ground!" },
      { emoji: "🪨", ar: "حَمَلَ حَصَاةً وَأَلْقَاهَا فِي الْإِبْرِيقِ، ثُمَّ أُخْرَى وَأُخْرَى.", translit: "Hamala Hasaatan wa alqaahaa fi-l-ibriiqi, thumma ukhraa wa ukhraa.", en: "He picked up a pebble and dropped it into the pitcher, then another and another." },
      { emoji: "💧", ar: "ارْتَفَعَ الْمَاءُ قَلِيلاً قَلِيلاً حَتَّى بَلَغَ فَمَ الْإِبْرِيقِ.", translit: "irtafa'a-l-maa'u qaliilan qaliilan Hattaa balagha fama-l-ibriiq.", en: "The water rose little by little, until it reached the mouth of the pitcher." },
      { emoji: "💦", ar: "شَرِبَ الْغُرَابُ وَاسْتَرَاحَ، ثُمَّ طَارَ سَعِيداً.", translit: "shariba-l-ghuraabu w-staraaHa, thumma Taara sa'iid.", en: "The crow drank, rested, and flew away happy." },
    ],
    moralEn: "Thinking solves what force cannot.",
    moralAr: "التَّفْكِيرُ يَحُلُّ مَا لَا تَحُلُّهُ الْقُوَّةُ.",
  },
];
