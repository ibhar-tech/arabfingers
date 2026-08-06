"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { useAppStore } from "@/store/useAppStore";
import DrHakim from "./DrHakim";
import AnasChild from "./AnasChild";
import { SolarSystemDiagram } from "../illustrations/SolarSystemDiagram";
import SolarSystemSimulator from "./SolarSystemSimulator";

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
  simState: "mercury" | "venus" | "earth" | "mars" | "none";
  showGravitySlider: boolean;
  defaultGravity: number;
  customGraphic: "intro" | "recap" | "ending" | "none";
  duration: number; // in seconds
}

const STORYBOARD: Scene[] = [
  {
    id: 0,
    titleAr: "الإقلاع للفضاء الخارجي 🚀",
    titleEn: "Blast Off into Outer Space 🚀",
    speaker: "narrator",
    dialogueAr: "اربطوا أحزمة الأمان يا أصدقائي! سننطلق اليوم في رحلة فضائية خارقة بين الكواكب لنكتشف كيف تحافظ الجاذبية عليها تدور بسعادة!",
    dialogueEn: "Fasten your seatbelts my friends! Today we will fly on a cosmic space journey among the planets to discover how gravity keeps them orbiting!",
    subTextAr: "استعدوا للطيران بين الكواكب اللامعة مع الدكتور حكيم وأنس!",
    subTextEn: "Get ready to zoom past shiny planets with Dr. Hakim and Anas!",
    hakimMood: "waving",
    anasMood: "waving",
    showSimulator: false,
    simState: "none",
    showGravitySlider: false,
    defaultGravity: 50,
    customGraphic: "intro",
    duration: 12
  },
  {
    id: 1,
    titleAr: "لماذا لا تطير الكواكب؟ 🌌",
    titleEn: "Why Don't Planets Fly Away? 🌌",
    speaker: "anas",
    dialogueAr: "يا دكتور حكيم، الفضاء واسع ومخيف جداً! لماذا تدور كواكبنا في دوائر منتظمة حول الشمس ولا تطير متباعدة في الكون الفسيح؟",
    dialogueEn: "Dr. Hakim, space is so vast and scary! Why do our planets spin in perfect circles around the sun instead of flying off into the deep universe?",
    hakimMood: "thinking",
    anasMood: "talking",
    showSimulator: false,
    simState: "none",
    showGravitySlider: false,
    defaultGravity: 50,
    customGraphic: "none",
    duration: 15
  },
  {
    id: 2,
    titleAr: "الشمس والجاذبية ☀️",
    titleEn: "The Sun & Cosmic Gravity ☀️",
    speaker: "hakim",
    dialogueAr: "سؤال عميق جداً! الشمس ضخمة وثقيلة للغاية، لذا تمتلك قوة جذب خارقة غير مرئية تسحب الكواكب نحوها وتجعلها تدور حولها كالمغناطيس!",
    dialogueEn: "A very deep question! The Sun is extremely massive and heavy, so it possesses a super invisible gravitational pull that grips planets and keeps them orbiting like a magnet!",
    subTextAr: "تسمى هذه القوة الجاذبية، وهي التي تحافظ على توازن ونظام مجموعتنا الشمسية بأكملها!",
    subTextEn: "This force is called gravity, and it maintains the balance and order of our entire solar system!",
    hakimMood: "talking",
    anasMood: "happy",
    showSimulator: true,
    simState: "none",
    showGravitySlider: false,
    defaultGravity: 50,
    customGraphic: "none",
    duration: 16
  },
  {
    id: 3,
    titleAr: "كوكب عطارد السريع ☄️",
    titleEn: "Mercury: The Speedster ☄️",
    speaker: "hakim",
    dialogueAr: "انظروا إلى عطارد، إنه الكوكب الأقرب للشمس! حجمه صغير جداً وهو سريع كالفهد في دورانه لكي لا تسحبه الجاذبية وتسقطه في الشمس الساخنة!",
    dialogueEn: "Look at Mercury, it's the closest planet to the sun! It is very small and speeds around like a cheetah so gravity doesn't drag it down into the burning sun!",
    subTextAr: "عطارد كوكب صخري حار جداً في النهار ومجمد تماماً في الليل!",
    subTextEn: "Mercury is a rocky planet that is blazing hot during the day and freezing cold at night!",
    hakimMood: "talking",
    anasMood: "amazed",
    showSimulator: true,
    simState: "mercury",
    showGravitySlider: false,
    defaultGravity: 50,
    customGraphic: "none",
    duration: 18
  },
  {
    id: 4,
    titleAr: "كوكب الزهرة المتوهج 🪐",
    titleEn: "Venus: The Glowing Jewel 🪐",
    speaker: "anas",
    dialogueAr: "يا لها من لمعان! كوكب الزهرة هو الأكثر سخونة وتوهجاً في مجموعتنا لأنه محاط بغيوم سميكة تحبس الحرارة كصوبة دافئة!",
    dialogueEn: "What a gorgeous shine! Venus is the hottest and brightest planet because it is wrapped in thick clouds that trap heat like a greenhouse!",
    subTextAr: "تسمى الزهرة توأم الأرض لأنها تقاربها في الحجم، لكن لا يمكن العيش عليها لشدة حرارتها!",
    subTextEn: "Venus is called Earth's twin due to its similar size, but it is too hot to support life!",
    hakimMood: "happy",
    anasMood: "talking",
    showSimulator: true,
    simState: "venus",
    showGravitySlider: false,
    defaultGravity: 50,
    customGraphic: "none",
    duration: 18
  },
  {
    id: 5,
    titleAr: "كوكب الأرض الأزرق 🌍",
    titleEn: "Earth: The Blue Oasis 🌍",
    speaker: "hakim",
    dialogueAr: "والآن كوكبنا الرائع الأرض! إنه الكوكب الوحيد المليء بالماء والهواء والحياة، ويدور حوله قمر صغير ينير ليلنا الجميل بسعادة!",
    dialogueEn: "And now our wonderful planet, Earth! It is the only planet packed with water, air, and life, and a cute little moon spins around it to light up our night!",
    subTextAr: "نحن نعيش هنا! الجاذبية الأرضية هي التي تجعل أقدامنا ثابتة على الأرض ولا نطير في الهواء!",
    subTextEn: "We live here! Earth's gravity is what keeps our feet firmly planted on the ground so we don't float away!",
    hakimMood: "talking",
    anasMood: "happy",
    showSimulator: true,
    simState: "earth",
    showGravitySlider: false,
    defaultGravity: 50,
    customGraphic: "none",
    duration: 18
  },
  {
    id: 6,
    titleAr: "كوكب المريخ الأحمر 🔴",
    titleEn: "Mars: The Red Planet 🔴",
    speaker: "anas",
    dialogueAr: "انظروا للون الأحمر الرائع! إنه كوكب المريخ المغطى بالحديد والصدأ، ونحن نرسل مركبات فضاء ذكية لتستكشف جباله الشاهقة ووديانه العميقة!",
    dialogueEn: "Look at that spectacular red color! It's Mars, covered in iron rust. We send smart rover robots to explore its giant mountains and deep valleys!",
    subTextAr: "المريخ يمتلك بركان 'أوليمبوس مونز' وهو أضخم بركان معروف في المجموعة الشمسية بأكملها!",
    subTextEn: "Mars has Olympus Mons, which is the largest known volcano in the entire solar system!",
    hakimMood: "happy",
    anasMood: "talking",
    showSimulator: true,
    simState: "mars",
    showGravitySlider: false,
    defaultGravity: 50,
    customGraphic: "none",
    duration: 18
  },
  {
    id: 7,
    titleAr: "مختبر الجاذبية الكونية 🪐🌡️",
    titleEn: "Your Cosmic Gravity Lab 🪐🌡️",
    speaker: "narrator",
    dialogueAr: "والآن حان دوركم للتحكم في جاذبية الشمس! حركوا الشريط لزيادة الجاذبية وشاهدوا كيف تسرع الكواكب، أو خفضوها لتطير الكويكبات بعيداً!",
    dialogueEn: "Now it's your turn to control solar gravity! Slide the bar to increase gravity and watch planets speed up, or decrease it to watch asteroids float away!",
    subTextAr: "اضغطوا على الشاشة أيضاً لتطلقوا كويكبات صغيرة وتصنعوا لها مسارات مدارية مذهلة!",
    subTextEn: "Tap the screen too to launch cute little asteroids and watch them trace beautiful orbital trails!",
    hakimMood: "normal",
    anasMood: "happy",
    showSimulator: true,
    simState: "none",
    showGravitySlider: true,
    defaultGravity: 50,
    customGraphic: "none",
    duration: 35
  },
  {
    id: 8,
    titleAr: "بطاقات الكواكب السحرية 🧠",
    titleEn: "Cosmic Planet Recap 🧠",
    speaker: "anas",
    dialogueAr: "يا له من طيران فضائي مذهل! دعونا نلخص خصائص كواكبنا القريبة الأربعة ببطاقات الفضاء التفاعلية!",
    dialogueEn: "What a spectacular cosmic flight! Let's summarize our four neighboring planets with these interactive space cards!",
    hakimMood: "happy",
    anasMood: "talking",
    showSimulator: false,
    simState: "none",
    showGravitySlider: false,
    defaultGravity: 50,
    customGraphic: "recap",
    duration: 20
  },
  {
    id: 9,
    titleAr: "النهاية والاحتفال الفضائي 🎉",
    titleEn: "Cosmic Celebration Ending 🎉",
    speaker: "hakim",
    dialogueAr: "أحسنتم يا أصدقائي رواد الفضاء الأذكياء! لقد كنتم رائعين في مغامرتنا الكونية اليوم! استمروا في استكشاف النجوم ونراكم قريباً!",
    dialogueEn: "Outstanding job my clever astronaut friends! You were amazing on our cosmic adventure today! Keep exploring the stars and see you soon!",
    hakimMood: "happy",
    anasMood: "happy",
    showSimulator: false,
    simState: "none",
    showGravitySlider: false,
    defaultGravity: 50,
    customGraphic: "ending",
    duration: 15
  }
];

interface SolarSystemInteractiveProps {
  locale?: string;
}

export default function SolarSystemInteractive({ locale = "ar" }: SolarSystemInteractiveProps) {
  const isAr = locale === "ar";

  const soundEnabled = useAppStore((state) => state.soundEnabled);
  const setSoundEnabled = useAppStore((state) => state.setSoundEnabled);
  const reduceMotion = useAppStore((state) => state.reduceMotion);

  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [gravityFactor, setGravityFactor] = useState(50);
  const [interactiveState, setInteractiveState] = useState<"mercury" | "venus" | "earth" | "mars" | "none">("none");

  const [selectedRecapState, setSelectedRecapState] = useState<"mercury" | "venus" | "earth" | "mars" | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
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

  const handleGravityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGravityFactor(parseInt(e.target.value));
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

    // Our own pre-rendered neural narration (scripts/generate-voiceovers-*.js).
    // ponytail: <audio> not Howler here — these are minutes-long clips and should
    // stream, not sit decoded in memory like the short letter sounds do.
    const audioSrc = `/audio/solar-system/scene_${activeScene.id}_${locale}.mp3`;
    const audio = new Audio(audioSrc);
    audio.playbackRate = playbackSpeed;
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => {
      if (isPlaying) {
        audio.play().catch(() => {});
      }
    });
  };

  const handleSpeechRepeat = () => {
    playDialogue();
  };

  // Handle scene change (speak dialogue, reset progress)
  useEffect(() => {
    setSceneProgress(0);
    
    if (activeScene.id !== 7) {
      setInteractiveState(activeScene.simState);
      setGravityFactor(activeScene.defaultGravity);
    }

    playDialogue();

    if (activeScene.id === 9 && !reduceMotion) {
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
    } else {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
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
    gravityLow: isAr ? "ضعيفة جداً 🎈" : "Zero Gravity 🎈",
    gravityHigh: isAr ? "جاذبية فائقة 🧲" : "Super Pull 🧲",
    mercury: isAr ? "عطارد" : "Mercury",
    venus: isAr ? "الزهرة" : "Venus",
    earth: isAr ? "الأرض" : "Earth",
    mars: isAr ? "المريخ" : "Mars",
    recapMercTitle: isAr ? "عطارد ☄️" : "Mercury ☄️",
    recapVenTitle: isAr ? "الزهرة 🪐" : "Venus 🪐",
    recapEarthTitle: isAr ? "الأرض 🌍" : "Earth 🌍",
    recapMarsTitle: isAr ? "المريخ 🔴" : "Mars 🔴",
    recapMercText: isAr
      ? "الكوكب الأقرب للشمس وسريع جداً في دورانه، صخري حار نهاراً ومتجمد ليلاً."
      : "The closest planet to the sun. Super fast orbits, blazing hot by day and frozen by night.",
    recapVenText: isAr
      ? "أشد الكواكب حرارة وسخونة بسبب غيومه السميكة التي تحبس حرارة الشمس بالكامل."
      : "The hottest planet in our system, wrapped in thick clouds that trap solar heat completely.",
    recapEarthText: isAr
      ? "موطننا الأزرق الجميل! الكوكب الوحيد المليء بالحياة والماء، ويمتلك قمراً واحداً."
      : "Our beautiful blue home! The only planet known to host water and life, with a single moon.",
    recapMarsText: isAr
      ? "الكوكب الأحمر المليء بأكاسيد الحديد الصدئة، ويضم أضخم بركان خامد في النظام الشمسي."
      : "The dusty red planet rich in iron oxide, hosting Olympus Mons, the largest known volcano.",
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      {/* 16:9 SCREEN CONTAINER */}
      <div className="w-full aspect-video relative rounded-3xl overflow-hidden bg-[#030712] shadow-[0_20px_50px_rgba(0,0,0,0.45)] border-4 border-slate-800 flex flex-col justify-between">
        
        {/* SCREEN HEADER */}
        <div className="relative z-10 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-accent/20 border border-accent/30 text-accent font-semibold px-3 py-1 rounded-full">
              {isAr ? `المشهد ${currentSceneIndex + 1} / 10` : `Scene ${currentSceneIndex + 1} / 10`}
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
                <div className="hidden sm:block w-full sm:max-w-[300px] mb-2"><SolarSystemDiagram locale={locale} /></div>
                <h1 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-accent via-yellow-300 to-red-400 bg-clip-text text-transparent mb-1" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
                  {isAr ? "نظامنا الشمسي الرائع" : "Our Spectacular Solar System"}
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
                    {isAr ? "انطلق للفضاء 🚀" : "Blast Off 🚀"}
                  </button>
                )}
              </div>
              <div className="hidden sm:flex items-end w-24 lg:w-28 h-40 shrink-0 pointer-events-none"><AnasChild mood="waving" className="w-full h-full origin-bottom" /></div>
            </div>
          )}

          {activeScene.showSimulator && (
            <div className="w-full max-w-[480px] h-[190px] sm:h-[210px] relative animate-fade-in flex flex-col justify-between">
              <div className="flex-grow w-full relative">
                <SolarSystemSimulator
                  activePlanet={interactiveState}
                  gravityFactor={gravityFactor}
                  isPlaying={isPlaying}
                  locale={locale}
                />
              </div>

              {activeScene.showGravitySlider && (
                <div className="w-full bg-black/60 border border-white/10 backdrop-blur-md rounded-2xl px-4 py-1.5 mt-2 flex items-center gap-3 shadow-lg">
                  <span className="text-[10px] font-bold text-cyan-400 shrink-0">
                    {UI_TXT.gravityLow}
                  </span>
                  
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={gravityFactor}
                    onChange={handleGravityChange}
                    className="w-full h-1.5 bg-gradient-to-r from-cyan-500 via-[#10B981] to-red-500 rounded-lg appearance-none cursor-pointer focus:outline-none accent-yellow-400 shadow-inner"
                  />

                  <span className="text-[10px] font-bold text-red-400 shrink-0">
                    {UI_TXT.gravityHigh}
                  </span>
                </div>
              )}
            </div>
          )}

          {activeScene.customGraphic === "recap" && (
            <div className="w-full max-w-xl h-full flex flex-col justify-center gap-3">
              <div className="grid grid-cols-4 gap-3">
                {(["mercury", "venus", "earth", "mars"] as const).map((st) => (
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
                      {st === "mercury" && "☄️"}
                      {st === "venus" && "🪐"}
                      {st === "earth" && "🌍"}
                      {st === "mars" && "🔴"}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wide">
                      {st === "mercury" && UI_TXT.mercury}
                      {st === "venus" && UI_TXT.venus}
                      {st === "earth" && UI_TXT.earth}
                      {st === "mars" && UI_TXT.mars}
                    </span>
                  </button>
                ))}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 min-h-[60px] flex items-center justify-center text-center shadow-inner">
                {selectedRecapState ? (
                  <div className="animate-fade-in">
                    <h4 className="text-xs font-bold text-accent mb-0.5">
                      {selectedRecapState === "mercury" && UI_TXT.recapMercTitle}
                      {selectedRecapState === "venus" && UI_TXT.recapVenTitle}
                      {selectedRecapState === "earth" && UI_TXT.recapEarthTitle}
                      {selectedRecapState === "mars" && UI_TXT.recapMarsTitle}
                    </h4>
                    <p className="text-[11px] text-white/80 leading-relaxed max-w-md mx-auto">
                      {selectedRecapState === "mercury" && UI_TXT.recapMercText}
                      {selectedRecapState === "venus" && UI_TXT.recapVenText}
                      {selectedRecapState === "earth" && UI_TXT.recapEarthText}
                      {selectedRecapState === "mars" && UI_TXT.recapMarsText}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-white/40 italic">
                    {isAr
                      ? "💡 اضغط على بطاقات الكواكب السحرية في الأعلى لتلخيص خصائصها!"
                      : "💡 Tap the magic planet cards above to summarize their features!"}
                  </p>
                )}
              </div>
            </div>
          )}

          {activeScene.customGraphic === "ending" && (
            <div className="text-center flex flex-col items-center justify-center animate-fade-in w-full h-full">
              <div className="text-5xl mb-3 animate-bounce">🎓🏆🚀</div>
              <h2 className="text-2xl font-extrabold text-accent mb-1">
                {isAr ? "أحسنت يا رائد الفضاء الذكي! 👏" : "Outstanding Space Cadet! 👏"}
              </h2>
              <p className="text-xs text-white/70 max-w-md mb-4 leading-relaxed font-semibold">
                {isAr
                  ? "لقد فهمت نظامنا الشمسي وجاذبيته بنجاح! الآن أصبحت رائد فضاء صغير ذكي!"
                  : "You've successfully completed the solar system tour! You are now a junior astronaut!"}
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
        <div className={`relative z-10 w-full px-6 flex justify-between items-end h-[120px] sm:h-[135px] select-none pointer-events-none bg-gradient-to-t from-black/75 to-transparent ${activeScene.customGraphic === "intro" ? "hidden" : ""}`}>
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

      {/* --- PLAYER CONTROLLERS --- */}
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
