// lib/gradePages.ts
//
// Grade-level landing pages: /printables/preschool, /kindergarten, /grade-1.
// Each is a curated, ordered view of packs that already exist — no new PDFs —
// so a parent or teacher searching by year finds a starting point instead of a
// library of 20 packs.
//
// Search Console (Oct 2026): "free arabic worksheets for grade 1 pdf" (64
// impressions, pos 3.4), "arabic letters worksheets for kindergarten" (70,
// pos 3.2), "أوراق عمل للاطفال عمر 5 سنوات pdf" — all landing on the hub,
// which answers none of them directly. "KG1/KG2" is how Gulf schools name the
// kindergarten years.
//
// Served by app/[locale]/printables/[slug] alongside the pack pages; slugs must
// not collide with pack ids (tests/gradePages.test.ts checks).

export type GradePage = {
  slug: string;
  emoji: string;
  h1En: string;
  h1Ar: string;
  seoTitleEn: string;
  seoTitleAr: string;
  seoDescEn: string;
  seoDescAr: string;
  keywords: string[];
  ageEn: string;
  ageAr: string;
  /** Two short paragraphs; the first answers the search directly. */
  introEn: string[];
  introAr: string[];
  /** What a child at this level can usually do — sets expectations. */
  canDoEn: string[];
  canDoAr: string[];
  /** Packs in the order to use them, each with why it fits this age. */
  packs: { id: string; whyEn: string; whyAr: string }[];
  plan: { en: string; ar: string }[];
  faq: { qEn: string; qAr: string; aEn: string; aAr: string }[];
};

export const gradePages: GradePage[] = [
  {
    slug: "preschool",
    emoji: "🧸",
    h1En: "Arabic Worksheets for Preschool (Ages 3–4)",
    h1Ar: "أوراق عمل عربية لما قبل الروضة (من 3 إلى 4 سنوات)",
    seoTitleEn: "Free Arabic Worksheets for Preschool (Ages 3–4) — Printable PDFs",
    seoTitleAr: "أوراق عمل عربية مجانية لما قبل الروضة (3–4 سنوات) — PDF للطباعة",
    seoDescEn:
      "Free Arabic printables for 3- and 4-year-olds: big-letter colouring, colours, animals, numbers 1–10 and a wall chart — chosen for small hands that are not ready to trace yet. PDF, no signup.",
    seoDescAr:
      "أوراق عربية مجانية لأطفال 3 و4 سنوات: تلوين الحروف الكبيرة والألوان والحيوانات والأرقام 1–10 ولوحة للجدار — مختارة لأيدٍ صغيرة لم تستعدّ للتتبّع بعد. PDF بلا تسجيل.",
    keywords: [
      "arabic worksheets for preschool",
      "arabic worksheets for 3 year olds",
      "arabic printables for toddlers",
      "أوراق عمل عربية لما قبل الروضة",
      "أوراق عمل للأطفال عمر 3 سنوات pdf",
    ],
    ageEn: "Ages 3–4",
    ageAr: "من 3 إلى 4 سنوات",
    introEn: [
      "At three and four, Arabic worksheets should be mostly colouring and naming, not writing. These nine free packs are the ones that work at this age: big shapes to colour, one Arabic word per page, and numbers counted with circles rather than written.",
      "Expect scribbles outside the lines and pages abandoned halfway. That is normal. What matters at this age is that the child hears the Arabic word while their hands are busy.",
    ],
    introAr: [
      "في الثالثة والرابعة ينبغي أن تكون أوراق العمل العربية تلويناً وتسمية أكثر منها كتابة. وهذه الحزم التسع المجانية هي ما ينجح في هذه السنّ: أشكال كبيرة للتلوين، وكلمة عربية واحدة في كلّ صفحة، وأرقام تُعدّ بالدوائر لا تُكتب.",
      "توقّعوا خطوطاً خارج الرسم وصفحات تُترك في منتصفها، فهذا طبيعيّ. والمهمّ في هذه السنّ أن يسمع الطفل الكلمة العربية ويداه مشغولتان.",
    ],
    canDoEn: [
      "Colour a large shape with a chunky crayon, mostly inside the lines.",
      "Point to a letter on a chart when you name it, and say a few letter names back.",
      "Count up to five objects, sometimes ten, and repeat Arabic number words after you.",
      "Name colours and animals in Arabic after hearing them a few times.",
    ],
    canDoAr: [
      "يلوّن شكلاً كبيراً بقلم شمعيّ غليظ، داخل الخطوط في الغالب.",
      "يشير إلى الحرف في اللوحة حين تسمّيه، ويردّد أسماء بعض الحروف.",
      "يعدّ حتى خمسة أشياء، وأحياناً حتى عشرة، ويردّد أسماء الأعداد بالعربية.",
      "يسمّي الألوان والحيوانات بالعربية بعد سماعها مرّات قليلة.",
    ],
    packs: [
      { id: "arabic-alphabet-chart", whyEn: "One page on the wall. Point and name a letter a day; no writing needed.", whyAr: "صفحة واحدة على الجدار. أشيروا إلى حرف كلّ يوم وسمّوه، بلا كتابة." },
      { id: "arabic-alphabet-coloring", whyEn: "Each letter as a big bubble shape to colour — the first contact with letter shapes, through colouring rather than tracing.", whyAr: "كلّ حرف شكلاً كبيراً مفرّغاً للتلوين — أوّل لقاء بأشكال الحروف عبر التلوين لا التتبّع." },
      { id: "arabic-colors", whyEn: "One colour and one shape per page: colour it, say the Arabic name.", whyAr: "لون واحد وشكل واحد في كلّ صفحة: لوّنه وقل اسمه بالعربية." },
      { id: "arabic-animals-coloring", whyEn: "Animals are the words three-year-olds most want to name.", whyAr: "الحيوانات أكثر ما يحبّ ابن الثالثة أن يسمّيه." },
      { id: "arabic-fruits-vegetables-coloring", whyEn: "Food words get used at every meal, so they stick.", whyAr: "كلمات الطعام تُستعمل في كلّ وجبة فتثبت." },
      { id: "arabic-body-parts-coloring", whyEn: "Touch the part, colour it, say it — words learned with the whole body.", whyAr: "المس الجزء، ولوّنه، وقله — كلمات تُتعلّم بالجسم كلّه." },
      { id: "arabic-numbers-tracing", whyEn: "Use the counting circles and the drawing box; skip the writing rows until four or five.", whyAr: "استعملوا دوائر العدّ ومربّع الرسم، واتركوا أسطر الكتابة حتى الرابعة أو الخامسة." },
      { id: "arabic-alphabet-flashcards", whyEn: "Picture cards to hold up and name — a game, not a lesson.", whyAr: "بطاقات مصوّرة تُرفع وتُسمّى — لعبة لا درس." },
      { id: "arabic-sea-animals-coloring", whyEn: "A second set of animals for when the first is finished.", whyAr: "مجموعة حيوانات ثانية بعد إتمام الأولى." },
    ],
    plan: [
      { en: "Week 1 — pin up the alphabet chart; colour two animals and two colours.", ar: "الأسبوع 1 — علّقوا لوحة الحروف، ولوّنوا حيوانين ولونين." },
      { en: "Week 2 — one bubble letter a day from the alphabet colouring book (start with the letters in the child's name).", ar: "الأسبوع 2 — حرف مفرّغ كلّ يوم من كتاب تلوين الحروف (ابدأوا بحروف اسم الطفل)." },
      { en: "Week 3 — numbers 1–5 with the counting circles; fruits and vegetables at snack time.", ar: "الأسبوع 3 — الأرقام 1–5 بدوائر العدّ، والفواكه والخضروات وقت الوجبة." },
      { en: "Week 4 — body parts, then let the child choose any page they want to repeat.", ar: "الأسبوع 4 — أعضاء الجسم، ثمّ دعوا الطفل يختار ما يريد إعادته." },
    ],
    faq: [
      {
        qEn: "Can a 3-year-old use Arabic tracing worksheets?",
        qAr: "هل يستطيع ابن الثالثة استعمال أوراق التتبّع؟",
        aEn: "Most three-year-olds are not ready to trace letters with a pencil. Colouring big letter shapes and tracing with a finger work better; real pencil tracing usually starts around four.",
        aAr: "أكثر أبناء الثالثة غير مستعدّين لتتبّع الحروف بالقلم. وتلوين أشكال الحروف الكبيرة وتتبّعها بالإصبع أنفع، أمّا التتبّع بالقلم فيبدأ غالباً نحو الرابعة.",
      },
      {
        qEn: "How long should an Arabic activity last at this age?",
        qAr: "كم ينبغي أن يدوم النشاط العربي في هذه السنّ؟",
        aEn: "Five to ten minutes. Stop while the child still wants more — the next session goes better than if you stop after they lose interest.",
        aAr: "من خمس دقائق إلى عشر. توقّفوا والطفل ما زال يريد المزيد — فتكون الجلسة التالية أفضل ممّا لو توقّفتم بعد أن يملّ.",
      },
    ],
  },
  {
    slug: "kindergarten",
    emoji: "🎒",
    h1En: "Arabic Worksheets for Kindergarten (KG1 & KG2, Ages 4–6)",
    h1Ar: "أوراق عمل عربية لرياض الأطفال (KG1 وKG2، من 4 إلى 6 سنوات)",
    seoTitleEn: "Free Arabic Worksheets for Kindergarten (KG1, KG2) — Printable PDF",
    seoTitleAr: "أوراق عمل عربية مجانية لرياض الأطفال (KG1 وKG2) — PDF للطباعة",
    seoDescEn:
      "Free Arabic kindergarten worksheets for KG1 and KG2 (ages 4–6): letter tracing for all 28 letters, the alphabet chart, numbers 1–10, colours and, for KG2, letters with harakat. In teaching order, with a 4-week plan. PDF, no signup.",
    seoDescAr:
      "أوراق عمل عربية مجانية لرياض الأطفال KG1 وKG2 (من 4 إلى 6 سنوات): تتبّع الحروف الـ28 ولوحة الحروف والأرقام 1–10 والألوان، والحروف بالحركات لـKG2. بترتيب تعليميّ مع خطّة لأربعة أسابيع. PDF بلا تسجيل.",
    keywords: [
      "arabic worksheets for kindergarten",
      "arabic letters worksheets for kindergarten",
      "arabic worksheets kg1",
      "arabic worksheets kg2",
      "أوراق عمل عربي لرياض الأطفال pdf",
      "أوراق عمل للاطفال عمر 5 سنوات pdf",
      "أوراق عمل kg1 عربي",
    ],
    ageEn: "Ages 4–6",
    ageAr: "من 4 إلى 6 سنوات",
    introEn: [
      "Kindergarten is when Arabic letters move from colouring to tracing. These free packs cover the kindergarten years in order: KG1 (about age 4–5) learns letter shapes and sounds; KG2 (about 5–6) traces every letter in its four forms and starts reading letters with fatha, kasra and damma.",
      "Every pack is a direct PDF download. Print one sheet at a time — one letter a day takes a child through the alphabet in about six weeks.",
    ],
    introAr: [
      "الروضة هي المرحلة التي تنتقل فيها الحروف العربية من التلوين إلى التتبّع. وهذه الحزم المجانية تغطّي سنتي الروضة بالترتيب: في KG1 (نحو 4–5 سنوات) يتعلّم الطفل أشكال الحروف وأصواتها، وفي KG2 (نحو 5–6 سنوات) يتتبّع كلّ حرف بأشكاله الأربعة ويبدأ قراءة الحروف بالفتحة والكسرة والضمة.",
      "كلّ حزمة ملف PDF يُحمَّل مباشرة. اطبعوا ورقة واحدة في المرّة — فحرف كلّ يوم يمرّ بالطفل على الأبجدية في نحو ستّة أسابيع.",
    ],
    canDoEn: [
      "KG1: hold a pencil and stay near a dotted line; recognise and name most letters; count to ten.",
      "KG1: write the first letter of their own name with help.",
      "KG2: trace all 28 letters and notice that a letter changes shape inside a word.",
      "KG2: read a letter with fatha, kasra or damma (بَ بِ بُ) and write numbers 1–10.",
    ],
    canDoAr: [
      "KG1: يمسك القلم ويبقى قرب الخطّ المنقّط، ويعرف أكثر الحروف ويسمّيها، ويعدّ حتى عشرة.",
      "KG1: يكتب أوّل حرف من اسمه بمساعدة.",
      "KG2: يتتبّع الحروف الـ28 كلّها ويلاحظ أنّ الحرف يتغيّر شكله داخل الكلمة.",
      "KG2: يقرأ الحرف بالفتحة والكسرة والضمة (بَ بِ بُ) ويكتب الأرقام 1–10.",
    ],
    packs: [
      { id: "arabic-alphabet-chart", whyEn: "The reference on the wall for both years.", whyAr: "المرجع على الجدار للسنتين." },
      { id: "arabic-alphabet-tracing", whyEn: "The core of kindergarten Arabic: one page per letter with its four forms and graded tracing rows.", whyAr: "قلب العربية في الروضة: صفحة لكلّ حرف بأشكاله الأربعة وأسطر تتبّع متدرّجة." },
      { id: "arabic-alphabet-coloring", whyEn: "KG1: colour the letter before tracing it — the shape is learned twice.", whyAr: "KG1: لوّنوا الحرف قبل تتبّعه — فيُتعلّم شكله مرّتين." },
      { id: "arabic-alphabet-flashcards", whyEn: "Quick recognition games between worksheets: say the sound, find the card.", whyAr: "ألعاب تعرّف سريعة بين الأوراق: انطق الصوت وجد البطاقة." },
      { id: "arabic-numbers-tracing", whyEn: "Numbers 1–10: count, trace and write each one, with its Arabic name.", whyAr: "الأرقام 1–10: عدّ وتتبّع وكتابة لكلّ رقم مع اسمه بالعربية." },
      { id: "arabic-colors", whyEn: "Colour words to trace in Arabic and English.", whyAr: "كلمات الألوان للتتبّع بالعربية والإنجليزية." },
      { id: "arabic-opposites-coloring", whyEn: "Pairs like big and small — the first describing words.", whyAr: "أزواج مثل كبير وصغير — أولى كلمات الوصف." },
      { id: "arabic-letters-harakat", whyEn: "KG2: every letter with fatha, kasra, damma and sukoon — the step from letters to reading.", whyAr: "KG2: كلّ حرف بالفتحة والكسرة والضمة والسكون — الخطوة من الحروف إلى القراءة." },
      { id: "arabic-4-line-copybook", whyEn: "KG2: each letter on 4-line ruling, so it sits on the line at the right size.", whyAr: "KG2: كلّ حرف على الأسطر الأربعة، ليجلس على السطر بالحجم الصحيح." },
      { id: "arabic-seasons-coloring", whyEn: "A calm colouring pack for the end of a session.", whyAr: "حزمة تلوين هادئة لختام الجلسة." },
    ],
    plan: [
      { en: "Week 1 — alphabet chart on the wall; trace ا ب ت ث, one a day, saying the sound each time.", ar: "الأسبوع 1 — لوحة الحروف على الجدار؛ تتبّعوا ا ب ت ث، حرفاً كلّ يوم مع نطق الصوت كلّ مرّة." },
      { en: "Week 2 — four more letters, starting with the ones in the child's name; numbers 1–3.", ar: "الأسبوع 2 — أربعة حروف أخرى، بدءاً بحروف اسم الطفل؛ والأرقام 1–3." },
      { en: "Week 3 — four more letters; numbers 4–6; colours on a quiet afternoon.", ar: "الأسبوع 3 — أربعة حروف أخرى؛ والأرقام 4–6؛ والألوان في عصر هادئ." },
      { en: "Week 4 — four more letters, then (KG2) read the first rows of the letters-with-harakat chart: بَ بِ بُ.", ar: "الأسبوع 4 — أربعة حروف أخرى، ثمّ (KG2) اقرأوا أوّل صفوف لوحة الحروف بالحركات: بَ بِ بُ." },
    ],
    faq: [
      {
        qEn: "What Arabic should a child know by the end of kindergarten?",
        qAr: "ماذا ينبغي أن يعرف الطفل من العربية بنهاية الروضة؟",
        aEn: "Most kindergarten programmes aim for children to recognise and write all 28 letters, know their sounds, read letters with the three short vowels, and count and write numbers to ten. Every school differs, so treat this as a direction, not a test.",
        aAr: "تهدف أكثر برامج الروضة إلى أن يعرف الطفل الحروف الـ28 ويكتبها ويعرف أصواتها، ويقرأ الحروف بالحركات القصيرة الثلاث، ويعدّ الأرقام حتى عشرة ويكتبها. والمدارس تختلف، فاعتبروا هذا اتجاهاً لا امتحاناً.",
      },
      {
        qEn: "What is the difference between KG1 and KG2 in Arabic?",
        qAr: "ما الفرق بين KG1 وKG2 في العربية؟",
        aEn: "KG1 (around age 4–5) focuses on letter shapes, sounds and names; KG2 (around 5–6) adds writing every letter, the four letter forms and reading letters with harakat, as a bridge to first grade.",
        aAr: "يركّز KG1 (نحو 4–5 سنوات) على أشكال الحروف وأصواتها وأسمائها، ويضيف KG2 (نحو 5–6 سنوات) كتابة كلّ حرف وأشكاله الأربعة وقراءة الحروف بالحركات، جسراً إلى الصفّ الأوّل.",
      },
      {
        qEn: "Can teachers print these for a whole class?",
        qAr: "هل يطبعها المعلّمون لصفّ كامل؟",
        aEn: "Yes — print and photocopy as many as your class needs. Please link to this page rather than re-uploading the files, so families always get the current version.",
        aAr: "نعم — اطبعوا وصوّروا ما يحتاجه صفّكم. ونرجو أن تشاركوا رابط هذه الصفحة بدل رفع الملفّات في مكان آخر، ليحصل الأهل دائماً على النسخة الحالية.",
      },
    ],
  },
  {
    slug: "grade-1",
    emoji: "📘",
    h1En: "Arabic Worksheets for Grade 1 (Ages 6–7)",
    h1Ar: "أوراق عمل عربية للصفّ الأوّل (من 6 إلى 7 سنوات)",
    seoTitleEn: "Free Arabic Worksheets for Grade 1 PDF — Harakat, Tanween & More",
    seoTitleAr: "أوراق عمل عربية مجانية للصف الأول PDF — الحركات والتنوين وأكثر",
    seoDescEn:
      "Free Arabic worksheets for first grade (ages 6–7): short vowels, letters with harakat, tanween, numbers 11–20 and opposites, in teaching order with a 4-week plan. Printable PDFs, no signup.",
    seoDescAr:
      "أوراق عمل عربية مجانية للصف الأول (6–7 سنوات): الحركات القصيرة، والحروف بالحركات، والتنوين، والأرقام 11–20، والمتضادّات، بترتيب تعليميّ مع خطّة لأربعة أسابيع. ملفات PDF بلا تسجيل.",
    keywords: [
      "free arabic worksheets for grade 1 pdf",
      "arabic worksheets for grade 1",
      "first grade arabic worksheets",
      "أوراق عمل عربي للصف الأول pdf",
      "أوراق عمل لغة عربية صف أول",
    ],
    ageEn: "Ages 6–7",
    ageAr: "من 6 إلى 7 سنوات",
    introEn: [
      "In Grade 1 Arabic moves from letters to reading: short vowels (harakat), sukoon, tanween, and joining letters into words. These free worksheets cover that step in order, from reading بَ بِ بُ to telling كتابٌ from كتابًا.",
      "If a child is still unsure of some letter shapes, start with the alphabet tracing pack for those letters first — reading goes faster once every letter is automatic.",
    ],
    introAr: [
      "في الصفّ الأوّل تنتقل العربية من الحروف إلى القراءة: الحركات القصيرة، والسكون، والتنوين، ووصل الحروف كلمات. وهذه الأوراق المجانية تغطّي هذه الخطوة بالترتيب، من قراءة بَ بِ بُ إلى التمييز بين كتابٌ وكتابًا.",
      "وإن كان الطفل ما يزال متردّداً في أشكال بعض الحروف، فابدأوا بحزمة تتبّع الحروف لتلك الحروف أوّلاً — فالقراءة أسرع حين يصبح كلّ حرف تلقائياً.",
    ],
    canDoEn: [
      "Read any letter with fatha, kasra, damma or sukoon.",
      "Tell the three tanween endings apart and read short words with them.",
      "Write the letters in their joined forms and copy short words.",
      "Count, read and write numbers to twenty.",
    ],
    canDoAr: [
      "يقرأ أيّ حرف بالفتحة أو الكسرة أو الضمة أو السكون.",
      "يميّز أنواع التنوين الثلاثة ويقرأ كلمات قصيرة بها.",
      "يكتب الحروف بأشكالها المتّصلة وينسخ كلمات قصيرة.",
      "يعدّ الأرقام حتى عشرين ويقرأها ويكتبها.",
    ],
    packs: [
      { id: "arabic-harakat", whyEn: "Fatha, kasra, damma, sukoon and tanween — one sheet each, on real letters.", whyAr: "الفتحة والكسرة والضمة والسكون والتنوين — ورقة لكلّ منها على حروف حقيقية." },
      { id: "arabic-letters-harakat", whyEn: "All 28 letters with every short vowel: read a row a day, then trace it.", whyAr: "الحروف الـ28 بكلّ حركة: اقرأوا صفّاً كلّ يوم ثمّ تتبّعوه." },
      { id: "arabic-tanween", whyEn: "The three tanween endings on the same word — كتابٌ، كتابًا، كتابٍ.", whyAr: "أنواع التنوين الثلاثة على الكلمة نفسها — كتابٌ، كتابًا، كتابٍ." },
      { id: "arabic-alphabet-tracing", whyEn: "Revision for any letter that is still slow, with its four joined forms.", whyAr: "مراجعة لأيّ حرف ما زال بطيئاً، مع أشكاله الأربعة المتّصلة." },
      { id: "arabic-4-line-copybook", whyEn: "Neat handwriting on 4-line ruling — letter size and the baseline, which first-grade copying needs.", whyAr: "خطّ مرتّب على الأسطر الأربعة — حجم الحرف والسطر، وهما ما يحتاجه النسخ في الصفّ الأوّل." },
      { id: "arabic-numbers-11-20", whyEn: "Numbers 11–20 with their Arabic names to trace.", whyAr: "الأرقام 11–20 مع أسمائها العربية للتتبّع." },
      { id: "arabic-opposites-coloring", whyEn: "Word pairs to read and trace — a step towards reading whole words.", whyAr: "أزواج كلمات للقراءة والتتبّع — خطوة نحو قراءة الكلمات كاملة." },
      { id: "arabic-complete-workbook", whyEn: "Everything above and more in one PDF, for a term's printing in one go.", whyAr: "كلّ ما سبق وأكثر في ملف واحد، لطباعة فصل دراسيّ دفعة واحدة." },
    ],
    plan: [
      { en: "Week 1 — the fatha, kasra and damma sheets; read the first rows of the letters-with-harakat chart aloud every day.", ar: "الأسبوع 1 — أوراق الفتحة والكسرة والضمة؛ واقرأوا أوّل صفوف لوحة الحروف بالحركات بصوت عالٍ كلّ يوم." },
      { en: "Week 2 — sukoon; finish reading the chart; trace its first page.", ar: "الأسبوع 2 — السكون؛ وأكملوا قراءة اللوحة؛ وتتبّعوا صفحتها الأولى." },
      { en: "Week 3 — the three tanween sheets; numbers 11–15.", ar: "الأسبوع 3 — أوراق التنوين الثلاث؛ والأرقام 11–15." },
      { en: "Week 4 — numbers 16–20; opposites pairs to read; revise any slow letters.", ar: "الأسبوع 4 — الأرقام 16–20؛ وأزواج المتضادّات للقراءة؛ ومراجعة أيّ حرف بطيء." },
    ],
    faq: [
      {
        qEn: "What do children learn in Grade 1 Arabic?",
        qAr: "ماذا يتعلّم الأطفال في العربية في الصفّ الأوّل؟",
        aEn: "Typically: reading letters with the short vowels and sukoon, tanween, long vowels with alif, waw and ya, joining letters into words, and reading short sentences. Numbers usually go up to twenty and beyond.",
        aAr: "عادةً: قراءة الحروف بالحركات القصيرة والسكون، والتنوين، والمدود بالألف والواو والياء، ووصل الحروف كلمات، وقراءة جمل قصيرة. وتصل الأرقام غالباً إلى عشرين وأكثر.",
      },
      {
        qEn: "My child is in Grade 1 but still mixes up letters. Where should we start?",
        qAr: "طفلي في الصفّ الأوّل وما زال يخلط بين الحروف. من أين نبدأ؟",
        aEn: "Start with the alphabet tracing pages for just the letters they mix up — often look-alikes such as ب ت ث or ح ج خ — and use the dots to tell them apart. Move on to harakat once those are steady.",
        aAr: "ابدأوا بصفحات تتبّع الحروف للحروف التي يخلط بينها فقط — وهي غالباً المتشابهة مثل ب ت ث أو ح ج خ — واستعملوا النقاط للتمييز بينها. ثمّ انتقلوا إلى الحركات حين تثبت.",
      },
    ],
  },
];

export function getGradePage(slug: string): GradePage | undefined {
  return gradePages.find((g) => g.slug === slug);
}
