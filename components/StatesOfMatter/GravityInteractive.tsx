"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { useAppStore } from "@/store/useAppStore";
import DrHakim from "./DrHakim";
import AnasChild from "./AnasChild";
import GravitySimulator from "./GravitySimulator";

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
  simState: "apple" | "rock" | "rocket" | "astronaut" | "none";
  showGravitySlider: boolean;
  defaultGravity: number;
  customGraphic: "intro" | "recap" | "ending" | "none";
  duration: number; // in seconds
}

const STORYBOARD: Scene[] = [
  {
    id: 0,
    titleAr: "مغامرة الجاذبية الخارقة 🍎",
    titleEn: "Super Gravity Adventure 🍎",
    speaker: "narrator",
    dialogueAr: "مرحباً بكم يا علماء المستقبل! اليوم سنكتشف قوة خفية مذهلة تمسك بنا على الأرض وتجعل الأشياء تسقط للأسفل! إنها الجاذبية!",
    dialogueEn: "Welcome future scientists! Today we will discover a spectacular invisible force that holds us to the ground and makes things fall! It's gravity!",
    subTextAr: "استعدوا لتجربة سحب خفيفة وممتعة في مختبر الدكتور حكيم وأنس!",
    subTextEn: "Get ready for a fun, weightless science trip with Dr. Hakim and Anas!",
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
    titleAr: "لماذا تسقط الأشياء؟ 🤔",
    titleEn: "Why Do Things Fall? 🤔",
    speaker: "anas",
    dialogueAr: "يا دكتور حكيم، رميت كرتي في الهواء، لكنها عادت وسقطت فوراً على رأسي! لماذا لا تستمر في الطيران للأعلى وتختفي في الفضاء؟",
    dialogueEn: "Dr. Hakim, I threw my ball in the air, but it fell right back on my head! Why doesn't it keep flying up and disappear in space?",
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
    titleAr: "قصة تفاحة نيوتن 🍎",
    titleEn: "Newton's Apple Story 🍎",
    speaker: "hakim",
    dialogueAr: "سؤال ذكي يا بطل! منذ زمن طويل، رأى العالم إسحاق نيوتن تفاحة تسقط من شجرة، فأدرك أن الأرض تسحب كل شيء نحوها بقوة تسمى الجاذبية!",
    dialogueEn: "A smart question, champion! Long ago, scientist Isaac Newton saw an apple fall from a tree, and realized the Earth pulls everything to its center using gravity!",
    subTextAr: "مثل هذه التفاحة اللطيفة، الأرض تسحب جميع الأجسام نحو مركزها تماماً كالمغناطيس!",
    subTextEn: "Like this cute apple, the Earth pulls all objects towards its center exactly like a magnet!",
    hakimMood: "talking",
    anasMood: "happy",
    showSimulator: true,
    simState: "apple",
    showGravitySlider: false,
    defaultGravity: 52,
    customGraphic: "none",
    duration: 18
  },
  {
    id: 3,
    titleAr: "الوزن والجاذبية 🪨",
    titleEn: "Mass vs Heavy Gravity 🪨",
    speaker: "hakim",
    dialogueAr: "لاحظ يا أنس! الصخور الثقيلة تسقط بقوة وثبات، بينما الأوراق الخفيفة تطفو ببطء بسبب مقاومة الهواء، لكن الجاذبية تسحب كليهما بالتساوي!",
    dialogueEn: "Notice, Anas! Heavy rocks drop firmly, while light feathers float slowly due to air resistance, but gravity pulls both down equally in a vacuum!",
    subTextAr: "في غرفتنا المفرغة، الصخرة والتفاحة سيسقطان معاً بسرعة مذهلة لعدم وجود هواء يدفعهما!",
    subTextEn: "In our vacuum chamber, the rock and the apple fall together at an amazing speed because there is no air pushing them!",
    hakimMood: "talking",
    anasMood: "amazed",
    showSimulator: true,
    simState: "rock",
    showGravitySlider: false,
    defaultGravity: 52,
    customGraphic: "none",
    duration: 18
  },
  {
    id: 4,
    titleAr: "انعدام الجاذبية في الفضاء 👨‍🚀",
    titleEn: "Weightlessness in Space 👨‍🚀",
    speaker: "anas",
    dialogueAr: "يا إلهي! انظروا إلى رواد الفضاء، إنهم يطفون بسعادة في الفضاء الخارجي لعدم وجود جاذبية تسحبهم للأسفل! يبدو ذلك ممتعاً للغاية!",
    dialogueEn: "Oh my! Look at the astronauts, they float happily in outer space because there is no gravity dragging them down! That looks like so much fun!",
    subTextAr: "في الفضاء، لا يوجد أعلى أو أسفل، وكل شيء يطفو بحرية وسلام كأنك تسبح في الهواء!",
    subTextEn: "In deep space, there is no up or down, and everything floats freely as if you are swimming in the air!",
    hakimMood: "happy",
    anasMood: "talking",
    showSimulator: true,
    simState: "astronaut",
    showGravitySlider: false,
    defaultGravity: 0, // Zero gravity!
    customGraphic: "none",
    duration: 18
  },
  {
    id: 5,
    titleAr: "الجاذبية الفائقة للمشتري 🚀",
    titleEn: "Jupiter's Heavy Gravity 🚀",
    speaker: "hakim",
    dialogueAr: "صحيح! ولكن انتبهوا، إذا ذهبنا لكوكب المشتري الضخم، فستكون جاذبيته قوية جداً وثقيلة لدرجة تجعل حركتنا بطيئة وصعبة كأننا نحمل صخوراً!",
    dialogueEn: "True! But beware, if we go to massive Jupiter, its gravity is so strong and heavy that it makes our movements slow and difficult, as if carrying rocks!",
    subTextAr: "الجاذبية تعتمد على كتلة الكوكب؛ فكلما كان الكوكب أثقل، كانت قوة سحبه وجاذبيته أكبر وأقوى!",
    subTextEn: "Gravity depends on the planet's mass. The heavier the planet, the bigger and stronger its gravitational pull!",
    hakimMood: "talking",
    anasMood: "amazed",
    showSimulator: true,
    simState: "rocket",
    showGravitySlider: false,
    defaultGravity: 100, // Jupiter crush gravity!
    customGraphic: "none",
    duration: 18
  },
  {
    id: 6,
    titleAr: "مختبر الجاذبية التفاعلي 🌡️🍎",
    titleEn: "Your Gravity Sandbox 🌡️🍎",
    speaker: "narrator",
    dialogueAr: "والآن حان دوركم لتصبحوا سادة الجاذبية! حركوا الشريط لضبط قوة الجاذبية وشاهدوا الأجسام وهي تطفو أو تسقط بسرعة، واضغطوا عليها لتطلقوها!",
    dialogueEn: "Now it's your turn to become gravity masters! Slide the bar to adjust gravity strength and watch items float or fall rapidly, and tap them to launch!",
    subTextAr: "اضغطوا على التفاحة أو رائد الفضاء لإطلاقهم بقوة، وشاهدوا كيف يرتدون ويسقطون بتأثير الجاذبية المختلفة!",
    subTextEn: "Click the apple or astronaut to launch them up, and watch how they bounce and drop under different gravity settings!",
    hakimMood: "normal",
    anasMood: "happy",
    showSimulator: true,
    simState: "none",
    showGravitySlider: true,
    defaultGravity: 52,
    customGraphic: "none",
    duration: 35
  },
  {
    id: 7,
    titleAr: "بطاقات الجاذبية السحرية 🧠",
    titleEn: "Fun Gravity Recap 🧠",
    speaker: "anas",
    dialogueAr: "يا لها من تجربة فيزيائية قوية وممتعة! دعونا نلخص خصائص الجاذبية السحرية بأوراق العلوم التفاعلية اللطيفة!",
    dialogueEn: "What a powerful and fun physics experiment! Let's summarize the magic properties of gravity with these cute science cards!",
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
    id: 8,
    titleAr: "النهاية والاحتفال المرتد 🎉",
    titleEn: "Gravity Celebration Ending 🎉",
    speaker: "hakim",
    dialogueAr: "أحسنتم يا أصدقائي العلماء الصغار! لقد كنتم رائعين في تحدي الجاذبية اليوم! استمروا في طرح الأسئلة الذكية ونراكم قريباً!",
    dialogueEn: "Outstanding job my little junior scientists! You were amazing at challenging gravity today! Keep asking smart questions and see you soon!",
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

interface GravityInteractiveProps {
  locale?: string;
}

export default function GravityInteractive({ locale = "ar" }: GravityInteractiveProps) {
  const isAr = locale === "ar";

  const soundEnabled = useAppStore((state) => state.soundEnabled);
  const setSoundEnabled = useAppStore((state) => state.setSoundEnabled);
  const reduceMotion = useAppStore((state) => state.reduceMotion);

  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [gravitySlider, setGravitySlider] = useState(52);
  const [interactiveState, setInteractiveState] = useState<"apple" | "rock" | "rocket" | "astronaut" | "none">("none");

  const [selectedRecapState, setSelectedRecapState] = useState<"whatIsIt" | "space" | "jupiter" | "earthRecap" | null>(null);

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

  const handleGravityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGravitySlider(parseInt(e.target.value));
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

    const speakTTS = () => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      const utterance = new SpeechSynthesisUtterance(dialogue);
      const voice = getBestVoice(targetLang);
      if (voice) utterance.voice = voice;
      utterance.lang = isAr ? "ar-SA" : "en-US";
      
      const baseRate = isAr ? 0.74 : 0.83;
      utterance.rate = playbackSpeed * baseRate;
      
      if (activeScene.speaker === "hakim") utterance.pitch = 0.93;
      else if (activeScene.speaker === "anas") utterance.pitch = 1.15;
      else utterance.pitch = 1.0;

      isSpeakingRef.current = true;
      utterance.onend = () => { isSpeakingRef.current = false; };

      if (isPlaying) {
        window.speechSynthesis.speak(utterance);
      } else {
        window.speechSynthesis.speak(utterance);
        window.speechSynthesis.pause();
      }
    };

    const speakGoogleTTS = () => {
      const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${targetLang}&client=tw-ob&q=${encodeURIComponent(dialogue)}`;
      const audio = new Audio(googleTtsUrl);
      audio.playbackRate = playbackSpeed;
      audioRef.current = audio;

      let fallbackTriggered = false;
      const triggerTTSFallback = () => {
        if (fallbackTriggered) return;
        fallbackTriggered = true;
        speakTTS();
      };

      audio.addEventListener("canplaythrough", () => {
        if (isPlaying) {
          audio.play().catch(() => triggerTTSFallback());
        }
      });
      audio.addEventListener("error", () => triggerTTSFallback());

      setTimeout(() => {
        if (audio.readyState < 3 && !fallbackTriggered) triggerTTSFallback();
      }, 1200);
    };

    // Pre-recorded fallback
    const audioSrc = `/audio/gravity/scene_${activeScene.id}_${locale}.mp3`;
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
      setGravitySlider(activeScene.defaultGravity);
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
    gravityZero: isAr ? "انعدام الجاذبية 🎈" : "Zero Gravity 🎈",
    gravityHeavy: isAr ? "جاذبية فائقة 🧲" : "Heavy Crush 🧲",
    apple: isAr ? "تفاحة" : "Apple",
    rock: isAr ? "صخرة" : "Rock",
    rocket: isAr ? "صاروخ" : "Rocket",
    astronaut: isAr ? "رائد فضاء" : "Astronaut",
    recapWhatTitle: isAr ? "ما هي الجاذبية؟ 🍎" : "What is Gravity? 🍎",
    recapSpaceTitle: isAr ? "انعدام الجاذبية 👨‍🚀" : "Weightlessness 👨‍🚀",
    recapJupTitle: isAr ? "الجاذبية الضخمة 🧲" : "Jupiter Gravity 🧲",
    recapEarthTitle: isAr ? "جاذبية الأرض 🌍" : "Earth Gravity 🌍",
    recapWhatText: isAr
      ? "قوة جذب خفية تمتلكها جميع الأجسام؛ تسحبنا الأرض نحو مركزها لكي لا نطير."
      : "An invisible pulling force that all objects possess. The Earth pulls us down so we don't float.",
    recapSpaceText: isAr
      ? "تحدث في الفضاء المتباعد لعدم وجود كواكب ضخمة تسحب الأجسام، فيطفو الرواد بحرية."
      : "Occurs in deep space where no massive planets are nearby, letting astronauts float freely.",
    recapJupText: isAr
      ? "الكواكب الثقيلة جداً تسحب بقوة خارقة، المشتري يجعل حركتك صعبة وبطيئة لشدة جذبه."
      : "Super heavy planets pull with extreme force; Jupiter makes you feel crushed and slow.",
    recapEarthText: isAr
      ? "جاذبية معتدلة مثالية! تسحب جميع الأجسام بنفس التسارع والسرعة في الفراغ."
      : "Perfect mild gravity! It pulls all objects at the exact same acceleration in a vacuum.",
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      {/* 16:9 SCREEN CONTAINER */}
      <div className="w-full aspect-video relative rounded-3xl overflow-hidden bg-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-4 border-slate-800 flex flex-col justify-between">
        
        {/* Parallax Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-b from-[#0c0a09] to-[#040303]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] opacity-50" />
          <div className="absolute w-[220px] h-[220px] rounded-full bg-emerald-500/5 blur-[80px] bottom-[-20px] right-[15%]" />
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
            <div className="text-center flex flex-col items-center justify-center animate-fade-in">
              <div className="text-5xl sm:text-7xl mb-3 animate-bounce">🍎🌎🪐</div>
              <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-accent via-emerald-300 to-teal-400 bg-clip-text text-transparent mb-2" style={{ fontFamily: "var(--font-ibm-plex-arabic), sans-serif" }}>
                {isAr ? "كيف تعمل الجاذبية؟" : "How Gravity Works"}
              </h1>
              <p className="text-xs sm:text-sm text-white/60 font-medium max-w-md">
                {isAr ? activeScene.subTextAr : activeScene.subTextEn}
              </p>
              {!isPlaying && (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="mt-4 px-6 py-2 bg-accent hover:scale-105 transition rounded-2xl text-[#050816] font-bold text-sm cursor-pointer"
                >
                  {isAr ? "ابدأ التجربة 🍎" : "Start Experiment 🍎"}
                </button>
              )}
            </div>
          )}

          {activeScene.showSimulator && (
            <div className="w-full max-w-[480px] h-[190px] sm:h-[210px] relative animate-fade-in flex flex-col justify-between">
              <div className="flex-grow w-full relative">
                <GravitySimulator
                  activeObject={interactiveState}
                  gravitySlider={gravitySlider}
                  isPlaying={isPlaying}
                  locale={locale}
                />
              </div>

              {activeScene.showGravitySlider && (
                <div className="w-full bg-black/60 border border-white/10 backdrop-blur-md rounded-2xl px-4 py-1.5 mt-2 flex items-center gap-3 shadow-lg">
                  <span className="text-[10px] font-bold text-cyan-400 shrink-0">
                    {UI_TXT.gravityZero}
                  </span>
                  
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={gravitySlider}
                    onChange={handleGravityChange}
                    className="w-full h-1.5 bg-gradient-to-r from-cyan-500 via-[#10B981] to-red-500 rounded-lg appearance-none cursor-pointer focus:outline-none accent-yellow-400 shadow-inner"
                  />

                  <span className="text-[10px] font-bold text-red-400 shrink-0">
                    {UI_TXT.gravityHeavy}
                  </span>
                </div>
              )}
            </div>
          )}

          {activeScene.customGraphic === "recap" && (
            <div className="w-full max-w-xl h-full flex flex-col justify-center gap-3">
              <div className="grid grid-cols-4 gap-3">
                {(["whatIsIt", "space", "jupiter", "earthRecap"] as const).map((st) => (
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
                      {st === "whatIsIt" && "🍎"}
                      {st === "space" && "👨‍🚀"}
                      {st === "jupiter" && "🧲"}
                      {st === "earthRecap" && "🌍"}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wide">
                      {st === "whatIsIt" && (isAr ? "الجاذبية" : "Gravity")}
                      {st === "space" && (isAr ? "الفضاء" : "Space")}
                      {st === "jupiter" && (isAr ? "المشتري" : "Jupiter")}
                      {st === "earthRecap" && (isAr ? "الأرض" : "Earth")}
                    </span>
                  </button>
                ))}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 min-h-[60px] flex items-center justify-center text-center shadow-inner">
                {selectedRecapState ? (
                  <div className="animate-fade-in">
                    <h4 className="text-xs font-bold text-accent mb-0.5">
                      {selectedRecapState === "whatIsIt" && UI_TXT.recapWhatTitle}
                      {selectedRecapState === "space" && UI_TXT.recapSpaceTitle}
                      {selectedRecapState === "jupiter" && UI_TXT.recapJupTitle}
                      {selectedRecapState === "earthRecap" && UI_TXT.recapEarthTitle}
                    </h4>
                    <p className="text-[11px] text-white/80 leading-relaxed max-w-md mx-auto">
                      {selectedRecapState === "whatIsIt" && UI_TXT.recapWhatText}
                      {selectedRecapState === "space" && UI_TXT.recapSpaceText}
                      {selectedRecapState === "jupiter" && UI_TXT.recapJupText}
                      {selectedRecapState === "earthRecap" && UI_TXT.recapEarthText}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-white/40 italic">
                    {isAr
                      ? "💡 اضغط على بطاقات الجاذبية السحرية في الأعلى لتلخيص خصائصها!"
                      : "💡 Tap the magic gravity cards above to summarize their properties!"}
                  </p>
                )}
              </div>
            </div>
          )}

          {activeScene.customGraphic === "ending" && (
            <div className="text-center flex flex-col items-center justify-center animate-fade-in w-full h-full">
              <div className="text-5xl mb-3 animate-bounce">🎓🏆🍎</div>
              <h2 className="text-2xl font-extrabold text-accent mb-1">
                {isAr ? "أحسنت يا بطل الجاذبية! 👏" : "Outstanding Gravity Champion! 👏"}
              </h2>
              <p className="text-xs text-white/70 max-w-md mb-4 leading-relaxed font-semibold">
                {isAr
                  ? "لقد فهمت كيفية عمل الجاذبية بنجاح! الآن أصبحت عالماً صغيراً فيزيائياً!"
                  : "You've successfully completed the gravity sandbox! You are now a junior physicist!"}
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
