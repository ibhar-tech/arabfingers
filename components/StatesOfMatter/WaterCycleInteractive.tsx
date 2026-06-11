"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { useAppStore } from "@/store/useAppStore";
import DrHakim from "./DrHakim";
import AnasChild from "./AnasChild";
import { WaterCycleDiagram } from "../illustrations/WaterCycleDiagram";
import WaterCycleSimulator from "./WaterCycleSimulator";

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
  simState: "evaporation" | "condensation" | "precipitation" | "collection" | "none";
  showHeatSlider: boolean;
  defaultHeat: number;
  customGraphic: "intro" | "recap" | "ending" | "none";
  duration: number; // in seconds
}

const STORYBOARD: Scene[] = [
  {
    id: 0,
    titleAr: "المقدمة المائية السحرية 💧",
    titleEn: "Magical Water Intro 💧",
    speaker: "narrator",
    dialogueAr: "أهلاً بكم من جديد في مختبرنا الساحر! اليوم سنرافق قطرة ماء صغيرة في رحلتها الدائرية المذهلة في الطبيعة!",
    dialogueEn: "Welcome back to our magical lab! Today we will accompany a tiny water drop on its incredible circular journey in nature!",
    subTextAr: "استعدوا لاكتشاف أسرار الغيوم والمطر مع الدكتور حكيم وأنس!",
    subTextEn: "Get ready to discover the secrets of clouds and rain with Dr. Hakim and Anas!",
    hakimMood: "waving",
    anasMood: "waving",
    showSimulator: false,
    simState: "none",
    showHeatSlider: false,
    defaultHeat: 50,
    customGraphic: "intro",
    duration: 12
  },
  {
    id: 1,
    titleAr: "أين تذهب المياه؟ 🌊",
    titleEn: "Where Does Water Go? 🌊",
    speaker: "anas",
    dialogueAr: "يا دكتور حكيم، الجو حار جداً اليوم! المياه في كوبي تختفي ببطء، وفي المحيطات أيضاً! أين تذهب يا ترى؟",
    dialogueEn: "Dr. Hakim, it's so hot today! The water in my cup is slowly disappearing, and in oceans too! Where does it go?",
    hakimMood: "thinking",
    anasMood: "talking",
    showSimulator: false,
    simState: "none",
    showHeatSlider: false,
    defaultHeat: 50,
    customGraphic: "none",
    duration: 14
  },
  {
    id: 2,
    titleAr: "مرحلة التبخر ☀️",
    titleEn: "Evaporation Stage ☀️",
    speaker: "hakim",
    dialogueAr: "سؤال ذكي كالعادة! عندما تسخن الشمس مياه البحار، تتحول إلى بخار خفيف يرتفع عالياً في السماء! تسمى هذه العملية 'التبخر'!",
    dialogueEn: "A smart question as always! When the sun heats up ocean waters, it turns into light vapor rising high into the sky! This is called 'evaporation'!",
    subTextAr: "شاهد جزيئات الماء وهي تسخن وترتفع كبخار لطيف نحو السماء الساطعة!",
    subTextEn: "Watch the water molecules heat up and rise as gentle vapor towards the bright sky!",
    hakimMood: "talking",
    anasMood: "amazed",
    showSimulator: true,
    simState: "evaporation",
    showHeatSlider: false,
    defaultHeat: 70,
    customGraphic: "none",
    duration: 16
  },
  {
    id: 3,
    titleAr: "مرحلة التكاثف ☁️",
    titleEn: "Condensation Stage ☁️",
    speaker: "anas",
    dialogueAr: "يا إلهي! عندما يرتفع البخار عالياً حيث الجو بارد، يجتمع معاً ليشكل سحباً جميلة وناعمة! إنه 'التكاثف'!",
    dialogueEn: "Oh my! When the vapor rises high where the air is cold, it gathers together to form beautiful, soft clouds! That's 'condensation'!",
    subTextAr: "الغيوم هي عبارة عن ملايين من قطيرات الماء الصغيرة المجتمعة معاً والتي تبتسم في السماء!",
    subTextEn: "Clouds are actually millions of tiny water droplets huddled together, smiling in the sky!",
    hakimMood: "happy",
    anasMood: "talking",
    showSimulator: true,
    simState: "condensation",
    showHeatSlider: false,
    defaultHeat: 30,
    customGraphic: "none",
    duration: 16
  },
  {
    id: 4,
    titleAr: "مرحلة الهطول 🌧️",
    titleEn: "Precipitation Stage 🌧️",
    speaker: "hakim",
    dialogueAr: "بالتأكيد! وعندما تصبح الغيوم ثقيلة جداً ومحملة بالمياه، لا تستطيع حملها بعد الآن، فتتساقط كأصوات مطر أو ثلج! إنه 'الهطول'!",
    dialogueEn: "Exactly! And when the clouds get too heavy and laden with water, they cannot hold it anymore, and it falls as rain or snow! That is 'precipitation'!",
    subTextAr: "إذا كان الجو معتدلاً يهطل المطر، وإذا كان بارداً جداً تتساقط حبيبات الثلج البيضاء اللامعة!",
    subTextEn: "If the weather is warm it rains, and if it is freezing, shiny white snow crystals drift down!",
    hakimMood: "talking",
    anasMood: "amazed",
    showSimulator: true,
    simState: "precipitation",
    showHeatSlider: false,
    defaultHeat: 15,
    customGraphic: "none",
    duration: 18
  },
  {
    id: 5,
    titleAr: "مرحلة الجريان والتجميع 🏞️",
    titleEn: "Collection & Flow 🏞️",
    speaker: "anas",
    dialogueAr: "رائع! تتدفق مياه الأمطار عبر الأنهار والجداول الجبلية، وتعود مجدداً إلى البحار لتستعد لرحلة جديدة! إنها دورة لا تنتهي أبداً!",
    dialogueEn: "Wonderful! Rainwater flows through rivers and mountain streams, returning to the oceans to prepare for a new journey! It's a cycle that never ends!",
    subTextAr: "تسمى هذه المرحلة التجميع والجريان السطحي، حيث تسير المياه بسعادة عائدة لبيتها الكبير!",
    subTextEn: "This stage is called collection and surface runoff, where water flows happily back to its vast ocean home!",
    hakimMood: "happy",
    anasMood: "talking",
    showSimulator: true,
    simState: "collection",
    showHeatSlider: false,
    defaultHeat: 50,
    customGraphic: "none",
    duration: 18
  },
  {
    id: 6,
    titleAr: "مختبر الطقس التفاعلي 🌡️",
    titleEn: "Your Weather Control Lab 🌡️",
    speaker: "narrator",
    dialogueAr: "والآن حان دوركم لتصبحوا خبراء طقس! حركوا شريط الحرارة وشاهدوا كيف تؤثر على التبخر وسرعة تشكل الغيوم والمطر!",
    dialogueEn: "Now it's your turn to become a weather master! Slide the temperature bar and watch how heat affects evaporation, clouds, and rainfall!",
    subTextAr: "الطقس البارد جداً يولد ثلوجاً، والحرارة العالية تزيد التبخر بشكل كبير!",
    subTextEn: "Very cold temperatures generate snow, while high heat accelerates evaporation dramatically!",
    hakimMood: "normal",
    anasMood: "happy",
    showSimulator: true,
    simState: "evaporation",
    showHeatSlider: true,
    defaultHeat: 50,
    customGraphic: "none",
    duration: 35
  },
  {
    id: 7,
    titleAr: "بطاقات دورة الطقس السحرية 🧠",
    titleEn: "Fun Weather Recap 🧠",
    speaker: "anas",
    dialogueAr: "يا لها من مغامرة مائية منعشة! دعونا نتذكر محطات قطرتنا الصغيرة الأربع ببطاقات الطقس التفاعلية!",
    dialogueEn: "What a refreshing watery adventure! Let's recall the four stages of our little drop with these interactive weather cards!",
    hakimMood: "happy",
    anasMood: "talking",
    showSimulator: false,
    simState: "none",
    showHeatSlider: false,
    defaultHeat: 50,
    customGraphic: "recap",
    duration: 20
  },
  {
    id: 8,
    titleAr: "النهاية والاحتفال المائي 🎉",
    titleEn: "Water Celebration Ending 🎉",
    speaker: "hakim",
    dialogueAr: "أحسنتم يا أصدقائي المستكشفين الأذكياء! لقد كنتم رائعين في فهم أسرار الطقس اليوم! استمروا في التعلم، ونراكم في مغامرة أخرى!",
    dialogueEn: "Outstanding job my clever explorer friends! You were amazing at understanding weather secrets today! Keep learning, and see you next time!",
    hakimMood: "happy",
    anasMood: "happy",
    showSimulator: false,
    simState: "none",
    showHeatSlider: false,
    defaultHeat: 50,
    customGraphic: "ending",
    duration: 15
  }
];

const getBestVoice = (lang: string): SpeechSynthesisVoice | null => {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const langVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(lang.toLowerCase()));
  if (langVoices.length === 0) return null;
  
  const premiumKeywords = [
    "natural", "neural", "google", "microsoft", "premium", "edge", 
    "maged", "hazem", "hoda", "laila", "zariyah", "jenny", "aria", "guy", "salli"
  ];
  
  const sorted = [...langVoices].sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    const aScore = premiumKeywords.reduce((score, kw) => score + (aName.includes(kw) ? 1 : 0), 0);
    const bScore = premiumKeywords.reduce((score, kw) => score + (bName.includes(kw) ? 1 : 0), 0);
    return bScore - aScore;
  });

  return sorted[0];
};

interface WaterCycleInteractiveProps {
  locale?: string;
}

export default function WaterCycleInteractive({ locale = "ar" }: WaterCycleInteractiveProps) {
  const isAr = locale === "ar";

  const soundEnabled = useAppStore((state) => state.soundEnabled);
  const setSoundEnabled = useAppStore((state) => state.setSoundEnabled);
  const reduceMotion = useAppStore((state) => state.reduceMotion);

  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [heatLevel, setHeatLevel] = useState(50);
  const [interactiveState, setInteractiveState] = useState<"evaporation" | "condensation" | "precipitation" | "collection" | "none">("none");

  const [selectedRecapState, setSelectedRecapState] = useState<"evaporation" | "condensation" | "precipitation" | "collection" | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isSpeakingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeScene = STORYBOARD[currentSceneIndex];

  // Auto-play timer logic
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isPlaying) return;

    const stepMs = 100;
    const totalSteps = activeScene.duration * 10;
    const stepIncrement = (100 / totalSteps) * playbackSpeed;

    timerRef.current = setInterval(() => {
      setSceneProgress((prev) => {
        const next = prev + stepIncrement;
        if (next >= 100) {
          if (currentSceneIndex < STORYBOARD.length - 1) {
            setCurrentSceneIndex((idx) => idx + 1);
            return 0;
          } else {
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

  // Adjust simulator state inside interactive weather lab
  const updateInteractiveStateByHeat = (heat: number) => {
    if (heat < 30) {
      setInteractiveState("precipitation");
    } else if (heat < 60) {
      setInteractiveState("collection");
    } else {
      setInteractiveState("evaporation");
    }
  };

  const handleHeatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const heatVal = parseInt(e.target.value);
    setHeatLevel(heatVal);
    updateInteractiveStateByHeat(heatVal);
  };

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

  const playDialogue = () => {
    if (!soundEnabled) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    const dialogue = isAr ? activeScene.dialogueAr : activeScene.dialogueEn;
    const targetLang = isAr ? "ar" : "en";
    const speakGoogleTTS = () => {
      const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${targetLang}&client=tw-ob&q=${encodeURIComponent(dialogue)}`;
      const audio = new Audio(googleTtsUrl);
      audio.playbackRate = playbackSpeed;
      audioRef.current = audio;

      audio.addEventListener("canplaythrough", () => {
        if (isPlaying) {
          audio.play().catch(() => {});
        }
      });
    };
    // Pre-recorded fallback
    const audioSrc = `/audio/water-cycle/scene_${activeScene.id}_${locale}.mp3`;
    const audio = new Audio(audioSrc);
    audio.playbackRate = playbackSpeed;
    audioRef.current = audio;

    let nextStageTriggered = false;
    const triggerGoogleTTS = () => {
      if (nextStageTriggered) return;
      nextStageTriggered = true;
      speakGoogleTTS();
    };

    audio.addEventListener("canplaythrough", () => {
      if (isPlaying) {
        audio.play().catch(() => triggerGoogleTTS());
      }
    });
    audio.addEventListener("error", () => triggerGoogleTTS());
  };

  const handleSpeechRepeat = () => {
    playDialogue();
  };

  // Handle scene change (speak dialogue, reset progress)
  useEffect(() => {
    setSceneProgress(0);
    
    if (activeScene.id !== 6) {
      setInteractiveState(activeScene.simState);
      setHeatLevel(activeScene.defaultHeat);
    } else {
      updateInteractiveStateByHeat(heatLevel);
    }

    playDialogue();

    if (activeScene.id === 8 && !reduceMotion) {
      const duration = 4.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 28, spread: 360, ticks: 60, zIndex: 50 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const confettiInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(confettiInterval);
        const particleCount = 40 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSceneIndex, soundEnabled, locale]);

  // Synchronize playing state
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isPlaying) {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
      if (window.speechSynthesis && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } else {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      if (window.speechSynthesis && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
      }
    }
  }, [isPlaying]);

  const hakimTalking = activeScene.speaker === "hakim";
  const anasTalking = activeScene.speaker === "anas";

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
    evaporation: isAr ? "تبخر ☀️" : "Evaporation",
    condensation: isAr ? "تكاثف ☁️" : "Condensation",
    precipitation: isAr ? "هطول 🌧️" : "Precipitation",
    collection: isAr ? "تجميع 🌊" : "Collection",
    recapEvapTitle: isAr ? "١. التبخر ☀️" : "1. Evaporation ☀️",
    recapCondTitle: isAr ? "٢. التكاثف ☁️" : "2. Condensation ☁️",
    recapPrecipTitle: isAr ? "٣. الهطول 🌧️" : "3. Precipitation 🌧️",
    recapCollTitle: isAr ? "٤. الجريان والتجميع 🌊" : "4. Collection & Flow 🌊",
    recapEvapText: isAr
      ? "تسخين المياه السطحية بواسطة الشمس يحولها إلى بخار خفيف يرتفع لأعلى."
      : "Heating of surface water by the sun transforms it into light vapor that rises.",
    recapCondText: isAr
      ? "تبريد بخار الماء المرتفع يجمعه معاً لتكوين سحب جميلة ناعمة."
      : "Cooling of high vapor particles clusters them together to form fluffy clouds.",
    recapPrecipText: isAr
      ? "عندما تثقل الغيوم، تسقط المياه كحبات مطر منعشة أو رقاقات ثلج براقة."
      : "When clouds get too heavy, they drop water as refreshing rain or shiny snowflakes.",
    recapCollText: isAr
      ? "تدفق الأمطار عبر الوديان والأنهار وعودتها مجدداً للمحيطات لبدء دورة جديدة."
      : "Rainwater flows back through valleys and rivers into the ocean to restart the cycle.",
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      {/* 16:9 SCREEN CONTAINER */}
      <div className="w-full aspect-video relative rounded-3xl overflow-hidden bg-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-4 border-slate-800 flex flex-col justify-between">
        
        {/* Parallax Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-b from-[#080d1a] to-[#04060c]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60" />
          <div className="absolute w-[200px] h-[200px] rounded-full bg-blue-500/5 blur-[70px] top-[-30px] left-[15%]" />
        </div>

        {/* SCREEN HEADER */}
        <div className="relative z-10 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-accent/20 border border-accent/30 text-accent font-semibold px-3 py-1 rounded-full">
              {isAr ? `المشهد ${currentSceneIndex + 1} / 9` : `Scene ${currentSceneIndex + 1} / 9`}
            </span>
            <h2 className="text-xs sm:text-sm font-semibold text-white/90 drop-shadow-md">
              {isAr ? activeScene.titleAr : activeScene.titleEn}
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPlaybackSpeed((s) => (s === 0.5 ? 1.0 : s === 1.0 ? 1.5 : s === 1.5 ? 2.0 : 0.5))}
              className="text-[10px] text-white/70 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg px-2 py-1 font-semibold cursor-pointer"
            >
              {isAr ? "السرعة" : "Speed"}: {playbackSpeed}x
            </button>
            {soundEnabled && (
              <button
                type="button"
                onClick={handleSpeechRepeat}
                className="p-1 rounded-lg text-white/75 bg-white/10 hover:bg-white/15 cursor-pointer"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* SCREEN CONTENT AREA (MIDDLE) */}
        <div className="relative z-10 flex-1 w-full px-6 flex items-center justify-center overflow-hidden">
          
          {activeScene.customGraphic === "intro" && (
            <div className="w-full h-full flex items-center justify-center gap-3 sm:gap-4 animate-fade-in px-2">
              <div className="hidden sm:flex items-end w-28 lg:w-36 h-40 shrink-0 pointer-events-none"><DrHakim mood="waving" className="w-full h-full origin-bottom" /></div>
              <div className="text-center flex flex-col items-center justify-center min-w-0">
                <div className="w-full max-w-[260px] sm:max-w-[300px] mb-2"><WaterCycleDiagram locale={locale} /></div>
                <h1 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-accent via-cyan-300 to-blue-400 bg-clip-text text-transparent mb-1" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
                  {isAr ? "دورة المياه في الطبيعة" : "The Water Cycle"}
                </h1>
                <p className="hidden sm:block text-xs sm:text-sm text-white/70 font-medium max-w-md">
                  {isAr ? activeScene.subTextAr : activeScene.subTextEn}
                </p>
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="mt-3 px-6 py-2 bg-accent hover:scale-105 transition rounded-2xl text-[#050816] font-bold text-sm cursor-pointer"
                  >
                    {isAr ? "ابدأ الاستكشاف 🌊" : "Start Exploration 🌊"}
                  </button>
                )}
              </div>
              <div className="hidden sm:flex items-end w-24 lg:w-28 h-40 shrink-0 pointer-events-none"><AnasChild mood="waving" className="w-full h-full origin-bottom" /></div>
            </div>
          )}

          {activeScene.showSimulator && (
            <div className="w-full max-w-[480px] h-[190px] sm:h-[210px] relative animate-fade-in flex flex-col justify-between">
              <div className="flex-grow w-full relative">
                <WaterCycleSimulator
                  state={interactiveState}
                  heatLevel={heatLevel}
                  isPlaying={isPlaying}
                  locale={locale}
                />
              </div>

              {activeScene.showHeatSlider && (
                <div className="w-full bg-black/60 border border-white/10 backdrop-blur-md rounded-2xl px-4 py-1.5 mt-2 flex items-center gap-3 shadow-lg">
                  <span className="text-[10px] font-bold text-cyan-400 shrink-0">
                    {UI_TXT.tempCold}
                  </span>
                  
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={heatLevel}
                    onChange={handleHeatChange}
                    className="w-full h-1.5 bg-gradient-to-r from-cyan-500 via-[#10B981] to-red-500 rounded-lg appearance-none cursor-pointer focus:outline-none accent-yellow-400 shadow-inner"
                  />

                  <span className="text-[10px] font-bold text-red-400 shrink-0">
                    {UI_TXT.tempHot}
                  </span>

                  <span className="bg-yellow-400 text-slate-950 font-extrabold text-[9px] px-2.5 py-0.5 rounded-full select-none shadow">
                    {interactiveState === "evaporation" && UI_TXT.evaporation}
                    {interactiveState === "condensation" && UI_TXT.condensation}
                    {interactiveState === "precipitation" && UI_TXT.precipitation}
                    {interactiveState === "collection" && UI_TXT.collection}
                  </span>
                </div>
              )}
            </div>
          )}

          {activeScene.customGraphic === "recap" && (
            <div className="w-full max-w-xl h-full flex flex-col justify-center gap-3">
              <div className="grid grid-cols-4 gap-3">
                {(["evaporation", "condensation", "precipitation", "collection"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSelectedRecapState(st)}
                    className={`rounded-2xl border p-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                      selectedRecapState === st
                        ? "bg-accent border-accent text-slate-950 scale-105 shadow-lg"
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="text-xl mb-1">
                      {st === "evaporation" && "☀️"}
                      {st === "condensation" && "☁️"}
                      {st === "precipitation" && "🌧️"}
                      {st === "collection" && "🌊"}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wide">
                      {st === "evaporation" && (isAr ? "التبخر" : "Evap")}
                      {st === "condensation" && (isAr ? "التكاثف" : "Cond")}
                      {st === "precipitation" && (isAr ? "الهطول" : "Precip")}
                      {st === "collection" && (isAr ? "التجميع" : "Collect")}
                    </span>
                  </button>
                ))}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 min-h-[60px] flex items-center justify-center text-center shadow-inner">
                {selectedRecapState ? (
                  <div className="animate-fade-in">
                    <h4 className="text-xs font-bold text-accent mb-0.5">
                      {selectedRecapState === "evaporation" && UI_TXT.recapEvapTitle}
                      {selectedRecapState === "condensation" && UI_TXT.recapCondTitle}
                      {selectedRecapState === "precipitation" && UI_TXT.recapPrecipTitle}
                      {selectedRecapState === "collection" && UI_TXT.recapCollTitle}
                    </h4>
                    <p className="text-[11px] text-white/80 leading-relaxed max-w-md mx-auto">
                      {selectedRecapState === "evaporation" && UI_TXT.recapEvapText}
                      {selectedRecapState === "condensation" && UI_TXT.recapCondText}
                      {selectedRecapState === "precipitation" && UI_TXT.recapPrecipText}
                      {selectedRecapState === "collection" && UI_TXT.recapCollText}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-white/40 italic">
                    {isAr
                      ? "💡 اضغط على بطاقات الطقس السحرية في الأعلى لتلخيص محطاتها!"
                      : "💡 Tap the magic weather cards above to summarize their stages!"}
                  </p>
                )}
              </div>
            </div>
          )}

          {activeScene.customGraphic === "ending" && (
            <div className="text-center flex flex-col items-center justify-center animate-fade-in w-full h-full">
              <div className="text-5xl mb-3 animate-bounce">🎓🏆🌧️</div>
              <h2 className="text-2xl font-extrabold text-accent mb-1">
                {isAr ? "أحسنت يا بطل الطقس! 👏" : "Outstanding Weather Champion! 👏"}
              </h2>
              <p className="text-xs text-white/70 max-w-md mb-4 leading-relaxed font-semibold">
                {isAr
                  ? "لقد فهمت دورة المياه بنجاح! الآن أصبحت عالماً صغيراً ذكياً!"
                  : "You've successfully mastered the Water Cycle! You are now a junior meteorologist!"}
              </p>
              
              <button
                type="button"
                onClick={handleReplay}
                className="flex items-center gap-2 px-5 py-2 bg-accent hover:scale-105 transition rounded-2xl text-[#050816] font-extrabold text-xs shadow-lg shadow-accent/25 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                {UI_TXT.replay}
              </button>
            </div>
          )}

        </div>

        {/* --- CARTOON CHARACTER PLACEMENT --- */}
        <div className="relative z-10 w-full px-6 flex justify-between items-end h-[120px] sm:h-[135px] select-none pointer-events-none bg-gradient-to-t from-black/75 to-transparent">
          <div className={`w-28 sm:w-32 h-full flex justify-start transition-all duration-300 ${
            hakimTalking ? "scale-110 filter drop-shadow-[0_0_15px_rgba(34,211,238,0.55)]" : "opacity-80"
          }`}>
            <DrHakim
              mood={hakimTalking ? "talking" : activeScene.hakimMood}
              className="w-full h-full origin-bottom translate-y-3"
            />
          </div>

          <div className="flex-grow border-t border-slate-700 bg-slate-900/40 shadow-inner h-2 mx-6 rounded-t-lg mb-1" />

          <div className={`w-28 sm:w-32 h-full flex justify-end transition-all duration-300 ${
            anasTalking ? "scale-110 filter drop-shadow-[0_0_15px_rgba(253,224,71,0.55)]" : "opacity-80"
          }`}>
            <AnasChild
              mood={anasTalking ? "talking" : activeScene.anasMood}
              className="w-full h-full origin-bottom translate-y-3"
            />
          </div>
        </div>

      </div>

      {/* --- PREMIUM DIALOGUE CONSOLE CARD (OUTSIDE WIDESCREEN) --- */}
      {activeScene.speaker && (
        <div className="w-full bg-slate-900/80 border-2 border-white/10 rounded-3xl p-5 shadow-2xl relative flex flex-col gap-3 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <span className="bg-accent text-[#050816] text-[10px] sm:text-xs font-extrabold px-3 py-1 rounded-full uppercase shadow">
              {activeScene.speaker === "hakim" && (isAr ? "د. حكيم 🧪" : "Dr. Hakim 🧪")}
              {activeScene.speaker === "anas" && (isAr ? "أنس 🧒" : "Anas 🧒")}
              {activeScene.speaker === "narrator" && (isAr ? "الراوي 🎙️" : "Narrator 🎙️")}
            </span>
            
            {soundEnabled && (
              <button
                type="button"
                onClick={handleSpeechRepeat}
                className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-accent transition cursor-pointer"
              >
                <Volume2 className="h-3.5 w-3.5" />
                {isAr ? "استمع مجدداً" : "Listen again"}
              </button>
            )}
          </div>

          <p className="text-base sm:text-lg leading-relaxed text-white font-bold select-none" style={{ fontFamily: "var(--font-ibm-plex-arabic), 'Fredoka', sans-serif" }}>
            {isAr ? activeScene.dialogueAr : activeScene.dialogueEn}
          </p>

          {(isAr ? activeScene.subTextAr : activeScene.subTextEn) && (
            <p className="text-xs sm:text-sm text-white/50 font-semibold border-t border-white/5 mt-1 pt-2.5 leading-relaxed">
              💡 {isAr ? activeScene.subTextAr : activeScene.subTextEn}
            </p>
          )}
        </div>
      )}

      {/* --- PLAYER CONTROLLERS (OUTSIDE WIDESCREEN) --- */}
      <div className="w-full bg-slate-900/60 border border-white/10 rounded-2xl p-3 flex flex-col gap-3 shadow-xl backdrop-blur-md">
        
        <div className="w-full flex items-center gap-3 px-2">
          <span className="text-[10px] text-white/40 select-none">0:00</span>
          <div className="flex-grow h-2.5 rounded-full bg-white/10 overflow-hidden relative shadow-inner cursor-pointer"
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
          <span className="text-[10px] text-white/40 select-none">
            {activeScene.duration}s
          </span>
        </div>

        <div className="w-full flex items-center justify-between px-1">
          <div className={`flex items-center gap-1.5 ${isAr ? "flex-row-reverse" : ""}`}>
            <button
              type="button"
              onClick={handleBackScene}
              disabled={currentSceneIndex === 0}
              className="p-2.5 rounded-xl text-white/60 hover:bg-white/5 hover:text-white disabled:opacity-25 disabled:pointer-events-none cursor-pointer"
              title={UI_TXT.back}
            >
              {isAr ? <SkipForward className="h-5 w-5" /> : <SkipBack className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={handleNextScene}
              disabled={currentSceneIndex === STORYBOARD.length - 1}
              className="p-2.5 rounded-xl text-white/60 hover:bg-white/5 hover:text-white disabled:opacity-25 disabled:pointer-events-none cursor-pointer"
              title={UI_TXT.next}
            >
              {isAr ? <SkipBack className="h-5 w-5" /> : <SkipForward className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-accent hover:scale-105 active:scale-95 text-[#050816] font-bold shadow-xl shadow-accent/20 transition cursor-pointer"
              title={isPlaying ? UI_TXT.pause : UI_TXT.play}
            >
              {isPlaying ? (
                <Pause className="h-5.5 w-5.5 fill-[#050816]" strokeWidth={2.5} />
              ) : (
                <Play className="h-5.5 w-5.5 fill-[#050816] translate-x-0.5" strokeWidth={2.5} />
              )}
            </button>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                soundEnabled
                  ? "border-accent/20 bg-accent/10 text-accent hover:bg-accent/15"
                  : "border-white/10 bg-white/5 text-white/40 hover:bg-white/10"
              }`}
              title={soundEnabled ? UI_TXT.soundOn : UI_TXT.soundOff}
            >
              {soundEnabled ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <VolumeX className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

      </div>

      <style jsx global>{`
        .animate-fade-in {
          animation: fadein 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadein {
          0% { opacity: 0; transform: scale(0.97) translateY(4px); }
          100% { opacity: 1; transform: scale(1.0) translateY(0); }
        }
      `}</style>
    </div>
  );
}
