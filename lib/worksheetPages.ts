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

import { totalWorksheetPages } from "./worksheets";

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
    seoTitleAr: "أوراق تتبّع الحروف العربية PDF مجاناً — الحروف الـ28 كاملة",
    seoDescEn:
      "Download 28 free Arabic letter tracing worksheets as one PDF — a full page per letter with its four joined forms, three graded tracing rows and two example words. No email, no signup.",
    seoDescAr:
      "حمّل 28 ورقة تتبّع للحروف العربية في ملف PDF واحد — صفحة كاملة لكل حرف مع أشكاله الأربعة وثلاثة صفوف تتبّع متدرّجة وكلمتين للتتبّع. بلا بريد إلكتروني وبلا تسجيل.",
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
    seoTitleAr: "لوحة الحروف العربية PDF مجاناً — الحروف الـ28 في صفحة واحدة",
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
    seoTitleAr: "أوراق تتبّع الأرقام العربية 1–10 PDF — للطباعة مجاناً",
    seoDescEn: "Free Arabic counting worksheets for numbers 1–10: familiar digits, Arabic number names, counting circles, tracing practice, and space to draw. Ten printable pages.",
    seoDescAr: "أوراق عدّ عربية مجانية للأرقام 1–10: رقم واضح واسمه بالعربية، ودوائر للعدّ والتلوين، وتدريب على الكتابة ومساحة للرسم. عشر صفحات للطباعة.",
    keywords: ["arabic numbers tracing worksheets pdf", "arabic numbers worksheet pdf", "arabic numbers 1-10 printable", "arabic number names", "أوراق الأرقام العربية pdf", "تتبّع الأرقام العربية للأطفال"],
    taglineEn: "Count it, say it in Arabic, then write it — one number per page.",
    taglineAr: "عُدّ الأشياء، وانطق العدد بالعربية، ثم اكتبه — رقم في كل صفحة.",
    insideEn: [
      "One large number on each page, using digits 1, 2, 3 through 10, with its Arabic name and pronunciation.",
      "Counting circles to colour, arranged in rows of five so children can count one object at a time.",
      "A guided tracing row, a writing row with fewer clues, an Arabic-name tracing line, and a box for drawing the same quantity.",
    ],
    insideAr: [
      "رقم كبير في كل صفحة، باستخدام الأرقام 1 و2 و3 حتى 10، مع اسمه العربي وطريقة نطقه.",
      "دوائر للتلوين في صفوف من خمس، ليعدّ الطفل كل دائرة مرة واحدة.",
      "صف لتتبّع الرقم، وصف للكتابة بمساعدة أقل، وسطر لتتبّع اسمه بالعربية، ومساحة لرسم العدد نفسه من الأشياء.",
    ],
    useEn: [
      "Start with a number your child already knows. Count that many toys together before moving to the paper.",
      "Say the Arabic name as you colour each circle. Point to the large digit, say the total, then trace the number and its name.",
      "Print one or two pages at a time. Leave the independent writing for another day if your child is still learning to hold a pencil.",
    ],
    useAr: [
      "ابدأ برقم يعرفه طفلك. عُدّا معاً العدد نفسه من الألعاب قبل الانتقال إلى الورقة.",
      "انطقا أسماء الأعداد بالعربية أثناء تلوين الدوائر. أشيرا إلى الرقم الكبير، ثم تتبّعا الرقم واسمه.",
      "اطبع صفحة أو صفحتين في كل مرة. يمكن تأجيل الكتابة المستقلّة إذا كان طفلك لا يزال يتدرّب على إمساك القلم.",
    ],
    faq: [
      {
        qEn: "Which digits are used in these worksheets?",
        qAr: "ما شكل الأرقام المستخدمة في هذه الأوراق؟",
        aEn: "The worksheets use 1, 2, 3 through 10. Each number is paired with its Arabic name, such as 1 — واحد, so children practise Arabic vocabulary as well as counting.",
        aAr: "تستخدم الأوراق الأرقام 1 و2 و3 حتى 10. ويظهر مع كل رقم اسمه بالعربية، مثل 1 — واحد، ليتدرّب الطفل على المفردات والعدّ معاً.",
      },
      {
        qEn: "Does this pack include zero or numbers past ten?",
        qAr: "هل تشمل الحزمة الصفر أو الأعداد بعد العشرة؟",
        aEn: "This pack has ten pages, one for each number from 1 to 10. The numbers guide also introduces zero, and a separate 11–20 pack continues the writing practice.",
        aAr: "تحتوي هذه الحزمة على عشر صفحات للأرقام من 1 إلى 10. يقدّم دليل الأرقام العدد صفر أيضاً، وتتابع حزمة 11–20 التدريب على الكتابة.",
      },
    ],
  },
  {
    id: "arabic-numbers-11-20",
    seoTitleEn: "Arabic Numbers 11–20 Tracing Worksheets — Free PDF",
    seoTitleAr: "أوراق تتبّع الأرقام العربية 11–20 — PDF مجاناً",
    seoDescEn: "Ten free Arabic number worksheets for 11–20, with counting circles, numeral writing practice, and tracing lines for the full Arabic names. No signup needed.",
    seoDescAr: "عشر أوراق مجانية للأرقام العربية 11–20، مع دوائر للعدّ والتلوين وتدريب على كتابة الرقم واسمه العربي الكامل. بلا تسجيل.",
    keywords: ["arabic numbers 11 to 20 worksheet", "arabic numbers 11-20 tracing pdf", "arabic numerals 11-20 printable", "arabic counting worksheets pdf", "أوراق الأرقام العربية من 11 إلى 20"],
    taglineEn: "Keep counting in Arabic — ten pages, one new number at a time.",
    taglineAr: "واصل العدّ بالعربية — عشر صفحات، ورقم جديد في كل مرة.",
    insideEn: [
      "A large number from 11 to 20 paired with its full Arabic name, English meaning, and pronunciation.",
      "Counting circles in rows of five, with room to colour every circle and compare quantities.",
      "A guided numeral tracing row, a writing row with fewer clues, and a line for tracing the Arabic name.",
      "An open drawing box to represent the same number with objects of your child's choice.",
    ],
    insideAr: [
      "رقم كبير من 11 إلى 20 مع اسمه العربي الكامل ومعناه بالإنجليزية وطريقة نطقه.",
      "دوائر للعدّ في صفوف من خمس، مع مساحة لتلوين كل دائرة ومقارنة الكمّيات.",
      "صف لتتبّع الرقم، وصف للكتابة بمساعدة أقل، وسطر لتتبّع الاسم العربي.",
      "مساحة مفتوحة لرسم العدد نفسه من أشياء يختارها طفلك.",
    ],
    useEn: [
      "Begin when your child can count objects up to ten comfortably. Count ten circles first, then add the remaining ones.",
      "Say the full Arabic name while tracing. For example, point to 13 and say ثلاثة عشر before tracing its two words.",
      "Work on a single page per session. Counting, colouring, writing, and drawing can also be separate short activities.",
    ],
    useAr: [
      "ابدأ عندما يستطيع طفلك عدّ الأشياء حتى عشرة بسهولة. عُدّا عشر دوائر أولاً، ثم أضيفا الباقي.",
      "انطق الاسم العربي الكامل أثناء التتبّع. مثلاً: أشر إلى 13 وقل ثلاثة عشر قبل تتبّع الكلمتين.",
      "اكتفِ بصفحة في الجلسة. ويمكن توزيع العدّ والتلوين والكتابة والرسم على أنشطة قصيرة منفصلة.",
    ],
    faq: [
      {
        qEn: "What are the Arabic numbers 11 to 20?",
        qAr: "ما أسماء الأعداد العربية من 11 إلى 20؟",
        aEn: "11 is أحد عشر, 12 اثنا عشر, 13 ثلاثة عشر, 14 أربعة عشر, 15 خمسة عشر, 16 ستة عشر, 17 سبعة عشر, 18 ثمانية عشر, 19 تسعة عشر, and 20 عشرون.",
        aAr: "11 أحد عشر، 12 اثنا عشر، 13 ثلاثة عشر، 14 أربعة عشر، 15 خمسة عشر، 16 ستة عشر، 17 سبعة عشر، 18 ثمانية عشر، 19 تسعة عشر، و20 عشرون.",
      },
      {
        qEn: "How should we use the counting circles?",
        qAr: "كيف نستخدم دوائر العدّ؟",
        aEn: "Touch and count each circle once before colouring it. Rows of five help you see the groups; the last number you say is the total quantity.",
        aAr: "المس كل دائرة وعُدّها مرة واحدة قبل تلوينها. تساعد صفوف الخمس على رؤية المجموعات، والعدد الأخير الذي تنطقه هو مجموع الدوائر.",
      },
      {
        qEn: "Which numeral style does the pack use?",
        qAr: "ما شكل الأرقام في الحزمة؟",
        aEn: "All pages use the familiar digits 0–9 to write 11, 12, 13 through 20, alongside Arabic names. The same style is used in our online counting activities.",
        aAr: "تستخدم الصفحات الأرقام 0–9 لكتابة 11 و12 و13 حتى 20، مع أسمائها بالعربية. وهو الشكل نفسه المستخدم في أنشطة العدّ على الموقع.",
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
        aAr: "بعد أن يميّز الحروف الـ28 بارتياح — عادة بعد أربعة إلى ثمانية أسابيع من خطة «حرف في اليوم». وقراءة النص المشكول هي الطريقة التي يتعلم بها الأطفال في المدارس العربية فكّ الرموز، فالحركات هي الجسر من «معرفة الحروف» إلى «قراءة الكلمات».",
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
    id: "arabic-letters-harakat",
    seoTitleEn: "Arabic Letters with Harakat PDF — All 28 with Fatha, Kasra, Damma",
    seoTitleAr: "الحروف العربية بالحركات PDF — حروف الهجاء بالفتحة والكسرة والضمة",
    seoDescEn:
      "Free printable chart of all 28 Arabic letters with harakat — fatha, kasra, damma and sukoon (بَ بِ بُ بْ) — with the sound of each syllable, plus the same grid to trace. 4-page PDF, no signup.",
    seoDescAr:
      "لوحة مجانية للطباعة لحروف الهجاء الثمانية والعشرين بالحركات — الفتحة والكسرة والضمة والسكون (بَ بِ بُ بْ) — مع نطق كلّ مقطع، والشبكة نفسها للتتبّع. ملف PDF من 4 صفحات بلا تسجيل.",
    keywords: [
      "arabic letters with harakat pdf free download",
      "arabic alphabet with harakat chart",
      "arabic letters with fatha kasra damma",
      "حروف الهجاء بالحركات pdf",
      "الحروف بالحركات الثلاث",
      "لوحة الحروف بالفتحة والكسرة والضمة",
    ],
    taglineEn: "Every letter with every short vowel — read it on two pages, trace it on two more.",
    taglineAr: "كلّ حرف بكلّ حركة — اقرأه في صفحتين، وتتبّعه في صفحتين أخريين.",
    insideEn: [
      "A two-page reading chart: all 28 letters in rows, each with fatha, kasra, damma and sukoon, and the sound printed under every syllable (ba, bi, bu, b).",
      "Alif written the way it is read with a vowel — أَ إِ أُ — instead of a bare alif that cannot carry one.",
      "Two tracing pages with the same grid in hollow outline, so the child writes each letter together with its mark.",
    ],
    insideAr: [
      "لوحة قراءة من صفحتين: الحروف الثمانية والعشرون في صفوف، لكلّ حرف فتحة وكسرة وضمة وسكون، مع نطق كلّ مقطع تحته.",
      "الألف مكتوبة كما تُقرأ بالحركة — أَ إِ أُ — لا ألفاً مجرّدة لا تحمل حركة.",
      "صفحتا تتبّع بالشبكة نفسها مفرّغة، ليكتب الطفل الحرف مع حركته معاً.",
    ],
    useEn: [
      "Read one row a day, right to left, out loud: ba, bi, bu, b. Five minutes is enough, and by the end of a month every letter has been read with every vowel.",
      "Once a row is easy to read, trace the same row. Writing the mark is what makes a child look for it when reading.",
    ],
    useAr: [
      "اقرأوا صفّاً واحداً كلّ يوم بصوت عالٍ: بَ، بِ، بُ، بْ. خمس دقائق تكفي، وبنهاية الشهر يكون كلّ حرف قد قُرئ بكلّ حركة.",
      "ومتى سهلت قراءة الصفّ، تتبّعوه. فكتابة الحركة هي ما يجعل الطفل يبحث عنها عند القراءة.",
    ],
    faq: [
      {
        qEn: "What are harakat in Arabic?",
        qAr: "ما الحركات في العربية؟",
        aEn: "Harakat are the small marks written above or below a letter to show its short vowel: fatha (a), kasra (i) and damma (u). Sukoon shows the letter has no vowel at all.",
        aAr: "الحركات علامات صغيرة تُكتب فوق الحرف أو تحته لتبيّن حركته القصيرة: الفتحة والكسرة والضمة. أمّا السكون فيدلّ على أنّ الحرف بلا حركة.",
      },
      {
        qEn: "Should children learn the letters before the harakat?",
        qAr: "هل يتعلّم الطفل الحروف قبل الحركات؟",
        aEn: "Usually yes — a child who can name a letter is ready to read it with fatha, kasra and damma. Start with the letters they already know, not the alphabet in order.",
        aAr: "غالباً نعم — فالطفل الذي يعرف اسم الحرف مستعدّ لقراءته بالفتحة والكسرة والضمة. ابدأوا بالحروف التي يعرفها، لا بترتيب الأبجدية.",
      },
    ],
  },
  {
    id: "arabic-tanween",
    seoTitleEn: "Arabic Tanween Worksheets PDF — Dammatan, Fathatan, Kasratan",
    seoTitleAr: "أوراق عمل التنوين PDF — تنوين الضمّ والفتح والكسر",
    seoDescEn:
      "Free printable tanween worksheets: one sheet each for dammatan (ـٌ), fathatan (ـً) and kasratan (ـٍ), traced onto real letters and shown on the same word — كتابٌ, كتابًا, كتابٍ. PDF, no signup.",
    seoDescAr:
      "أوراق عمل مجانية للتنوين: ورقة لكلّ من تنوين الضمّ والفتح والكسر، تُتتبّع على حروف حقيقية وتظهر على الكلمة نفسها — كتابٌ وكتابًا وكتابٍ. ملف PDF بلا تسجيل.",
    keywords: [
      "arabic tanween worksheets pdf",
      "tanween for kids",
      "fathatan kasratan dammatan",
      "أوراق عمل التنوين pdf",
      "التنوين للأطفال",
      "تنوين الفتح والضم والكسر",
    ],
    taglineEn: "Three endings, one word: كتابٌ، كتابًا، كتابٍ — and a sheet for each.",
    taglineAr: "ثلاث نهايات وكلمة واحدة: كتابٌ، كتابًا، كتابٍ — وورقة لكلّ منها.",
    insideEn: [
      "One sheet per tanween — dammatan, fathatan and kasratan — with the mark shown large on ب and on three letters with their sounds (bun, ban, bin).",
      "Fathatan written as it appears in real text, on an extra alif (بًا), with a note that the alif is not read.",
      "Three graded tracing rows per sheet, and the same word on every sheet so the only thing that changes is the ending.",
    ],
    insideAr: [
      "ورقة لكلّ تنوين — الضمّ والفتح والكسر — مع العلامة كبيرة على الباء وعلى ثلاثة حروف بنطقها.",
      "تنوين الفتح مكتوب كما يظهر في النصوص، على ألف زائدة (بًا)، مع تنبيه أنّ الألف لا تُقرأ.",
      "ثلاثة صفوف تتبّع متدرّجة في كلّ ورقة، والكلمة نفسها في الأوراق الثلاث فلا يتغيّر إلّا آخرها.",
    ],
    useEn: [
      "Do the harakat sheets first. Tanween is a doubled fatha, kasra or damma, so a child who reads بَ بِ بُ easily is ready for بًا بٍ بٌ.",
      "Read the three sheets' words side by side at the end — kitaabun, kitaaban, kitaabin. Hearing the same word with three endings is the whole lesson.",
    ],
    useAr: [
      "ابدأوا بأوراق الحركات. فالتنوين فتحة أو كسرة أو ضمّة مضعّفة، والطفل الذي يقرأ بَ بِ بُ بسهولة مستعدّ لبًا بٍ بٌ.",
      "واقرأوا كلمات الأوراق الثلاث متجاورة في الختام — كتابٌ، كتابًا، كتابٍ. فسماع الكلمة نفسها بثلاث نهايات هو الدرس كلّه.",
    ],
    faq: [
      {
        qEn: "What is tanween?",
        qAr: "ما التنوين؟",
        aEn: "Tanween is a doubled vowel mark at the end of a word — ـٌ, ـً or ـٍ — read as the short vowel followed by a light 'n': un, an, in. It usually marks an indefinite noun, like 'a book'.",
        aAr: "التنوين نون ساكنة تُلفظ ولا تُكتب في آخر الاسم، ويُرمز إليه بحركة مضعّفة — ـٌ أو ـً أو ـٍ — فيُقرأ: ـُنْ، ـَنْ، ـِنْ.",
      },
      {
        qEn: "Why is there an alif after fathatan?",
        qAr: "لماذا تأتي ألف بعد تنوين الفتح؟",
        aEn: "In ordinary spelling fathatan is written on an added alif — كتابًا — which is not pronounced. The exceptions (words ending in ة or a hamza after alif) come later; the sheets use the common form.",
        aAr: "يُكتب تنوين الفتح في الإملاء المعتاد على ألف زائدة — كتابًا — لا تُنطق. ولهذا استثناءات (كالكلمات المنتهية بالتاء المربوطة أو بهمزة بعد ألف) تأتي لاحقاً، والأوراق تعتمد الصورة الشائعة.",
      },
    ],
  },
  {
    id: "arabic-alphabet-flashcards",
    seoTitleEn: "Arabic Alphabet Flashcards PDF — 28 Printable Letter Cards with Pictures",
    seoTitleAr: "بطاقات الحروف العربية PDF — 28 بطاقة مصوّرة للطباعة والقصّ",
    seoDescEn:
      "Free printable Arabic alphabet flashcards: all 28 letters, eight cut-out cards to a page, each with the letter, its Arabic and English name and a picture word. PDF, no signup.",
    seoDescAr:
      "بطاقات الحروف العربية مجاناً للطباعة: الحروف الثمانية والعشرون، ثماني بطاقات للقصّ في كلّ صفحة، لكلّ بطاقة الحرف واسمه بالعربية والإنجليزية وكلمة مصوّرة. PDF بلا تسجيل.",
    keywords: [
      "arabic alphabet flashcards pdf",
      "arabic letter flashcards printable",
      "arabic alphabet cut out",
      "arabic alphabet print out",
      "بطاقات الحروف العربية pdf",
      "بطاقات الحروف للطباعة",
    ],
    taglineEn: "Twenty-eight cards, four pages, one pair of scissors.",
    taglineAr: "ثمانٍ وعشرون بطاقة، في أربع صفحات، ومقصّ واحد.",
    insideEn: [
      "All 28 letters as flashcards, eight to an A4 page, with dashed lines to cut along.",
      "Each card: the letter large, its Arabic and English name with transliteration, and a picture word that starts with it (أسد — lion, باب — door).",
      "Four blank cards on the last page for the child's own words.",
    ],
    insideAr: [
      "الحروف الثمانية والعشرون بطاقاتٍ، ثماني بطاقات في صفحة A4، مع خطوط متقطّعة للقصّ.",
      "في كلّ بطاقة: الحرف كبيراً، واسمه بالعربية والإنجليزية مع نطقه، وكلمة مصوّرة تبدأ به (أسد، باب).",
      "أربع بطاقات فارغة في الصفحة الأخيرة لكلمات الطفل الخاصّة.",
    ],
    useEn: [
      "Print on card or thick paper so the cards survive small hands. Laminate them, or slip them into a photo sleeve, if they are going to live in a school bag.",
      "Three games that work from age three: hold up a card and say the sound together; spread out five cards and ask for one; hide a card and have them find something in the room that starts with its sound.",
    ],
    useAr: [
      "اطبعوها على ورق مقوّى أو سميك لتصمد أمام الأيدي الصغيرة. وغلّفوها أو ضعوها في أغلفة صور إن كانت ستعيش في الحقيبة المدرسية.",
      "ثلاث ألعاب تنجح من الثالثة: ارفعوا بطاقة وانطقوا الصوت معاً، وانشروا خمس بطاقات واطلبوا واحدة، واخفوا بطاقة ودعوا الطفل يجد في الغرفة شيئاً يبدأ بصوتها.",
    ],
    faq: [
      {
        qEn: "What paper should I print the flashcards on?",
        qAr: "على أيّ ورق أطبع البطاقات؟",
        aEn: "Card stock (160–250 gsm) works best. On ordinary paper, glue the sheet onto a cereal box before cutting — it gives the cards the same stiffness for free.",
        aAr: "الورق المقوّى (160–250 غراماً) هو الأفضل. وعلى الورق العاديّ، الصقوا الصفحة على علبة حبوب فارغة قبل القصّ — فتأخذ البطاقات الصلابة نفسها مجاناً.",
      },
      {
        qEn: "Are the example words with pictures?",
        qAr: "هل كلمات الأمثلة مصوّرة؟",
        aEn: "Yes — every card has a picture word that starts with the letter, with its transliteration and English meaning, so non-Arabic-speaking parents can use them too.",
        aAr: "نعم — في كلّ بطاقة كلمة مصوّرة تبدأ بالحرف، مع نطقها ومعناها بالإنجليزية، ليستعملها الأهل الذين لا يتكلّمون العربية أيضاً.",
      },
    ],
  },
  {
    id: "arabic-4-line-copybook",
    seoTitleEn: "Arabic Letters on 4-Line Copy PDF — Free Handwriting Practice Pages",
    seoTitleAr: "كتابة الحروف العربية على الأسطر الأربعة PDF — كرّاسة خطّ مجانية",
    seoDescEn:
      "Free Arabic handwriting practice on 4-line ruled paper: all 28 letters sitting on the red baseline with their tall strokes and tails in place, three to trace and a line to write, plus a blank 4-line page. PDF.",
    seoDescAr:
      "كرّاسة مجانية لكتابة الحروف العربية على الأسطر الأربعة: الحروف الـ28 على السطر الأحمر بخطوطها الطويلة وذيولها في مكانها، وثلاث نسخ للتتبّع وسطر للكتابة، مع صفحة أسطر أربعة فارغة. PDF.",
    keywords: [
      "arabic letters in 4 line copy",
      "arabic 4 line copy pdf",
      "arabic handwriting practice pdf",
      "arabic writing practice sheets pdf",
      "كراسة الخط العربي pdf",
      "كتابة الحروف على السطر",
    ],
    taglineEn: "Where each letter sits on the line — the thing tracing sheets never show.",
    taglineAr: "أين يجلس كلّ حرف على السطر — ما لا تُظهره أوراق التتبّع عادةً.",
    insideEn: [
      "Seven pages, four letters each: every letter on a 4-line row with the red baseline, tall letters (ا ل ك ط) up to the top line and tails (ر و ي ن ع) down towards the bottom one.",
      "Per letter: one solid model, three hollow copies to trace, and a full empty 4-line row to write on.",
      "An eighth page of blank 4-line rows for words, names and dictation.",
    ],
    insideAr: [
      "سبع صفحات، في كلّ منها أربعة حروف: كلّ حرف على سطر رباعيّ بسطر أحمر للقاعدة، والحروف الطويلة (ا ل ك ط) تصل إلى السطر العلويّ، والذيول (ر و ي ن ع) تنزل نحو السفليّ.",
      "لكلّ حرف: نموذج مكتمل، وثلاث نسخ مفرّغة للتتبّع، وسطر رباعيّ فارغ كامل للكتابة.",
      "وصفحة ثامنة من الأسطر الرباعية الفارغة للكلمات والأسماء والإملاء.",
    ],
    useEn: [
      "Use it after the one-letter tracing sheets, once a child can write a letter's shape: the copybook teaches the next thing, which is its size and where it sits.",
      "Watch the red line. Most early Arabic handwriting problems are letters floating above the line or tails cut short; on four lines both are easy to see and easy to correct.",
    ],
    useAr: [
      "استعملوها بعد أوراق تتبّع الحرف الواحد، حين يستطيع الطفل كتابة شكل الحرف: فالكرّاسة تعلّم ما بعده، أي حجمه وموضعه على السطر.",
      "راقبوا السطر الأحمر. فأكثر مشكلات الخطّ العربي في البداية حروف تطفو فوق السطر أو ذيول مقصوصة، وعلى الأسطر الأربعة يسهل رؤية الأمرين وتصحيحهما.",
    ],
    faq: [
      {
        qEn: "What is a 4-line copy?",
        qAr: "ما الكرّاسة ذات الأسطر الأربعة؟",
        aEn: "A handwriting page ruled with four lines per row. The third (red) line is the baseline letters sit on; the lines above and below show how far tall strokes rise and tails drop. Many schools in South Asia and the Gulf use it for Arabic and English.",
        aAr: "صفحة خطّ مسطّرة بأربعة أسطر في كلّ صفّ. السطر الثالث (الأحمر) هو القاعدة التي تجلس عليها الحروف، والسطور فوقه وتحته تبيّن إلى أين ترتفع الخطوط الطويلة وتنزل الذيول. وتستعملها مدارس كثيرة للعربية والإنجليزية.",
      },
      {
        qEn: "Is it only for children?",
        qAr: "أهي للأطفال فقط؟",
        aEn: "No — the same pages work for adult beginners learning to write Arabic neatly. Print the blank page for copying words once the letters are comfortable.",
        aAr: "لا — الصفحات نفسها تنفع الكبار المبتدئين الذين يتعلّمون كتابة العربية بخطّ مرتّب. واطبعوا الصفحة الفارغة لنسخ الكلمات متى ارتاحوا مع الحروف.",
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
    id: "arabic-fruits-vegetables-coloring",
    seoTitleEn: "Arabic Fruits & Vegetables Coloring Pages PDF — Free Printable Book",
    seoTitleAr: "كتاب تلوين الفواكه والخضروات بالعربية PDF — مجاناً للطباعة",
    seoDescEn:
      "Free printable Arabic fruits and vegetables coloring book: 8 pages, each with a big outline drawing to colour and the name to trace in Arabic and English. PDF, no signup.",
    seoDescAr:
      "كتاب تلوين الفواكه والخضروات بالعربية مجاناً: 8 صفحات، كل صفحة برسم كبير للتلوين واسم للتتبّع بالعربية والإنجليزية. PDF بلا تسجيل.",
    keywords: [
      "arabic fruits coloring pages",
      "arabic vegetables coloring book pdf",
      "fruit colouring pages with arabic names",
      "arabic food vocabulary coloring",
      "الفواكه والخضروات للتلوين pdf",
      "كتاب تلوين بالعربية للأطفال",
    ],
    taglineEn: "Colour the apple, trace تُفَّاحَة. Eight fruits and vegetables, one free PDF.",
    taglineAr: "لوّن التفاحة وتتبّع «تُفَّاحَة». ثماني فواكه وخضروات في ملف PDF مجاني.",
    insideEn: [
      "One page per fruit or vegetable: apple, banana, grapes, watermelon, carrot, tomato, orange and strawberry.",
      "A large, bold outline drawing that a three-year-old can colour inside without frustration.",
      "The name in Arabic and English, each on a tracing row — solid guide, then faint guide, then blank.",
      "A one-line fact about the fruit, written for a parent to read aloud while the child colours.",
    ],
    insideAr: [
      "صفحة لكلّ فاكهة أو خضروات: التفاح والموز والعنب والبطيخ والجزر والطماطم والبرتقالة والفراولة.",
      "رسم كبير واضح الخطوط يستطيع طفل الثالثة تلوينه دون إحباط.",
      "الاسم بالعربية والإنجليزية، كلٌّ على سطر تتبّع: دليل متّصل، ثمّ دليل خفيف، ثمّ فراغ.",
      "معلومة واحدة قصيرة عن الثمرة، كُتبت ليقرأها الوالد بصوت عالٍ أثناء التلوين.",
    ],
    useEn: [
      "Food is the fastest vocabulary for a small child because they can taste it. After colouring the apple page, eat an apple and say the word again — the memory attaches to the fruit, not to the paper.",
      "Keep the finished pages together and you end up with a food book your child made themselves. Ask them, in Arabic, for each page: what is this? The tracing at the bottom of the sheet is the model answer.",
    ],
    useAr: [
      "طعام أسرع مفردات يصل إليها الطفل الصغير لأنّه يتذوّقها. بعد تلوين صفحة التفاحة كلوا تفاحة وأعيدوا الكلمة — فترتبط الذاكرة بالفاكهة لا بالورق.",
      "اجمعوا الصفحات الملوّنة معاً يصير لديكم كتاب طعام صنعه طفلكم بنفسه. واسألوه بالعربية عند كلّ صفحة: ما هذه؟ تتبّع الاسم في أسفل الورقة هو الجواب النموذجي.",
    ],
    faq: [
      {
        qEn: "Is the PDF really free?",
        qAr: "أهو ملف PDF مجاني فعلاً؟",
        aEn: "Yes — the download asks for no email, no account and no payment, and the pages carry no watermark.",
        aAr: "نعم — التنزيل بلا بريد إلكتروني وبلا حساب وبلا دفع، والصفحات بلا علامة مائية.",
      },
      {
        qEn: "What age is this coloring book for?",
        qAr: "لكم هذا الكتاب من العمر؟",
        aEn: "Roughly three to seven. Younger children colour the picture; five- and six-year-olds do the word tracing too; seven-year-olds can copy the fact line in their own handwriting.",
        aAr: "من نحو الثالثة إلى السابعة. الأصغر يلوّن الرسمة، وخماسية أو سادسية تتتبّع الكلمات أيضاً، والسابعة تنسخ سطر المعلومة بخطّها.",
      },
    ],
  },
  {
    id: "arabic-transport-coloring",
    seoTitleEn: "Arabic Transport Coloring Pages PDF — Car, Bus, Train & More",
    seoTitleAr: "كتاب تلوين وسائل النقل بالعربية PDF — سيارة وحافلة وقطار",
    seoDescEn:
      "Free printable Arabic vehicles coloring book: 6 pages of things that go — car, bus, train, airplane, ship and bicycle — with the Arabic and English names to trace. PDF, free, no signup.",
    seoDescAr:
      "كتاب تلوين الآليات بالعربية مجاناً: 6 صفحات — سيارة وحافلة وقطار وطائرة وسفينة ودراجة — مع تتبّع الأسماء بالعربية والإنجليزية. PDF مجاني بلا تسجيل.",
    keywords: [
      "arabic transport coloring pages",
      "vehicles coloring book arabic names pdf",
      "car coloring page with arabic word",
      "means of transport in arabic for kids",
      "وسائل النقل بالعربية للأطفال تلوين",
      "تلوين السيارات بالعربية pdf",
    ],
    taglineEn: "Six things that go, from سيارة to سفينة — colour them, then trace their names.",
    taglineAr: "ستّ آليات من «سيارة» إلى «سفينة» — لوّنها ثمّ تتبّع أسماءها.",
    insideEn: [
      "Six vehicles a child actually sees: car, bus, train, airplane, ship and bicycle.",
      "A big side-view outline of each one, drawn with the bold simple lines small hands colour inside.",
      "Arabic and English name tracing on every page, with the transliteration printed under the title.",
      "A fact about each vehicle that answers the question children always ask — which is fastest? how does it stay up?",
    ],
    insideAr: [
      "ستّ آليات يراها الطفل فعلاً: سيارة وحافلة وقطار وطائرة وسفينة ودراجة.",
      "رسم جانبي كبير لكلّ آلية بخطوط عريضة بسيطة يلوّن داخلها الصغار.",
      "تتبّع الاسم بالعربية والإنجليزية في كلّ صفحة، مع النقل الصوتي مطبوعاً تحت العنوان.",
      "معلومة عن كلّ آلية تجيب عن السؤال الذي يسأله الأطفال دائماً: أيّها أسرع؟ وكيف يبقى في الجوّ؟",
    ],
    useEn: [
      "Vehicles are the words a child points at through a car window — which makes this the coloring book to keep in the car. Colour the bus at home, then find one on the road and say حافلة when you see it.",
      "One page per journey is plenty. The point of the tracing row is not beautiful handwriting; it is the hand learning the shape of a word the mouth already says.",
    ],
    useAr: [
      "الآليات هي الكلمات التي يشير إليها الطفل من نافذة السيارة — ولهذا فهذا الكتاب هو ما يُترك في السيارة. لوّنوا الحافلة في البيت، ثمّ ابحثوا عن حافلة على الطريق وقولوا «حافلة» عند رؤيتها.",
      "صفحة واحدة لكلّ رحلة تكفي. غاية سطر التتبّع ليست خطّاً جميلاً، بل يدٌ تتعلّم شكل كلمة يقولها الفم أصلاً.",
    ],
    faq: [
      {
        qEn: "Are the vehicle names in Modern Standard Arabic?",
        qAr: "أأسماء الآليات بالفصحى؟",
        aEn: "Yes — every name is fuṣḥā (سيارة, حافلة, قطار), which is what children meet in Arabic books and cartoons, written here with full tashkeel on the tracing rows.",
        aAr: "نعم — كلّ الأسماء بالفصحى (سيارة، حافلة، قطار)، وهي التي يقابلها الطفل في الكتب والرسوم المتحرّكة، مكتوبة هنا مشكولة تماماً في أسطر التتبّع.",
      },
      {
        qEn: "Can I print it in black and white?",
        qAr: "أأطبعها بالأبيض والأسود؟",
        aEn: "Please do — the pages are deliberately ink-friendly line art. The only colour is the child's.",
        aAr: "بل نرجو ذلك — الصفحات رسوم خطّية قليلة الحبر عمداً. واللون الوحيد فيها لون طفلك.",
      },
    ],
  },
  {
    id: "arabic-solar-system-coloring",
    seoTitleEn: "Arabic Solar System Coloring Pages PDF — Sun, Moon, Planets",
    seoTitleAr: "كتاب تلوين المجموعة الشمسية بالعربية PDF — الشمس والقمر والكواكب",
    seoDescEn:
      "Free printable Arabic space coloring book: the sun, moon, earth, Saturn, stars and a rocket, each with its Arabic name to trace. Pairs with our Solar System lesson for kids. PDF, free.",
    seoDescAr:
      "كتاب تلوين الفضاء بالعربية مجاناً: الشمس والقمر والأرض وزحل والنجوم والصاروخ، مع تتبّع الاسم العربي. يكمل درس المجموعة الشمسية للأطفال. PDF مجاني.",
    keywords: [
      "arabic solar system coloring pages",
      "space coloring book with arabic names pdf",
      "sun moon coloring page arabic",
      "المجموعة الشمسية للتلوين pdf",
      "كتاب تلوين الفضاء بالعربية",
      "تلوين الشمس والقمر للأطفال",
    ],
    taglineEn: "Colour the Sun, trace شَمْس. Space words for kids who love what is overhead.",
    taglineAr: "لوّن الشمس وتتبّع «شَمْس». كلمات الفضاء لمن يعشقون ما فوق الرؤوس.",
    insideEn: [
      "Six pages: sun, crescent moon, earth, Saturn, a five-pointed star and a rocket.",
      "A bold outline of each, big enough to colour and simple enough to recognise.",
      "The Arabic name on a tracing row with the English name and transliteration alongside.",
      "One true fact per page — the moon reflects light, Saturn's rings are ice — written at read-aloud level.",
    ],
    insideAr: [
      "ستّ صفحات: الشمس والقمر الهلاليّ والأرض وزحل والنجمة الخماسيّة والصاروخ.",
      "رسم واضح لكلّ واحد، كبير بما يكفي للتلوين وبسيط بما يكفي للتعرّف.",
      "الاسم العربي على سطر تتبّع، مع الاسم الإنجليزي والنقل الصوتي إلى جانبه.",
      "معلومة صحيحة واحدة في كلّ صفحة — القمر يعكس الضوء، وخواتم زحل من الجليد — بمستوى يُقرأ بصوت عالٍ.",
    ],
    useEn: [
      "Read our Solar System lesson first, then colour. The lesson gives the child the idea; the coloring page gives their hands something to do while the idea settles.",
      "Hang the finished Sun page where the actual sun reaches it in the morning. Children check facts against reality more than adults expect — an unlit corner of the room teaches nothing about light.",
    ],
    useAr: [
      "اقرأوا درس المجموعة الشمسية على الموقع أوّلاً ثمّ لوّنوا. فالدرس يمنح الطفل الفكرة، وصفحة التلوين تمنح يديه عملاً حتى تستقرّ الفكرة.",
      "علّقوا صفحة الشمس الملوّنة حيث تصلها الشمس الحقيقيّة صباحاً. فالأطفال يحقّقون المعلومة مقابل الواقع أكثر ممّا يتوقّع الكبار.",
    ],
    faq: [
      {
        qEn: "Does this match the Solar System lesson on the site?",
        qAr: "أيطابق درس المجموعة الشمسية على الموقع؟",
        aEn: "Yes — it is the colouring companion to arabfingers.site/en/learn/solar-system, and the story 'A Trip to the Moon' uses the same six words.",
        aAr: "نعم — هو رفيق التلوين لدرس المجموعة الشمسية، وقصة «رحلة إلى القمر» تستعمل الكلمات الستّ نفسها.",
      },
      {
        qEn: "Is it only six pages?",
        qAr: "أهو ستّ صفحات فقط؟",
        aEn: "Six drawings, one per page, each with the tracing rows and a fact — enough for a week of after-school colouring without repeating a single sheet.",
        aAr: "ستّ رسوم، رسم في صفحة، مع أسطر التتبّع والمعلومة — تكفي أسبوع تلوين بعد المدرسة دون تكرار أيّ ورقة.",
      },
    ],
  },

  {
    id: "arabic-alphabet-coloring",
    seoTitleEn: "Arabic Alphabet Coloring Pages PDF — 28 Big Bubble Letters",
    seoTitleAr: "كتاب تلوين الحروف العربية PDF — 28 حرفاً كبيراً مفرّغاً",
    seoDescEn:
      "Free printable Arabic alphabet coloring book: all 28 letters as big bubble letters to colour in, with example words and a tracing row per letter. One PDF, no signup.",
    seoDescAr:
      "كتاب تلوين الحروف العربية مجاناً: الحروف الـ28 كلّها كحروف كبيرة مفرّغة للتلوين، مع كلمات كلّ حرف وسطر تتبّع. ملف PDF واحد بلا تسجيل.",
    keywords: [
      "arabic alphabet coloring pages",
      "arabic letters coloring book pdf",
      "bubble letter arabic alphabet printable",
      "coloring pages arabic letters free",
      "تلوين الحروف العربية pdf",
      "كتاب تلوين الحروف للأطفال",
    ],
    taglineEn: "One giant letter per page. Colour it, say it, trace it — 28 times.",
    taglineAr: "حرفٌ ضخم في كلّ صفحة. لوّنه وانطقه وتتبّعه — ثمانياً وعشرين مرّة.",
    insideEn: [
      "One page per letter — all 28 — with the letter drawn as a huge outlined bubble shape that a chunky crayon fits inside.",
      "Two example words per letter with their emoji, so every letter arrives attached to a meaning.",
      "A tracing row under the picture: one solid guide, two faint guides, then blank cells.",
      "The letter's name and transliteration in the header, so the adult always knows what sound to model.",
    ],
    insideAr: [
      "صفحة لكلّ حرف — الثمانية والعشرون كلّها — والحرف مرسوماً كفقاعة ضخمة مفرّغة يتّسع فيها قلم الشمع السميك.",
      "كلمتان لكلّ حرف مع صورتيهما الرمزيّتين، ليأتي الحرف مقترناً بمعنى.",
      "سطر تتبّع تحت الصورة: دليل واحد متّصل، ودليلان خفيفان، ثمّ خانات فارغة.",
      "اسم الحرف ونقله في رأس الصفحة، ليعرف الكبير دائماً أيّ صوتٍ يُقدّمه.",
    ],
    useEn: [
      "This is the pre-writing version of the alphabet. Three-year-olds who cannot yet trace a straight line can still fill a big letter with colour — and the hand movement of colouring inside a letterform is real preparation for writing it.",
      "Say the letter's sound every time your child colours a stroke of it, not once at the start. By the page's end the sound and the shape have met twenty times.",
      "Tear out the three letters of the child's own name first. They are the pages that get coloured twice.",
    ],
    useAr: [
      "هذه هي نسخة ما قبل الكتابة من الأبجدية. فالطفل الثلاثي الذي لا يستطيع بعد تتبّع خطّ مستقيم يستطيع أن يملأ حرفاً كبيراً باللون — وحركة التلوين داخل شكل الحرف تمهيدٌ حقيقيّ لكتابته.",
      "انطق صوت الحرف في كلّ مرّة يلوّن فيها ضربةً منه، لا مرّةً في البداية فقط. فبنهاية الصفحة يكون الصوت والشكل قد التقيا عشرين مرّة.",
      "اقلَع أوّلاً صفحات حروف اسم الطفل نفسه — فهي الصفحات التي ستُلوَّن مرّتين.",
    ],
    faq: [
      {
        qEn: "How is this different from the tracing pack?",
        qAr: "أبِمَ يختلف عن حزمة التتبّع؟",
        aEn: "The tracing pack teaches the hand to write; this one teaches the eye to recognise. Colouring a huge ب builds the shape memory that tracing then trains — they work best as a pair, colouring first for the younger child.",
        aAr: "حزمة التتبّع تعلّم اليدَ الكتابة، وهذا الكتاب يعلّم العينَ التعرّف. فتلوين «ب» ضخمة يبني ذاكرة الشكل الذي يثبّته التتبّع لاحقاً — ويعملان أفضل معاً، والتلوين أوّلاً للأصغرّ.",
      },
      {
        qEn: "Do the bubble letters show the letter in its isolated form only?",
        qAr: "أالحروف المفرّغة بشكلها المنفرد فقط؟",
        aEn: "Yes — colouring works best on one big shape. The joined forms are on the tracing pack's pages and in the free alphabet chart.",
        aAr: "نعم — التلوين يعمل أفضل على شكل واحد كبير. أمّا أشكال الاتّصال ففي صفحات حزمة التتبّع وفي لوحة الحروف المجانية.",
      },
    ],
  },
  {
    id: "arabic-ramadan-coloring",
    seoTitleEn: "Ramadan Coloring Pages PDF in Arabic — Lantern, Mosque, Crescent",
    seoTitleAr: "كتاب تلوين رمضان والعيد بالعربية PDF — فانوس ومسجد وهلال",
    seoDescEn:
      "Free printable Ramadan coloring pages in Arabic: lantern, mosque, crescent moon, dates, gift and balloon, each with its Arabic name to trace. PDF download, no email required.",
    seoDescAr:
      "صفحات تلوين رمضان بالعربية مجاناً: الفانوس والمسجد والهلال والتمرات والهدية والبالون، مع تتبّع الاسم العربي في كلّ صفحة. تحميل PDF بلا بريد إلكتروني.",
    keywords: [
      "ramadan coloring pages arabic",
      "ramadan lantern coloring page free pdf",
      "eid coloring pages printable arabic",
      "أنشطة رمضان للأطفال تلوين",
      "كتاب تلوين رمضان pdf",
      "تلوين الفانوس رمضان للأطفال",
    ],
    taglineEn: "Six pages of Ramadan and Eid — colour the فانوس, trace its name, learn the month's words.",
    taglineAr: "ستّ صفحات من رمضان والعيد — لوّن الفانوس وتتبّع اسمه وتعلّم كلمات الشهر.",
    insideEn: [
      "Six pages: lantern, mosque, crescent, dates, gift and balloon — the objects a child actually sees in the month.",
      "A bold outline of each, sized for small hands and printed in ink-friendly line art.",
      "The Arabic name on a tracing row, with the English name and transliteration alongside.",
      "A one-line fact per page, from why lanterns light the month to what the new crescent announces.",
    ],
    insideAr: [
      "ستّ صفحات: الفانوس والمسجد والهلال والتمرات والهدية والبالون — الأشياء التي يراها الطفل فعلاً في الشهر.",
      "رسم واضح لكلّ واحد، بحجم يناسب الأيدي الصغيرة وبطباعة توفّر الحبر.",
      "الاسم العربي على سطر تتبّع، مع الاسم الإنجليزي والنقل الصوتي إلى جانبه.",
      "معلومة واحدة في كلّ صفحة — من سبب إضاءة الفوانيس في الشهر إلى ما يُعلنه الهلال الجديد.",
    ],
    useEn: [
      "Print the lantern page on the first night of Ramadan and colour one page a night — by Eid the set is finished, and the month had a small daily ritual attached to it.",
      "Read our story 'The Little Lantern' alongside it: Ahmad hangs his lantern on page one, and your child hangs theirs on paper.",
    ],
    useAr: [
      "اطبعوا صفحة الفانوس في أوّل ليلة من رمضان، ولوّنوا صفحة كلّ ليلة — فبحلول العيد تكون المجموعة قد اكتملت، وارتبط بالشهر طقسٌ يوميٌّ صغير.",
      "اقرأوا معها قصة «الفانوس الصغير» على الموقع: أحمد يعلّق فانوسه على الباب، وطفلكم يعلّق فانوسه على الورق.",
    ],
    faq: [
      {
        qEn: "Are the pages religious or cultural?",
        qAr: "أالصفحات دينيّة أم ثقافيّة؟",
        aEn: "Cultural with a light touch: lanterns, crescent, dates, gifts and a mosque exterior. There is no theology on the pages — just the month's objects and their names, so any family can use them.",
        aAr: "ثقافيّة بلمسة خفيفة: فوانيس وهلال وتمرات وهدايا وواجهة مسجد. لا لاهوت في الصفحات — بل أجسام الشهر وأسماؤها، فتناسب كلّ أسرة.",
      },
      {
        qEn: "Is there a story that goes with it?",
        qAr: "أثمّة قصة ترافقها؟",
        aEn: "Yes — 'The Little Lantern' (al-fanoos-al-sagheer) on our Stories page uses the same six words and shares the iftar scene.",
        aAr: "نعم — قصة «الفانوس الصغير» في صفحة القصص تستعمل الكلمات الستّ نفسها وتشترك في مشهد الإفطار.",
      },
    ],
  },
  {
    id: "arabic-sea-animals-coloring",
    seoTitleEn: "Sea Animals Coloring Pages in Arabic PDF — Whale, Octopus, Crab",
    seoTitleAr: "كتاب تلوين حيوانات البحر بالعربية PDF — حوت وأخطبوط وسرطان",
    seoDescEn:
      "Free printable sea animals coloring pages with Arabic names: whale, octopus, crab, turtle, dolphin and starfish. Big outlines to colour, bilingual tracing rows, one free PDF.",
    seoDescAr:
      "صفحات تلوين حيوانات البحر بأسمائها العربية مجاناً: الحوت والأخطبوط والسلطعون والسلحفاة والدلفين ونجمة البحر. رسوم كبيرة للتلوين وأسطر تتبّع ثنائية اللغة في ملف PDF واحد.",
    keywords: [
      "sea animals coloring pages arabic",
      "ocean animals coloring book pdf free",
      "whale coloring page with arabic name",
      "حيوانات البحر للتلوين pdf",
      "كتاب تلوين الكائنات البحرية للأطفال",
    ],
    taglineEn: "Colour the whale, trace حُوت. Six sea creatures, six facts, one free PDF.",
    taglineAr: "لوّن الحوت وتتبّع «حُوت». ستّة كائنات بحرية، ستّ معلومات، ملف PDF مجاني واحد.",
    insideEn: [
      "Six sea creatures: whale, octopus, crab, turtle, dolphin and starfish.",
      "A large side-view outline of each, drawn with the bold simple lines small hands can colour inside.",
      "The Arabic name on a tracing row, with English and transliteration beside it.",
      "A fact a parent can read aloud — three hearts, walking sideways, returning to the birth beach.",
    ],
    insideAr: [
      "ستّة كائنات بحرية: الحوت والأخطبوط والسلطعون والسلحفاة والدلفين ونجمة البحر.",
      "رسم جانبي كبير لكلّ كائن بخطوط عريضة بسيطة تلوّن داخلها الأيدي الصغيرة.",
      "الاسم العربي على سطر تتبّع، مع الإنجليزي والنقل الصوتي بجانبه.",
      "معلومة يقرأها الوالد بصوت عالٍ — ثلاثة قلوب، ومشٍّ جانبيّ، والعودة إلى شاطئ الميلاد.",
    ],
    useEn: [
      "Read 'The Little Whale' first — the octopus, crab and turtle in the story are the ones on these pages, so the child colours characters they already know.",
      "Blue is about to become the only colour that matters. Keep one page per bath time: colour it, then name every animal in Arabic while the water drains.",
    ],
    useAr: [
      "اقرأوا قصة «الحوت الصغير» أوّلاً — فالأخطبوط والسلطعون والسلحفاة الذين في القصة هم أنفسهم في هذه الصفحات، فيلوّن الطفل شخصياتٍ يعرفها.",
      "الأزرق سيصبح اللون الوحيد المهمّ. اجعلوا لكلّ حمّام صفحة: لوّنوها، ثمّ سمّوا كلّ حيوان بالعربية والماء ينزل.",
    ],
    faq: [
      {
        qEn: "Is this different from the land animals book?",
        qAr: "أيختلف عن كتاب حيوانات البرّ؟",
        aEn: "Completely — no overlap with the eight land animals. The two books together give sixteen animals, and both use the same page format your child already knows.",
        aAr: "مختلف تماماً — لا تداخل مع الحيوانات الثمانية في البرّ. والكتابان معاً يمنحان ستّة عشر حيواناً بالصيغة نفسها التي يعرفها طفلك.",
      },
      {
        qEn: "What ages is it for?",
        qAr: "لأيّ أعمار هي؟",
        aEn: "Three to seven: colouring only at three, tracing from five, and older kids can copy the fact line in their own handwriting.",
        aAr: "من الثالثة إلى السابعة: تلوين فقط في الثالثة، وتتبّع من الخامسة، والأكبر نسخاً سطر المعلومة بخطّه.",
      },
    ],
  },

  {
    id: "arabic-body-parts-coloring",
    seoTitleEn: "My Body in Arabic — Coloring Pages PDF (Head, Eye, Hand)",
    seoTitleAr: "جسمي بالعربية — صفحات تلوين PDF (الرأس والعين واليد)",
    seoDescEn:
      "Free printable body parts coloring pages with Arabic names: head, eye, ear, mouth, hand and foot. Colour the part, trace its name, then point to it on yourself. PDF, free.",
    seoDescAr:
      "صفحات تلوين أجزاء الجسم بأسمائها العربية مجاناً: الرأس والعين والأذن والفم واليد والقدم. لوّن الجزء وتتبّع اسمه ثم أشِر إليه في جسمك. PDF مجاني.",
    keywords: [
      "body parts in arabic for kids",
      "arabic body parts coloring pages",
      "my body arabic worksheet pdf",
      "أجزاء الجسم بالعربية للأطفال تلوين",
      "كتاب تلوين جسمي بالعربية",
    ],
    taglineEn: "Colour the hand, trace يَد, then touch your own — body words stick fastest on the body itself.",
    taglineAr: "لوّن اليد وتتبّع «يد» ثم أشِر إلى يدك — كلمات الجسم تثبت أسرع على الجسم نفسه.",
    insideEn: [
      "Six pages: head, eye, ear, mouth, hand and foot.",
      "A large, friendly outline of each part — the eye with its lashes, the hand with all five fingers.",
      "Arabic and English name tracing on every page, with the transliteration printed under the title.",
      "A one-line fact per part — twenty-seven bones in a hand, a quarter of your bones in a foot.",
    ],
    insideAr: [
      "ستّ صفحات: الرأس والعين والأذن والفم واليد والقدم.",
      "رسم كبير لطيف لكلّ جزء — العين برموشها، واليد بأصابعها الخمسة.",
      "تتبّع الاسم بالعربية والإنجليزية في كلّ صفحة، مع النقل الصوتي تحت العنوان.",
      "معلومة واحدة لكلّ جزء — سبع وعشرون عظمة في اليد، وربع عظام الجسم في القدم.",
    ],
    useEn: [
      "Body words are the easiest vocabulary to teach because the flashcards are attached to your child. Colour the ear page, then whisper 'أُذُن' into the ear. Colour the hand, then high-five and say 'يَد'.",
      "Do one part per day and end the week with a game: you say the Arabic word, your child touches the part. Six words, one week, remembered for years.",
    ],
    useAr: [
      "كلمات الجسم أسهل مفرداتٍ تُعلَّم لأنّ بطاقاتها معلّقة في جسم طفلك نفسه. لوّنوا صفحة الأذن ثم همسوا في الأذن: «أُذُن». لوّنوا اليد ثم تصافحوا وقولوا: «يَد».",
      "جزء واحد كلّ يوم، وأنهوا الأسبوع بلعبة: تقولون الكلمة العربية ويلمس الطفل الجزء. ستّ كلمات في أسبوع، تبقى في الذاكرة سنين.",
    ],
    faq: [
      {
        qEn: "Which body words are included?",
        qAr: "أيّ كلمات الجسم مضمّنة؟",
        aEn: "Head (ra's), eye ('ayn), ear (udhun), mouth (fam), hand (yad) and foot (qadam) — the six a toddler first points at, each on its own page.",
        aAr: "الرأس والعين والأذن والفم واليد والقدم — الأجزاء الستّة التي يشير إليها الطفل أوّلاً، كلّ واحد في صفحة.",
      },
      {
        qEn: "Can I use this in a classroom?",
        qAr: "أأستعملها في الصفّ؟",
        aEn: "Yes — print one per child and do the 'touch the part' game together. The full permission list is on the Worksheets page: personal, family and classroom use are all fine.",
        aAr: "نعم — اطبعوا نسخة لكلّ طفل والعبوا لعبة «المس الجزء» معاً. وترخيص الاستعمال الكامل في صفحة أوراق العمل: شخصيّ وعائليّ وصفيّ.",
      },
    ],
  },
  {
    id: "arabic-seasons-coloring",
    seoTitleEn: "The Four Seasons in Arabic — Coloring Pages PDF (Free)",
    seoTitleAr: "الفصول الأربعة بالعربية — صفحات تلوين PDF مجاناً",
    seoDescEn:
      "Free printable four seasons coloring pages in Arabic: the same tree in spring blossom, summer sun, autumn leaves and winter snow, with the season's Arabic name to trace. One PDF.",
    seoDescAr:
      "صفحات تلوين الفصول الأربعة بالعربية مجاناً: الشجرة نفسها في زهر الربيع وشمس الصيف وأوراق الخريف وثلج الشتاء، مع تتبّع اسم الفصل بالعربية. ملف PDF واحد.",
    keywords: [
      "four seasons in arabic for kids",
      "seasons coloring pages arabic pdf",
      "spring summer autumn winter arabic",
      "الفصول الأربعة بالعربية للأطفال",
      "تلوين الفصول الأربعة pdf",
    ],
    taglineEn: "One tree, four seasons, four Arabic words — ربيع, صيف, خريف, شتاء.",
    taglineAr: "شجرةٌ واحدة وأربعة فصول وأربع كلمات — ربيع وصيف وخريف وشتاء.",
    insideEn: [
      "Four pages — one per season — with the same tree drawn four ways: blossoms, full summer leaves, falling gold leaves, bare in the snow.",
      "The season's Arabic name on a tracing row, with English and transliteration alongside.",
      "A one-line fact about what each season does.",
      "A 'draw your favourite thing in this season' box that turns the sheet into a personal keepsake.",
    ],
    insideAr: [
      "أربع صفحات — فصل في صفحة — والشجرة نفسها مرسومة بأربع صور: زهور وصيفٌ وأوراق ذهبية وثلج.",
      "اسم الفصل العربي على سطر تتبّع، مع الإنجليزي والنقل الصوتي بجانبه.",
      "معلومة واحدة عمّا يفعل كلّ فصل.",
      "صندوق «ارسم شيئك المفضّل في هذا الفصل» يحوّل الورقة إلى ذكرى شخصية.",
    ],
    useEn: [
      "Colour the page that matches the season you are actually in, then hang it in the window. When the real tree outside changes, the Arabic word on the wall has changed with it.",
      "Four pages make a small book when folded — the season names on the left, your child's drawings on the right.",
    ],
    useAr: [
      "لوّنوا الصفحة التي تطابق الفصل الذي تعيشونه فعلاً ثم علّقوها في النافذة. وحين تتغيّر الشجرة الحقيقيّة خارجاً تكون الكلمة العربية على الحوار قد تغيّرت معها.",
      "أربع صفحات تصنع كتاباً صغيراً عند الطيّ — أسماء الفصول في الجهة اليسرى ورسوم طفلكم في اليمنى.",
    ],
    faq: [
      {
        qEn: "Are the four pages the same tree?",
        qAr: "أالصفحات الأربع للشجرة نفسها؟",
        aEn: "Yes — deliberately. The same tree in four states is what makes 'season' concrete for a five-year-old: the tree does not change, the year does.",
        aAr: "نعم — عمداً. الشجرة نفسها بأربع حالات هي ما يجعل «الفصل» ملموساً لطفل الخامسة: الشجرة لا تتغيّر، بل السنة.",
      },
      {
        qEn: "Only four pages?",
        qAr: "أأربع صفحات فقط؟",
        aEn: "Four seasons, four pages — one sheet per season is enough for the word to stick when it is coloured in the right month.",
        aAr: "أربعة فصول وأربع صفحات — ورقة لكلّ فصل تكفي لتثبيت الكلمة حين تُلوَّن في شهره الصحيح.",
      },
    ],
  },
  {
    id: "arabic-opposites-coloring",
    seoTitleEn: "Arabic Opposites Coloring Pages PDF — Big & Small, Day & Night",
    seoTitleAr: "كتاب تلوين المتضادّات بالعربية PDF — كبير وصغير، نهار وليل",
    seoDescEn:
      "Free printable Arabic opposites coloring pages: big and small, day and night, hot and cold, full and empty, fast and slow — five pages, each pair side by side with both words to trace.",
    seoDescAr:
      "صفحات تلوين المتضادّات بالعربية مجاناً: كبير وصغير، ونهار وليل، وحارّ وبارد، وممتلئ وفارغ، وسريع وبطيء — خمس صفحات، كلّ زوج متجاور مع تتبّع الكلمتين.",
    keywords: [
      "opposites in arabic for kids",
      "arabic opposites worksheet pdf",
      "arabic antonyms coloring pages",
      "المتضادّات بالعربية للأطفال",
      "كتاب تلوين المتضادّات pdf",
    ],
    taglineEn: "Five pairs, side by side: colour both, trace both — كبير and صغير forever linked.",
    taglineAr: "خمسة أزواج جنباً إلى جنب: لوّن الاثنين وتتبّع الكلمتين — «كبير» و«صغير» مرتبطان للأبد.",
    insideEn: [
      "Five opposite pairs, each on one page with both drawings side by side: elephant & mouse, sun & moon, campfire & snowman, full & empty glass, rocket & turtle.",
      "Both Arabic words on shared tracing rows, so the pair is learned as a pair.",
      "English tracing underneath, and a sentence using both words that a parent can read aloud.",
      "The reuse is deliberate: the rocket and turtle also appear in the Solar System and Animals books — familiar friends, new relationships.",
    ],
    insideAr: [
      "خمسة أزواج متضادّة، كلّ زوج في صفحة واحدة برسمين متجاورين: فيل وفأر، وشمس وقمر، ونار ورجل ثلج، وكأس ممتلئ وفارغ، وصاروخ وسلحفاة.",
      "الكلمتان العربيتان على صفوف تتبّع مشتركة، فيتعلّم الطفل الزوج كزوجٍ واحد.",
      "تتبّع إنجليزي أسفله، وجملة تجمع الكلمتين يقرأها الوالد بصوت عالٍ.",
      "التكرار مقصود: الصاروخ والسلحفاة ظاهران أيضاً في كتب المجموعة الشمسية والحيوانات — أصدقاء معروفون بعلاقة جديدة.",
    ],
    useEn: [
      "Opposites are learned in pairs, so colour both halves of the page in one sitting and say the two words back to back: كبير… صغير. The rhythm is the lesson.",
      "Then play it live: point at something tall and something short in the room and ask which is which. The sheet teaches the pair; the room tests it.",
    ],
    useAr: [
      "المتضادّات تُتعلَّم أزواجاً، فلوّنوا نصفي الصفحة في جلسة واحدة وقولوا الكلمتين تباعاً: «كبير… صغير». الإيقاع هو الدرس.",
      "ثمّ لعبوها في الغرفة: أشيروا إلى شيء طويل وشيء قصير واسألوا أيّهما أيّ. الورقة تعلّم الزوج، والغرفة تختبره.",
    ],
    faq: [
      {
        qEn: "Why are both words on one page?",
        qAr: "ألماذا الكلمتان في صفحة واحدة؟",
        aEn: "Because an opposite only means something next to its partner. Big alone is a fact; big next to small is a concept — and the tracing rows keep the two words physically side by side.",
        aAr: "لأنّ المتضادّ لا معنى له بعيداً عن شريكه. «كبير» وحدها معلومة، أمّا «كبير» بجانب «صغير» فمفهوم — وأسطر التتبّع تُبقي الكلمتين متجاورتين مادّياً.",
      },
      {
        qEn: "Do I need the other coloring books first?",
        qAr: "أهلأزمتني كتب التلوين الأخرى أوّلاً؟",
        aEn: "No — but children who already coloured the Solar System and Animals books will recognise the rocket and the turtle, which makes this book feel like meeting old friends.",
        aAr: "لا — لكنّ الطفل الذي لوّن سابقاً كتابي المجموعة الشمسية والحيوانات سيتعرّف على الصاروخ والسلحفاة، فيبدو هذا الكتاب لقاءً بأصدقاء قدامى.",
      },
    ],
  },

  {
    id: "arabic-language-day",
    seoTitleEn: "Arabic Language Day Printables (18 Dec) — Free Certificate & Activity PDF",
    seoTitleAr: "أنشطة اليوم العالمي للغة العربية للأطفال (18 ديسمبر) — شهادة وأوراق PDF مجانية",
    seoDescEn:
      "Free printable pack for World Arabic Language Day on 18 December: a certificate, an 'I love Arabic' poster to colour, a write-your-name and letter-hunt sheet, and Arabic words and facts. One PDF, no signup.",
    seoDescAr:
      "حزمة مجانية لليوم العالمي للغة العربية في 18 ديسمبر: شهادة للطفل، وملصق «أحبّ العربية» للتلوين، وورقة لكتابة الاسم والبحث عن الحرف، وكلمات ومعلومات عن العربية. ملف PDF واحد بلا تسجيل.",
    keywords: [
      "arabic language day activities for kids",
      "world arabic language day printables",
      "arabic language day certificate",
      "18 december arabic language day",
      "أنشطة اليوم العالمي للغة العربية للأطفال",
      "شهادة اليوم العالمي للغة العربية",
      "اليوم العالمي للغة العربية 18 ديسمبر",
    ],
    taglineEn: "Four pages for 18 December — a certificate to take home and three activities to earn it.",
    taglineAr: "أربع صفحات ليوم 18 ديسمبر — شهادة يأخذها الطفل إلى البيت وثلاثة أنشطة يستحقّها بها.",
    insideEn: [
      "A certificate for World Arabic Language Day, with a line for the child's name and a box where they write it in Arabic.",
      "An 'I love Arabic' (أحبّ العربية) poster in big outlined letters to colour, with stars and a crescent to decorate and a tracing row underneath.",
      "A 'my name in Arabic' sheet — a grown-up writes it, the child traces it, then writes it alone — plus a letter hunt: ten ب hidden among look-alike letters.",
      "Four short facts about Arabic, three everyday words to trace (language, hello, thank you), and a box to draw a favourite Arabic word.",
    ],
    insideAr: [
      "شهادة اليوم العالمي للغة العربية، فيها سطر لاسم الطفل ومربّع يكتب فيه اسمه بالعربية.",
      "ملصق «أحبّ العربية» بحروف كبيرة مفرّغة للتلوين، مع نجوم وهلال للتزيين وسطر تتبّع في الأسفل.",
      "ورقة «اسمي بالعربية» — يكتبه شخص كبير، ويتتبّعه الطفل، ثمّ يكتبه وحده — ولعبة بحث: عشر باءات مخبّأة بين حروف تشبهها.",
      "أربع معلومات قصيرة عن العربية، وثلاث كلمات يومية للتتبّع (لغة، مرحباً، شكراً)، ومربّع لرسم الكلمة العربية المفضّلة.",
    ],
    useEn: [
      "In a classroom, hand out the three activity pages through the morning and keep the certificate for last — writing their name in Arabic on it is the moment the day is about.",
      "At home, the name sheet is the one to start with. Children want to see their own name in a new script more than any other word, and a grown-up who does not read Arabic can copy the name from a phone keyboard or ask a relative.",
      "Pair it with our Arabic Language Day guide for ten more activities, from a letter hunt around the house to a family 'Arabic only' dinner.",
    ],
    useAr: [
      "في الصفّ، وزّعوا صفحات الأنشطة الثلاث على مدار الصباح واتركوا الشهادة للنهاية — فكتابة الطفل اسمه بالعربية عليها هي لحظة اليوم كلّه.",
      "وفي البيت، ابدأوا بورقة الاسم. فالطفل يريد أن يرى اسمه بخطّ جديد أكثر من أيّ كلمة أخرى، ومن لا يقرأ العربية من الكبار يمكنه نسخ الاسم من لوحة مفاتيح الهاتف أو سؤال أحد الأقارب.",
      "واجمعوها مع دليلنا لليوم العالمي للغة العربية لعشرة أنشطة أخرى، من البحث عن الحروف في البيت إلى عشاء عائليّ «بالعربية فقط».",
    ],
    faq: [
      {
        qEn: "When is World Arabic Language Day?",
        qAr: "متى يكون اليوم العالمي للغة العربية؟",
        aEn: "Every year on 18 December. The United Nations chose the date because on 18 December 1973 the UN General Assembly made Arabic one of its official languages.",
        aAr: "في 18 ديسمبر من كلّ عام. اختارت الأمم المتحدة هذا التاريخ لأنّ الجمعية العامة للأمم المتحدة اعتمدت العربية لغةً رسمية في 18 ديسمبر 1973.",
      },
      {
        qEn: "Does my child need to read Arabic to use the pack?",
        qAr: "هل يحتاج طفلي إلى قراءة العربية ليستعمل الحزمة؟",
        aEn: "No. The poster and the letter hunt work for complete beginners, and every Arabic word is shown with its transliteration and English meaning. The name sheet only needs a grown-up to write the name once.",
        aAr: "لا. الملصق ولعبة البحث عن الحرف تناسبان المبتدئين تماماً، وكلّ كلمة عربية مكتوبة مع نطقها ومعناها بالإنجليزية. وورقة الاسم لا تحتاج إلّا أن يكتب الكبير الاسم مرّة واحدة.",
      },
      {
        qEn: "Can I print it for a whole class or school event?",
        qAr: "هل يمكنني طباعتها لصفّ كامل أو حفل مدرسيّ؟",
        aEn: "Yes — print as many copies as you need for a class, a school assembly or a weekend school. We only ask that you do not sell the file or host it elsewhere as your own.",
        aAr: "نعم — اطبع ما تحتاجه من النسخ لصفّ أو حفل مدرسيّ أو مدرسة نهاية الأسبوع. وإنّما نطلب ألّا تبيع الملف ولا تنشره في مكان آخر منسوباً إليك.",
      },
    ],
  },
  {
    id: "arabic-complete-workbook",
    seoTitleEn: `Complete Arabic Workbook PDF — ${totalWorksheetPages} Free Printable Pages`,
    seoTitleAr: `الكرّاسة العربية الكاملة PDF — ${totalWorksheetPages} صفحة مجانية للطباعة`,
    seoDescEn:
      `Every Arabic worksheet, coloring page and story supplement on this site in one ${totalWorksheetPages}-page PDF, in teaching order: alphabet chart, all 28 letter tracing pages, harakat, numbers, colours, animals, all nine coloring books, the opposites pairs and the Arabic Language Day pack. Free.`,
    seoDescAr:
      `كلّ أوراق العمل وصفحات التلوين في هذا الموقع في ملف PDF واحد من ${totalWorksheetPages} صفحة، بترتيب تعليميّ: لوحة الحروف، وتتبّع الحروف الـ28، والحركات، والأرقام، والألوان، والحيوانات، وكتب التلوين التسعة كلّها، وحزمة اليوم العالمي للغة العربية. مجاناً.`,
    keywords: [
      "arabic workbook pdf free",
      "complete arabic worksheets pdf",
      "arabic worksheets bundle printable",
      "free arabic curriculum pdf kids",
      "arabic coloring book bundle pdf",
      "كرّاسة عربية كاملة pdf",
      "أوراق عمل عربية كاملة للطباعة",
    ],
    taglineEn: `All ${totalWorksheetPages} pages, in the order you would actually teach them.`,
    taglineAr: `الصفحات الـ${totalWorksheetPages} كلّها، بالترتيب الذي تُعلَّم به فعلاً.`,
    insideEn: [
      "The alphabet chart first, so the reference is on the wall before any writing starts.",
      "All 28 letter tracing pages in alphabet order, then the harakat sheets, the letters-with-harakat chart and tanween.",
      "Numbers 1–10 and 11–20, then colours, then animals — vocabulary after letters, which is the order that works.",
      "The nine coloring books next: fruits & vegetables, transport, solar system, the alphabet bubbles, Ramadan & Eid, sea animals, body parts, seasons and opposites — and the Arabic Language Day pack to finish.",
      "One file, so a single print job produces a whole workbook rather than eight separate downloads.",
    ],
    insideAr: [
      "لوحة الحروف أوّلاً، ليكون المرجع على الجدار قبل أن تبدأ الكتابة.",
      "صفحات تتبّع الحروف الثمانية والعشرين كلّها على ترتيب الأبجدية، ثمّ أوراق الحركات، ولوحة الحروف بالحركات، والتنوين.",
      "الأرقام 1–10 ثمّ 11–20، فالألوان، فالحيوانات — المفردات بعد الحروف، وهو الترتيب الذي ينجح.",
      "ثمّ كتب التلوين التسعة: الفواكه والخضروات، ووسائل النقل، والمجموعة الشمسية، وحروف الأبجدية، ورمضان والعيد، وحيوانات البحر، وأجزاء الجسم، والفصول الأربعة، والمتضادّات — وحزمة اليوم العالمي للغة العربية في الختام.",
      "ملف واحد، فتُخرج طباعة واحدة كرّاسة كاملة بدل ثمانية تنزيلات منفصلة.",
    ],
    useEn: [
      "This is the pack for someone who wants the whole thing at once — a teacher setting up for a term, a parent printing before a long trip, a family with no printer at home taking one file to a print shop.",
      `If you are working with one child at home, the individual packs are usually the better choice. ${totalWorksheetPages} pages arriving in one stack sets an expectation of completion, and a workbook with unfinished pages in the middle starts to feel like a failure rather than an activity. Print what you need this week.`,
    ],
    useAr: [
      "هذه للحزمة لمن يريد الأمر كلّه دفعة واحدة: معلّم يُعِدّ لفصل دراسيّ، أو والد يطبع قبل سفر طويل، أو أسرة لا طابعة عندها تحمل ملفاً واحداً إلى مركز طباعة.",
      `أمّا إن كنت تعمل مع طفل واحد في البيت، فالحزم المفردة أفضل غالباً. فـ${totalWorksheetPages} صفحة تصل في رزمة واحدة تُنشئ توقّعاً بالإتمام، والكرّاسة التي تتخلّلها صفحات ناقصة تبدأ تشبه الإخفاق لا النشاط. اطبع ما تحتاجه هذا الأسبوع.`,
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
        aEn: "About 3 MB — small enough to email to a print shop or open on a phone, and it will keep working offline once this site has been opened once.",
        aAr: "نحو 3 ميغابايت — صغير بما يكفي لإرساله إلى مركز طباعة أو فتحه على الهاتف، وسيظلّ يعمل دون اتصال متى فُتِح هذا الموقع مرّة.",
      },
    ],
  },
];

export function getWorksheetPage(id: string): WorksheetPage | undefined {
  return worksheetPages.find((p) => p.id === id);
}
