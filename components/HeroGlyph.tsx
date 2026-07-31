"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import { Shape, ExtrudeGeometry, type Mesh, type Group } from "three";

// ponytail: we extrude a custom alef stroke as a THREE.Shape instead of loading an
// Arabic font into WebGL — Arabic glyph shaping in three.js needs a typeface JSON
// that ships no Arabic, and full shaping isn't worth it for one isolated letter.

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
 * Isolated alef (ا): a single vertical stroke with rounded ends and the faintest
 * taper toward the foot, the way a nib leaves it.
 *
 * Earlier attempts got this wrong in both directions — a plain rounded bar read as
 * a rectangle, and bowing the flanks outward turned it into a bottle. An alef is
 * very nearly straight; the taper only needs to be perceptible, not shapely.
 */
function alefGeometry() {
  const foot = 0.47; // half-width at the base
  const head = 0.42; // half-width at the top
  const h = 3.1;
  const y0 = -h / 2;
  const y1 = h / 2;
  const r = head * 0.85;

  const s = new Shape();
  s.moveTo(-foot + r, y0);
  s.lineTo(foot - r, y0);
  s.quadraticCurveTo(foot, y0, foot, y0 + r);
  s.lineTo(head, y1 - r); // straight flank — no bow
  s.quadraticCurveTo(head, y1, head - r, y1);
  s.lineTo(-head + r, y1);
  s.quadraticCurveTo(-head, y1, -head, y1 - r);
  s.lineTo(-foot, y0 + r);
  s.quadraticCurveTo(-foot, y0, -foot + r, y0);
  s.closePath();

  return new ExtrudeGeometry(s, {
    depth: 0.52,
    bevelEnabled: true,
    bevelThickness: 0.18,
    bevelSize: 0.16,
    bevelSegments: 6,
    curveSegments: 24,
  });
}

function Alef({ reduced }: { reduced: boolean }) {
  const ref = useRef<Mesh>(null);
  const geo = useMemo(() => alefGeometry(), []);
  useFrame((state) => {
    if (!ref.current || reduced) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.45;
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.05;
  });
  return (
    <mesh ref={ref} geometry={geo} castShadow>
      <meshPhysicalMaterial
        color="#ffb22e"
        roughness={0.28}
        metalness={0}
        clearcoat={0.9}
        clearcoatRoughness={0.18}
        sheen={0.5}
        sheenColor="#ffffff"
        emissive="#ffb22e"
        emissiveIntensity={0.12}
      />
    </mesh>
  );
}

function Bead({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[0.32, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.3}
        metalness={0}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function Scene({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current || reduced) return;
    // subtle parallax toward the pointer
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.3 - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (-y * 0.2 - group.current.rotation.x) * 0.04;
  });
  return (
    <group ref={group}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} color="#fff1d6" castShadow />
      <directionalLight position={[-5, -2, 3]} intensity={0.6} color="#9fe0df" />
      <pointLight position={[-3, 3, 4]} intensity={0.9} color="#ffffff" />
      <Float speed={reduced ? 0 : 1.4} rotationIntensity={reduced ? 0 : 0.25} floatIntensity={reduced ? 0 : 0.6}>
        <Alef reduced={reduced} />
      </Float>
      {/* hamza spark + diacritic beads, in the brand's saffron / teal / rose */}
      <Float speed={reduced ? 0 : 2.2} floatIntensity={reduced ? 0 : 1.1}>
        <Bead position={[0.1, 2.15, 0.3]} color="#ffb22e" scale={0.7} />
      </Float>
      <Float speed={reduced ? 0 : 1.8} floatIntensity={reduced ? 0 : 0.9}>
        <Bead position={[1.7, 0.6, -0.4]} color="#0f8c8c" scale={0.9} />
      </Float>
      <Float speed={reduced ? 0 : 1.6} floatIntensity={reduced ? 0 : 0.8}>
        <Bead position={[-1.7, -0.9, -0.2]} color="#f4607d" scale={0.8} />
      </Float>
      <Float speed={reduced ? 0 : 2} floatIntensity={reduced ? 0 : 1}>
        <Bead position={[1.5, -1.4, 0.2]} color="#ffb22e" scale={0.55} />
      </Float>
    </group>
  );
}

export default function HeroGlyph() {
  const reduced = useReducedMotion();
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <Scene reduced={reduced} />
    </Canvas>
  );
}
