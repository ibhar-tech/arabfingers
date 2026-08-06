/**
 * Free Google Translate TTS Audio Generator for Arab Fingers
 * 
 * This script downloads high-quality, neural, human-like voiceovers for all
 * 4 educational courses in both Arabic and English, plus all letters, colors, 
 * and numbers, and saves them directly to your public directories.
 * 
 * This is 100% free, has no quotas, and requires no API keys or credit cards!
 * 
 * Usage:
 *   node scripts/generate-voiceovers-google.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// Storyboard definitions identical to the app structure
const courses = {
  "states-of-matter": [
    { id: 0, ar: "أهلاً بكم يا أصدقائي في رحلتنا العلمية الممتعة! اليوم سنتعلم معاً عن حالات المادة المذهلة!", en: "Welcome my friends to our fun science journey! Today we will learn all about the amazing states of matter!" },
    { id: 1, ar: "أهلاً بك يا بطل! أنا الدكتور حكيم، وهذا صديقي المساعد الذكي أنس! نحن سعيدان جداً بوجودكم معنا اليوم!", en: "Hello champion! I am Dr. Hakim, and this is my smart assistant Anas! We are super happy to have you with us today!" },
    { id: 2, ar: "يا دكتور حكيم، أنا متحمس جداً! ولكن ما هي 'المادة' بالضبط؟ وهل كل ما نراه حولنا يعتبر مادة؟", en: "Dr. Hakim, I am so excited! But what exactly is 'matter'? Is everything around us considered matter?" },
    { id: 3, ar: "سؤال ممتاز يا أنس! المادة هي كل شيء يشغل حيزاً وله وزن. مثل قالب الجليد هذا، إنه في الحالة الصلبة!", en: "Excellent question, Anas! Matter is anything that takes up space and has weight. Like this ice block, it is in a solid state!" },
    { id: 4, ar: "يا إلهي! عندما يسخن الجليد ينصهر ليصبح ماءً سائلاً! انظروا لجزيئات الماء، إنها ترتدي نظارات سباحة وتنزلق بنشاط!", en: "Oh my! When the ice heats up, it melts into liquid water! Look at the water molecules, they are wearing swim goggles and sliding around!" },
    { id: 5, ar: "رائع يا أنس! وإذا قمنا بتسخين الماء أكثر، فإنه يتبخر ليصبح بخاراً غازياً! تطير الجزيئات هنا وهناك كالأبطال الخارقين!", en: "Wonderful, Anas! And if we heat the water even more, it evaporates into gaseous steam! The molecules fly around like superheroes!" },
    { id: 6, ar: "والآن مفاجأة! هناك حالة رابعة خارقة تسمى البلازما! نراها في البرق والنجوم الساطعة وشاشات النيون المتوهجة!", en: "And now a surprise! There is a super fourth state called Plasma! We see it in lightning, bright stars, and glowing neon lights!" },
    { id: 7, ar: "والآن يا أصدقائي الصغار حان دوركم لتجربة المختبر! حركوا شريط درجة الحرارة وشاهدوا كيف تتحول الجزيئات!", en: "Now my little friends, it's your turn in the lab! Slide the temperature bar and watch the molecules transform in real-time!" },
    { id: 8, ar: "يا له من عرض ممتع ومذهل! دعونا نلخص ما تعلمناه اليوم ببطاقات حالات المادة السحرية!", en: "What a spectacular show! Let's summarize what we have learned today with these magical states of matter cards!" },
    { id: 9, ar: "أحسنتم يا أصدقائي الأذكياء! لقد كنتم علماء رائعين اليوم! استمروا في الاستكشاف والتعلم، ونراكم في مغامرة أخرى!", en: "Outstanding job my clever friends! You were amazing scientists today! Keep exploring and learning, and see you next time!" }
  ],
  "water-cycle": [
    { id: 0, ar: "أهلاً بكم من جديد في مختبرنا الساحر! اليوم سنرافق قطرة ماء صغيرة في رحلتها الدائرية المذهلة في الطبيعة!", en: "Welcome back to our magical lab! Today we will accompany a tiny water drop on its incredible circular journey in nature!" },
    { id: 1, ar: "يا دكتور حكيم، الجو حار جداً اليوم! المياه في كوبي تختفي ببطء، وفي المحيطات أيضاً! أين تذهب يا ترى؟", en: "Dr. Hakim, it's so hot today! The water in my cup is slowly disappearing, and in oceans too! Where does it go?" },
    { id: 2, ar: "سؤال ذكي كالعادة! عندما تسخن الشمس مياه البحار، تتحول إلى بخار خفيف يرتفع عالياً في السماء! تسمى هذه العملية 'التبخر'!", en: "A smart question as always! When the sun heats up ocean waters, it turns into light vapor rising high into the sky! This is called 'evaporation'!" },
    { id: 3, ar: "يا إلهي! عندما يرتفع البخار عالياً حيث الجو بارد، يجتمع معاً ليشكل سحباً جميلة وناعمة! إنه 'التكاثف'!", en: "Oh my! When the vapor rises high where the air is cold, it gathers together to form beautiful, soft clouds! That's 'condensation'!" },
    { id: 4, ar: "بالتأكيد! وعندما تصبح الغيوم ثقيلة جداً ومحملة بالمياه، لا تستطيع حملها بعد الآن، فتتساقط كأصوات مطر أو ثلج! إنه 'الهطول'!", en: "Exactly! And when the clouds get too heavy and laden with water, they cannot hold it anymore, and it falls as rain or snow! That is 'precipitation'!" },
    { id: 5, ar: "رائع! تتدفق مياه الأمطار عبر الأنهار والجداول الجبلية، وتعود مجدداً إلى البحار لتستعد لرحلة جديدة! إنها دورة لا تنتهي أبداً!", en: "Wonderful! Rainwater flows through rivers and mountain streams, returning to the oceans to prepare for a new journey! It's a cycle that never ends!" },
    { id: 6, ar: "والآن حان دوركم لتصبحوا خبراء طقس! حركوا شريط الحرارة وشاهدوا كيف تؤثر على التبخر وسرعة تشكل الغيوم والمطر!", en: "Now it's your turn to become a weather master! Slide the temperature bar and watch how heat affects evaporation, clouds, and rainfall!" },
    { id: 7, ar: "يا له من مغامرة مائية منعشة! دعونا نتذكر محطات قطرتنا الصغيرة الأربع ببطاقات الطقس التفاعلية!", en: "What a refreshing watery adventure! Let's recall the four stages of our little drop with these interactive weather cards!" },
    { id: 8, ar: "أحسنتم يا أصدقائي المستكشفين الأذكياء! لقد كنتم رائعين في فهم أسرار الطقس اليوم! استمروا في التعلم، ونراكم في مغامرة أخرى!", en: "Outstanding job my clever explorer friends! You were amazing at understanding weather secrets today! Keep learning, and see you next time!" }
  ],
  "solar-system": [
    { id: 0, ar: "اربطوا أحزمة الأمان يا أصدقائي! سننطلق اليوم في رحلة فضائية خارقة بين الكواكب لنكتشف كيف تحافظ الجاذبية عليها تدور بسعادة!", en: "Fasten your seatbelts my friends! Today we will fly on a cosmic space journey among the planets to discover how gravity keeps them orbiting!" },
    { id: 1, ar: "يا دكتور حكيم، الفضاء واسع ومخيف جداً! لماذا تدور كواكبنا في دوائر منتظمة حول الشمس ولا تطير متباعدة في الكون الفسيح؟", en: "Dr. Hakim, space is so vast and scary! Why do our planets spin in perfect circles around the sun instead of flying off into the deep universe?" },
    { id: 2, ar: "سؤال عميق جداً! الشمس ضخمة وثقيلة للغاية، لذا تمتلك قوة جذب خارقة غير مرئية تسحب الكواكب نحوها وتجعلها تدور حولها كالمغناطيس!", en: "A very deep question! The Sun is extremely massive and heavy, so it possesses a super invisible gravitational pull that grips planets and keeps them orbiting like a magnet!" },
    { id: 3, ar: "انظروا إلى عطارد، إنه الكوكب الأقرب للشمس! حجمه صغير جداً وهو سريع كالفهد في دورانه لكي لا تسحبه الجاذبية وتسقطه في الشمس الساخنة!", en: "Look at Mercury, it's the closest planet to the sun! It is very small and speeds around like a cheetah so gravity doesn't drag it down into the burning sun!" },
    { id: 4, ar: "يا لها من لمعان! كوكب الزهرة هو الأكثر سخونة وتوهجاً في مجموعتنا لأنه محاط بغيوم سميكة تحبس الحرارة كصوبة دافئة!", en: "What a gorgeous shine! Venus is the hottest and brightest planet because it is wrapped in thick clouds that trap heat like a greenhouse!" },
    { id: 5, ar: "والآن كوكبنا الرائع الأرض! إنه الكوكب الوحيد المليء بالماء والهواء والحياة، ويدور حوله قمر صغير ينير ليلنا الجميل بسعادة!", en: "And now our wonderful planet, Earth! It is the only planet packed with water, air, and life, and a cute little moon spins around it to light up our night!" },
    { id: 6, ar: "انظروا للون الأحمر الرائع! إنه كوكب المريخ المغطى بالحديد والصدأ، ونحن نرسل مركبات فضاء ذكية لتستكشف جباله الشاهقة ووديانه العميقة!", en: "Look at that spectacular red color! It's Mars, covered in iron rust. We send smart rover robots to explore its giant mountains and deep valleys!" },
    { id: 7, ar: "والآن حان دوركم للتحكم في جاذبية الشمس! حركوا الشريط لزيادة الجاذبية وشاهدوا كيف تسرع الكواكب، أو خفضوها لتطير الكويكبات بعيداً!", en: "Now it's your turn to control solar gravity! Slide the bar to increase gravity and watch planets speed up, or decrease it to watch asteroids float away!" },
    { id: 8, ar: "يا له من طيران فضائي مذهل! دعونا نلخص خصائص كواكبنا القريبة الأربعة ببطاقات الفضاء التفاعلية!", en: "What a spectacular cosmic flight! Let's summarize our four neighboring planets with these interactive space cards!" },
    { id: 9, ar: "أحسنتم يا أصدقائي رواد الفضاء الأذكياء! لقد كنتم رائعين في مغامرتنا الكونية اليوم! استمروا في استكشاف النجوم ونراكم قريباً!", en: "Outstanding job my clever astronaut friends! You were amazing on our cosmic adventure today! Keep exploring the stars and see you soon!" }
  ],
  "gravity": [
    { id: 0, ar: "مرحباً بكم يا علماء المستقبل! اليوم سنكتشف قوة خفية مذهلة تمسك بنا على الأرض وتجعل الأشياء تسقط للأسفل! إنها الجاذبية!", en: "Welcome future scientists! Today we will discover a spectacular invisible force that holds us to the ground and makes things fall! It's gravity!" },
    { id: 1, ar: "يا دكتور حكيم، رميت كرتي في الهواء، لكنها عادت وسقطت فوراً على رأسي! لماذا لا تستمر في الطيران للأعلى وتختفي في الفضاء؟", en: "Dr. Hakim, I threw my ball in the air, but it fell right back on my head! Why doesn't it keep flying up and disappear in space?" },
    { id: 2, ar: "سؤال ذكي يا بطل! منذ زمن طويل، رأى العالم إسحاق نيوتن تفاحة تسقط من شجرة، فأدرك أن الأرض تسحب كل شيء نحوها بقوة تسمى الجاذبية!", en: "A smart question, champion! Long ago, scientist Isaac Newton saw an apple fall from a tree, and realized the Earth pulls everything to its center using gravity!" },
    { id: 3, ar: "لاحظ يا أنس! الصخور الثقيلة تسقط بقوة وثبات، بينما الأوراق الخفيفة تطفو ببطء بسبب مقاومة الهواء، لكن الجاذبية تسحب كليهما بالتساوي!", en: "Notice, Anas! Heavy rocks drop firmly, while light feathers float slowly due to air resistance, but gravity pulls both down equally in a vacuum!" },
    { id: 4, ar: "يا إلهي! انظروا إلى رواد الفضاء، إنهم يطفون بسعادة في الفضاء الخارجي لعدم وجود جاذبية تسحبهم للأسفل! يبدو ذلك ممتعاً للغاية!", en: "Oh my! Look at the astronauts, they float happily in outer space because there is no gravity dragging them down! That looks like so much fun!" },
    { id: 5, ar: "صحيح! ولكن انتبهوا، إذا ذهبنا لكوكب المشتري الضخم، فستكون جاذبيته قوية جداً وثقيلة لدرجة تجعل حركتنا بطيئة وصعبة كأننا نحمل صخوراً!", en: "True! But beware, if we go to massive Jupiter, its gravity is so strong and heavy that it makes our movements slow and difficult, as if carrying rocks!" },
    { id: 6, ar: "والآن حان دوركم لتصبحوا سادة الجاذبية! حركوا الشريط لضبط قوة الجاذبية وشاهدوا الأجسام وهي تطفو أو تسقط بسرعة، واضغطوا عليها لتطلقوها!", en: "Now it's your turn to become gravity masters! Slide the bar to adjust gravity strength and watch items float or fall rapidly, and tap them to launch!" },
    { id: 7, ar: "يا لها من تجربة فيزيائية قوية وممتعة! دعونا نلخص خصائص الجاذبية السحرية بأوراق العلوم التفاعلية اللطيفة!", en: "What a powerful and fun physics experiment! Let's summarize the magic properties of gravity with these cute science cards!" },
    { id: 8, ar: "أحسنتم يا أصدقائي العلماء الصغار! لقد كنتم رائعين في تحدي الجاذبية اليوم! استمروا في طرح الأسئلة الذكية ونراكم قريباً!", en: "Outstanding job my little junior scientists! You were amazing at challenging gravity today! Keep asking smart questions and see you soon!" }
  ]
};

const colors = [
  { text: "أحمر", id: "red" },
  { text: "أزرق", id: "blue" },
  { text: "أخضر", id: "green" },
  { text: "أصفر", id: "yellow" },
  { text: "برتقالي", id: "orange" },
  { text: "بنفسجي", id: "purple" },
  { text: "وردي", id: "pink" },
  { text: "أبيض", id: "white" },
  { text: "أسود", id: "black" },
  { text: "بني", id: "brown" },
  { text: "رمادي", id: "gray" },
  { text: "ذهبي", id: "gold" }
];

const numbers = [
  { text: "صفر", id: "zero" },
  { text: "واحد", id: "one" },
  { text: "اثنان", id: "two" },
  { text: "ثلاثة", id: "three" },
  { text: "أربعة", id: "four" },
  { text: "خمسة", id: "five" },
  { text: "ستة", id: "six" },
  { text: "سبعة", id: "seven" },
  { text: "ثمانية", id: "eight" },
  { text: "تسعة", id: "nine" },
  { text: "عشرة", id: "ten" }
];

const letters = [
  { id: "alef", ar: "ألف", en: "Alef" },
  { id: "ba", ar: "باء", en: "Ba" },
  { id: "ta", ar: "تاء", en: "Ta" },
  { id: "tha", ar: "ثاء", en: "Tha" },
  { id: "jeem", ar: "جيم", en: "Jeem" },
  { id: "hha", ar: "حاء", en: "Hha" },
  { id: "kha", ar: "خاء", en: "Kha" },
  { id: "dal", ar: "دال", en: "Dal" },
  { id: "thal", ar: "ذال", en: "Thal" },
  { id: "ra", ar: "راء", en: "Ra" },
  { id: "zay", ar: "زاي", en: "Zay" },
  { id: "seen", ar: "سين", en: "Seen" },
  { id: "sheen", ar: "شين", en: "Sheen" },
  { id: "sad", ar: "صاد", en: "Sad" },
  { id: "dad", ar: "ضاد", en: "Dad" },
  { id: "tah", ar: "طاء", en: "Tah" },
  { id: "zah", ar: "ظاء", en: "Zah" },
  { id: "ain", ar: "عين", en: "Ain" },
  { id: "ghain", ar: "غين", en: "Ghain" },
  { id: "fa", ar: "فاء", en: "Fa" },
  { id: "qaf", ar: "قاف", en: "Qaf" },
  { id: "kaf", ar: "كاف", en: "Kaf" },
  { id: "lam", ar: "لام", en: "Lam" },
  { id: "meem", ar: "ميم", en: "Meem" },
  { id: "noon", ar: "نون", en: "Noon" },
  { id: "ha", ar: "هاء", en: "Ha" },
  { id: "waw", ar: "واو", en: "Waw" },
  { id: "ya", ar: "ياء", en: "Ya" }
];

// Download helper with custom pacer
function downloadGoogleTTS(text, lang, targetPath) {
  // Check if file already exists with content to avoid duplicate downloads!
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 0) {
    console.log(`  ⏭️ Skipping existing file: ${path.basename(targetPath)}`);
    return Promise.resolve(false);
  }

  return new Promise((resolve, reject) => {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`;
    const file = fs.createWriteStream(targetPath);

    const request = https.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(targetPath); // delete empty file
        reject(new Error(`Google Translate TTS Error ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve(true);
      });
    });

    request.on("error", (err) => {
      file.close();
      if (fs.existsSync(targetPath)) fs.unlinkSync(targetPath);
      reject(err);
    });
  });
}

async function generateAll() {
  console.log("🧪 Starting 100% Free Google Neural TTS Voiceover Generation...");
  
  const publicDir = path.join(__dirname, "../public");
  const audioBase = path.join(publicDir, "audio");
  const soundsBase = path.join(publicDir, "sounds");
  
  if (!fs.existsSync(audioBase)) {
    fs.mkdirSync(audioBase, { recursive: true });
  }

  const courseKeys = Object.keys(courses);
  let totalGenerated = 0;

  // 1. Process Science Courses
  for (const course of courseKeys) {
    console.log(`\n📦 Processing Course: ${course}...`);
    const courseDir = path.join(audioBase, course);
    if (!fs.existsSync(courseDir)) {
      fs.mkdirSync(courseDir, { recursive: true });
    }

    const scenes = courses[course];
    for (const scene of scenes) {
      // 1. Generate Arabic MP3
      const arPath = path.join(courseDir, `scene_${scene.id}_ar.mp3`);
      try {
        console.log(`  🗣️ Downloading Arabic - Scene ${scene.id}...`);
        const arGenerated = await downloadGoogleTTS(scene.ar, "ar", arPath);
        if (arGenerated) {
          totalGenerated++;
          await new Promise((r) => setTimeout(r, 600)); // safe delay
        }
      } catch (err) {
        console.error(`  ❌ Failed Arabic Scene ${scene.id}:`, err.message);
      }

      // 2. Generate English MP3
      const enPath = path.join(courseDir, `scene_${scene.id}_en.mp3`);
      try {
        console.log(`  🗣️ Downloading English - Scene ${scene.id}...`);
        const enGenerated = await downloadGoogleTTS(scene.en, "en", enPath);
        if (enGenerated) {
          totalGenerated++;
          await new Promise((r) => setTimeout(r, 600)); // safe delay
        }
      } catch (err) {
        console.error(`  ❌ Failed English Scene ${scene.id}:`, err.message);
      }
    }
  }

  // 2. Process Colors
  console.log("\n🎨 Processing Colors...");
  const colorsDir = path.join(soundsBase, "colors");
  if (!fs.existsSync(colorsDir)) {
    fs.mkdirSync(colorsDir, { recursive: true });
  }

  for (const c of colors) {
    const targetPath = path.join(colorsDir, `${c.id}.mp3`);
    try {
      console.log(`  🗣️ Downloading color: ${c.text} (${c.id})...`);
      const generated = await downloadGoogleTTS(c.text, "ar", targetPath);
      if (generated) {
        totalGenerated++;
        await new Promise((r) => setTimeout(r, 600));
      }
    } catch (err) {
      console.error(`  ❌ Failed color ${c.id}:`, err.message);
    }
  }

  // 3. Process Numbers
  console.log("\n🔢 Processing Numbers...");
  const numbersDir = path.join(soundsBase, "numbers");
  if (!fs.existsSync(numbersDir)) {
    fs.mkdirSync(numbersDir, { recursive: true });
  }

  for (const n of numbers) {
    const targetPath = path.join(numbersDir, `${n.id}.mp3`);
    try {
      console.log(`  🗣️ Downloading number: ${n.text} (${n.id})...`);
      const generated = await downloadGoogleTTS(n.text, "ar", targetPath);
      if (generated) {
        totalGenerated++;
        await new Promise((r) => setTimeout(r, 600));
      }
    } catch (err) {
      console.error(`  ❌ Failed number ${n.id}:`, err.message);
    }
  }

  // 4. Process Letters
  console.log("\n🔤 Processing Letters...");
  const lettersDir = path.join(soundsBase, "letters");
  if (!fs.existsSync(lettersDir)) {
    fs.mkdirSync(lettersDir, { recursive: true });
  }

  for (const l of letters) {
    // 1. Generate Arabic Letter name
    const arPath = path.join(lettersDir, `${l.id}-ar.mp3`);
    try {
      console.log(`  🗣️ Downloading Arabic letter: ${l.ar} (${l.id})...`);
      const generated = await downloadGoogleTTS(l.ar, "ar", arPath);
      if (generated) {
        totalGenerated++;
        await new Promise((r) => setTimeout(r, 600));
      }
    } catch (err) {
      console.error(`  ❌ Failed Arabic letter ${l.id}:`, err.message);
    }

    // 2. Generate English Letter name
    const enPath = path.join(lettersDir, `${l.id}-en.mp3`);
    try {
      console.log(`  🗣️ Downloading English letter: ${l.en} (${l.id})...`);
      const generated = await downloadGoogleTTS(l.en, "en", enPath);
      if (generated) {
        totalGenerated++;
        await new Promise((r) => setTimeout(r, 600));
      }
    } catch (err) {
      console.error(`  ❌ Failed English letter ${l.id}:`, err.message);
    }
  }

  console.log(`\n🎉 Super success! Successfully downloaded all ${totalGenerated} high-quality free voiceover files!`);
}

generateAll().catch((err) => {
  console.error("💥 Generation crashed:", err);
});
