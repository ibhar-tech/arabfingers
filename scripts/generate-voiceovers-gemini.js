/**
 * Google AI Studio (Gemini 2.0) Multimodal Audio Generator for Arab Fingers
 * 
 * This script uses a Google AI Studio Gemini API Key (including new AQ. keys)
 * to generate beautiful, natural, child-friendly spoken voiceovers for all
 * 4 educational courses in both Arabic and English, and saves them directly.
 * 
 * Usage:
 *   export GEMINI_API_KEY="your_AQ_api_key_here"
 *   node scripts/generate-voiceovers-gemini.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ Error: GEMINI_API_KEY environment variable is not set.");
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
// GEMINI 2.0 MULTIMODAL VOICES
// ----------------------------------------------------
const voices = {
  hakim: "Fenrir",   // Deep warm male
  anas: "Puck",       // Child-like energetic male
  narrator: "Aoede"   // Friendly narrative female
};

function writeWavHeader(pcmBuffer, sampleRate = 24000) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const pcmLength = pcmBuffer.length;
  
  const header = Buffer.alloc(44);
  
  header.write("RIFF", 0);
  header.writeUInt32LE(pcmLength + 36, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM format
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * numChannels * (bitsPerSample / 8), 28);
  header.writeUInt16LE(numChannels * (bitsPerSample / 8), 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcmLength, 40);
  
  return Buffer.concat([header, pcmBuffer]);
}

function generateGeminiAudio(text, lang, voiceName, targetPath) {
  // Check if file already exists with content to avoid wasting API quota!
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 0) {
    console.log(`  ⏭️ Skipping existing file: ${path.basename(targetPath)}`);
    return Promise.resolve(false);
  }

  let attempt = 0;
  const maxAttempts = 10;

  const runRequest = () => {
    attempt++;
    return new Promise((resolve, reject) => {
      const prompt = `Read the following text aloud in ${
        lang === "ar" ? "Arabic with clear child-friendly pronunciation" : "English naturally"
      }. Speak slowly and clearly. Do NOT output any text, only the spoken audio. Text:\n\n"${text}"`;

      const postData = JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: voiceName
              }
            }
          }
        }
      });

      const options = {
        hostname: "generativelanguage.googleapis.com",
        port: 443,
        path: `/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${API_KEY}`,
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
          if (res.statusCode === 429) {
            // Rate limit! Let's try to extract the retry time
            let retrySec = 22;
            try {
              const errObj = JSON.parse(body);
              const errMsg = errObj.error?.message || "";
              const match = errMsg.match(/retry in (\d+(\.\d+)?)/i);
              if (match) {
                retrySec = Math.ceil(parseFloat(match[1])) + 1;
              } else {
                const retryDelayField = errObj.error?.details?.find(d => d.retryDelay)?.retryDelay;
                if (retryDelayField) {
                  retrySec = parseInt(retryDelayField, 10) + 1;
                }
              }
            } catch (e) {
              // Ignore parse error, use default
            }

            if (attempt < maxAttempts) {
              console.warn(`  ⚠️ Rate limit hit (429). Waiting ${retrySec} seconds before retrying (Attempt ${attempt}/${maxAttempts})...`);
              setTimeout(() => {
                runRequest().then(resolve).catch(reject);
              }, retrySec * 1000);
            } else {
              reject(new Error(`Rate limit exceeded. Failed after ${maxAttempts} attempts.`));
            }
            return;
          }

          if (res.statusCode !== 200) {
            reject(new Error(`Gemini Error ${res.statusCode}: ${body}`));
            return;
          }

          try {
            const responseJson = JSON.parse(body);
            const parts = responseJson.candidates?.[0]?.content?.parts;
            
            if (!parts) {
              reject(new Error("No response parts returned from Gemini API"));
              return;
            }

            const audioPart = parts.find(p => p.inlineData && p.inlineData.mimeType.startsWith("audio/"));
            if (!audioPart) {
              reject(new Error("No audio inlineData found in Gemini response"));
              return;
            }

            const mimeType = audioPart.inlineData.mimeType;
            let sampleRate = 24000;
            const rateMatch = mimeType.match(/rate=(\d+)/);
            if (rateMatch) {
              sampleRate = parseInt(rateMatch[1], 10);
            }

            const rawBuffer = Buffer.from(audioPart.inlineData.data, "base64");
            const wavBuffer = writeWavHeader(rawBuffer, sampleRate);
            fs.writeFileSync(targetPath, wavBuffer);
            resolve(true);
          } catch (err) {
            reject(err);
          }
        });
      });

      req.on("error", (err) => reject(err));
      req.write(postData);
      req.end();
    });
  };

  return runRequest();
}

async function generateAll() {
  console.log("🧪 Starting Gemini 2.0 Multimodal AI Voiceover Generation...");
  
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
      const voice = voices[scene.speaker] || voices.narrator;

      // 1. Generate Arabic MP3
      const arPath = path.join(courseDir, `scene_${scene.id}_ar.mp3`);
      try {
        console.log(`  🗣️ Generating Gemini AR - Scene ${scene.id} (${scene.speaker})...`);
        const arGenerated = await generateGeminiAudio(scene.ar, "ar", voice, arPath);
        if (arGenerated) {
          totalGenerated++;
          console.log(`  ⏳ Waiting 1 second to respect rate limits safely...`);
          await new Promise((r) => setTimeout(r, 1000));
        }
      } catch (err) {
        console.error(`  ❌ Failed Gemini AR Scene ${scene.id}:`, err.message);
      }

      // 2. Generate English MP3
      const enPath = path.join(courseDir, `scene_${scene.id}_en.mp3`);
      try {
        console.log(`  🗣️ Generating Gemini EN - Scene ${scene.id} (${scene.speaker})...`);
        const enGenerated = await generateGeminiAudio(scene.en, "en", voice, enPath);
        if (enGenerated) {
          totalGenerated++;
          console.log(`  ⏳ Waiting 1 second to respect rate limits safely...`);
          await new Promise((r) => setTimeout(r, 1000));
        }
      } catch (err) {
        console.error(`  ❌ Failed Gemini EN Scene ${scene.id}:`, err.message);
      }
    }
  }

  // 2. Process Colors
  console.log("\n🎨 Processing Colors...");
  const colorsDir = path.join(soundsBase, "colors");
  if (!fs.existsSync(colorsDir)) {
    fs.mkdirSync(colorsDir, { recursive: true });
  }

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

  for (const c of colors) {
    const targetPath = path.join(colorsDir, `${c.id}.mp3`);
    try {
      console.log(`  🗣️ Generating color: ${c.text} (${c.id})...`);
      const generated = await generateGeminiAudio(c.text, "ar", "Aoede", targetPath);
      if (generated) {
        totalGenerated++;
        console.log(`  ⏳ Waiting 1 second to respect rate limits safely...`);
        await new Promise((r) => setTimeout(r, 1000));
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

  const numbers = [
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

  for (const n of numbers) {
    const targetPath = path.join(numbersDir, `${n.id}.mp3`);
    try {
      console.log(`  🗣️ Generating number: ${n.text} (${n.id})...`);
      const generated = await generateGeminiAudio(n.text, "ar", "Aoede", targetPath);
      if (generated) {
        totalGenerated++;
        console.log(`  ⏳ Waiting 1 second to respect rate limits safely...`);
        await new Promise((r) => setTimeout(r, 1000));
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

  for (const l of letters) {
    // 1. Generate Arabic Letter name
    const arPath = path.join(lettersDir, `${l.id}-ar.mp3`);
    try {
      console.log(`  🗣️ Generating Arabic letter: ${l.ar} (${l.id})...`);
      const generated = await generateGeminiAudio(l.ar, "ar", "Aoede", arPath);
      if (generated) {
        totalGenerated++;
        console.log(`  ⏳ Waiting 1 second to respect rate limits safely...`);
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (err) {
      console.error(`  ❌ Failed Arabic letter ${l.id}:`, err.message);
    }

    // 2. Generate English Letter name
    const enPath = path.join(lettersDir, `${l.id}-en.mp3`);
    try {
      console.log(`  🗣️ Generating English letter: ${l.en} (${l.id})...`);
      const generated = await generateGeminiAudio(l.en, "en", "Aoede", enPath);
      if (generated) {
        totalGenerated++;
        console.log(`  ⏳ Waiting 1 second to respect rate limits safely...`);
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (err) {
      console.error(`  ❌ Failed English letter ${l.id}:`, err.message);
    }
  }

  console.log(`\n🎉 Super success! Successfully generated ${totalGenerated} premium voiceover files!`);
}

generateAll().catch((err) => {
  console.error("💥 Generation crashed:", err);
});
