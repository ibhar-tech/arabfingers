"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import {
  CanvasTexture,
  type Mesh,
  type Group,
  type MeshPhysicalMaterial as ThreeMeshPhysicalMaterial,
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
 * Creates high-resolution canvas texture for any Arabic letter with crisp
 * typography, inner bevel gradient, and tactile toy clarity.
 */
function createLetterTexture(letter: HeroLetter): CanvasTexture {
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

    // Subtle radial highlight behind glyph for depth
    const radGlow = ctx.createRadialGradient(size / 2, size / 2, 80, size / 2, size / 2, size / 2);
    radGlow.addColorStop(0, "rgba(255, 255, 255, 0.35)");
    radGlow.addColorStop(0.7, "rgba(255, 255, 255, 0.08)");
    radGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = radGlow;
    ctx.fillRect(0, 0, size, size);

    // Render large Arabic letter with rich shadow and crisp outline
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold 580px 'Baloo Bhaijaan 2', 'IBM Plex Sans Arabic', 'Amiri', 'Noto Naskh Arabic', sans-serif`;

    // Drop shadow
    ctx.shadowColor = "rgba(18, 24, 38, 0.35)";
    ctx.shadowBlur = 36;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 24;

    // Ink letter stroke
    ctx.fillStyle = "#1e2229";
    ctx.fillText(letter.ar, size / 2, size / 2 + 30);

    // Clear shadow for crisp inner highlight
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Inner bright rim
    ctx.lineWidth = 14;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.strokeText(letter.ar, size / 2, size / 2 + 30);
  }

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** 3D Shiny Candy Bead for Nuqtas & Ambient Pearls */
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
    ref.current.position.y = position[1] + Math.sin(t) * 0.08;
    ref.current.rotation.y = t * 0.5;
  });

  return (
    <mesh ref={ref} position={position} scale={scale} castShadow>
      <sphereGeometry args={[0.26, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.18}
        metalness={0.08}
        clearcoat={1}
        clearcoatRoughness={0.1}
        sheen={0.8}
        sheenColor="#ffffff"
        emissive={color}
        emissiveIntensity={0.2}
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
  const matRef = useRef<ThreeMeshPhysicalMaterial>(null);
  const texture = useMemo(() => createLetterTexture(letter), [letter]);

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
    spring.current.scaleY = 0.72;
    spring.current.scaleXZ = 1.28;
    spring.current.spinVel = 6.28; // One joyful full 360 spin
  }, [letter.id, bounceTrigger]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.05);

    // Spring physics integration (stiffness = 180, damping = 12)
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
    spring.current.spinVel *= Math.exp(-4 * dt);

    // Apply scale
    groupRef.current.scale.set(
      spring.current.scaleXZ,
      spring.current.scaleY,
      spring.current.scaleXZ,
    );

    // Gentle floating idle wobble
    if (!reduced) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = spring.current.rotY + Math.sin(t * 0.8) * 0.15;
      groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.04;
    }
  });

  // Calculate dynamic 3D dot (nuqta) positions based on letter configuration
  const dotBeads = useMemo(() => {
    const { count, position } = letter.dots;
    if (count === 0 || position === "none") return [];

    const beads: Array<{ pos: [number, number, number]; scale: number }> = [];

    if (position === "above") {
      if (count === 1) {
        beads.push({ pos: [0, 1.48, 0.36], scale: 1.05 });
      } else if (count === 2) {
        beads.push({ pos: [-0.34, 1.48, 0.36], scale: 0.95 });
        beads.push({ pos: [0.34, 1.48, 0.36], scale: 0.95 });
      } else if (count === 3) {
        beads.push({ pos: [-0.34, 1.38, 0.36], scale: 0.9 });
        beads.push({ pos: [0.34, 1.38, 0.36], scale: 0.9 });
        beads.push({ pos: [0, 1.82, 0.36], scale: 0.9 });
      }
    } else if (position === "below") {
      if (count === 1) {
        beads.push({ pos: [0, -1.48, 0.36], scale: 1.05 });
      } else if (count === 2) {
        beads.push({ pos: [-0.34, -1.48, 0.36], scale: 0.95 });
        beads.push({ pos: [0.34, -1.48, 0.36], scale: 0.95 });
      }
    } else if (position === "center") {
      beads.push({ pos: [0.08, -0.32, 0.36], scale: 1.05 });
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
      {/* Main 3D Rounded Candy Tablet / Pillow */}
      <RoundedBox
        args={[2.8, 3.2, 0.6]}
        radius={0.42}
        smoothness={8}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          ref={matRef}
          color={letter.color}
          map={texture}
          roughness={0.24}
          metalness={0.06}
          clearcoat={1.0}
          clearcoatRoughness={0.12}
          sheen={0.7}
          sheenColor={letter.secondaryColor}
          emissive={letter.color}
          emissiveIntensity={0.14}
        />
      </RoundedBox>

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
    // Parallax toward cursor / touch pointer with smooth damping
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.35 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-y * 0.25 - group.current.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      {/* Studio 3-point lighting setup for rich toy speculars */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#fff4e0" castShadow />
      <directionalLight position={[-5, -3, 3]} intensity={0.8} color="#9fe0df" />
      <directionalLight position={[0, -5, -3]} intensity={0.5} color="#ffd1dc" />
      <pointLight position={[0, 4, 3]} intensity={0.9} color="#ffffff" />

      {/* Floating 3D Toy Center */}
      <Float
        speed={reduced ? 0 : 1.5}
        rotationIntensity={reduced ? 0 : 0.2}
        floatIntensity={reduced ? 0 : 0.5}
      >
        <ToyLetterMesh
          letter={letter}
          reduced={reduced}
          bounceTrigger={bounceTrigger}
          onLetterClick={onLetterClick}
        />
      </Float>

      {/* Ambient Orbiting Candy Pearls */}
      <Float speed={reduced ? 0 : 2.4} floatIntensity={reduced ? 0 : 1.1}>
        <CandyBead position={[1.85, 1.2, -0.3]} color={letter.secondaryColor} scale={0.7} speed={1.2} />
      </Float>
      <Float speed={reduced ? 0 : 1.9} floatIntensity={reduced ? 0 : 0.9}>
        <CandyBead position={[-1.85, -1.0, 0.2]} color={letter.color} scale={0.8} speed={1.5} />
      </Float>
      <Float speed={reduced ? 0 : 2.1} floatIntensity={reduced ? 0 : 1.0}>
        <CandyBead position={[1.65, -1.35, 0.4]} color="#ffb22e" scale={0.6} speed={1.8} />
      </Float>
      <Float speed={reduced ? 0 : 1.7} floatIntensity={reduced ? 0 : 0.8}>
        <CandyBead position={[-1.6, 1.4, -0.2]} color="#0f8c8c" scale={0.65} speed={1.4} />
      </Float>

      {/* 3D Star Sparkles in matching letter theme color */}
      <Sparkles
        count={20}
        scale={4.5}
        size={2.8}
        speed={0.45}
        opacity={0.7}
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
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 7.2], fov: 40 }}
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
