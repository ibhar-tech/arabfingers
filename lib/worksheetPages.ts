// lib/worksheetPages.ts
//
// Landing-page content for each printable pack — one page per pack, so each can
// answer its own search intent instead of six packs sharing /printables.
//
// Search Console (19 May – 18 Aug 2026) is the reason this file exists: /printables
// took 787 of the site's 872 clicks while ranking 4.5–6.5 for DOZENS of distinct
// queries — "arabic alphabet tracing worksheets pdf", "arabic numbers tracing",
// "arabic alphabet chart pdf" — each of which wants a different page. One URL was
// competing with itself. The `keywords` on each entry are the real query clusters
// from that export, not guesses.
//
// Kept out of worksheets.ts on purpose: that file is imported by the PDF generator
// (scripts/build-worksheets.mjs) under Node's TS stripping, and it should stay the
// small data contract the generator needs.

export type WorksheetPage = {
  /** Matches WorksheetSet.id. */
  id: string;
  seoTitleEn: string;
  seoTitleAr: string;
  seoDescEn: string;
  seoDescAr: string;
  keywords: string[];
  /** One-line promise under the H1. */
  taglineEn: string;
  taglineAr: string;
  /** What is actually printed on the pages. */
  insideEn: string[];
  insideAr: string[];
  /** Two or three paragraphs: how to actually use it with a child. */
  useEn: string[];
  useAr: string[];
  faq: { qEn: string; qAr: string; aEn: string; aAr: string }[];
};

export const worksheetPages: WorksheetPage[] = [
  {
    id: "arabic-alphabet-tracing",
    seoTitleEn: "Free Arabic Alphabet Tracing Worksheets PDF — All 28 Letters",
    seoTitleAr: "أوراق تتبّع الحروف العربية PDF مجاناً — الحروف الـ٢٨ كاملة",
    seoDescEn:
      "Download 28 free Arabic letter tracing worksheets as one PDF — a full page per letter with its four joined forms, three graded tracing rows and two example words. No email, no signup.",
    seoDescAr:
      "حمّل ٢٨ ورقة تتبّع للحروف العربية في ملف PDF واحد — صفحة كاملة لكل حرف مع أشكاله الأربعة وثلاثة صفوف تتبّع متدرّجة وكلمتين للتتبّع. بلا بريد إلكتروني وبلا تسجيل.",
    keywords: [
      "arabic alphabet tracing worksheets pdf",
      "free arabic letters worksheets pdf",
      "tracing arabic letters pdf",
      "arabic alphabet writing practice worksheets pdf",
      "arabic letter tracing worksheets pdf",
      "أوراق تتبّع الحروف العربية pdf",
      "تمارين كتابة الحروف العربية للأطفال",
    ],
    taglineEn: "One page per letter. Twenty-eight pages. Free, and nothing to sign up for.",
    taglineAr: "صفحة لكل حرف. ثمانٍ وعشرون صفحة. مجاناً وبلا تسجيل.",
    insideEn: [
      "The letter printed large at the top, in a proper Naskh face — the shape a child is actually taught to write, not a decorative display font.",
      "All four joined forms side by side: isolated, initial, medial and final, so the child sees from the first day that Arabic letters change shape inside a word.",
      "Three tracing rows that get progressively fainter — solid guide, dotted guide, then an empty line to write unaided.",
      "Two example words per letter, each with a picture, so the letter arrives attached to a meaning rather than as an abstract shape.",
    ],
    insideAr: [
      "الحرف مطبوعاً كبيراً في أعلى الصفحة بخطّ نسخيّ صحيح — الشكل الذي يُعلَّم الطفل كتابته فعلاً لا خطّاً زخرفياً.",
      "أشكاله الأربعة متجاورة: مفرداً وأوّلاً ووسطاً وآخراً، ليرى الطفل من اليوم الأوّل أنّ الحرف العربيّ يتغيّر شكله داخل الكلمة.",
      "ثلاثة صفوف تتبّع يخفّ فيها الدليل تدريجياً: خطّ متّصل، ثمّ منقّط، ثمّ سطر فارغ يكتب فيه وحده.",
      "كلمتان مثالاً لكلّ حرف مع صورة، ليأتي الحرف مقترناً بمعنى لا شكلاً مجرّداً.",
    ],
    useEn: [
      "Print one letter at a time, not the whole pack. A single sheet on the table looks like an activity; twenty-eight stapled together look like homework, and a four-year-old can tell the difference from across the room.",
      "Follow the alphabet order for the first ten or so letters, then let your child pick. The letters in their own name are the ones they will ask for, and a child tracing their initial is practising for reasons that belong to them rather than to you.",
      "Say the letter's sound each time they trace it — not its name, its sound. Tracing builds the motor memory; saying it aloud is what ties that memory to the sound the letter makes in a word.",
    ],
    useAr: [
      "اطبع حرفاً واحداً في المرّة لا الحزمة كلّها. فالورقة الواحدة على الطاولة تبدو نشاطاً، وثمانٍ وعشرون مدبّسة تبدو واجباً، وابن الرابعة يميّز بينهما من آخر الغرفة.",
      "اتبع ترتيب الأبجدية في العشرة الأولى تقريباً، ثمّ دَعِ الطفل يختار. فحروف اسمه هي التي سيطلبها، والطفل الذي يتتبّع أوّل حرف من اسمه يتدرّب لسببٍ يخصّه هو لا يخصّك أنت.",
      "انطق صوت الحرف في كلّ مرّة يتتبّعه — صوته لا اسمه. فالتتبّع يبني الذاكرة الحركية، والنطق بصوت عالٍ هو ما يربط تلك الذاكرة بالصوت الذي يؤدّيه الحرف في الكلمة.",
    ],
    faq: [
      {
        qEn: "What age are these for?",
        qAr: "لأيّ عمر هذه الأوراق؟",
        aEn: "Four to seven is the sweet spot, because that is when most children can hold a pencil steadily enough to stay near a line. A three-year-old can still enjoy them with a thick crayon — just do not expect the tracing to land inside the guide, and do not point it out when it doesn't.",
        aAr: "من الرابعة إلى السابعة هو الأنسب، لأنّ أكثر الأطفال في هذه السنّ يمسكون القلم بثبات يكفي للبقاء قرب الخطّ. وابن الثالثة قد يستمتع بها بقلم شمعيّ غليظ — لكن لا تتوقّع أن يقع التتبّع داخل الدليل، ولا تنبّهه حين لا يقع.",
      },
      {
        qEn: "Do I need an account or an email address?",
        qAr: "هل أحتاج حساباً أو بريداً إلكترونياً؟",
        aEn: "No. The PDF is a plain file on this site — click and it downloads. There is no email form, no account, and no tracking pixel in the file.",
        aAr: "لا. الملف موجود على هذا الموقع مباشرة — تضغط فيُحمَّل. لا استمارة بريد ولا حساب ولا أيّ أداة تتبّع داخل الملف.",
      },
      {
        qEn: "Can I print these for my whole class?",
        qAr: "هل أطبعها لصفّي كلّه؟",
        aEn: "Yes. Print as many copies as you need for a classroom, a mosque school or a family. The only thing we ask is that you do not sell them or host the file elsewhere as your own.",
        aAr: "نعم. اطبع ما تشاء من النسخ لصفّ أو مدرسة أو أسرة. وإنّما نطلب ألّا تبيعها ولا تنشر الملف في مكان آخر منسوباً إليك.",
      },
    ],
  },

  {
    id: "arabic-alphabet-chart",
    seoTitleEn: "Free Arabic Alphabet Chart PDF — All 28 Letters on One Page",
    seoTitleAr: "لوحة الحروف العربية PDF مجاناً — الحروف الـ٢٨ في صفحة واحدة",
    seoDescEn:
      "A printable Arabic alphabet chart: all 28 letters on a single sheet with names and transliteration. Print once, pin it above the desk. Free PDF, no signup.",
    seoDescAr:
      "لوحة حروف عربية للطباعة: الحروف الثمانية والعشرون في ورقة واحدة مع الأسماء والنطق. اطبعها مرّة وعلّقها فوق الطاولة. ملف PDF مجاني بلا تسجيل.",
    keywords: [
      "arabic alphabet chart pdf",
      "arabic alphabet pdf printable",
      "arabic alphabet for kids pdf",
      "printable arabic alphabet pdf",
      "arabic alphabet pdf printable free download",
      "لوحة الحروف العربية pdf",
      "الحروف العربية للطباعة",
    ],
    taglineEn: "The whole alphabet on one sheet. Print it once and stop looking things up.",
    taglineAr: "الأبجدية كلّها في ورقة. اطبعها مرّة وتوقّف عن البحث في كلّ مرّة.",
    insideEn: [
      "All 28 letters in alphabet order, laid out so the eye can sweep the whole set without scrolling or turning a page.",
      "Each letter with its Arabic name (باء) and a simple English transliteration (Ba) — the two things a parent who does not read Arabic needs in order to help.",
      "Printed at a size that still reads from across a room when taped to a wall, rather than shrunk to fit more in.",
    ],
    insideAr: [
      "الحروف الثمانية والعشرون على ترتيب الأبجدية، موزّعة ليمرّ عليها البصر كلّها دون تمرير ولا تقليب صفحة.",
      "كلّ حرف باسمه العربيّ (باء) ونطقه بالحروف اللاتينية (Ba) — وهما ما يحتاجه الوالد الذي لا يقرأ العربية ليعين طفله.",
      "مطبوعة بحجم يُقرأ من آخر الغرفة حين تُعلَّق على الجدار، لا مصغّرة لحشر المزيد.",
    ],
    useEn: [
      "This one is not an exercise — it is furniture. Tape it somewhere your child already looks: beside the light switch, on the fridge, above the desk where the tracing sheets get done. Its whole job is to be in the room when the question comes up.",
      "It also does quiet work for the adult. If your own Arabic stopped developing when you were small, having the names and transliteration in front of you means you can answer “what's that one called?” without reaching for a phone, which is the difference between a moment of learning and an interruption.",
    ],
    useAr: [
      "هذه ليست تمريناً بل أثاثاً. علّقها حيث ينظر طفلك أصلاً: قرب مفتاح النور، أو على الثلاجة، أو فوق الطاولة التي تُملأ عليها أوراق التتبّع. ومهمّتها كلّها أن تكون في الغرفة حين يأتي السؤال.",
      "وهي تعمل عملاً هادئاً للبالغ أيضاً. فإن كانت عربيّتك أنت قد توقّفت عند صغرك، فوجود الأسماء والنطق أمامك يعني أن تجيب عن «وهذا ما اسمه؟» دون أن تمدّ يدك إلى الهاتف — وهذا هو الفرق بين لحظة تعلّم ومقاطعة.",
    ],
    faq: [
      {
        qEn: "What paper size does it print on?",
        qAr: "على أيّ مقاس ورق تُطبع؟",
        aEn: "It is laid out for A4, which also prints cleanly on US Letter if you let your printer scale to fit. Nothing important sits close enough to the edge to be cropped.",
        aAr: "مُعدّة لمقاس A4، وتُطبع نظيفة على مقاس Letter الأمريكيّ أيضاً إن تركت الطابعة تلائم الحجم. وليس فيها شيء مهمّ قريب من الحافّة يمكن أن يُقصّ.",
      },
      {
        qEn: "Does it show the joined letter forms too?",
        qAr: "وهل تعرض أشكال الحروف المتّصلة؟",
        aEn: "No — deliberately. This sheet shows each letter in its isolated form so the set stays scannable at a glance. The four joined forms get a full page each in the tracing pack, where there is room to show them properly.",
        aAr: "لا، وذلك قصداً. فهذه الورقة تعرض كلّ حرف مفرداً لتبقى المجموعة كلّها مقروءة بنظرة واحدة. أمّا الأشكال الأربعة المتّصلة فلكلّ حرف صفحة كاملة في حزمة التتبّع، حيث يتّسع المقام لعرضها كما ينبغي.",
      },
    ],
  },

  {
    id: "arabic-numbers-tracing",
    seoTitleEn: "Arabic Numbers 1–10 Tracing Worksheets PDF — Free Printable",
    seoTitleAr: "أوراق تتبّع الأرقام العربية ١–١٠ PDF — للطباعة مجاناً",
    seoDescEn:
      "Free printable Arabic numbers worksheets: a page per number showing the Eastern Arabic numeral (٠–٩) and Western digit side by side, counting dots to colour, and tracing rows for the numeral and its name.",
    seoDescAr:
      "أوراق أرقام عربية مجانية للطباعة: صفحة لكل رقم تعرض الرقم المشرقيّ (٠–٩) والغربيّ جنباً إلى جنب، ودوائر عدّ للتلوين، وصفوف تتبّع للرقم ولاسمه.",
    keywords: [
      "arabic numbers tracing worksheets pdf",
      "arabic numbers worksheet pdf",
      "arabic numbers 1-10 printable",
      "eastern arabic numerals printable",
      "أوراق الأرقام العربية pdf",
      "تتبّع الأرقام العربية للأطفال",
    ],
    taglineEn: "Both numeral systems on the same page, because your child will meet both.",
    taglineAr: "النظامان في الصفحة نفسها، لأنّ طفلك سيلقى كليهما.",
    insideEn: [
      "The Eastern Arabic numeral (١) and the Western digit (1) side by side on every page — both are Arabic in origin, and a bilingual child needs to be fluent in both.",
      "Counting dots to colour in, so the numeral is attached to a quantity the child can physically count rather than just a shape to copy.",
      "Tracing rows for the numeral itself and for its Arabic name written out (واحد), which is the part most number worksheets leave out.",
    ],
    insideAr: [
      "الرقم المشرقيّ (١) والرقم الغربيّ (1) متجاورين في كلّ صفحة — وكلاهما عربيّ الأصل، والطفل ثنائيّ اللغة يحتاج إتقانهما معاً.",
      "دوائر عدّ للتلوين، ليقترن الرقم بكمّية يعدّها الطفل بيده لا بشكل ينقله فحسب.",
      "صفوف تتبّع للرقم نفسه ولاسمه مكتوباً بالعربية (واحد)، وهو الجزء الذي تغفله أكثر أوراق الأرقام.",
    ],
    useEn: [
      "Numbers are easier than letters for most children, which makes this pack a good place to go when the alphabet has become a grind. A child who has stalled on ص will often happily do three number pages and come back to letters in a better mood.",
      "Count the dots aloud in Arabic while they colour — waahid, ithnaan, thalaatha. The colouring takes long enough that the words get repeated ten or fifteen times without it ever feeling like repetition, which is the whole trick.",
      "Point out the quirk when it comes up: Arabic words run right to left, but numbers run left to right, exactly like English. Children find this funny rather than confusing, and noticing it is what makes it stick.",
    ],
    useAr: [
      "الأرقام أيسر من الحروف عند أكثر الأطفال، فهذه الحزمة موضع جيّد تنتقل إليه حين تصير الأبجدية كدّاً. فالطفل الذي تعثّر عند الصاد كثيراً ما يصنع ثلاث صفحات أرقام راضياً ثمّ يعود إلى الحروف بنفسٍ أطيب.",
      "عُدّ الدوائر بصوت عالٍ بالعربية وهو يلوّن: واحد، اثنان، ثلاثة. فالتلوين يطول بما يكفي لتتكرّر الكلمات عشراً أو خمس عشرة مرّة دون أن يشعر بتكرار، وهذه هي الحيلة كلّها.",
      "ونبّهه على الطُّرفة حين تَعرِض: الكلمات العربية تجري من اليمين إلى اليسار، والأرقام من اليسار إلى اليمين تماماً كالإنجليزية. يجدها الأطفال مضحكة لا مربكة، وملاحظتها هي ما يثبّتها.",
    ],
    faq: [
      {
        qEn: "Why teach the Eastern numerals at all if we write 1, 2, 3?",
        qAr: "لماذا نعلّم الأرقام المشرقية ونحن نكتب 1، 2، 3؟",
        aEn: "Because your child will meet them the moment they open an Arabic book, a Qur'an, or a clock face in much of the Arab world. Both sets came from the same place; the Western digits simply travelled further. A child comfortable with both reads Arabic text without stumbling every time a number appears.",
        aAr: "لأنّ طفلك سيلقاها ساعة يفتح كتاباً عربياً أو مصحفاً أو ينظر إلى ساعة في كثير من بلاد العرب. والمجموعتان من أصل واحد، وإنّما سافرت الغربية أبعد. والطفل الذي يألف الاثنتين يقرأ النصّ العربيّ دون أن يتعثّر كلّما مرّ رقم.",
      },
      {
        qEn: "Does it go past ten?",
        qAr: "هل تتجاوز العشرة؟",
        aEn: "Not in this pack. Zero to ten is where the shapes and the names both have to be learned from scratch; after ten Arabic numbers start combining (أحد عشر is literally “one ten”), which is a different skill and a later one.",
        aAr: "لا في هذه الحزمة. فمن صفر إلى عشرة يُتعلَّم الشكل والاسم كلاهما من الصفر، وبعد العشرة تبدأ الأعداد بالتركيب (أحد عشر تعني حرفياً «واحد وعشرة»)، وتلك مهارة أخرى ومتأخّرة.",
      },
    ],
  },

  {
    id: "arabic-numbers-11-20",
    seoTitleEn: "Arabic Numbers 11–20 Tracing Worksheets — Free PDF",
    seoTitleAr: "أوراق تتبّع الأرقام العربية ١١–٢٠ — PDF مجاناً",
    seoDescEn:
      "Ten free worksheets for the Arabic numbers 11 to 20 — Eastern numerals ١١–٢٠ with Western digits, counting dots, and tracing rows for each full Arabic name. No email, no signup.",
    seoDescAr:
      "عشر أوراق مجانية للأرقام العربية من ١١ إلى ٢٠ — الأرقام المشرقية مع الغربية، ودوائر عدّ، وصفوف تتبّع للاسم العربي الكامل. بلا بريد وبلا تسجيل.",
    keywords: [
      "arabic numbers 11 to 20 worksheet",
      "arabic numbers 11-20 tracing pdf",
      "arabic numerals 11-20 printable",
      "arabic counting worksheets pdf",
      "أوراق الأرقام العربية من ١١ إلى ٢٠",
    ],
    taglineEn: "The decade every child stumbles on — ten pages, one number at a time.",
    taglineAr: "العقد الذي يتعثّر فيه كل طفل — عشر صفحات، رقم في كل مرّة.",
    insideEn: [
      "The Eastern Arabic numeral (١١) and the Western digit (11) side by side on every page, so the pair is learned together instead of in separate lessons.",
      "Eleven to twenty counting dots to colour — the physical act of colouring each dot is what makes 'eleven' feel bigger than 'seven', not just look bigger.",
      "Tracing rows for the numeral at three graded sizes, exactly like the letter sheets.",
      "A full tracing line for the Arabic name — the genuinely hard part past ten, since أحد عشر and عشرون are longer than anything in 1–10.",
    ],
    insideAr: [
      "الرقم العربي المشرقي (١١) والرقم الغربي (11) جنباً إلى جنب في كل صفحة، فيتعلّم الطفل الثنائي معاً لا في درسين منفصلين.",
      "دوائر عدّ من ١١ إلى ٢٠ للتلوين — تلوين كل دائرة هو ما يجعل «أحد عشر» يشعر أكبر من «سبعة»، لا مجرد أن يشاهد أكبر.",
      "صفوف تتبّع للرقم بثلاثة أحجام متدرّجة، تماماً كأوراق الحروف.",
      "سطر تتبّع كامل للاسم العربي — وهو الجزء الصعب فعلاً بعد العشرة، فـ«أحد عشر» و«عشرون» أطول من كل أسماء ١–١٠.",
    ],
    useEn: [
      "Start only after 1–10 is solid: the second decade reuses the first (ثلاثة عشر is just ثلاثة + عشر), which makes it a fast win — or a fast muddle — depending on how well the first ten stuck.",
      "Say the full name out loud while tracing, clapping once per word part: ثلاث-ة-عشر. The rhythm does more for remembering the compound names than repetition of the whole string.",
      "The dot-counting pages are slow on purpose. Let your child colour all thirteen dots over a whole session if needed; counting past ten is a concentration skill as much as a number skill.",
    ],
    useAr: [
      "ابدأ فقط بعد رسوخ ١–١٠: العقد الثاني يعيد استعمال الأول (ثلاثة عشر = ثلاثة + عشر)، فيكون إما إنجازاً سريعاً وإما خلطاً سريعاً بحسب تمكّن طفلك من العشرة الأولى.",
      "انطق الاسم الكامل أثناء التتبّع مع تصفيقة عند كل جزء من الكلمة: ثلاث-ة-عشر. الإيقاع يثبّت الأسماء المركّبة أفضل من تكرار السلسلة كاملة.",
      "صفحات عدّ الدوائر بطيئة عن قصد. دع طفلك يلوّن الدوائر الثلاث عشرة عبر جلسة كاملة إن لزم؛ فالعدّ بعد العشرة مهارة تركيز بقدر ما هو مهارة أرقام.",
    ],
    faq: [
      {
        qEn: "What are the Arabic numbers 11 to 20?",
        aEn: "Eleven is أحد عشر (aḥada ʿashar), twelve is اثنا عشر, thirteen ثلاثة عشر … nineteen تسعة عشر, and twenty is عشرون (ʿishruun). The numerals themselves are ١١ ١٢ ١٣ … ١٩ ٢٠.",
        qAr: "ما هي الأرقام العربية من ١١ إلى ٢٠؟",
        aAr: "أحد عشر، واثنا عشر، وثلاثة عشر… حتى تسعة عشر، ثم عشرون. والأرقام نفسها هي ١١ ١٢ ١٣ … ١٩ ٢٠.",
      },
      {
        qEn: "Why are 11–19 compound names but 20 is a single word?",
        aEn: "Arabic builds 11–19 as 'unit-teen' (literally 'three-ten' for thirteen), but the tens — 20, 30, 40 — have their own single words with a plural -iin ending: ʿishruun, thalaathuun. The worksheet for twenty previews that pattern.",
        qAr: "لماذا أسماء ١١–١٩ مركّبة بينما ٢٠ كلمة واحدة؟",
        aAr: "تبني العربية ١١–١٩ على صورة «الوحدة + عشر»، أما العقود — ٢٠ و٣٠ و٤٠ — فلها كلمات مفردة خاصة بزيادة ون: عشرون، ثلاثون. وورقة العشرين تمهّد لهذا النمط.",
      },
      {
        qEn: "Should my child learn Western or Eastern Arabic numerals?",
        aEn: "Both, together — that is how each sheet is laid out. Most Arab countries use the Eastern numerals (١٢٣) in books and school, while screens often show Western digits (123). A child who reads the pair side by side is never blocked by either.",
        qAr: "هل يتعلّم طفلي الأرقام الغربية أم المشرقية؟",
        aAr: "الاثنين معاً — وهكذا صُمّمت كل ورقة. معظم الدول العربية تستعمل الأرقام المشرقية (١٢٣) في الكتب والمدارس، بينما تعرض الشاشات غالباً الغربية (123). والطفل الذي يقرأ الثنائي جنباً إلى جنب لا يعطله أيٌّ منهما.",
      },
    ],
  },
  {
    id: "arabic-harakat",
    seoTitleEn: "Arabic Short Vowels (Harakat) Worksheets — Free PDF",
    seoTitleAr: "أوراق الحركات العربية (فتحة وكسرة وضمة) — PDF مجاناً",
    seoDescEn:
      "Five free worksheets covering fatha, kasra, damma, sukoon and tanween — each mark traced onto real letters, with an example word and how the mark changes its sound. No email, no signup.",
    seoDescAr:
      "خمس أوراق مجانية تغطّي الفتحة والكسرة والضمة والسكون والتنوين — كل حركة تُتتبّع على حروف حقيقية مع كلمة مثال وأثر الحركة في الصوت. بلا بريد وبلا تسجيل.",
    keywords: [
      "arabic harakat worksheet pdf",
      "arabic short vowels worksheets",
      "fatha kasra damma worksheet",
      "arabic vowels for kids printable",
      "sukoon worksheet arabic",
      "أوراق الحركات العربية",
      "تمارين الفتحة والكسرة والضمة",
    ],
    taglineEn: "The marks that turn letters into words — five pages, one mark at a time.",
    taglineAr: "الحركات التي تحوّل الحروف إلى كلمات — خمس صفحات، حركة في كل مرّة.",
    insideEn: [
      "One page per mark: fatha (َ), kasra (ِ), damma (ُ), sukoon (ْ) and tanween (ً).",
      "Each sheet shows the mark on three letters your child already knows — ب، ت، ج — so the mark is learned as something that sits ON letters, not a floating symbol.",
      "Graded tracing rows for letter+mark combinations, in the same solid-grey → hollow → empty progression as the letter sheets.",
      "One example word per mark, with transliteration and meaning, to trace on a dashed line.",
      "A plain-English explanation of the sound on every sheet — written for parents who do not read Arabic.",
    ],
    insideAr: [
      "صفحة لكل حركة: الفتحة والكسرة والضمة والسكون والتنوين.",
      "تعرض كل ورقة الحركة على ثلاثة حروف يعرفها الطفل — ب، ت، ج — فيتعلّم أنها تجلس على الحروف لا رمز طائر.",
      "صفوف تتبّع متدرّجة لتركيب الحرف مع الحركة، بالتدرّج نفسه من الرمادي الممتلئ إلى المفرّغ إلى الفارغ.",
      "كلمة مثال واحدة لكل حركة، بالنطق والمعنى، للتتبّع على سطر متقطّع.",
      "شرح مبسّط للصوت بالإنجليزية في كل ورقة — مكتوب للوالدين الذين لا يقرؤون العربية.",
    ],
    useEn: [
      "Teach the marks only after your child recognises the bare letters. The letters are the furniture; harakat are the lighting — installed once the room exists.",
      "Exaggerate the sounds in games first: 'ba-bi-bu' chanted while hopping is preparation, and it takes two minutes. Then sit down to the sheet.",
      "Say the sound WITH the child on every traced letter, not before and not after. The mark and the sound must land in the same second to connect.",
      "Leave sukoon and tanween for last. A firm consonant stop and a nasal ending are genuinely harder than the three short vowels; five minutes of fatha-kasra-damma first makes them easy.",
    ],
    useAr: [
      "علّم الحركات بعد أن يميّز طفلك الحروف المجردة. الحروف أثاث الغرفة، والحركات إضاءتها — تُركّب بعد وجود الغرفة.",
      "ضخّم الأصوات في اللعب أولاً: ترديد «بَ-بِ-بُ» مع القفز تحضير ممتاز يستغرق دقيقتين، ثم اجلسا إلى الورقة.",
      "انطق الصوت مع الطفل مع كل حرف يتتبّعه، لا قبله ولا بعده. يجب أن يهبط الصوت والحركة في اللحظة نفسها ليرتبطا.",
      "أجّل السكون والتنوين إلى النهاية، فسكون الحرف الساكن ونهاية الغنة أصعب فعلاً من الحركات القصيرة الثلاث.",
    ],
    faq: [
      {
        qEn: "What are the Arabic harakat?",
        aEn: "Harakat are the small marks that carry the short vowels: fatha (َ) is a short 'a', kasra (ِ) is a short 'i', damma (ُ) is a short 'u', sukoon (ْ) marks no vowel, and tanween (ً ٍ ٌ) doubles a vowel into an 'an/in/un' ending. Long vowels, by contrast, are full letters: alef, waw and ya.",
        qAr: "ما هي الحركات في العربية؟",
        aAr: "الحركات علامات صغيرة تحمل الحركات القصيرة: الفتحة ألف قصيرة، والكسرة ياء قصيرة، والضمة واو قصيرة، والسكون يعني عدم وجود حركة، والتنوين حركة مضعّفة تنتهي بنون خفيفة. أما الحركات الطويلة فحروف كاملة: الألف والواو والياء.",
      },
      {
        qEn: "When should a child start learning harakat?",
        aEn: "Once they recognise the 28 letters comfortably — usually four to eight weeks into a letter-a-day plan. Reading fully-vowelled text with harakat is how children in Arab schools learn to decode, so the marks are the bridge from 'knowing letters' to 'reading words'.",
        qAr: "متى يبدأ الطفل تعلّم الحركات؟",
        aAr: "بعد أن يميّز الحروف الـ٢٨ بارتياح — عادة بعد أربعة إلى ثمانية أسابيع من خطة «حرف في اليوم». وقراءة النص المشكول هي الطريقة التي يتعلم بها الأطفال في المدارس العربية فكّ الرموز، فالحركات هي الجسر من «معرفة الحروف» إلى «قراءة الكلمات».",
      },
      {
        qEn: "Do adults need harakat to read Arabic?",
        aEn: "Fluent readers infer the short vowels from context, which is why newspapers drop them. Learners and children need them: without harakat, the letters ب ت ك could read 'batak', 'batik' or several other words. The marks remove the guesswork.",
        qAr: "هل يحتاج الكبار الحركات لقراءة العربية؟",
        aAr: "يستنتج القارئ المتمرّس الحركات القصيرة من السياق، ولذلك تسقطها الصحف. أما المتعلّمون والأطفال فيحتاجونها: فبدون حركات يمكن أن تُقرأ ب ت ك «بَتَك» أو «بِتِك» أو غيرهما. الحركات ترفع التخمين.",
      },
    ],
  },
  {
    id: "arabic-colors",
    seoTitleEn: "Arabic Colours Worksheets PDF — Free Printable Colour & Trace",
    seoTitleAr: "أوراق الألوان بالعربية PDF — تلوين وتتبّع للطباعة مجاناً",
    seoDescEn:
      "Free printable Arabic colours worksheets: six colour words paired with a shape to colour in, plus tracing lines for each colour's name in Arabic and English. Learn ahmar, azraq, akhdar by using them.",
    seoDescAr:
      "أوراق ألوان عربية مجانية للطباعة: ستّ كلمات لونية مع شكل هندسيّ للتلوين، وأسطر تتبّع لاسم كلّ لون بالعربية والإنجليزية. يتعلّم الطفل الأحمر والأزرق والأخضر باستعمالها.",
    keywords: [
      "arabic colors worksheet pdf",
      "colors in arabic printable",
      "arabic colours worksheets free",
      "learn arabic colors kids",
      "أوراق الألوان بالعربية pdf",
      "أسماء الألوان بالعربي للأطفال",
    ],
    taglineEn: "A colour word is only learned when the child reaches for that crayon.",
    taglineAr: "لا تُتعلَّم كلمة اللون حتى يمدّ الطفل يده إلى ذلك القلم.",
    insideEn: [
      "Six colour words, each with a geometric shape to fill in — so naming the colour and using the colour happen in the same movement.",
      "Tracing lines for the Arabic name (أحمر) and the English name, side by side.",
      "Shapes chosen to double as a shapes lesson: the child learns مثلّث and مربّع while colouring them.",
    ],
    insideAr: [
      "ستّ كلمات لونية، مع شكل هندسيّ يُملأ لكلّ واحدة — فتسمية اللون واستعماله يقعان في حركة واحدة.",
      "أسطر تتبّع لاسم اللون بالعربية (أحمر) وبالإنجليزية، متجاورين.",
      "أشكال اختيرت لتكون درس أشكال أيضاً: يتعلّم الطفل المثلّث والمربّع وهو يلوّنهما.",
    ],
    useEn: [
      "Colours are the fastest vocabulary a small child will ever acquire, because the word has something to point at in every room. Do the sheet, then spend the rest of the day naming things: the أحمر car, the أزرق cup. The sheet is the introduction; the naming is the lesson.",
      "Do not correct the pronunciation while they are colouring. If they say a colour wrong, say it back correctly in your ordinary voice as part of your next sentence and carry on. They will hear the difference without being told they got it wrong — and a child who expects a correction stops volunteering the word.",
    ],
    useAr: [
      "الألوان أسرع مفردات يكتسبها الطفل الصغير، لأنّ للكلمة ما تشير إليه في كلّ غرفة. أنجزوا الورقة ثمّ أمضيا بقيّة اليوم في التسمية: السيّارة الحمراء، والكوب الأزرق. فالورقة تمهيد، والتسمية هي الدرس.",
      "ولا تصحّح النطق وهو يلوّن. فإن أخطأ في لون، فأعِد اللفظ صحيحاً بصوتك المعتاد ضمن جملتك التالية وامضِ. سيسمع الفرق دون أن يُقال له إنّه أخطأ — والطفل الذي يتوقّع التصحيح يكفّ عن المبادرة بالكلمة.",
    ],
    faq: [
      {
        qEn: "Which colours are included?",
        qAr: "أيّ الألوان مشمولة؟",
        aEn: "The six a child uses most — red, blue, green, yellow, black and white. Those cover almost everything a toddler will want to name, and six is short enough to finish in a sitting, which matters more at this age than covering the full spectrum.",
        aAr: "الستّة التي يستعملها الطفل أكثر: الأحمر والأزرق والأخضر والأصفر والأسود والأبيض. وهي تغطّي أكثر ما يريد الصغير تسميته، وستّة قِصَر يكفي لإتمامها في جلسة — وهذا في هذه السنّ أهمّ من استيعاب الطيف كلّه.",
      },
      {
        qEn: "Can we hear the words rather than guess?",
        qAr: "أيمكننا سماع الكلمات بدل التخمين؟",
        aEn: "Yes — every colour on this site has recorded audio. Open the colours guide and tap each one; the worksheet and the recording use the same words, so what your child traces is what they hear.",
        aAr: "نعم، فلكلّ لون في هذا الموقع تسجيل صوتيّ. افتح دليل الألوان والمس كلّ لون؛ والورقة والتسجيل يستعملان الكلمات نفسها، فما يتتبّعه طفلك هو ما يسمعه.",
      },
    ],
  },

  {
    id: "arabic-animals-coloring",
    seoTitleEn: "Arabic Animals Colouring Pages PDF — Free Printable Word Tracing",
    seoTitleAr: "صفحات تلوين الحيوانات بالعربية PDF — تتبّع الأسماء مجاناً",
    seoDescEn:
      "Free printable Arabic animal colouring pages: eight animals with a large outline to colour and the name to trace in Arabic and English, each with a fact to read aloud. Asad, qitt, feel and more.",
    seoDescAr:
      "صفحات تلوين حيوانات عربية مجانية للطباعة: ثمانية حيوانات برسم كبير للتلوين واسمها للتتبّع بالعربية والإنجليزية، مع معلومة تُقرأ بصوت عالٍ. أسد وقطّ وفيل وغيرها.",
    keywords: [
      "arabic animals coloring pages pdf",
      "animal names in arabic pdf",
      "arabic animals worksheet",
      "arabic vocabulary coloring printable",
      "تلوين الحيوانات بالعربية pdf",
      "أسماء الحيوانات بالعربي للأطفال",
    ],
    taglineEn: "Colouring buys you the four minutes in which a word actually sticks.",
    taglineAr: "التلوين يشتري لك الدقائق الأربع التي تثبت فيها الكلمة فعلاً.",
    insideEn: [
      "Eight animals with outlines large enough for a three-year-old's grip — no fiddly detail that ends in frustration.",
      "The animal's name to trace in both Arabic (أسد) and English, so the two words arrive attached to the same picture.",
      "A one-line fact per animal for the adult to read aloud, which is what turns a colouring page into a conversation.",
    ],
    insideAr: [
      "ثمانية حيوانات برسوم كبيرة تناسب قبضة ابن الثالثة — بلا تفاصيل دقيقة تنتهي بالإحباط.",
      "اسم الحيوان للتتبّع بالعربية (أسد) وبالإنجليزية، فتصل الكلمتان مقترنتين بالصورة نفسها.",
      "معلومة من سطر لكلّ حيوان يقرأها البالغ بصوت عالٍ، وهي ما يحوّل صفحة التلوين إلى محادثة.",
    ],
    useEn: [
      "This is the pack to reach for when you want Arabic to happen without anyone noticing it is happening. Colouring occupies the hands and quiets the part of a child that resists being taught, and it lasts long enough that you can say the animal's name a dozen times conversationally.",
      "Read the fact out in whichever language is easier for you, then say just the animal's name in Arabic. Mixing is fine and normal — a child sorts the two languages out on their own, and a parent who waits until their Arabic is good enough usually waits too long.",
    ],
    useAr: [
      "هذه هي الحزمة التي تلجأ إليها حين تريد للعربية أن تقع دون أن ينتبه أحد إلى وقوعها. فالتلوين يشغل اليدين ويسكّن ما في الطفل من مقاومة للتعليم، ويطول بما يكفي لتقول اسم الحيوان اثنتي عشرة مرّة في سياق الحديث.",
      "اقرأ المعلومة باللغة الأيسر عليك، ثمّ قل اسم الحيوان بالعربية وحده. والخلط جائز طبيعيّ — فالطفل يفرز اللغتين وحده، والوالد الذي ينتظر حتى تجود عربيّته ينتظر غالباً أكثر ممّا ينبغي.",
    ],
    faq: [
      {
        qEn: "Which animals are in it?",
        qAr: "أيّ الحيوانات فيها؟",
        aEn: "Eight that a young child already recognises — the lion, cat, elephant and their neighbours. Familiar animals are chosen on purpose: the child spends their attention on the new Arabic word rather than on working out what the picture is.",
        aAr: "ثمانية يعرفها الطفل الصغير أصلاً: الأسد والقطّ والفيل وأمثالها. واختيار المألوف مقصود، ليصرف الطفل انتباهه إلى الكلمة العربية الجديدة لا إلى تبيّن ما في الصورة.",
      },
      {
        qEn: "Is this too easy for a six-year-old?",
        qAr: "أهذه أسهل ممّا يناسب ابن السادسة؟",
        aEn: "The colouring might be, but the word tracing is not. An older child can skip straight to tracing the names and use the outlines as a break between them — the same sheet works differently at three and at six.",
        aAr: "قد يكون التلوين كذلك، أمّا تتبّع الكلمات فلا. فالأكبر يمضي مباشرة إلى تتبّع الأسماء ويجعل الرسوم راحةً بينها — والورقة نفسها تعمل عملاً مختلفاً في الثالثة وفي السادسة.",
      },
    ],
  },

  {
    id: "arabic-complete-workbook",
    seoTitleEn: "Complete Arabic Workbook PDF — 53 Free Printable Pages",
    seoTitleAr: "الكرّاسة العربية الكاملة PDF — ٥٣ صفحة مجانية للطباعة",
    seoDescEn:
      "Every Arabic worksheet on this site in one 53-page PDF, in teaching order: alphabet chart, all 28 letter tracing pages, numbers 1–10, colours and animals. One download, one print job, free.",
    seoDescAr:
      "كلّ أوراق العمل في هذا الموقع في ملف PDF واحد من ٥٣ صفحة، بترتيب تعليميّ: لوحة الحروف، وصفحات تتبّع الحروف الـ٢٨، والأرقام ١–١٠، والألوان والحيوانات. تنزيل واحد وطباعة واحدة، مجاناً.",
    keywords: [
      "arabic workbook pdf free",
      "complete arabic worksheets pdf",
      "arabic worksheets bundle printable",
      "free arabic curriculum pdf kids",
      "كرّاسة عربية كاملة pdf",
      "أوراق عمل عربية كاملة للطباعة",
    ],
    taglineEn: "All 53 pages, in the order you would actually teach them.",
    taglineAr: "الصفحات الثلاث والخمسون كلّها، بالترتيب الذي تُعلَّم به فعلاً.",
    insideEn: [
      "The alphabet chart first, so the reference is on the wall before any writing starts.",
      "All 28 letter tracing pages in alphabet order.",
      "Numbers 1–10, then colours, then animals — vocabulary after letters, which is the order that works.",
      "One file, so a single print job produces a whole workbook rather than five separate downloads.",
    ],
    insideAr: [
      "لوحة الحروف أوّلاً، ليكون المرجع على الجدار قبل أن تبدأ الكتابة.",
      "صفحات تتبّع الحروف الثمانية والعشرين كلّها على ترتيب الأبجدية.",
      "ثمّ الأرقام ١–١٠، فالألوان، فالحيوانات — المفردات بعد الحروف، وهو الترتيب الذي ينجح.",
      "ملف واحد، فتُخرج طباعة واحدة كرّاسة كاملة بدل خمسة تنزيلات منفصلة.",
    ],
    useEn: [
      "This is the pack for someone who wants the whole thing at once — a teacher setting up for a term, a parent printing before a long trip, a family with no printer at home taking one file to a print shop.",
      "If you are working with one child at home, the individual packs are usually the better choice. Fifty-three pages arriving in one stack sets an expectation of completion, and a workbook with unfinished pages in the middle starts to feel like a failure rather than an activity. Print what you need this week.",
    ],
    useAr: [
      "هذه للحزمة لمن يريد الأمر كلّه دفعة واحدة: معلّم يُعِدّ لفصل دراسيّ، أو والد يطبع قبل سفر طويل، أو أسرة لا طابعة عندها تحمل ملفاً واحداً إلى مركز طباعة.",
      "أمّا إن كنت تعمل مع طفل واحد في البيت، فالحزم المفردة أفضل غالباً. فثلاث وخمسون صفحة تصل في رزمة واحدة تُنشئ توقّعاً بالإتمام، والكرّاسة التي تتخلّلها صفحات ناقصة تبدأ تشبه الإخفاق لا النشاط. اطبع ما تحتاجه هذا الأسبوع.",
    ],
    faq: [
      {
        qEn: "Is this different from downloading the packs separately?",
        qAr: "أتختلف عن تنزيل الحزم مفردة؟",
        aEn: "Only in packaging. It is the same pages in one file, ordered for teaching. If you have already downloaded the individual packs you have everything that is in here.",
        aAr: "لا تختلف إلّا في التغليف. فهي الصفحات نفسها في ملف واحد مرتّبة للتعليم. ومن نزّل الحزم المفردة فعنده كلّ ما فيها.",
      },
      {
        qEn: "How big is the file?",
        qAr: "ما حجم الملف؟",
        aEn: "About 2 MB — small enough to email to a print shop or open on a phone, and it will keep working offline once this site has been opened once.",
        aAr: "نحو ٢ ميغابايت — صغير بما يكفي لإرساله إلى مركز طباعة أو فتحه على الهاتف، وسيظلّ يعمل دون اتصال متى فُتِح هذا الموقع مرّة.",
      },
    ],
  },
];

export function getWorksheetPage(id: string): WorksheetPage | undefined {
  return worksheetPages.find((p) => p.id === id);
}
