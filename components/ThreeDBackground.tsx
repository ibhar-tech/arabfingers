"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { MathUtils, Shape, ExtrudeGeometry, type Mesh, type BufferGeometry } from "three";
import { themes, type ThemeName } from "@/lib/themes";
import { useAppStore } from "@/store/useAppStore";

// Friendly, instantly-recognizable kid shapes — balloons, stars, donuts, blocks, gems.
type GeometryKind = "balloon" | "star" | "donut" | "block" | "gem";

type SceneObject = {
  id: string;
  color: string;
  geometry: GeometryKind;
  position: [number, number, number];
  scale: number;
  speed: number;
  ring: boolean;
};

type FloatingShapeProps = {
  object: SceneObject;
  pulseToken: number;
  reduceMotion: boolean;
};

const geometryKinds: GeometryKind[] = ["balloon", "star", "donut", "block", "gem"];

function mulberry32(seed: number) {
  return function random() {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

// Extruded 5-point star, built once and shared.
function makeStar(): BufferGeometry {
  const s = new Shape();
  const outer = 0.85;
  const inner = 0.36;
  const pts = 5;
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i * Math.PI) / pts - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  s.closePath();
  return new ExtrudeGeometry(s, {
    depth: 0.32,
    bevelEnabled: true,
    bevelThickness: 0.14,
    bevelSize: 0.12,
    bevelSegments: 4,
    curveSegments: 12,
  }).center();
}

const themeObjectCounts: Record<ThemeName, number> = {
  daylight: 12,
  space: 13,
  desert: 10,
  jungle: 12,
  underwater: 11,
  ramadan: 10,
};

function buildObjects(themeName: ThemeName, subtle: boolean) {
  const random = mulberry32(7643);
  const palette = themes[themeName].palette;
  const count = subtle ? 4 : themeObjectCounts[themeName];

  return Array.from({ length: count }, (_, index) => {
    const geometry = geometryKinds[Math.floor(random() * geometryKinds.length)];
    const x = random() * 11 - 5.5;
    const y = random() * 7.5 - 3.75;
    const z = random() * -4.5;

    return {
      id: `shape-${index}`,
      geometry,
      color: palette[index % palette.length],
      position: [x, y, z] as [number, number, number],
      scale: 0.6 + random() * 0.8,
      speed: subtle ? 0.35 + random() * 0.45 : 0.6 + random() * 1.0,
      ring: random() > 0.65, // only a few get a fun accent ring — not every shape
    };
  });
}

function Geometry({ kind, star }: { kind: GeometryKind; star: BufferGeometry }) {
  switch (kind) {
    case "balloon":
      return <sphereGeometry args={[0.8, 32, 32]} />;
    case "star":
      return <primitive object={star} attach="geometry" />;
    case "donut":
      return <torusGeometry args={[0.62, 0.3, 20, 40]} />;
    case "block":
      return <boxGeometry args={[1.05, 1.05, 1.05, 2, 2, 2]} />;
    case "gem":
      return <octahedronGeometry args={[0.92, 0]} />;
    default:
      return null;
  }
}

function FloatingShape({ object, pulseToken, reduceMotion }: FloatingShapeProps) {
  const meshRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);
  const pulseRef = useRef(1);
  const spinBoost = useRef(0);

  const star = useMemo(() => makeStar(), []);

  useEffect(() => {
    pulseRef.current = 1.5;
    if (pulseToken > 0) spinBoost.current = 10;
  }, [pulseToken]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    pulseRef.current = MathUtils.damp(pulseRef.current, 1, reduceMotion ? 6 : 9, delta);
    spinBoost.current = MathUtils.damp(spinBoost.current, 0, reduceMotion ? 12 : 4.2, delta);

    mesh.scale.setScalar(object.scale * pulseRef.current);
    mesh.rotation.x += (object.speed * 0.15 + (reduceMotion ? 0 : spinBoost.current)) * delta;
    mesh.rotation.y += (object.speed * 0.25 + (reduceMotion ? 0 : spinBoost.current * 0.7)) * delta;

    const ring = ringRef.current;
    if (ring && !reduceMotion) ring.rotation.z += (object.speed * 0.8 + spinBoost.current) * delta;
  });

  return (
    <Float
      speed={reduceMotion ? Math.max(0.2, object.speed * 0.25) : object.speed}
      rotationIntensity={reduceMotion ? 0.15 : 1.2}
      floatIntensity={reduceMotion ? 0.25 : 2.2}
    >
      <group position={object.position}>
        <mesh ref={meshRef}>
          <Geometry kind={object.geometry} star={star} />
          {/* Bright, glossy candy material — clear color, soft glow, no murky glass. */}
          <meshPhysicalMaterial
            color={object.color}
            roughness={0.34}
            metalness={0}
            clearcoat={0.7}
            clearcoatRoughness={0.25}
            sheen={0.5}
            sheenColor="#ffffff"
            emissive={object.color}
            emissiveIntensity={0.18}
          />
          {/* tiny tie on balloons */}
          {object.geometry === "balloon" && (
            <mesh position={[0, -0.85, 0]} scale={0.32}>
              <coneGeometry args={[0.5, 0.7, 12]} />
              <meshStandardMaterial color={object.color} roughness={0.4} />
            </mesh>
          )}
        </mesh>

        {object.ring && !reduceMotion && (
          <mesh ref={ringRef} rotation={[Math.PI / 3, Math.PI / 6, 0]} scale={1.4}>
            <torusGeometry args={[0.95, 0.05, 12, 36]} />
            <meshStandardMaterial color="#fff7ec" roughness={0.3} metalness={0.1} emissive="#fff7ec" emissiveIntensity={0.3} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

export default function ThreeDBackground({ subtle = false, className = "z-0" }: { subtle?: boolean; className?: string }) {
  const theme = useAppStore((state) => state.theme);
  const reduceMotion = useAppStore((state) => state.reduceMotion);
  const currentKey = useAppStore((state) => state.currentKey);
  const [pulseTokens, setPulseTokens] = useState<Record<string, number>>({});

  const objects = useMemo(() => buildObjects(theme, subtle), [theme, subtle]);

  useEffect(() => {
    if (!currentKey) return;

    const sceneX = (currentKey.normalizedX - 0.5) * 11;
    const sceneY = (0.5 - currentKey.normalizedY) * 7;

    const nearest = [...objects]
      .sort((left, right) => {
        const ld = Math.hypot(left.position[0] - sceneX, left.position[1] - sceneY);
        const rd = Math.hypot(right.position[0] - sceneX, right.position[1] - sceneY);
        return ld - rd;
      })
      .slice(0, 2);

    setPulseTokens((previous) => {
      const next = { ...previous };
      for (const item of nearest) next[item.id] = currentKey.id;
      return next;
    });
  }, [currentKey, objects]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none print:hidden transition-opacity duration-700 ${className} ${
        subtle ? "opacity-35" : "opacity-95"
      }`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.4]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
      >
        {/* Bright, cheerful daylight — shapes read as clear candy colors, not murky metal. */}
        <hemisphereLight args={["#ffffff", "#ffd9a8", 1.15]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} color="#ffffff" />
        <pointLight position={[-6, -3, 4]} intensity={0.7} color="#bfe9ff" />
        {!reduceMotion && (
          <Sparkles count={subtle ? 18 : 50} scale={[12, 8, 5]} size={3} speed={0.4} opacity={0.7} color="#ffffff" />
        )}
        {objects.map((object) => (
          <FloatingShape
            key={object.id}
            object={object}
            pulseToken={pulseTokens[object.id] ?? 0}
            reduceMotion={reduceMotion}
          />
        ))}
      </Canvas>
    </div>
  );
}
