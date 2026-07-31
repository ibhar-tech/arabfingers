"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MathUtils,
  Shape,
  ExtrudeGeometry,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type BufferGeometry,
} from "three";
import { themes, type ThemeName } from "@/lib/themes";
import { useAppStore } from "@/store/useAppStore";

/**
 * The play-stage backdrop: a cast of chunky candy props and little characters
 * that react when a child hits a key.
 *
 * Two things it must never do:
 *  - escape the stage (it is `absolute`, not `fixed`, so `.play-surface`'s
 *    overflow clips it and it stops bleeding over the article below), and
 *  - cost more than a cheap tablet can pay — hence primitives only, no loaded
 *    models, no textures, and a hard cap on how many meshes a theme can cast.
 */

type Kind =
  // props
  | "balloon"
  | "star"
  | "donut"
  | "block"
  | "gem"
  | "heart"
  // characters (these get faces)
  | "chick"
  | "cat"
  | "bunny"
  | "fish"
  | "planet"
  | "rocket"
  | "cloud";

type SceneObject = {
  id: string;
  kind: Kind;
  color: string;
  /** Position as a fraction of the visible viewport, so phones and desktops both look composed. */
  spot: [number, number];
  depth: number;
  scale: number;
  speed: number;
  delay: number;
};

const PROPS: Kind[] = ["balloon", "star", "donut", "block", "gem", "heart"];

/** Each theme casts its own characters; props are shared. */
const themeCast: Record<ThemeName, { chars: Kind[]; count: number }> = {
  daylight: { chars: ["chick", "cat", "bunny", "cloud"], count: 13 },
  space: { chars: ["rocket", "planet", "cat"], count: 13 },
  desert: { chars: ["cat", "bunny", "planet"], count: 11 },
  jungle: { chars: ["chick", "cat", "bunny"], count: 12 },
  underwater: { chars: ["fish", "fish", "bunny"], count: 12 },
  ramadan: { chars: ["planet", "cat", "cloud"], count: 11 },
};

function mulberry32(seed: number) {
  return function random() {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

/** Extruded 5-point star and heart — built once at module scope, shared by every instance. */
let starGeo: BufferGeometry | null = null;
let heartGeo: BufferGeometry | null = null;

function getStar(): BufferGeometry {
  if (starGeo) return starGeo;
  const s = new Shape();
  const outer = 0.85;
  const inner = 0.36;
  const pts = 5;
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i * Math.PI) / pts - Math.PI / 2;
    if (i === 0) s.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else s.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  s.closePath();
  starGeo = new ExtrudeGeometry(s, {
    depth: 0.32,
    bevelEnabled: true,
    bevelThickness: 0.14,
    bevelSize: 0.12,
    bevelSegments: 4,
    curveSegments: 12,
  }).center();
  return starGeo;
}

function getHeart(): BufferGeometry {
  if (heartGeo) return heartGeo;
  const s = new Shape();
  s.moveTo(0, -0.75);
  s.bezierCurveTo(-0.95, -0.1, -0.7, 0.85, 0, 0.45);
  s.bezierCurveTo(0.7, 0.85, 0.95, -0.1, 0, -0.75);
  heartGeo = new ExtrudeGeometry(s, {
    depth: 0.34,
    bevelEnabled: true,
    bevelThickness: 0.16,
    bevelSize: 0.14,
    bevelSegments: 4,
    curveSegments: 16,
  }).center();
  return heartGeo;
}

/**
 * Eyes + smile. Two white spheres with dark pupils read as "alive" to a toddler
 * far more cheaply than any modelled character would.
 *
 * `r` is the radius of the body sphere the face sits on. Features are projected
 * onto that sphere and then pushed out slightly — sinking them into the body was
 * turning every pair of eyes into a sleepy slit and hiding the mouths entirely.
 */
function Face({
  r,
  gap,
  eye = 0.11,
  y = 0,
  smile = true,
  animate = true,
}: {
  r: number;
  gap: number;
  eye?: number;
  y?: number;
  smile?: boolean;
  animate?: boolean;
}) {
  const lids = useRef<Group>(null);
  const nextBlink = useRef(1.5 + Math.random() * 4);
  const closing = useRef(0);

  useFrame((_, delta) => {
    const group = lids.current;
    if (!group || !animate) return;

    nextBlink.current -= delta;
    if (nextBlink.current <= 0) {
      nextBlink.current = 2.5 + Math.random() * 4.5;
      closing.current = 0.14;
    }
    if (closing.current > 0) closing.current -= delta;

    group.scale.y = MathUtils.damp(group.scale.y, closing.current > 0 ? 0.1 : 1, 24, delta);
  });

  const onSphere = (dx: number, dy: number) =>
    Math.sqrt(Math.max(0.02, r * r - dx * dx - dy * dy));

  const eyeZ = onSphere(gap, y) + eye * 0.55;
  const mouthY = y - r * 0.45;
  const mouthZ = onSphere(0, mouthY) + 0.04;

  return (
    <group>
      <group ref={lids}>
        {[-gap, gap].map((x) => (
          <group key={x} position={[x, y, eyeZ]}>
            <mesh>
              <sphereGeometry args={[eye, 16, 16]} />
              <meshStandardMaterial color="#ffffff" roughness={0.25} />
            </mesh>
            <mesh position={[0, 0, eye * 0.6]}>
              <sphereGeometry args={[eye * 0.55, 12, 12]} />
              <meshStandardMaterial color="#2a1d4e" roughness={0.2} />
            </mesh>
          </group>
        ))}
      </group>
      {smile && (
        <mesh position={[0, mouthY, mouthZ]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[r * 0.33, 0.035, 8, 20, Math.PI]} />
          <meshStandardMaterial color="#2a1d4e" roughness={0.4} />
        </mesh>
      )}
    </group>
  );
}

/** The candy material every prop and body shares. */
function Candy({ color, rough = 0.34 }: { color: string; rough?: number }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={rough}
      metalness={0}
      clearcoat={0.7}
      clearcoatRoughness={0.25}
      sheen={0.5}
      sheenColor="#ffffff"
      emissive={color}
      emissiveIntensity={0.18}
    />
  );
}

function Body({ kind, color, animate }: { kind: Kind; color: string; animate: boolean }) {
  switch (kind) {
    case "balloon":
      // Kept upright with a knot and a string — a bare sphere just reads as a ball.
      return (
        <>
          <mesh scale={[1, 1.12, 1]}>
            <sphereGeometry args={[0.72, 32, 32]} />
            <Candy color={color} />
          </mesh>
          <mesh position={[0, -0.84, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.14, 0.22, 12]} />
            <meshStandardMaterial color={color} roughness={0.45} />
          </mesh>
          <mesh position={[0, -1.42, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.96, 6]} />
            <meshStandardMaterial color="#fff7ec" roughness={0.6} />
          </mesh>
        </>
      );

    case "star":
      return (
        <mesh>
          <primitive object={getStar()} attach="geometry" />
          <Candy color={color} />
        </mesh>
      );

    case "heart":
      return (
        <mesh>
          <primitive object={getHeart()} attach="geometry" />
          <Candy color={color} />
        </mesh>
      );

    case "donut":
      return (
        <mesh>
          <torusGeometry args={[0.62, 0.3, 20, 40]} />
          <Candy color={color} />
        </mesh>
      );

    case "block":
      // Rounded cardstock-style block — the hard-edged cube read as cheap.
      return (
        <RoundedBox args={[1.1, 1.1, 1.1]} radius={0.22} smoothness={4}>
          <Candy color={color} />
        </RoundedBox>
      );

    case "gem":
      return (
        <mesh>
          <octahedronGeometry args={[0.92, 0]} />
          <Candy color={color} rough={0.22} />
        </mesh>
      );

    case "chick":
      return (
        <>
          <mesh scale={[1, 0.92, 0.92]}>
            <sphereGeometry args={[0.62, 24, 24]} />
            <Candy color={color} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.42, 24, 24]} />
            <Candy color={color} />
          </mesh>
          {/* beak */}
          <mesh position={[0, 0.55, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.13, 0.28, 10]} />
            <meshStandardMaterial color="#ffb22e" roughness={0.35} />
          </mesh>
          {/* wings */}
          {[-0.58, 0.58].map((x) => (
            <mesh key={x} position={[x, -0.02, 0]} scale={[0.34, 0.6, 0.34]}>
              <sphereGeometry args={[0.5, 14, 14]} />
              <Candy color={color} />
            </mesh>
          ))}
          <group position={[0, 0.6, 0]}>
            <Face r={0.42} gap={0.17} eye={0.085} y={0.08} smile={false} animate={animate} />
          </group>
        </>
      );

    case "cat":
      return (
        <>
          <mesh>
            <sphereGeometry args={[0.7, 26, 26]} />
            <Candy color={color} />
          </mesh>
          {[-0.4, 0.4].map((x) => (
            <mesh key={x} position={[x, 0.6, 0]} rotation={[0, 0, x > 0 ? -0.3 : 0.3]}>
              <coneGeometry args={[0.22, 0.44, 10]} />
              <Candy color={color} />
            </mesh>
          ))}
          {/* nose */}
          <mesh position={[0, 0.02, 0.68]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.08, 0.12, 8]} />
            <meshStandardMaterial color="#f4607d" roughness={0.35} />
          </mesh>
          <Face r={0.7} gap={0.27} eye={0.12} y={0.18} animate={animate} />
        </>
      );

    case "bunny":
      return (
        <>
          <mesh>
            <sphereGeometry args={[0.62, 26, 26]} />
            <Candy color={color} />
          </mesh>
          {[-0.24, 0.24].map((x) => (
            <mesh key={x} position={[x, 1.0, -0.04]} rotation={[0, 0, x > 0 ? -0.18 : 0.18]}>
              <capsuleGeometry args={[0.13, 0.52, 6, 12]} />
              <Candy color={color} />
            </mesh>
          ))}
          <mesh position={[0, -0.02, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.07, 0.11, 8]} />
            <meshStandardMaterial color="#f4607d" roughness={0.35} />
          </mesh>
          <Face r={0.62} gap={0.24} eye={0.11} y={0.15} animate={animate} />
        </>
      );

    case "fish":
      return (
        <>
          <mesh scale={[1.05, 0.8, 0.62]}>
            <sphereGeometry args={[0.7, 26, 26]} />
            <Candy color={color} />
          </mesh>
          {/* tail */}
          <mesh position={[-0.92, 0, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 0.35]}>
            <coneGeometry args={[0.42, 0.5, 10]} />
            <Candy color={color} />
          </mesh>
          {/* top fin */}
          <mesh position={[0, 0.5, 0]} scale={[0.9, 1, 0.25]}>
            <coneGeometry args={[0.24, 0.36, 8]} />
            <Candy color={color} />
          </mesh>
          <group position={[0.22, 0.1, 0]}>
            <Face r={0.44} gap={0.19} eye={0.095} y={0.04} animate={animate} />
          </group>
        </>
      );

    case "planet":
      return (
        <>
          <mesh>
            <sphereGeometry args={[0.74, 30, 30]} />
            <Candy color={color} />
          </mesh>
          <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
            <torusGeometry args={[1.12, 0.07, 12, 44]} />
            <meshStandardMaterial
              color="#fff7ec"
              roughness={0.3}
              metalness={0.1}
              emissive="#fff7ec"
              emissiveIntensity={0.28}
            />
          </mesh>
          <Face r={0.74} gap={0.26} eye={0.115} y={0.14} animate={animate} />
        </>
      );

    case "rocket":
      return (
        <>
          <mesh>
            <capsuleGeometry args={[0.34, 0.82, 8, 20]} />
            <Candy color="#fff7ec" />
          </mesh>
          <mesh position={[0, 0.79, 0]}>
            <coneGeometry args={[0.34, 0.52, 20]} />
            <Candy color={color} />
          </mesh>
          {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((a) => (
            <mesh
              key={a}
              position={[Math.sin(a) * 0.34, -0.52, Math.cos(a) * 0.34]}
              rotation={[0, -a, 0.34]}
            >
              <boxGeometry args={[0.08, 0.4, 0.3]} />
              <Candy color={color} />
            </mesh>
          ))}
          {/* porthole */}
          <mesh position={[0, 0.24, 0.3]}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial
              color="#9fe1cb"
              roughness={0.15}
              emissive="#9fe1cb"
              emissiveIntensity={0.35}
            />
          </mesh>
          {/* flame */}
          <mesh position={[0, -0.86, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.2, 0.44, 12]} />
            <meshStandardMaterial
              color="#ffb22e"
              emissive="#ff7a1a"
              emissiveIntensity={1.1}
              roughness={0.5}
            />
          </mesh>
        </>
      );

    case "cloud":
      return (
        <>
          {([
            [0, 0, 0, 0.62],
            [-0.55, -0.12, 0.05, 0.44],
            [0.55, -0.1, -0.05, 0.48],
            [0.2, 0.32, 0, 0.4],
          ] as const).map(([x, y, z, r]) => (
            <mesh key={`${x}-${y}`} position={[x, y, z]}>
              <sphereGeometry args={[r, 20, 20]} />
              <Candy color={color} rough={0.5} />
            </mesh>
          ))}
          <Face r={0.62} gap={0.22} eye={0.1} y={0.06} animate={animate} />
        </>
      );

    default:
      return null;
  }
}

const CHARACTERS = new Set<Kind>(["chick", "cat", "bunny", "fish", "planet", "rocket", "cloud"]);
/** Kinds that must not tumble — a balloon on its side, an upside-down cat, or a
 *  heart seen edge-on all stop reading as what they are. */
const UPRIGHT = new Set<Kind>([...CHARACTERS, "balloon", "heart"]);

function FloatingShape({
  object,
  pulseToken,
  reduceMotion,
}: {
  object: SceneObject;
  pulseToken: number;
  reduceMotion: boolean;
}) {
  const meshRef = useRef<Group>(null);
  const pulse = useRef(1);
  const spinBoost = useRef(0);
  /** 0 → 1 entrance ramp, so the cast pops in one after another instead of all at once. */
  const entrance = useRef(0);
  const elapsed = useRef(0);

  const isCharacter = CHARACTERS.has(object.kind);
  const upright = UPRIGHT.has(object.kind);

  useEffect(() => {
    if (pulseToken > 0) {
      pulse.current = 1.55;
      spinBoost.current = 10;
    }
  }, [pulseToken]);

  useFrame((_, delta) => {
    const group = meshRef.current;
    if (!group) return;

    elapsed.current += delta;
    const t = Math.max(0, elapsed.current - object.delay);
    // Overshoot-and-settle pop: cheap spring without pulling in a physics lib.
    entrance.current = t <= 0 ? 0 : Math.min(1, 1 - Math.exp(-t * 6) * Math.cos(t * 9));

    pulse.current = MathUtils.damp(pulse.current, 1, reduceMotion ? 6 : 9, delta);
    spinBoost.current = MathUtils.damp(spinBoost.current, 0, reduceMotion ? 12 : 4.2, delta);

    group.scale.setScalar(object.scale * pulse.current * entrance.current);

    if (upright) {
      // These stay the right way up and face the child — a tumbling cat is just a blob.
      group.rotation.y = Math.sin(elapsed.current * object.speed * 0.5) * 0.45;
      group.rotation.z = Math.sin(elapsed.current * object.speed * 0.8) * 0.08 + spinBoost.current * 0.05;
    } else {
      group.rotation.x += (object.speed * 0.15 + (reduceMotion ? 0 : spinBoost.current)) * delta;
      group.rotation.y += (object.speed * 0.25 + (reduceMotion ? 0 : spinBoost.current * 0.7)) * delta;
    }
  });

  return (
    <Float
      speed={reduceMotion ? Math.max(0.2, object.speed * 0.25) : object.speed}
      rotationIntensity={reduceMotion ? 0.1 : upright ? 0.35 : 1.2}
      floatIntensity={reduceMotion ? 0.25 : isCharacter ? 1.4 : 2.2}
    >
      <group ref={meshRef} scale={0}>
        <Body kind={object.kind} color={object.color} animate={!reduceMotion} />
      </group>
    </Float>
  );
}

/** A ring that snaps out from wherever the child pressed, then fades. */
function Shockwave({ x, y, token }: { x: number; y: number; token: number }) {
  const meshRef = useRef<Mesh>(null);
  const life = useRef(-1);

  useEffect(() => {
    if (token > 0) life.current = 0;
  }, [token]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (life.current < 0) {
      mesh.visible = false;
      return;
    }

    life.current += delta;
    const p = life.current / 0.62;
    if (p >= 1) {
      life.current = -1;
      mesh.visible = false;
      return;
    }

    mesh.visible = true;
    mesh.scale.setScalar(0.4 + p * 4.2);
    (mesh.material as MeshBasicMaterial).opacity = (1 - p) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[x, y, -0.4]} visible={false}>
      <ringGeometry args={[0.72, 0.86, 48]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

function Scene({
  theme,
  subtle,
  reduceMotion,
}: {
  theme: ThemeName;
  subtle: boolean;
  reduceMotion: boolean;
}) {
  const viewport = useThree((state) => state.viewport);
  const currentKey = useAppStore((state) => state.currentKey);
  const [pulseTokens, setPulseTokens] = useState<Record<string, number>>({});

  const objects = useMemo<SceneObject[]>(() => {
    const random = mulberry32(7643);
    const palette = themes[theme].palette;
    const cast = themeCast[theme];

    /* Scattering at random put three characters in one corner and left the rest of
       the stage empty. A jittered grid keeps the composition even, and dropping the
       middle cells keeps the big letter card readable instead of half-hidden behind
       a balloon. Wide and short (5x3): the stage is landscape, and stacking four rows
       put neighbours close enough to intersect. */
    const cols = 5;
    const rows = 3;
    const cells: [number, number][] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const fx = (c + 0.5) / cols - 0.5;
        const fy = (r + 0.5) / rows - 0.5;
        // The letter card is wide and vertically centred, so the middle row gives up
        // everything but its outermost cells.
        if (Math.abs(fx) < 0.3 && Math.abs(fy) < 0.1) continue;
        cells.push([fx, fy]);
      }
    }
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }

    const count = subtle ? 4 : Math.min(cast.count, cells.length);
    const jitter = 0.34 / cols;
    // Pull the outer cells in so nothing is cropped at the edge. Vertically tighter
    // still, to stay clear of the toolbar up top and the letter bar down below.
    const SPREAD_X = 0.86;
    const SPREAD_Y = 0.74;

    /* Roughly one in three of the cast is a character. Strict round-robin rather than
       random draws: drawing at random kept casting the same chick three times over and
       three rounded blocks in one corner. */
    let nextChar = 0;
    let nextProp = 0;

    return Array.from({ length: count }, (_, index) => {
      const kind =
        index % 3 === 1
          ? cast.chars[nextChar++ % cast.chars.length]
          : PROPS[nextProp++ % PROPS.length];
      const [fx, fy] = cells[index % cells.length];

      return {
        id: `shape-${index}`,
        kind,
        color: palette[index % palette.length],
        spot: [
          (fx + (random() - 0.5) * jitter) * SPREAD_X,
          (fy + (random() - 0.5) * jitter) * SPREAD_Y,
        ] as [number, number],
        depth: random() * -3.5,
        scale: 0.74 + random() * 0.4,
        speed: subtle ? 0.35 + random() * 0.45 : 0.6 + random() * 1.0,
        delay: index * 0.07 + random() * 0.12,
      };
    });
  }, [theme, subtle]);

  /* Positions and sizes track the live viewport, so a portrait phone gets a composed
     scene rather than a handful of giant shapes with the rest cropped off-screen. */
  const sizeFactor = MathUtils.clamp(viewport.width / 12, 0.5, 1.1);
  const placed = useMemo(
    () =>
      objects.map((object) => ({
        object,
        position: [
          object.spot[0] * viewport.width,
          object.spot[1] * viewport.height,
          object.depth,
        ] as [number, number, number],
      })),
    [objects, viewport.width, viewport.height],
  );

  const press = currentKey
    ? {
        x: (currentKey.normalizedX - 0.5) * viewport.width,
        y: (0.5 - currentKey.normalizedY) * viewport.height,
        token: currentKey.id,
      }
    : { x: 0, y: 0, token: 0 };

  useEffect(() => {
    if (!currentKey) return;

    const sceneX = (currentKey.normalizedX - 0.5) * viewport.width;
    const sceneY = (0.5 - currentKey.normalizedY) * viewport.height;

    const nearest = [...placed]
      .sort((left, right) => {
        const ld = Math.hypot(left.position[0] - sceneX, left.position[1] - sceneY);
        const rd = Math.hypot(right.position[0] - sceneX, right.position[1] - sceneY);
        return ld - rd;
      })
      .slice(0, 3);

    setPulseTokens((previous) => {
      const next = { ...previous };
      for (const item of nearest) next[item.object.id] = currentKey.id;
      return next;
    });
  }, [currentKey, placed, viewport.width, viewport.height]);

  return (
    <>
      {/* Bright, cheerful daylight — shapes read as clear candy colors, not murky metal. */}
      <hemisphereLight args={["#ffffff", "#ffd9a8", 1.15]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-6, -3, 4]} intensity={0.7} color="#bfe9ff" />

      {!reduceMotion && (
        <Sparkles
          count={subtle ? 18 : 55}
          scale={[viewport.width, viewport.height, 5]}
          size={3}
          speed={0.4}
          opacity={0.7}
          color="#ffffff"
        />
      )}

      {!reduceMotion && <Shockwave x={press.x} y={press.y} token={press.token} />}

      {placed.map(({ object, position }) => (
        <group key={object.id} position={position} scale={sizeFactor}>
          <FloatingShape
            object={object}
            pulseToken={pulseTokens[object.id] ?? 0}
            reduceMotion={reduceMotion}
          />
        </group>
      ))}
    </>
  );
}

export default function ThreeDBackground({
  subtle = false,
  className = "z-0",
}: {
  subtle?: boolean;
  className?: string;
}) {
  const theme = useAppStore((state) => state.theme);
  const reduceMotion = useAppStore((state) => state.reduceMotion);

  return (
    <div
      /* `absolute`, not `fixed`: the stage clips it. When it was fixed it kept
         painting over the article and FAQ that live below the stage. */
      className={`absolute inset-0 pointer-events-none print:hidden transition-opacity duration-700 ${className} ${
        subtle ? "opacity-35" : "opacity-95"
      }`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.4]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <Scene theme={theme} subtle={subtle} reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  );
}
