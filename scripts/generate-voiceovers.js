/**
 * Google Cloud Text-to-Speech AI Voiceover Generator for Arab Fingers
 * 
 * This script uses a standard Google Cloud API Key with the Text-to-Speech API enabled
 * to generate premium WaveNet studio voiceovers for all 4 educational courses in
 * both Arabic and English, and saves them directly to the public directory.
 * 
 * Usage:
 *   export GOOGLE_API_KEY="your_api_key_here"
 *   node scripts/generate-voiceovers.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("❌ Error: GOOGLE_API_KEY environment variable is not set.");
  console.log("Please run: export GOOGLE_API_KEY=\"your_google_cloud_api_key\"");
  console.log("Then run: node scripts/generate-voiceovers.js");
  process.exit(1);
}

// ----------------------------------------------------
// STORYBOARDS FOR ALL 4 VIDEOS
// ----------------------------------------------------
const courses = {
  "states-of-matter": [
    { id: 0, speaker: "narrator", ar: "أهلاً بكم يا أصدقائي في رحلتنا العلمية الممتعة! اليوم سنتعلم معاً عن حالات المادة المذهلة!", en: "Welcome my friends to our fun science journey! Today we will learn all about the amazing states of matter!" },
    { id: 1, speaker: "hakim", ar: "أهلاً بك يا بطل! أنا الدكتور حكيم، وهذا صديقي المساعد الذكي أنس! نحن سعيدان جداً بوجودكم معنا اليوم!", en: "Hello champion! I am Dr. Hakim, and this is my smart assistant Anas! We are super happy to have you with us today!" },
    { id: 2, speaker: "anas", ar: "يا دكتور حكيم، أنا متحمس جداً! ولكن ما هي 'المادة' بالضبط؟ وهل كل ما نراه حولنا يعتبر مادة؟", en: "Dr. Hakim, I am so excited! But what exactly is 'matter'? Is everything around us considered matter?" },
    { id: 3, speaker: "hakim", ar: "سؤال ممتاز يا أنس! المادة هي كل شيء يشغل حيزاً وله وزن. مثل قالب الجليد هذا، إنه في الحالة الصلبة!", en: "Excellent question, Anas! Matter is anything that takes up space and has weight. Like this ice block, it is in a solid state!" },
    { id: 4, speaker: "anas", ar: "يا إلهي! عندما يسخن الجليد ينصهر ليصبح ماءً سائلاً! انظروا لجزيئات الماء، إنها ترتدي نظارات سباحة وتنزلق بنشاط!", en: "Oh my! When the ice heats up, it melts into liquid water! Look at the water molecules, they are wearing swim goggles and sliding around!" },
    { id: 5, speaker: "hakim", ar: "رائع يا أنس! وإذا قمنا بتسخين الماء أكثر، فإنه يتبخر ليصبح بخاراً غازياً! تطير الجزيئات هنا وهناك كالأبطال الخارقين!", en: "Wonderful, Anas! And if we heat the water even more, it evaporates into gaseous steam! The molecules fly around like superheroes!" },
    { id: 6, speaker: "hakim", ar: "والآن مفاجأة! هناك حالة رابعة خارقة تسمى البلازما! نراها في البرق والنجوم الساطعة وشاشات النيون المتوهجة!", en: "And now a surprise! There is a super fourth state called Plasma! We see it in lightning, bright stars, and glowing neon lights!" },
    { id: 7, speaker: "narrator", ar: "والآن يا أصدقائي الصغار حان دوركم لتجربة المختبر! حركوا شريط درجة الحرارة وشاهدوا كيف تتحول الجزيئات!", en: "Now my little friends, it's your turn in the lab! Slide the temperature bar and watch the molecules transform in real-time!" },
    { id: 8, speaker: "anas", ar: "يا له من عرض ممتع ومذهل! دعونا نلخص ما تعلمناه اليوم ببطاقات حالات المادة السحرية!", en: "What a spectacular show! Let's summarize what we have learned today with these magical states of matter cards!" },
    { id: 9, speaker: "hakim", ar: "أحسنتم يا أصدقائي الأذكياء! لقد كنتم علماء رائعين اليوم! استمروا في الاستكشاف والتعلم، ونراكم في مغامرة أخرى!", en: "Outstanding job my clever friends! You were amazing scientists today! Keep exploring and learning, and see you next time!" }
  ],
  "water-cycle": [
    { id: 0, speaker: "narrator", ar: "أهلاً بكم من جديد في مختبرنا الساحر! اليوم سنرافق قطرة ماء صغيرة في رحلتها الدائرية المذهلة في الطبيعة!", en: "Welcome back to our magical lab! Today we will accompany a tiny water drop on its incredible circular journey in nature!" },
    { id: 1, speaker: "anas", ar: "يا دكتور حكيم، الجو حار جداً اليوم! المياه في كوبي تختفي ببطء، وفي المحيطات أيضاً! أين تذهب يا ترى؟", en: "Dr. Hakim, it's so hot today! The water in my cup is slowly disappearing, and in oceans too! Where does it go?" },
    { id: 2, speaker: "hakim", ar: "سؤال ذكي كالعادة! عندما تسخن الشمس مياه البحار، تتحول إلى بخار خفيف يرتفع عالياً في السماء! تسمى هذه العملية 'التبخر'!", en: "A smart question as always! When the sun heats up ocean waters, it turns into light vapor rising high into the sky! This is called 'evaporation'!" },
    { id: 3, speaker: "anas", ar: "يا إلهي! عندما يرتفع البخار عالياً حيث الجو بارد، يجتمع معاً ليشكل سحباً جميلة وناعمة! إنه 'التكاثف'!", en: "Oh my! When the vapor rises high where the air is cold, it gathers together to form beautiful, soft clouds! That's 'condensation'!" },
    { id: 4, speaker: "hakim", ar: "بالتأكيد! وعندما تصبح الغيوم ثقيلة جداً ومحملة بالمياه، لا تستطيع حملها بعد الآن، فتتساقط كأصوات مطر أو ثلج! إنه 'الهطول'!", en: "Exactly! And when the clouds get too heavy and laden with water, they cannot hold it anymore, and it falls as rain or snow! That is 'precipitation'!" },
    { id: 5, speaker: "anas", ar: "رائع! تتدفق مياه الأمطار عبر الأنهار والجداول الجبلية، وتعود مجدداً إلى البحار لتستعد لرحلة جديدة! إنها دورة لا تنتهي أبداً!", en: "Wonderful! Rainwater flows through rivers and mountain streams, returning to the oceans to prepare for a new journey! It's a cycle that never ends!" },
    { id: 6, speaker: "narrator", ar: "والآن حان دوركم لتصبحوا خبراء طقس! حركوا شريط الحرارة وشاهدوا كيف تؤثر على التبخر وسرعة تشكل الغيوم والمطر!", en: "Now it's your turn to become a weather master! Slide the temperature bar and watch how heat affects evaporation, clouds, and rainfall!" },
    { id: 7, speaker: "anas", ar: "يا له من مغامرة مائية منعشة! دعونا نتذكر محطات قطرتنا الصغيرة الأربع ببطاقات الطقس التفاعلية!", en: "What a refreshing watery adventure! Let's recall the four stages of our little drop with these interactive weather cards!" },
    { id: 8, speaker: "hakim", ar: "أحسنتم يا أصدقائي المستكشفين الأذكياء! لقد كنتم رائعين في فهم أسرار الطقس اليوم! استمروا في التعلم، ونراكم في مغامرة أخرى!", en: "Outstanding job my clever explorer friends! You were amazing at understanding weather secrets today! Keep learning, and see you next time!" }
  ],
  "solar-system": [
    { id: 0, speaker: "narrator", ar: "اربطوا أحزمة الأمان يا أصدقائي! سننطلق اليوم في رحلة فضائية خارقة بين الكواكب لنكتشف كيف تحافظ الجاذبية عليها تدور بسعادة!", en: "Fasten your seatbelts my friends! Today we will fly on a cosmic space journey among the planets to discover how gravity keeps them orbiting!" },
    { id: 1, speaker: "anas", ar: "يا دكتور حكيم، الفضاء واسع ومخيف جداً! لماذا تدور كواكبنا في دوائر منتظمة حول الشمس ولا تطير متباعدة في الكون الفسيح؟", en: "Dr. Hakim, space is so vast and scary! Why do our planets spin in perfect circles around the sun instead of flying off into the deep universe?" },
    { id: 2, speaker: "hakim", ar: "سؤال عميق جداً! الشمس ضخمة وثقيلة للغاية، لذا تمتلك قوة جذب خارقة غير مرئية تسحب الكواكب نحوها وتجعلها تدور حولها كالمغناطيس!", en: "A very deep question! The Sun is extremely massive and heavy, so it possesses a super invisible gravitational pull that grips planets and keeps them orbiting like a magnet!" },
    { id: 3, speaker: "hakim", ar: "انظروا إلى عطارد، إنه الكوكب الأقرب للشمس! حجمه صغير جداً وهو سريع كالفهد في دورانه لكي لا تسحبه الجاذبية وتسقطه في الشمس الساخنة!", en: "Look at Mercury, it's the closest planet to the sun! It is very small and speeds around like a cheetah so gravity doesn't drag it down into the burning sun!" },
    { id: 4, speaker: "anas", ar: "يا لها من لمعان! كوكب الزهرة هو الأكثر سخونة وتوهجاً في مجموعتنا لأنه محاط بغيوم سميكة تحبس الحرارة كصوبة دافئة!", en: "What a gorgeous shine! Venus is the hottest and brightest planet because it is wrapped in thick clouds that trap heat like a greenhouse!" },
    { id: 5, speaker: "hakim", ar: "والآن كوكبنا الرائع الأرض! إنه الكوكب الوحيد المليء بالماء والهواء والحياة، ويدور حوله قمر صغير ينير ليلنا الجميل بسعادة!", en: "And now our wonderful planet, Earth! It is the only planet packed with water, air, and life, and a cute little moon spins around it to light up our night!" },
    { id: 6, speaker: "anas", ar: "انظروا للون الأحمر الرائع! إنه كوكب المريخ المغطى بالحديد والصدأ، ونحن نرسل مركبات فضاء ذكية لتستكشف جباله الشاهقة ووديانه العميقة!", en: "Look at that spectacular red color! It's Mars, covered in iron rust. We send smart rover robots to explore its giant mountains and deep valleys!" },
    { id: 7, speaker: "narrator", ar: "والآن حان دوركم للتحكم في جاذبية الشمس! حركوا الشريط لزيادة الجاذبية وشاهدوا كيف تسرع الكواكب، أو خفضوها لتطير الكويكبات بعيداً!", en: "Now it's your turn to control solar gravity! Slide the bar to increase gravity and watch planets speed up, or decrease it to watch asteroids float away!" },
    { id: 8, speaker: "anas", ar: "يا له من طيران فضائي مذهل! دعونا نلخص خصائص كواكبنا القريبة الأربعة ببطاقات الفضاء التفاعلية!", en: "What a spectacular cosmic flight! Let's summarize our four neighboring planets with these interactive space cards!" },
    { id: 9, speaker: "hakim", ar: "أحسنتم يا أصدقائي رواد الفضاء الأذكياء! لقد كنتم رائعين في مغامرتنا الكونية اليوم! استمروا في استكشاف النجوم ونراكم قريباً!", en: "Outstanding job my clever astronaut friends! You were amazing on our cosmic adventure today! Keep exploring the stars and see you soon!" }
  ],
  "gravity": [
    { id: 0, speaker: "narrator", ar: "مرحباً بكم يا علماء المستقبل! اليوم سنكتشف قوة خفية مذهلة تمسك بنا على الأرض وتجعل الأشياء تسقط للأسفل! إنها الجاذبية!", en: "Welcome future scientists! Today we will discover a spectacular invisible force that holds us to the ground and makes things fall! It's gravity!" },
    { id: 1, speaker: "anas", ar: "يا دكتور حكيم، رميت كرتي في الهواء، لكنها عادت وسقطت فوراً على رأسي! لماذا لا تستمر في الطيران للأعلى وتختفي في الفضاء؟", en: "Dr. Hakim, I threw my ball in the air, but it fell right back on my head! Why doesn't it keep flying up and disappear in space?" },
    { id: 2, speaker: "hakim", ar: "سؤال ذكي يا بطل! منذ زمن طويل، رأى العالم إسحاق نيوتن تفاحة تسقط من شجرة، فأدرك أن الأرض تسحب كل شيء نحوها بقوة تسمى الجاذبية!", en: "A smart question, champion! Long ago, scientist Isaac Newton saw an apple fall from a tree, and realized the Earth pulls everything to its center using gravity!" },
    { id: 3, speaker: "hakim", ar: "لاحظ يا أنس! الصخور الثقيلة تسقط بقوة وثبات، بينما الأوراق الخفيفة تطفو ببطء بسبب مقاومة الهواء، لكن الجاذبية تسحب كليهما بالتساوي!", en: "Notice, Anas! Heavy rocks drop firmly, while light feathers float slowly due to air resistance, but gravity pulls both down equally in a vacuum!" },
    { id: 4, speaker: "anas", ar: "يا إلهي! انظروا إلى رواد الفضاء، إنهم يطفون بسعادة في الفضاء الخارجي لعدم وجود جاذبية تسحبهم للأسفل! يبدو ذلك ممتعاً للغاية!", en: "Oh my! Look at the astronauts, they float happily in outer space because there is no gravity dragging them down! That looks like so much fun!" },
    { id: 5, speaker: "hakim", ar: "صحيح! ولكن انتبهوا، إذا ذهبنا لكوكب المشتري الضخم، فستكون جاذبيته قوية جداً وثقيلة لدرجة تجعل حركتنا بطيئة وصعبة كأننا نحمل صخوراً!", en: "True! But beware, if we go to massive Jupiter, its gravity is so strong and heavy that it makes our movements slow and difficult, as if carrying rocks!" },
    { id: 6, speaker: "narrator", ar: "والآن حان دوركم لتصبحوا سادة الجاذبية! حركوا الشريط لضبط قوة الجاذبية وشاهدوا الأجسام وهي تطفو أو تسقط بسرعة، واضغطوا عليها لتطلقوها!", en: "Now it's your turn to become gravity masters! Slide the bar to adjust gravity strength and watch items float or fall rapidly, and tap them to launch!" },
    { id: 7, speaker: "anas", ar: "يا لها من تجربة فيزيائية قوية وممتعة! دعونا نلخص خصائص الجاذبية السحرية بأوراق العلوم التفاعلية اللطيفة!", en: "What a powerful and fun physics experiment! Let's summarize the magic properties of gravity with these cute science cards!" },
    { id: 8, speaker: "hakim", ar: "أحسنتم يا أصدقائي العلماء الصغار! لقد كنتم رائعين في تحدي الجاذبية اليوم! استمروا في طرح الأسئلة الذكية ونراكم قريباً!", en: "Outstanding job my little junior scientists! You were amazing at challenging gravity today! Keep asking smart questions and see you soon!" }
  ]
};

// ----------------------------------------------------
// VOICE ASSIGNMENTS (WAVENET PREMIUM)
// ----------------------------------------------------
const voices = {
  ar: {
    hakim: { languageCode: "ar-XA", name: "ar-XA-Wavenet-B", speakingRate: 0.74, pitch: -1.0 }, // Scientist warm
    anas: { languageCode: "ar-XA", name: "ar-XA-Wavenet-C", speakingRate: 0.76, pitch: 2.0 },  // Enthusiastic child
    narrator: { languageCode: "ar-XA", name: "ar-XA-Wavenet-A", speakingRate: 0.74, pitch: 0 } // Friendly narrator
  },
  en: {
    hakim: { languageCode: "en-US", name: "en-US-Wavenet-D", speakingRate: 0.82, pitch: -1.5 }, // Deep warm male
    anas: { languageCode: "en-US", name: "en-US-Wavenet-A", speakingRate: 0.84, pitch: 2.5 },  // Cute youth/female
    narrator: { languageCode: "en-US", name: "en-US-Wavenet-F", speakingRate: 0.82, pitch: 0 }  // Natural female
  }
};

// ----------------------------------------------------
// REST API INTEGRATION
// ----------------------------------------------------
function synthesizeText(text, voiceConfig, targetPath) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      input: { text },
      voice: {
        languageCode: voiceConfig.languageCode,
        name: voiceConfig.name
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: voiceConfig.speakingRate,
        pitch: voiceConfig.pitch
      }
    });

    const options = {
      hostname: "texttospeech.googleapis.com",
      port: 443,
      path: `/v1/text:synthesize?key=${API_KEY}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => body += chunk);
      
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(new Error(`API Error ${res.statusCode}: ${body}`));
          return;
        }

        try {
          const responseJson = JSON.parse(body);
          if (!responseJson.audioContent) {
            reject(new Error("No audioContent returned from Google TTS"));
            return;
          }

          const buffer = Buffer.from(responseJson.audioContent, "base64");
          fs.writeFileSync(targetPath, buffer);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", (err) => reject(err));
    req.write(postData);
    req.end();
  });
}

// ----------------------------------------------------
// MAIN AUTOMATION GENERATOR
// ----------------------------------------------------
async function generateAll() {
  console.log("🧪 Starting AI Voiceover Generation...");
  
  const publicDir = path.join(__dirname, "../public");
  const audioBase = path.join(publicDir, "audio");
  
  if (!fs.existsSync(audioBase)) {
    fs.mkdirSync(audioBase, { recursive: true });
  }

  const courseKeys = Object.keys(courses);
  let totalGenerated = 0;

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
      const arVoice = voices.ar[scene.speaker];
      try {
        console.log(`  🗣️ Generating AR - Scene ${scene.id} (${scene.speaker})...`);
        await synthesizeText(scene.ar, arVoice, arPath);
        totalGenerated++;
      } catch (err) {
        console.error(`  ❌ Failed AR Scene ${scene.id}:`, err.message);
      }

      // 2. Generate English MP3
      const enPath = path.join(courseDir, `scene_${scene.id}_en.mp3`);
      const enVoice = voices.en[scene.speaker];
      try {
        console.log(`  🗣️ Generating EN - Scene ${scene.id} (${scene.speaker})...`);
        await synthesizeText(scene.en, enVoice, enPath);
        totalGenerated++;
      } catch (err) {
        console.error(`  ❌ Failed EN Scene ${scene.id}:`, err.message);
      }

      // Safe sleep rate-limiter for quota guidelines
      await new Promise((r) => setTimeout(r, 250));
    }
  }

  console.log(`\n🎉 Successfully generated ${totalGenerated} AI Wavenet voiceover files!`);
  console.log(`All files saved in: public/audio/...`);
}

generateAll().catch((err) => {
  console.error("💥 Generation crashed:", err);
});
