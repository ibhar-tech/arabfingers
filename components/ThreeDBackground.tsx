"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshWobbleMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { MathUtils, type Mesh } from "three";
import { themes, type ThemeName } from "@/lib/themes";
import { useAppStore } from "@/store/useAppStore";

type GeometryKind = "sphere" | "box" | "torus" | "octahedron" | "cone";

type SceneObject = {
  id: string;
  color: string;
  geometry: GeometryKind;
  position: [number, number, number];
  scale: number;
  speed: number;
};

type FloatingShapeProps = {
  object: SceneObject;
  pulseToken: number;
  reduceMotion: boolean;
};

const geometryKinds: GeometryKind[] = [
  "sphere",
  "box",
  "torus",
  "octahedron",
  "cone",
];

function mulberry32(seed: number) {
  return function random() {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const themeObjectCounts: Record<ThemeName, number> = {
  space: 14,
  desert: 10,
  jungle: 12,
  underwater: 11,
  ramadan: 10,
};

function buildObjects(themeName: ThemeName) {
  const random = mulberry32(7643);
  const palette = themes[themeName].palette;
  const count = themeObjectCounts[themeName];

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
      scale: 0.55 + random() * 0.85,
      speed: 0.6 + random() * 1.2,
    };
  });
}

function Geometry({ kind }: { kind: GeometryKind }) {
  switch (kind) {
    case "sphere":
      return <sphereGeometry args={[0.78, 16, 16]} />;
    case "box":
      return <boxGeometry args={[1.1, 1.1, 1.1]} />;
    case "torus":
      return <torusGeometry args={[0.68, 0.22, 12, 24]} />;
    case "octahedron":
      return <octahedronGeometry args={[0.85, 0]} />;
    case "cone":
      return <coneGeometry args={[0.8, 1.3, 16]} />;
    default:
      return null;
  }
}

function FloatingShape({
  object,
  pulseToken,
  reduceMotion,
}: FloatingShapeProps) {
  const meshRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);
  const pulseRef = useRef(1);

  // Dynamic feedback parameters for key-smashing excitement
  const spinBoost = useRef(0);
  const glowBoost = useRef(0);
  const wobbleBoost = useRef(0);

  useEffect(() => {
    pulseRef.current = 1.6;
    if (pulseToken > 0) {
      spinBoost.current = 14.0;    // Spins rapidly like a wobbly top
      glowBoost.current = 3.5;     // Lights up intensely inside its shell
      wobbleBoost.current = 0.75;  // Wiggles playfully in excitement
    }
  }, [pulseToken]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    // Dampen scaling and boost factors back to normal
    pulseRef.current = MathUtils.damp(
      pulseRef.current,
      1,
      reduceMotion ? 6 : 9,
      delta,
    );

    spinBoost.current = MathUtils.damp(spinBoost.current, 0, reduceMotion ? 10 : 4.2, delta);
    glowBoost.current = MathUtils.damp(glowBoost.current, 0, reduceMotion ? 12 : 3.5, delta);
    wobbleBoost.current = MathUtils.damp(wobbleBoost.current, 0, reduceMotion ? 12 : 3.8, delta);

    mesh.scale.setScalar(object.scale * pulseRef.current);

    // Apply rotation including standard drift and the keypress spin boost
    mesh.rotation.x += (object.speed * 0.15 + (reduceMotion ? 0 : spinBoost.current)) * delta;
    mesh.rotation.y += (object.speed * 0.25 + (reduceMotion ? 0 : spinBoost.current * 0.7)) * delta;
    mesh.rotation.z += (object.speed * 0.08) * delta;

    // Rotate planetary ring on its own axis around the shape
    const ring = ringRef.current;
    if (ring && !reduceMotion) {
      ring.rotation.z += (object.speed * 0.8 + spinBoost.current * 1.4) * delta;
    }
  });

  return (
    <Float
      speed={reduceMotion ? Math.max(0.2, object.speed * 0.25) : object.speed}
      rotationIntensity={reduceMotion ? 0.15 : 1.6}
      floatIntensity={reduceMotion ? 0.25 : 2.6}
    >
      <group position={object.position}>
        <mesh ref={meshRef}>
          {/* 1. Inner solid metallic wobbly core */}
          <mesh>
            <Geometry kind={object.geometry} />
            <MeshWobbleMaterial
              color={object.color}
              factor={reduceMotion ? 0.05 : (0.35 + wobbleBoost.current)}
              speed={reduceMotion ? 0.35 : (2.4 + wobbleBoost.current * 2)}
              roughness={0.08}
              metalness={0.92}
              emissive={object.color}
              emissiveIntensity={reduceMotion ? 0.05 : (0.22 + glowBoost.current)}
            />
          </mesh>

          {/* 2. Outer highly refractive, iridescent glass bubble shell */}
          <mesh scale={[1.2, 1.2, 1.2]}>
            <Geometry kind={object.geometry} />
            <meshPhysicalMaterial
              color={object.color}
              transparent
              opacity={0.62}
              roughness={0.05}
              metalness={0.1}
              clearcoat={1.0}
              clearcoatRoughness={0.02}
              transmission={0.82}
              thickness={1.6}
              ior={1.52}
              iridescence={reduceMotion ? 0 : 1.0}
              iridescenceIOR={1.38}
              iridescenceThicknessRange={[100, 400]}
            />
          </mesh>
        </mesh>

        {/* 3. Outer planetary Saturn-like orbit ring */}
        {!reduceMotion && (
          <mesh ref={ringRef} rotation={[Math.PI / 3, Math.PI / 6, 0]} scale={[1.35, 1.35, 1.35]}>
            <torusGeometry args={[0.9, 0.028, 8, 32]} />
            <meshBasicMaterial
              color={object.color}
              transparent
              opacity={0.55}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}

export default function ThreeDBackground({ subtle = false }: { subtle?: boolean }) {
  const theme = useAppStore((state) => state.theme);
  const reduceMotion = useAppStore((state) => state.reduceMotion);
  const currentKey = useAppStore((state) => state.currentKey);
  const [pulseTokens, setPulseTokens] = useState<Record<string, number>>({});

  const objects = useMemo(() => buildObjects(theme), [theme]);

  useEffect(() => {
    if (!currentKey) {
      return;
    }

    const sceneX = (currentKey.normalizedX - 0.5) * 11;
    const sceneY = (0.5 - currentKey.normalizedY) * 7;

    const nearest = [...objects]
      .sort((left, right) => {
        const leftDistance = Math.hypot(
          left.position[0] - sceneX,
          left.position[1] - sceneY,
        );
        const rightDistance = Math.hypot(
          right.position[0] - sceneX,
          right.position[1] - sceneY,
        );

        return leftDistance - rightDistance;
      })
      .slice(0, 2);

    setPulseTokens((previous) => {
      const next = { ...previous };

      for (const item of nearest) {
        next[item.id] = currentKey.id;
      }

      return next;
    });
  }, [currentKey, objects]);

  return (
    <div
      className={`fixed inset-0 z-[-10] pointer-events-none print:hidden transition-opacity duration-700 ${
        subtle ? "opacity-30" : "opacity-75"
      }`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.2]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={2.2} color="#ff007f" /> {/* Neon Hot Pink rim light */}
        <pointLight position={[10, -10, 5]} intensity={2.2} color="#00f0ff" />  {/* Neon Cyan rim light */}
        <pointLight position={[0, 10, -5]} intensity={1.6} color="#ffaa00" />   {/* Neon Gold top light */}
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
