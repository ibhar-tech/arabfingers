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
  const pulseRef = useRef(1);

  useEffect(() => {
    pulseRef.current = 1.5;
  }, [pulseToken]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    pulseRef.current = MathUtils.damp(
      pulseRef.current,
      1,
      reduceMotion ? 7 : 10,
      delta,
    );

    mesh.scale.setScalar(object.scale * pulseRef.current);
  });

  return (
    <Float
      speed={reduceMotion ? Math.max(0.25, object.speed * 0.35) : object.speed}
      rotationIntensity={reduceMotion ? 0.2 : 1.2}
      floatIntensity={reduceMotion ? 0.3 : 2}
    >
      <mesh ref={meshRef} position={object.position}>
        <Geometry kind={object.geometry} />
        <MeshWobbleMaterial
          color={object.color}
          factor={reduceMotion ? 0.08 : 0.3}
          speed={reduceMotion ? 0.45 : 2}
        />
      </mesh>
    </Float>
  );
}

export default function ThreeDBackground() {
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
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.25]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.1} />
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
