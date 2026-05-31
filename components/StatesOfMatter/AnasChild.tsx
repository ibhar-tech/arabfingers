"use client";

import React from "react";

interface AnasChildProps {
  mood?: "normal" | "talking" | "waving" | "amazed" | "happy";
  className?: string;
}

export default function AnasChild({ mood = "normal", className = "" }: AnasChildProps) {
  const isTalking = mood === "talking";
  const isWaving = mood === "waving";
  const isAmazed = mood === "amazed";
  const isHappy = mood === "happy";

  return (
    <div className={`relative select-none pointer-events-none transition-transform duration-500 ${className}`}>
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]"
      >
        {/* Shadow under character */}
        <ellipse cx="100" cy="225" rx="38" ry="5.5" fill="rgba(0,0,0,0.18)" />

        {/* --- BODY & CLOTHES --- */}
        <g id="body" className={isHappy ? "animate-[body-jump_0.6s_infinite]" : ""}>
          {/* T-Shirt (Vibrant Orange & Yellow Stripes) */}
          <path d="M60 190 C60 170, 140 170, 140 190 L145 240 L55 240 Z" fill="#F97316" />
          
          {/* Yellow Stripes on Shirt */}
          <path d="M58 200 H142 L143 210 H57 Z" fill="#FBBF24" />
          <path d="M56 220 H144 L145 230 H55 Z" fill="#FBBF24" />

          {/* Cute green collar */}
          <path d="M85 186 C90 196, 110 196, 115 186 Z" fill="#10B981" />
        </g>

        {/* --- LEFT ARM --- */}
        <g id="left-arm">
          {/* Rested Left Arm */}
          <path
            d="M60 188 C48 196, 40 210, 44 228 C46 230, 52 230, 52 225 C49 214, 55 204, 62 198 Z"
            fill="#F97316"
          />
          {/* Left Hand */}
          <circle cx="43" cy="227" r="6" fill="#FDE047" />
        </g>

        {/* --- RIGHT ARM --- */}
        <g
          id="right-arm"
          className={`origin-[135px_185px] transition-transform duration-700 ${
            isWaving
              ? "animate-[wave-child_1.2s_ease-in-out_infinite]"
              : isHappy || isAmazed
              ? "rotate-[-135deg]"
              : "rotate-0"
          }`}
        >
          {/* Right Arm Sleeve */}
          <path
            d="M140 188 C152 196, 160 210, 156 228 C154 230, 148 230, 148 225 C151 214, 145 204, 138 198 Z"
            fill="#F97316"
          />
          {/* Right Hand */}
          <circle cx="157" cy="227" r="6" fill="#FDE047" />
        </g>

        {/* --- HEAD GROUP --- */}
        <g
          id="head"
          className={`origin-[100px_170px] ${
            isHappy
              ? "animate-[head-bob-happy_0.6s_infinite]"
              : isTalking
              ? "animate-[talk-bob-child_0.5s_ease-in-out_infinite]"
              : "animate-[breath-child_4.5s_ease-in-out_infinite]"
          }`}
        >
          {/* Curly Brown Hair (Back outline) */}
          <ellipse cx="72" cy="114" rx="22" ry="22" fill="#78350F" />
          <ellipse cx="128" cy="114" rx="22" ry="22" fill="#78350F" />
          <ellipse cx="100" cy="92" rx="36" ry="26" fill="#78350F" />
          <circle cx="80" cy="92" r="20" fill="#78350F" />
          <circle cx="120" cy="92" r="20" fill="#78350F" />

          {/* Ears */}
          <circle cx="66" cy="142" r="8" fill="#FDE047" />
          <circle cx="134" cy="142" r="8" fill="#FDE047" />

          {/* Face (Chubby child cheeks, yellow skin tone) */}
          <rect x="70" y="105" width="60" height="60" rx="24" fill="#FDE047" />

          {/* Curly Brown Hair (Front curls/Bangs) */}
          <path d="M68 114 Q78 98, 88 108" stroke="#78350F" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M132 114 Q122 98, 112 108" stroke="#78350F" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M85 100 C92 90, 108 90, 115 100" stroke="#78350F" strokeWidth="8" strokeLinecap="round" fill="none" />

          {/* Cute Rosy Cheeks */}
          <circle cx="82" cy="145" r="7" fill="#EF4444" opacity="0.25" />
          <circle cx="118" cy="145" r="7" fill="#EF4444" opacity="0.25" />

          {/* Curious Big Eyes */}
          <g id="eyes" className={isAmazed ? "scale-110 origin-[100px_130px]" : ""}>
            {/* White sclerotic background for big eyes */}
            <circle cx="88" cy="130" r="10" fill="white" />
            <circle cx="112" cy="130" r="10" fill="white" />
            
            {/* Dark pupils looking slightly up-middle (curious) */}
            <circle cx="89" cy="129" r="6" fill="#0F172A" />
            <circle cx="111" cy="129" r="6" fill="#0F172A" />

            {/* Sparkles of curiosity */}
            <circle cx="87" cy="127" r="2" fill="white" />
            <circle cx="109" cy="127" r="2" fill="white" />
            <circle cx="91.5" cy="131.5" r="1" fill="white" />
            <circle cx="113.5" cy="131.5" r="1" fill="white" />
          </g>

          {/* Blinking overlay */}
          <path d="M78 130 H98" stroke="#FDE047" strokeWidth="3" className="animate-[blink-child_5s_infinite]" />
          <path d="M102 130 H122" stroke="#FDE047" strokeWidth="3" className="animate-[blink-child_5s_infinite]" />

          {/* Eyebrows (Highly expressive) */}
          <path
            d="M78 116 Q88 110, 93 118"
            stroke="#451A03"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            className={isAmazed ? "translate-y-[-4px] rotate-[-5deg]" : ""}
          />
          <path
            d="M122 116 Q112 110, 107 118"
            stroke="#451A03"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            className={isAmazed ? "translate-y-[-4px] rotate-[5deg]" : ""}
          />

          {/* Nose (Cute little button nose) */}
          <ellipse cx="100" cy="138" rx="4" ry="2.5" fill="#EF4444" opacity="0.6" />

          {/* Mouth */}
          {isAmazed ? (
            // Amazed open 'O' mouth
            <circle cx="100" cy="151" r="7.5" fill="#991B1B" />
          ) : isTalking ? (
            // Flapping mouth
            <path
              d="M93 147 Q100 155, 107 147 Z"
              fill="#991B1B"
              className="animate-[mouth-flap-child_0.15s_ease-in-out_infinite]"
            />
          ) : isHappy ? (
            // Broad open smile with teeth showing
            <path d="M92 147 C92 158, 108 158, 108 147 Z" fill="#991B1B" />
          ) : (
            // Standard happy smile
            <path d="M93 146 Q100 152, 107 146" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}
        </g>
      </svg>

      <style jsx global>{`
        @keyframes wave-child {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-50deg); }
        }
        @keyframes breath-child {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1.5px); }
        }
        @keyframes talk-bob-child {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-1.2px) rotate(-0.5deg); }
        }
        @keyframes mouth-flap-child {
          0%, 100% { transform: scaleY(0.7); }
          50% { transform: scaleY(1.3); }
        }
        @keyframes blink-child {
          0%, 95%, 100% { opacity: 0; }
          97.5% { opacity: 1; }
        }
        @keyframes body-jump {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes head-bob-happy {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-8px) scaleY(1.02); }
        }
      `}</style>
    </div>
  );
}
