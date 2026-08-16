"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import {
  CanvasTexture,
  type Mesh,
  type Group,
  DoubleSide,
} from "three";
import { HERO_LETTERS, type HeroLetter } from "@/lib/heroLetters";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * Creates high-resolution canvas texture for any Arabic letter with exact
 * mathematical & visual centering using typographic bounding box metrics.
 */
function createFrontLetterTexture(letter: HeroLetter): CanvasTexture {
  if (typeof window === "undefined") {
    return new CanvasTexture(undefined as unknown as HTMLCanvasElement);
  }
  const size = 1024;
  const canvas = window.document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, size, size);

    // Initial font setting
    let fontSize = 720;
    ctx.font = `bold ${fontSize}px 'Baloo Bhaijaan 2', 'IBM Plex Sans Arabic', 'Amiri', 'Noto Naskh Arabic', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Measure exact visual bounding box to ensure bold, perfectly centered glyph
    let metrics = ctx.measureText(letter.ar);
    const glyphWidth = metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft;
    const glyphHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    // Scale font size so every letter fills 72% to 78% of the canvas
    const maxDimension = Math.max(glyphWidth, glyphHeight);
    const targetSize = size * 0.74;
    if (maxDimension > 0) {
      fontSize = Math.round(fontSize * (targetSize / maxDimension));
      fontSize = Math.max(480, Math.min(840, fontSize));
      ctx.font = `bold ${fontSize}px 'Baloo Bhaijaan 2', 'IBM Plex Sans Arabic', 'Amiri', 'Noto Naskh Arabic', sans-serif`;
      metrics = ctx.measureText(letter.ar);
    }

    // Precise centering offset
    const xOffset = (metrics.actualBoundingBoxLeft - metrics.actualBoundingBoxRight) / 2;
    const yOffset = (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2;
    const drawX = size / 2 + xOffset;
    const drawY = size / 2 + yOffset;

    // Soft deep drop shadow for realistic 3D tactile elevation
    ctx.shadowColor = "rgba(10, 15, 30, 0.45)";
    ctx.shadowBlur = 32;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 24;

    // Outer thick bright sticker rim
    ctx.lineWidth = 36;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "#FFFFFF";
    ctx.strokeText(letter.ar, drawX, drawY);

    // Inner dark crisp ink glyph
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#1E2430";
    ctx.fillText(letter.ar, drawX, drawY);

    // Glossy top specular reflection on glyph
    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
    ctx.strokeText(letter.ar, drawX, drawY - 4);
  }

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** Creates back texture with English letter and name for 360° spin discovery */
function createBackLetterTexture(letter: HeroLetter): CanvasTexture {
  if (typeof window === "undefined") {
    return new CanvasTexture(undefined as unknown as HTMLCanvasElement);
  }
  const size = 1024;
  const canvas = window.document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, size, size);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // English letter
    ctx.font = "900 480px 'Nunito', 'Fredoka', sans-serif";
    ctx.shadowColor = "rgba(10, 15, 30, 0.35)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 16;
    ctx.lineWidth = 28;
    ctx.strokeStyle = "#FFFFFF";
    ctx.strokeText(letter.en, size / 2, size / 2 - 60);

    ctx.shadowColor = "transparent";
    ctx.fillStyle = "#1E2430";
    ctx.fillText(letter.en, size / 2, size / 2 - 60);

    // Name badge
    ctx.font = "bold 130px 'Nunito', 'Fredoka', sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(letter.name, size / 2, size / 2 + 240);
  }

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** 3D Shiny Candy Pearl for Nuqtas & Ambient Floating Beads */
function CandyBead({
  position,
  color,
  scale = 1,
  speed = 1.8,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.1;
    ref.current.rotation.y = t * 0.6;
  });

  return (
    <mesh ref={ref} position={position} scale={scale} castShadow>
      <sphereGeometry args={[0.32, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.15}
        metalness={0.06}
        clearcoat={1.0}
        clearcoatRoughness={0.08}
        sheen={0.9}
        sheenColor="#ffffff"
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

/** 3D Interactive Toy Letter Base with Spring Physics */
function ToyLetterMesh({
  letter,
  reduced,
  bounceTrigger,
  onLetterClick,
}: {
  letter: HeroLetter;
  reduced: boolean;
  bounceTrigger: number;
  onLetterClick?: () => void;
}) {
  const groupRef = useRef<Group>(null);
  const frontTexture = useMemo(() => createFrontLetterTexture(letter), [letter]);
  const backTexture = useMemo(() => createBackLetterTexture(letter), [letter]);

  // Spring physics variables for juicy squash & stretch
  const spring = useRef({
    scaleY: 1,
    scaleXZ: 1,
    velY: 0,
    velXZ: 0,
    spinVel: 0,
    rotY: 0,
  });

  // Trigger squash bounce on letter switch or click
  useEffect(() => {
    spring.current.scaleY = 0.68;
    spring.current.scaleXZ = 1.32;
    spring.current.spinVel = 6.28; // One joyful full 360 spin
  }, [letter.id, bounceTrigger]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.05);

    // Spring physics integration (stiffness = 220, damping = 14)
    const k = 220;
    const d = 14;

    const forceY = (1 - spring.current.scaleY) * k - spring.current.velY * d;
    spring.current.velY += forceY * dt;
    spring.current.scaleY += spring.current.velY * dt;

    const forceXZ = (1 - spring.current.scaleXZ) * k - spring.current.velXZ * d;
    spring.current.velXZ += forceXZ * dt;
    spring.current.scaleXZ += spring.current.velXZ * dt;

    // Spin damping
    spring.current.rotY += spring.current.spinVel * dt;
    spring.current.spinVel *= Math.exp(-4.2 * dt);

    // Apply scale
    groupRef.current.scale.set(
      spring.current.scaleXZ,
      spring.current.scaleY,
      spring.current.scaleXZ,
    );

    // Gentle floating idle wobble
    if (!reduced) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = spring.current.rotY + Math.sin(t * 0.8) * 0.18;
      groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.05;
    }
  });

  // Calculate dynamic 3D dot (nuqta) positions
  const dotBeads = useMemo(() => {
    const { count, position } = letter.dots;
    if (count === 0 || position === "none") return [];

    const beads: Array<{ pos: [number, number, number]; scale: number }> = [];

    if (position === "above") {
      if (count === 1) {
        beads.push({ pos: [0, 2.05, 0.4], scale: 1.15 });
      } else if (count === 2) {
        beads.push({ pos: [-0.42, 2.05, 0.4], scale: 1.05 });
        beads.push({ pos: [0.42, 2.05, 0.4], scale: 1.05 });
      } else if (count === 3) {
        beads.push({ pos: [-0.42, 1.95, 0.4], scale: 0.95 });
        beads.push({ pos: [0.42, 1.95, 0.4], scale: 0.95 });
        beads.push({ pos: [0, 2.45, 0.4], scale: 0.95 });
      }
    } else if (position === "below") {
      if (count === 1) {
        beads.push({ pos: [0, -2.05, 0.4], scale: 1.15 });
      } else if (count === 2) {
        beads.push({ pos: [-0.42, -2.05, 0.4], scale: 1.05 });
        beads.push({ pos: [0.42, -2.05, 0.4], scale: 1.05 });
      }
    } else if (position === "center") {
      beads.push({ pos: [0.1, -0.25, 0.42], scale: 1.15 });
    }

    return beads;
  }, [letter]);

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onLetterClick?.();
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      {/* 3D Glossy Candy Tablet Base (Solid Vibrant Color) */}
      <RoundedBox
        args={[3.4, 3.6, 0.55]}
        radius={0.55}
        smoothness={10}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={letter.color}
          roughness={0.16}
          metalness={0.04}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          sheen={0.8}
          sheenColor="#ffffff"
          emissive={letter.color}
          emissiveIntensity={0.18}
        />
      </RoundedBox>

      {/* Front Face: Large, Bold, Perfectly Centered Arabic Letter */}
      <mesh position={[0, 0, 0.285]}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshPhysicalMaterial
          map={frontTexture}
          transparent={true}
          roughness={0.12}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
          depthWrite={false}
          side={DoubleSide}
        />
      </mesh>

      {/* Back Face: English letter + Phonics name for 360° rotation */}
      <mesh position={[0, 0, -0.285]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[3.2, 3.2]} />
        <meshPhysicalMaterial
          map={backTexture}
          transparent={true}
          roughness={0.12}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
          depthWrite={false}
          side={DoubleSide}
        />
      </mesh>

      {/* Dynamic 3D Nuqta (Dot) Beads */}
      {dotBeads.map((b, idx) => (
        <CandyBead
          key={`${letter.id}-dot-${idx}`}
          position={b.pos}
          color={letter.secondaryColor}
          scale={b.scale}
        />
      ))}
    </group>
  );
}

function Scene({
  letter,
  reduced,
  bounceTrigger,
  onLetterClick,
}: {
  letter: HeroLetter;
  reduced: boolean;
  bounceTrigger: number;
  onLetterClick?: () => void;
}) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current || reduced) return;
    // Smooth parallax toward pointer
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.35 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-y * 0.25 - group.current.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      {/* Studio lighting for bright, vibrant 3D candy colors */}
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color="#ffffff" castShadow />
      <directionalLight position={[-5, -2, 4]} intensity={1.2} color="#bae6fd" />
      <directionalLight position={[0, -5, -3]} intensity={0.8} color="#fde047" />
      <pointLight position={[0, 4, 4]} intensity={1.2} color="#ffffff" />

      {/* Floating 3D Toy Center */}
      <Float
        speed={reduced ? 0 : 1.4}
        rotationIntensity={reduced ? 0 : 0.18}
        floatIntensity={reduced ? 0 : 0.45}
      >
        <ToyLetterMesh
          letter={letter}
          reduced={reduced}
          bounceTrigger={bounceTrigger}
          onLetterClick={onLetterClick}
        />
      </Float>

      {/* Ambient Orbiting Candy Pearls */}
      <Float speed={reduced ? 0 : 2.2} floatIntensity={reduced ? 0 : 1.0}>
        <CandyBead position={[2.1, 1.4, -0.3]} color={letter.secondaryColor} scale={0.75} speed={1.2} />
      </Float>
      <Float speed={reduced ? 0 : 1.8} floatIntensity={reduced ? 0 : 0.85}>
        <CandyBead position={[-2.1, -1.2, 0.2]} color={letter.color} scale={0.85} speed={1.5} />
      </Float>
      <Float speed={reduced ? 0 : 2.0} floatIntensity={reduced ? 0 : 0.95}>
        <CandyBead position={[1.9, -1.5, 0.4]} color="#ffb22e" scale={0.65} speed={1.7} />
      </Float>
      <Float speed={reduced ? 0 : 1.6} floatIntensity={reduced ? 0 : 0.75}>
        <CandyBead position={[-1.8, 1.6, -0.2]} color="#0f8c8c" scale={0.7} speed={1.3} />
      </Float>

      {/* 3D Star Sparkles in matching letter theme color */}
      <Sparkles
        count={22}
        scale={4.8}
        size={3.0}
        speed={0.4}
        opacity={0.75}
        color={letter.color}
      />
    </group>
  );
}

export type HeroGlyphProps = {
  letter?: HeroLetter;
  onLetterClick?: () => void;
};

export default function HeroGlyph({
  letter = HERO_LETTERS[0],
  onLetterClick,
}: HeroGlyphProps) {
  const reduced = useReducedMotion();
  const [bounceTrigger, setBounceTrigger] = useState(0);

  const handleClick = useCallback(() => {
    setBounceTrigger((b) => b + 1);
    onLetterClick?.();
  }, [onLetterClick]);

  return (
    <div className="relative h-full w-full select-none cursor-pointer">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        aria-label={`3D Arabic letter ${letter.ar} (${letter.name})`}
      >
        <Scene
          letter={letter}
          reduced={reduced}
          bounceTrigger={bounceTrigger}
          onLetterClick={handleClick}
        />
      </Canvas>
    </div>
  );
}
