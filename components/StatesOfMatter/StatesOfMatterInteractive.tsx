"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { useAppStore } from "@/store/useAppStore";
import DrHakim from "./DrHakim";
import AnasChild from "./AnasChild";
import ParticleSimulator from "./ParticleSimulator";

interface Scene {
  id: number;
  titleAr: string;
  titleEn: string;
  speaker: "hakim" | "anas" | "narrator" | null;
  dialogueAr: string;
  dialogueEn: string;
  subTextAr?: string;
  subTextEn?: string;
  hakimMood: "normal" | "talking" | "waving" | "thinking" | "happy";
  anasMood: "normal" | "talking" | "waving" | "amazed" | "happy";
  showSimulator: boolean;
  simState: "solid" | "liquid" | "gas" | "plasma";
  showTempSlider: boolean;
  defaultTemp: number;
  customGraphic: "intro" | "matter-def" | "recap" | "ending" | "none";
  duration: number; // in seconds
}

const STORYBOARD: Scene[] = [
  {
    id: 0,
    titleAr: "المقدمة السحرية 🌟",
    titleEn: "Magical Intro 🌟",
    speaker: "narrator",
    dialogueAr: "أهلاً بكم يا أصدقائي في رحلتنا العلمية الممتعة! اليوم سنتعلم معاً عن حالات المادة المذهلة!",
    dialogueEn: "Welcome my friends to our fun science journey! Today we will learn all about the amazing states of matter!",
    subTextAr: "استعدوا لمغامرة رائعة في المختبر السحري!",
    subTextEn: "Get ready for a wonderful adventure in the magical laboratory!",
    hakimMood: "waving",
    anasMood: "waving",
    showSimulator: false,
    simState: "solid",
    showTempSlider: false,
    defaultTemp: 10,
    customGraphic: "intro",
    duration: 12,
  },
  {
    id: 1,
    titleAr: "لقاء الأصدقاء 👋",
    titleEn: "Meet the Friends 👋",
    speaker: "hakim",
    dialogueAr: "أهلاً بك يا بطل! أنا الدكتور حكيم، وهذا صديقي المساعد الذكي أنس! نحن سعيدان جداً بوجودكم معنا اليوم!",
    dialogueEn: "Hello champion! I am Dr. Hakim, and this is my smart assistant Anas! We are super happy to have you with us today!",
    hakimMood: "talking",
    anasMood: "happy",
    showSimulator: false,
    simState: "solid",
    showTempSlider: false,
    defaultTemp: 10,
    customGraphic: "none",
    duration: 14,
  },
  {
    id: 2,
    titleAr: "ما هي المادة؟ 🍎",
    titleEn: "What is Matter? 🍎",
    speaker: "anas",
    dialogueAr: "يا دكتور حكيم، أنا متحمس جداً! ولكن ما هي 'المادة' بالضبط؟ وهل كل ما نراه حولنا يعتبر مادة؟",
    dialogueEn: "Dr. Hakim, I am so excited! But what exactly is 'matter'? Is everything around us considered matter?",
    hakimMood: "thinking",
    anasMood: "talking",
    showSimulator: false,
    simState: "solid",
    showTempSlider: false,
    defaultTemp: 10,
    customGraphic: "matter-def",
    duration: 16,
  },
  {
    id: 3,
    titleAr: "الحالة الصلبة 🧊",
    titleEn: "Solid State 🧊",
    speaker: "hakim",
    dialogueAr: "سؤال ممتاز يا أنس! المادة هي كل شيء يشغل حيزاً وله وزن. مثل قالب الجليد هذا، إنه في الحالة الصلبة!",
    dialogueEn: "Excellent question, Anas! Matter is anything that takes up space and has weight. Like this ice block, it is in a solid state!",
    subTextAr: "لاحظ كيف أن جزيئات الثلج متماسكة ومترابطة بقوة، وتتحرك باهتزاز خفيف وهي سعيدة ومبتسمة!",
    subTextEn: "Notice how the ice molecules are tightly packed, holding hands and vibrating in place with happy smiles!",
    hakimMood: "talking",
    anasMood: "amazed",
    showSimulator: true,
    simState: "solid",
    showTempSlider: false,
    defaultTemp: 10,
    customGraphic: "none",
    duration: 18,
  },
  {
    id: 4,
    titleAr: "الحالة السائلة 💧",
    titleEn: "Liquid State 💧",
    speaker: "anas",
    dialogueAr: "يا إلهي! عندما يسخن الجليد ينصهر ليصبح ماءً سائلاً! انظروا لجزيئات الماء، إنها ترتدي نظارات سباحة وتنزلق بنشاط!",
    dialogueEn: "Oh my! When the ice heats up, it melts into liquid water! Look at the water molecules, they are wearing swim goggles and sliding around!",
    subTextAr: "السوائل تأخذ شكل الإناء الذي توضع فيه. جزيئاتها حرة وتتحرك بسهولة وتنزلق فوق بعضها البعض!",
    subTextEn: "Liquids take the shape of whatever container they are in. Their molecules are loose, flowing and sliding over each other!",
    hakimMood: "happy",
    anasMood: "talking",
    showSimulator: true,
    simState: "liquid",
    showTempSlider: false,
    defaultTemp: 45,
    customGraphic: "none",
    duration: 18,
  },
  {
    id: 5,
    titleAr: "الحالة الغازية 💨",
    titleEn: "Gaseous State 💨",
    speaker: "hakim",
    dialogueAr: "رائع يا أنس! وإذا قمنا بتسخين الماء أكثر، فإنه يتبخر ليصبح بخاراً غازياً! تطير الجزيئات هنا وهناك كالأبطال الخارقين!",
    dialogueEn: "Wonderful, Anas! And if we heat the water even more, it evaporates into gaseous steam! The molecules fly around like superheroes!",
    subTextAr: "الغاز ليس له شكل أو حجم ثابت. جزيئاتها سريعة جداً وتطير متباعدة في كل اتجاه كأنها ترتدي عباءات طائرة!",
    subTextEn: "Gas has no fixed shape or volume. Its molecules are super fast, flying far apart in every direction with flying capes!",
    hakimMood: "talking",
    anasMood: "amazed",
    showSimulator: true,
    simState: "gas",
    showTempSlider: false,
    defaultTemp: 85,
    customGraphic: "none",
    duration: 20,
  },
  {
    id: 6,
    titleAr: "حالة البلازما الخارقة ⚡",
    titleEn: "Super Plasma State ⚡",
    speaker: "hakim",
    dialogueAr: "والآن مفاجأة! هناك حالة رابعة خارقة تسمى البلازما! نراها في البرق والنجوم الساطعة وشاشات النيون المتوهجة!",
    dialogueEn: "And now a surprise! There is a super fourth state called Plasma! We see it in lightning, bright stars, and glowing neon lights!",
    subTextAr: "البلازما مليئة بالطاقة الكهربائية! جزيئاتها مشحونة بالكامل وترتدي تيجاناً ذهبية وتجري بسرعة البرق تاركة خلفها ألواناً براقة!",
    subTextEn: "Plasma is packed with electrical energy! Its ionized particles wear golden crowns and zoom at lightning speed with neon trails!",
    hakimMood: "happy",
    anasMood: "happy",
    showSimulator: true,
    simState: "plasma",
    showTempSlider: false,
    defaultTemp: 100,
    customGraphic: "none",
    duration: 20,
  },
  {
    id: 7,
    titleAr: "مختبرك التفاعلي الصغير 🌡️",
    titleEn: "Your Interactive Mini-Lab 🌡️",
    speaker: "narrator",
    dialogueAr: "والآن يا أصدقائي الصغار حان دوركم لتجربة المختبر! حركوا شريط درجة الحرارة وشاهدوا كيف تتحول الجزيئات!",
    dialogueEn: "Now my little friends, it's your turn in the lab! Slide the temperature bar and watch the molecules transform in real-time!",
    subTextAr: "اضغطوا على الجزيئات أيضاً لتسمعوا أصواتها وهي تتفاعل وتتكلم معكم!",
    subTextEn: "Tap on the molecules too to hear their cute squeaks and see them jump with joy!",
    hakimMood: "normal",
    anasMood: "happy",
    showSimulator: true,
    simState: "solid",
    showTempSlider: true,
    defaultTemp: 50,
    customGraphic: "none",
    duration: 35,
  },
  {
    id: 8,
    titleAr: "مراجعة كرتونية ممتعة 🧠",
    titleEn: "Fun Cartoon Recap 🧠",
    speaker: "anas",
    dialogueAr: "يا له من عرض ممتع ومذهل! دعونا نلخص ما تعلمناه اليوم ببطاقات حالات المادة السحرية!",
    dialogueEn: "What a spectacular show! Let's summarize what we have learned today with these magical states of matter cards!",
    hakimMood: "happy",
    anasMood: "talking",
    showSimulator: false,
    simState: "solid",
    showTempSlider: false,
    defaultTemp: 50,
    customGraphic: "recap",
    duration: 22,
  },
  {
    id: 9,
    titleAr: "النهاية والاحتفال 🎉",
    titleEn: "The Celebrating Ending 🎉",
    speaker: "hakim",
    dialogueAr: "أحسنتم يا أصدقائي الأذكياء! لقد كنتم علماء رائعين اليوم! استمروا في الاستكشاف والتعلم، ونراكم في مغامرة أخرى!",
    dialogueEn: "Outstanding job my clever friends! You were amazing scientists today! Keep exploring and learning, and see you next time!",
    hakimMood: "happy",
    anasMood: "happy",
    showSimulator: false,
    simState: "solid",
    showTempSlider: false,
    defaultTemp: 50,
    customGraphic: "ending",
    duration: 15,
  },
];

interface StatesOfMatterInteractiveProps {
  locale?: string;
}

export default function StatesOfMatterInteractive({ locale = "ar" }: StatesOfMatterInteractiveProps) {
  const isAr = locale === "ar";

  // Global settings from Zustands store (integrated smoothly)
  const soundEnabled = useAppStore((state) => state.soundEnabled);
  const setSoundEnabled = useAppStore((state) => state.setSoundEnabled);
  const reduceMotion = useAppStore((state) => state.reduceMotion);

  // Component local states
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0); // 0.5, 1.0, 1.5, 2.0
  const [sceneProgress, setSceneProgress] = useState(0); // 0 to 100
  const [temperature, setTemperature] = useState(50); // 0 to 100 (for interactive lab scene)
  const [interactiveState, setInteractiveState] = useState<"solid" | "liquid" | "gas" | "plasma">("solid");

  // Recap game state
  const [selectedRecapState, setSelectedRecapState] = useState<"solid" | "liquid" | "gas" | "plasma" | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isSpeakingRef = useRef(false);

  const activeScene = STORYBOARD[currentSceneIndex];

  // Auto-play timer logic
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (!isPlaying) return;

    // Adjust step interval based on playbackSpeed
    const stepMs = 100;
    const totalSteps = activeScene.duration * 10; // 10 steps per second
    const stepIncrement = (100 / totalSteps) * playbackSpeed;

    timerRef.current = setInterval(() => {
      setSceneProgress((prev) => {
        const next = prev + stepIncrement;
        if (next >= 100) {
          // Move to next scene
          if (currentSceneIndex < STORYBOARD.length - 1) {
            setCurrentSceneIndex((idx) => idx + 1);
            return 0;
          } else {
            // End of storyboard, pause
            setIsPlaying(false);
            return 100;
          }
        }
        return next;
      });
    }, stepMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentSceneIndex, playbackSpeed, activeScene.duration]);

  // Handle scene change (speak dialogue, reset progress)
  useEffect(() => {
    setSceneProgress(0);
    
    // Set interactive state to the default simulator state of the scene
    if (activeScene.id !== 7) {
      setInteractiveState(activeScene.simState);
      if (activeScene.id === 3) setTemperature(10);
      else if (activeScene.id === 4) setTemperature(40);
      else if (activeScene.id === 5) setTemperature(75);
      else if (activeScene.id === 6) setTemperature(100);
    } else {
      // Interactive lab: set based on current temperature slider
      updateInteractiveStateByTemp(temperature);
    }

    // Trigger Speech Synthesis voiceover safely on client
    if (soundEnabled && typeof window !== "undefined" && window.speechSynthesis) {
      // Stop current speech
      window.speechSynthesis.cancel();

      const dialogue = isAr ? activeScene.dialogueAr : activeScene.dialogueEn;
      const utterance = new SpeechSynthesisUtterance(dialogue);
      
      // Select voice based on locale
      const voices = window.speechSynthesis.getVoices();
      const targetLang = isAr ? "ar" : "en";
      const voice = voices.find((v) => v.lang.startsWith(targetLang));
      
      if (voice) utterance.voice = voice;
      utterance.lang = isAr ? "ar-SA" : "en-US";
      
      // Map playbackSpeed directly to speech rate
      utterance.rate = playbackSpeed * (isAr ? 0.85 : 0.95);
      utterance.pitch = isAr ? 1.05 : 1.1; // Cute kid friendly tone

      isSpeakingRef.current = true;
      utterance.onend = () => {
        isSpeakingRef.current = false;
      };

      window.speechSynthesis.speak(utterance);
    }

    // Trigger confetti blast in the final celebrating scene!
    if (activeScene.id === 9 && !reduceMotion) {
      const duration = 4.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 28, spread: 360, ticks: 60, zIndex: 50 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const confettiInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(confettiInterval);
        }

        const particleCount = 40 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }

    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSceneIndex, soundEnabled, locale]);

  // Adjust simulator state in interactive lab scene based on temperature slider
  const updateInteractiveStateByTemp = (temp: number) => {
    if (temp < 25) {
      setInteractiveState("solid");
    } else if (temp < 60) {
      setInteractiveState("liquid");
    } else if (temp < 90) {
      setInteractiveState("gas");
    } else {
      setInteractiveState("plasma");
    }
  };

  const handleTempChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempVal = parseInt(e.target.value);
    setTemperature(tempVal);
    updateInteractiveStateByTemp(tempVal);
  };

  // Skip handlers
  const handleNextScene = () => {
    if (currentSceneIndex < STORYBOARD.length - 1) {
      setCurrentSceneIndex((idx) => idx + 1);
    }
  };

  const handleBackScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex((idx) => idx - 1);
    }
  };

  const handleReplay = () => {
    setCurrentSceneIndex(0);
    setSceneProgress(0);
    setIsPlaying(true);
  };

  const handleSpeechRepeat = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const dialogue = isAr ? activeScene.dialogueAr : activeScene.dialogueEn;
      const utterance = new SpeechSynthesisUtterance(dialogue);
      const voices = window.speechSynthesis.getVoices();
      const targetLang = isAr ? "ar" : "en";
      const voice = voices.find((v) => v.lang.startsWith(targetLang));
      if (voice) utterance.voice = voice;
      utterance.lang = isAr ? "ar-SA" : "en-US";
      utterance.rate = playbackSpeed * (isAr ? 0.85 : 0.95);
      utterance.pitch = isAr ? 1.05 : 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Determine current active speaker mood to animate mouths
  const hakimTalking = activeScene.speaker === "hakim";
  const anasTalking = activeScene.speaker === "anas";

  // Translate labels
  const UI_TXT = {
    play: isAr ? "تشغيل" : "Play",
    pause: isAr ? "إيقاف مؤقت" : "Pause",
    speed: isAr ? "السرعة" : "Speed",
    replay: isAr ? "إعادة المشاهدة" : "Replay",
    soundOn: isAr ? "كتم الصوت" : "Mute Sound",
    soundOff: isAr ? "تشغيل الصوت" : "Enable Sound",
    next: isAr ? "التالي" : "Next Scene",
    back: isAr ? "السابق" : "Prev Scene",
    tempCold: isAr ? "بارد جداً ❄️" : "Freezing ❄️",
    tempMild: isAr ? "معتدل 💧" : "Warm 💧",
    tempHot: isAr ? "حار جداً 🔥" : "Super Heat 🔥",
    solid: isAr ? "صلب" : "Solid",
    liquid: isAr ? "سائل" : "Liquid",
    gas: isAr ? "غاز" : "Gas",
    plasma: isAr ? "بلازما" : "Plasma",
    recapSolidTitle: isAr ? "المادة الصلبة 🧱" : "Solid Matter 🧱",
    recapLiquidTitle: isAr ? "المادة السائلة 💧" : "Liquid Matter 💧",
    recapGasTitle: isAr ? "المادة الغازية 💨" : "Gaseous Matter 💨",
    recapPlasmaTitle: isAr ? "حالة البلازما ⚡" : "Plasma State ⚡",
    recapSolidText: isAr
      ? "تتميز بشكل وحجم ثابتين. جزيئاتها متراصة بقوة وتتذبذب في مكانها."
      : "Has a fixed shape and volume. Its molecules are tightly locked in place and vibrate.",
    recapLiquidText: isAr
      ? "تأخذ شكل الإناء الذي يحتويها وحجمها ثابت. جزيئاتها متقاربة لكنها تتحرك وتنزلق."
      : "Takes the shape of its container with a fixed volume. Molecules are close but slide around.",
    recapGasText: isAr
      ? "ليس لها شكل أو حجم ثابت. جزيئاتها حرة تماماً وتطير متباعدة في كل مكان بسرعة."
      : "Has no fixed shape or volume. Molecules are completely free and fly far apart rapidly.",
    recapPlasmaText: isAr
      ? "حالة مشحونة بالطاقة الفائقة والحرارة العالية. تلمع في النجوم والبرق."
      : "A highly energized state of matter. Glows and flashes inside stars and lightning arcs.",
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* 16:9 SCREEN CONTAINER */}
      <div className="w-full aspect-video relative rounded-3xl overflow-hidden bg-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-4 border-slate-800 flex flex-col justify-between">
        
        {/* Sky Background Parallax Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-b from-[#0b0f19] via-[#070b13] to-[#04060b]">
          {/* Subtle laboratory grid in background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px] top-[-50px] left-[10%] animate-pulse" />
          <div className="absolute w-[250px] h-[250px] rounded-full bg-amber-500/5 blur-[80px] bottom-[50px] right-[10%] animate-pulse" />
        </div>

        {/* --- SCREEN HEADER (TOP BAR) --- */}
        <div className="relative z-10 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/55 to-transparent">
          <div className="flex items-center gap-2">
            <span className="text-sm bg-accent/20 border border-accent/30 text-accent font-semibold px-3 py-1 rounded-full text-xs">
              {isAr ? `المشهد ${currentSceneIndex + 1} / 10` : `Scene ${currentSceneIndex + 1} / 10`}
            </span>
            <h2 className="text-xs sm:text-sm font-semibold text-white/90 drop-shadow-md">
              {isAr ? activeScene.titleAr : activeScene.titleEn}
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Speed Badge */}
            <button
              onClick={() => {
                setPlaybackSpeed((s) => (s === 0.5 ? 1.0 : s === 1.0 ? 1.5 : s === 1.5 ? 2.0 : 0.5));
              }}
              className="text-[10px] text-white/70 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg px-2 py-1 font-semibold transition"
            >
              {UI_TXT.speed}: {playbackSpeed}x
            </button>
            
            {/* Direct Speech repeat */}
            {soundEnabled && (
              <button
                onClick={handleSpeechRepeat}
                title={isAr ? "إعادة النطق" : "Repeat Speech"}
                className="p-1 rounded-lg text-white/75 bg-white/10 hover:bg-white/15 transition hover:text-white"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* --- SCREEN CONTENT AREA (MIDDLE) --- */}
        <div className="relative z-10 flex-1 w-full px-6 flex items-center justify-center overflow-hidden">
          
          {/* 1. Custom Graphic Overlay: INTRO SCREEN */}
          {activeScene.customGraphic === "intro" && (
            <div className="text-center flex flex-col items-center justify-center animate-fade-in w-full h-full">
              <div className="text-5xl sm:text-7xl mb-4 animate-bounce">🧪✨</div>
              <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-accent via-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-3 drop-shadow-[0_2px_10px_rgba(159,225,203,0.3)]" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
                {isAr ? "حالات المادة" : "States of Matter"}
              </h1>
              <p className="text-xs sm:text-sm text-white/60 tracking-wider font-medium max-w-md mt-2">
                {isAr ? activeScene.subTextAr : activeScene.subTextEn}
              </p>
              
              {/* Click to start manual nudge */}
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="mt-6 px-6 py-2.5 bg-accent hover:scale-105 transition rounded-2xl text-[#050816] font-bold text-sm shadow-lg shadow-accent/20"
                >
                  {isAr ? "ابدأ الرحلة 🚀" : "Start Journey 🚀"}
                </button>
              )}
            </div>
          )}

          {/* 2. Custom Graphic Overlay: MATTER DEFINITION */}
          {activeScene.customGraphic === "matter-def" && (
            <div className="flex flex-col items-center justify-center w-full h-full gap-4">
              <div className="grid grid-cols-4 gap-6 max-w-md w-full">
                <div className="flex flex-col items-center rounded-2xl bg-white/5 border border-white/10 p-3 hover:scale-105 transition hover:bg-white/8">
                  <div className="text-3xl mb-1 animate-bounce">🍎</div>
                  <span className="text-[10px] text-white/80 font-bold">{isAr ? "صلب" : "Solid"}</span>
                </div>
                <div className="flex flex-col items-center rounded-2xl bg-white/5 border border-white/10 p-3 hover:scale-105 transition hover:bg-white/8">
                  <div className="text-3xl mb-1 animate-bounce delay-75">💧</div>
                  <span className="text-[10px] text-white/80 font-bold">{isAr ? "سائل" : "Liquid"}</span>
                </div>
                <div className="flex flex-col items-center rounded-2xl bg-white/5 border border-white/10 p-3 hover:scale-105 transition hover:bg-white/8">
                  <div className="text-3xl mb-1 animate-bounce delay-150">💨</div>
                  <span className="text-[10px] text-white/80 font-bold">{isAr ? "غاز" : "Gas"}</span>
                </div>
                <div className="flex flex-col items-center rounded-2xl bg-white/5 border border-white/10 p-3 hover:scale-105 transition hover:bg-white/8">
                  <div className="text-3xl mb-1 animate-bounce delay-200">⚡</div>
                  <span className="text-[10px] text-white/80 font-bold">{isAr ? "بلازما" : "Plasma"}</span>
                </div>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-2xl p-3 text-center max-w-lg mt-3">
                <p className="text-xs text-white/80 leading-relaxed font-semibold">
                  {isAr 
                    ? "⚖️ كل شيء له كُتلة (وزن) ويشغل حيزاً (مساحة) في الفضاء هو مادة!" 
                    : "⚖️ Everything that has mass (weight) and takes up space (volume) is matter!"}
                </p>
              </div>
            </div>
          )}

          {/* 3. Canvas Simulator Container */}
          {activeScene.showSimulator && (
            <div className="w-full max-w-[480px] h-[190px] sm:h-[210px] relative animate-fade-in flex flex-col justify-between">
              
              <div className="flex-1 w-full relative">
                <ParticleSimulator
                  state={interactiveState}
                  temperature={temperature}
                  isPlaying={isPlaying}
                  interactive={true}
                  locale={locale}
                />
              </div>

              {/* Dynamic Interactive Temperature Slider in Scene 8 */}
              {activeScene.showTempSlider && (
                <div className="w-full bg-black/60 border border-white/10 backdrop-blur-md rounded-2xl px-4 py-2 mt-2 flex flex-col sm:flex-row items-center gap-3 shadow-lg">
                  <span className="text-[10px] sm:text-xs font-bold text-cyan-400 shrink-0 select-none">
                    {UI_TXT.tempCold}
                  </span>
                  
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={temperature}
                    onChange={handleTempChange}
                    className="w-full h-2 bg-gradient-to-r from-cyan-500 via-[#10B981] to-red-500 rounded-lg appearance-none cursor-pointer focus:outline-none accent-yellow-400 shadow-inner"
                  />

                  <span className="text-[10px] sm:text-xs font-bold text-red-400 shrink-0 select-none">
                    {UI_TXT.tempHot}
                  </span>

                  {/* Active Simulated State Badge */}
                  <span className="bg-yellow-400 text-slate-950 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full select-none shadow">
                    {interactiveState === "solid" && UI_TXT.solid}
                    {interactiveState === "liquid" && UI_TXT.liquid}
                    {interactiveState === "gas" && UI_TXT.gas}
                    {interactiveState === "plasma" && UI_TXT.plasma}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* 4. Custom Graphic Overlay: RECAP MATCHING GAME */}
          {activeScene.customGraphic === "recap" && (
            <div className="w-full max-w-2xl h-full flex flex-col justify-center gap-3">
              <div className="grid grid-cols-4 gap-3">
                {(["solid", "liquid", "gas", "plasma"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedRecapState(st)}
                    className={`rounded-2xl border p-2 flex flex-col items-center justify-center transition-all ${
                      selectedRecapState === st
                        ? "bg-accent border-accent text-slate-950 scale-105 shadow-lg"
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="text-2xl mb-1">
                      {st === "solid" && "🧊"}
                      {st === "liquid" && "💧"}
                      {st === "gas" && "💨"}
                      {st === "plasma" && "⚡"}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wide">
                      {st === "solid" && UI_TXT.solid}
                      {st === "liquid" && UI_TXT.liquid}
                      {st === "gas" && UI_TXT.gas}
                      {st === "plasma" && UI_TXT.plasma}
                    </span>
                  </button>
                ))}
              </div>

              {/* Dynamic Recap explanation */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 min-h-[75px] flex items-center justify-center text-center shadow-inner">
                {selectedRecapState ? (
                  <div className="animate-fade-in">
                    <h4 className="text-xs font-bold text-accent mb-1">
                      {selectedRecapState === "solid" && UI_TXT.recapSolidTitle}
                      {selectedRecapState === "liquid" && UI_TXT.recapLiquidTitle}
                      {selectedRecapState === "gas" && UI_TXT.recapGasTitle}
                      {selectedRecapState === "plasma" && UI_TXT.recapPlasmaTitle}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-white/80 leading-relaxed max-w-lg mx-auto">
                      {selectedRecapState === "solid" && UI_TXT.recapSolidText}
                      {selectedRecapState === "liquid" && UI_TXT.recapLiquidText}
                      {selectedRecapState === "gas" && UI_TXT.recapGasText}
                      {selectedRecapState === "plasma" && UI_TXT.recapPlasmaText}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-white/40 italic">
                    {isAr
                      ? "💡 اضغط على بطاقات الحالات السحرية في الأعلى لتلخيص خصائصها!"
                      : "💡 Tap the magic state cards above to summarize their properties!"}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 5. Custom Graphic Overlay: CELEBRATION ENDING */}
          {activeScene.customGraphic === "ending" && (
            <div className="text-center flex flex-col items-center justify-center animate-fade-in w-full h-full">
              <div className="text-5xl sm:text-6xl mb-4 animate-bounce">🎓🏆🌟</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-accent mb-2">
                {isAr ? "ممتاز يا بطل العلوم! 👏" : "Outstanding Science Champion! 👏"}
              </h2>
              <p className="text-xs sm:text-sm text-white/70 max-w-md mb-5 leading-relaxed font-semibold">
                {isAr
                  ? "لقد أكملت مغامرة حالات المادة بنجاح! الآن أصبحت عالماً صغيراً ذكياً!"
                  : "You've successfully completed the States of Matter adventure! You are now a junior scientist!"}
              </p>
              
              <button
                onClick={handleReplay}
                className="flex items-center gap-2 px-6 py-2 bg-accent hover:scale-105 transition rounded-2xl text-[#050816] font-extrabold text-xs shadow-lg shadow-accent/25"
              >
                <RotateCcw className="h-4 w-4" />
                {UI_TXT.replay}
              </button>
            </div>
          )}

        </div>

        {/* --- CARTOON CHARACTER DIALOGUE AREA (BOTTOM) --- */}
        <div className="relative z-10 w-full px-6 pb-2.5 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/40 to-transparent">
          
          {/* Character dialogue balloon row */}
          {activeScene.speaker && (
            <div className="w-full flex items-end justify-center mb-4">
              
              {/* SPEECH BALLOON */}
              <div className="relative max-w-xl w-full bg-white/95 border-2 border-accent text-slate-900 rounded-3xl p-4 shadow-[0_8px_20px_rgba(0,0,0,0.3)] animate-[balloon-pop_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
                
                {/* Speaker Label */}
                <div className="absolute top-[-11px] right-6 px-3 py-0.5 rounded-full bg-accent border border-accent text-[#050816] text-[10px] font-extrabold uppercase select-none shadow">
                  {activeScene.speaker === "hakim" && (isAr ? "د. حكيم 🧪" : "Dr. Hakim 🧪")}
                  {activeScene.speaker === "anas" && (isAr ? "أنس 🧒" : "Anas 🧒")}
                  {activeScene.speaker === "narrator" && (isAr ? "الراوي 🎙️" : "Narrator 🎙️")}
                </div>

                {/* Localized Dialogue Text */}
                <p className="text-sm sm:text-base leading-relaxed text-slate-800 font-bold select-none" style={{ fontFamily: "var(--font-ibm-plex-arabic), 'Fredoka', sans-serif" }}>
                  {isAr ? activeScene.dialogueAr : activeScene.dialogueEn}
                </p>

                {/* Subtext explanation (if any) */}
                {(isAr ? activeScene.subTextAr : activeScene.subTextEn) && (
                  <p className="text-xs text-slate-500 font-semibold border-t border-slate-200 mt-2 pt-2 leading-relaxed">
                    💡 {isAr ? activeScene.subTextAr : activeScene.subTextEn}
                  </p>
                )}

                {/* Bubble speech tail pointer */}
                <div
                  className={`absolute bottom-[-10px] w-5 h-5 bg-white border-b-2 border-r-2 border-accent transform rotate-45 ${
                    activeScene.speaker === "hakim"
                      ? "left-24"
                      : activeScene.speaker === "anas"
                      ? "right-24"
                      : "left-1/2 -translate-x-1/2 opacity-0"
                  }`}
                />
              </div>
            </div>
          )}

          {/* Characters stands row */}
          <div className="w-full flex justify-between items-end h-[100px] select-none pointer-events-none px-4">
            {/* Dr Hakim standing */}
            <div className="w-28 sm:w-32 h-full flex justify-start">
              <DrHakim
                mood={hakimTalking ? "talking" : activeScene.hakimMood}
                className="w-full h-full origin-bottom translate-y-3"
              />
            </div>

            {/* Simulated Lab Table Surface middle */}
            <div className="flex-1 border-t border-slate-700 bg-slate-900/50 shadow-inner h-2.5 mx-2 rounded-t-lg" />

            {/* Anas child standing */}
            <div className="w-28 sm:w-32 h-full flex justify-end">
              <AnasChild
                mood={anasTalking ? "talking" : activeScene.anasMood}
                className="w-full h-full origin-bottom translate-y-3"
              />
            </div>
          </div>

          {/* --- PLAYER INTERACTIVE TIMELINE & CONTROLLERS --- */}
          <div className="w-full bg-slate-950/90 border border-white/10 rounded-2xl p-2 mt-2 flex flex-col gap-2 shadow-2xl backdrop-blur-md">
            
            {/* Widescreen Progress Bar */}
            <div className="w-full flex items-center gap-3 px-2">
              <span className="text-[10px] text-white/50 select-none">0:00</span>
              <div className="flex-grow h-2 rounded-full bg-white/10 overflow-hidden relative shadow-inner cursor-pointer"
                   onClick={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const clickX = e.clientX - rect.left;
                     const percent = (clickX / rect.width) * 100;
                     setSceneProgress(percent);
                   }}>
                <div
                  className="h-full bg-gradient-to-r from-accent to-emerald-400 rounded-full shadow"
                  style={{ width: `${sceneProgress}%` }}
                />
              </div>
              <span className="text-[10px] text-white/50 select-none">
                {activeScene.duration}s
              </span>
            </div>

            {/* Controllers row */}
            <div className="w-full flex items-center justify-between">
              
              {/* Back / Skip buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleBackScene}
                  disabled={currentSceneIndex === 0}
                  className="p-2 rounded-xl text-white/60 hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
                  title={UI_TXT.back}
                >
                  <SkipBack className="h-4.5 w-4.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextScene}
                  disabled={currentSceneIndex === STORYBOARD.length - 1}
                  className="p-2 rounded-xl text-white/60 hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
                  title={UI_TXT.next}
                >
                  <SkipForward className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Central Play/Pause button */}
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-11 h-11 flex items-center justify-center rounded-2xl bg-accent hover:scale-105 active:scale-95 text-[#050816] font-bold shadow-lg shadow-accent/25 transition duration-200"
                  title={isPlaying ? UI_TXT.pause : UI_TXT.play}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 fill-[#050816]" strokeWidth={2.5} />
                  ) : (
                    <Play className="h-5 w-5 fill-[#050816] translate-x-0.5" strokeWidth={2.5} />
                  )}
                </button>
              </div>

              {/* Sound / Volume settings */}
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-2.5 rounded-xl border transition ${
                    soundEnabled
                      ? "border-accent/20 bg-accent/10 text-accent hover:bg-accent/15"
                      : "border-white/10 bg-white/5 text-white/40 hover:bg-white/10"
                  }`}
                  title={soundEnabled ? UI_TXT.soundOn : UI_TXT.soundOff}
                >
                  {soundEnabled ? (
                    <Volume2 className="h-4.5 w-4.5" />
                  ) : (
                    <VolumeX className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Screen Backdrop Glow styling */}
      <style jsx global>{`
        @keyframes balloon-pop {
          0% { transform: scale(0.65) translateY(20px); opacity: 0; }
          100% { transform: scale(1.0) translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadein 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadein {
          0% { opacity: 0; transform: scale(0.96) translateY(5px); }
          100% { opacity: 1; transform: scale(1.0) translateY(0); }
        }
      `}</style>
    </div>
  );
}
