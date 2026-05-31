"use client";

import React from "react";

interface DrHakimProps {
  mood?: "normal" | "talking" | "waving" | "thinking" | "happy";
  className?: string;
}

export default function DrHakim({ mood = "normal", className = "" }: DrHakimProps) {
  // Determine CSS classes for different animated parts based on the mood
  const isTalking = mood === "talking";
  const isWaving = mood === "waving";
  const isThinking = mood === "thinking";
  const isHappy = mood === "happy";

  return (
    <div className={`relative select-none pointer-events-none transition-transform duration-500 ${className}`}>
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
      >
        {/* Shadow under character */}
        <ellipse cx="100" cy="225" rx="45" ry="6" fill="rgba(0,0,0,0.2)" />

        {/* --- BODY & LAB COAT --- */}
        <g id="body">
          {/* Shoulders / Coat back */}
          <path d="M55 190 C55 160, 145 160, 145 190 L155 240 L45 240 Z" fill="#E2E8F0" />
          
          {/* Scientist Shirt (Green) */}
          <path d="M90 162 L110 162 L115 190 L85 190 Z" fill="#10B981" />
          {/* Shirt tie or collar */}
          <path d="M100 162 L95 180 L100 188 L105 180 Z" fill="#EF4444" />
          
          {/* Lab Coat Collars (V-neck opening) */}
          <path d="M55 170 L90 162 L90 200 L50 215 Z" fill="#F1F5F9" />
          <path d="M145 170 L110 162 L110 200 L150 215 Z" fill="#F1F5F9" />
          
          {/* Pockets & Buttons */}
          <rect x="65" y="195" width="20" height="22" rx="3" fill="#CBD5E1" />
          <circle cx="100" cy="195" r="4" fill="#64748B" />
          <circle cx="100" cy="215" r="4" fill="#64748B" />
        </g>

        {/* --- ARMS --- */}
        {/* Left Arm (Holding lab tube or resting) */}
        <g id="left-arm">
          <path
            d="M55 175 C40 185, 30 200, 35 220 C37 225, 48 225, 48 220 C45 205, 52 195, 60 190 Z"
            fill="#E2E8F0"
          />
          {/* Left Hand */}
          <circle cx="34" cy="221" r="7" fill="#FDE047" />
        </g>

        {/* Right Arm (Waving or Pointing) */}
        <g
          id="right-arm"
          className={`origin-[140px_175px] transition-transform duration-700 ${
            isWaving
              ? "animate-[wave_1.5s_ease-in-out_infinite]"
              : isTalking || isHappy
              ? "rotate-[-45deg]"
              : isThinking
              ? "rotate-[20deg]"
              : "rotate-0"
          }`}
        >
          {/* Right Arm Coat sleeve */}
          <path
            d="M145 175 C160 185, 175 195, 170 215 C168 220, 158 222, 158 215 C160 202, 150 192, 140 190 Z"
            fill="#E2E8F0"
          />
          {/* Right Hand (yellow gloves / cute skin) */}
          <circle cx="171" cy="216" r="7" fill="#FDE047" />
          {/* Sparkles if waving/explaining */}
          {(isWaving || isHappy) && (
            <path
              d="M178 200 L181 205 L186 206 L181 211 L182 216 L178 212 L173 216 L174 211 L169 206 L174 205 Z"
              fill="#F59E0B"
              className="animate-ping opacity-75 origin-[178px_208px] scale-75"
            />
          )}
        </g>

        {/* --- HEAD GROUP (breaths slightly) --- */}
        <g
          id="head"
          className={`origin-[100px_160px] ${
            isTalking ? "animate-[talk-bob_0.6s_ease-in-out_infinite]" : "animate-[breath_4s_ease-in-out_infinite]"
          }`}
        >
          {/* Large fluffy White Hair (Back) */}
          <circle cx="70" cy="110" r="28" fill="#F8FAFC" />
          <circle cx="130" cy="110" r="28" fill="#F8FAFC" />
          <circle cx="100" cy="85" r="32" fill="#F8FAFC" />
          <circle cx="65" cy="85" r="25" fill="#F8FAFC" />
          <circle cx="135" cy="85" r="25" fill="#F8FAFC" />

          {/* Ears */}
          <circle cx="62" cy="130" r="10" fill="#FDE047" />
          <circle cx="138" cy="130" r="10" fill="#FDE047" />

          {/* Face (Round, friendly, yellow skin tone) */}
          <rect x="68" y="95" width="64" height="65" rx="32" fill="#FDE047" />

          {/* Cute Fluffy white mustache / beard */}
          <path d="M72 152 C72 178, 128 178, 128 152 C115 156, 85 156, 72 152 Z" fill="#F8FAFC" />
          <ellipse cx="100" cy="148" rx="16" ry="7" fill="#F8FAFC" />

          {/* Eyebrows */}
          <path
            d="M75 108 Q85 98, 90 108"
            stroke="#F8FAFC"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            className={`transition-transform duration-500 ${isThinking ? "translate-y-[-3px] rotate-[-5deg]" : ""}`}
          />
          <path
            d="M125 108 Q115 98, 110 108"
            stroke="#F8FAFC"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            className={`transition-transform duration-500 ${isThinking ? "translate-y-[-5px] rotate-[10deg]" : ""}`}
          />

          {/* Eyes (Cute black buttons) */}
          <circle cx="86" cy="118" r="4.5" fill="#0F172A" />
          <circle cx="114" cy="118" r="4.5" fill="#0F172A" />
          {/* Eye shines */}
          <circle cx="84.5" cy="116.5" r="1.5" fill="white" />
          <circle cx="112.5" cy="116.5" r="1.5" fill="white" />

          {/* Blinking overlay */}
          <path d="M81 118 L91 118" stroke="#FDE047" strokeWidth="2.5" className="animate-[blink_4s_infinite]" />
          <path d="M109 118 L119 118" stroke="#FDE047" strokeWidth="2.5" className="animate-[blink_4s_infinite]" />

          {/* Friendly Red Nose */}
          <ellipse cx="100" cy="124" rx="6" ry="4" fill="#EF4444" opacity="0.85" />

          {/* Scientist Round Glasses */}
          <circle cx="84" cy="118" r="15" stroke="#E2E8F0" strokeWidth="3" fill="rgba(255,255,255,0.15)" />
          <circle cx="116" cy="118" r="15" stroke="#E2E8F0" strokeWidth="3" fill="rgba(255,255,255,0.15)" />
          <path d="M99 118 L101 118" stroke="#E2E8F0" strokeWidth="3" />
          
          {/* Glasses shine (animates reflection) */}
          <path d="M72 110 L94 130" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
          <path d="M104 110 L126 130" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />

          {/* Animated Mouth */}
          {isTalking ? (
            // Open mouth talking
            <path
              d="M92 142 Q100 152, 108 142 Z"
              fill="#991B1B"
              className="animate-[mouth-flap_0.15s_ease-in-out_infinite]"
            />
          ) : isHappy ? (
            // Huge smile
            <path d="M90 141 Q100 150, 110 141" stroke="#991B1B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          ) : isThinking ? (
            // Neutral slightly squiggly line
            <path d="M93 143 Q100 145, 107 141" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" fill="none" />
          ) : (
            // Cute little smile
            <path d="M92 142 Q100 147, 108 142" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}

          {/* Lab Coat collar details on neck */}
          <path d="M92 159 L108 159 L100 168 Z" fill="#E2E8F0" />
        </g>
      </svg>

      {/* Embedded CSS for custom keyframe animations */}
      <style jsx global>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-30deg); }
        }
        @keyframes breath {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes talk-bob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-1.5px) rotate(0.5deg); }
        }
        @keyframes mouth-flap {
          0%, 100% { transform: scaleY(0.7); }
          50% { transform: scaleY(1.3); }
        }
        @keyframes blink {
          0%, 96%, 100% { opacity: 0; }
          98% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
