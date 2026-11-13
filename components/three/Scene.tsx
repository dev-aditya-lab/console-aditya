"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  PerformanceMonitor,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";
import { store } from "@/lib/motion-store";
import { poseFor, MOBILE_POSES, type ShapeId } from "./poses";

const damp = THREE.MathUtils.damp;

type ShapeProps = {
  id: ShapeId;
  /** How much the shape lags the page scroll (0 = pinned, 1 = scrolls with content). */
  par?: number;
  spin?: [number, number];
  bob?: number;
  phase?: number;
  children: React.ReactNode;
};

/** Positions a mesh group from the current route's pose, with damping, scroll parallax, pointer parallax and idle drift. */
function Shape({ id, par = 0.45, spin = [0.05, 0.12], bob = 0.12, phase = 0, children }: ShapeProps) {
  const g = useRef<THREE.Group>(null!);
  const cur = useRef({ x: 0, y: -4, z: -8, s: 0.001 });

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05);
    const { viewport, size } = state;
    const mobile = size.width < 768;
    // Phones get a sparse cluster in the free band above the headline; the rest stay hidden.
    const pose = mobile ? (MOBILE_POSES[id] ?? { x: 0, y: 0.5, z: -3, s: 0 }) : poseFor(store.route)[id];
    const k = THREE.MathUtils.clamp(viewport.width / 7, 0.48, 1.15);

    // Past the hero, shapes retreat to the screen edges and shrink so body copy stays clean.
    const sp = store.scroll / size.height;
    // Finale: shapes swing back in around the footer call-to-action, then clear out before the link columns.
    const longPage = store.limit > size.height * 4.5;
    const bottom = longPage
      ? THREE.MathUtils.smoothstep(store.scroll, store.limit - size.height * 2.1, store.limit - size.height * 1.3) *
        (1 - THREE.MathUtils.smoothstep(store.scroll, store.limit - size.height * 1.0, store.limit - size.height * 0.4))
      : 0;
    const edge = THREE.MathUtils.smoothstep(sp, 0.2, 0.85) * (1 - bottom);
    const baseX = pose.x;
    const side = baseX >= 0 ? 1 : -1;
    // Edge target measured at the shape's own depth, so deep shapes still land at the screen edge.
    const vpz = viewport.getCurrentViewport(state.camera, [0, 0, cur.current.z]);
    const tx =
      THREE.MathUtils.lerp(baseX * (viewport.width / 2), side * (vpz.width / 2) * 0.9, edge) +
      store.mouse.x * 0.35 * (1 + par);
    const scrollY = (store.scroll / size.height) * viewport.height * par * (1 - bottom);
    const ty =
      pose.y * (viewport.height / 2) +
      scrollY +
      store.mouse.y * 0.2 * (1 + par) -
      bottom * viewport.height * 0.12 +
      Math.sin(state.clock.elapsedTime * 0.8 + phase) * bob;

    const c = cur.current;
    c.x = damp(c.x, tx, 2.4, d);
    c.y = damp(c.y, ty, 2.4, d);
    c.z = damp(c.z, pose.z, 2.4, d);
    c.s = damp(c.s, pose.s * (mobile ? 1 - edge : 1 - 0.5 * edge) * (1 - 0.25 * bottom), 3, d);

    const out = c.y > viewport.height * 0.9 + 2;
    g.current.visible = !out;
    if (out) return;

    g.current.position.set(c.x, c.y, c.z);
    g.current.scale.setScalar(c.s * k);
    g.current.rotation.x += d * spin[0] + store.velocity * 0.0009;
    g.current.rotation.y += d * spin[1] + store.velocity * 0.0016;
  });

  return <group ref={g}>{children}</group>;
}

const chrome = { color: "#ffffff", metalness: 1, roughness: 0.16, envMapIntensity: 1.3 } as const;

function Blob() {
  const mat = useRef<{ distort: number; speed: number } | null>(null);
  useFrame(() => {
    if (!mat.current) return;
    const target = 0.3 + Math.min(Math.abs(store.velocity), 40) * 0.012;
    mat.current.distort += (target - mat.current.distort) * 0.08;
  });
  return (
    <Shape id="blob" par={0.35} spin={[0.04, 0.09]} bob={0.1}>
      <mesh>
        <icosahedronGeometry args={[1.25, 64]} />
        <MeshDistortMaterial
          ref={mat as never}
          {...chrome}
          clearcoat={1}
          clearcoatRoughness={0.05}
          distort={0.3}
          speed={1.5}
        />
      </mesh>
    </Shape>
  );
}

function Ring({ fancy }: { fancy: boolean }) {
  return (
    <Shape id="ring" par={0.5} spin={[0.08, 0.15]} phase={1.2}>
      <mesh>
        <torusGeometry args={[1, 0.36, 64, 128]} />
        {fancy ? (
          <MeshTransmissionMaterial
            samples={4}
            resolution={384}
            thickness={0.6}
            roughness={0.04}
            chromaticAberration={0.08}
            anisotropicBlur={0.12}
            ior={1.3}
            distortion={0.2}
            distortionScale={0.4}
            temporalDistortion={0.1}
            backside={false}
            color="#eef1ff"
          />
        ) : (
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.08}
            iridescence={1}
            iridescenceIOR={1.4}
            clearcoat={1}
          />
        )}
      </mesh>
    </Shape>
  );
}

function Knot() {
  return (
    <Shape id="knot" par={0.6} spin={[0.12, 0.2]} phase={2.1}>
      <mesh>
        <torusKnotGeometry args={[0.7, 0.24, 220, 32]} />
        <meshPhysicalMaterial color="#ff4a1c" roughness={0.16} metalness={0.15} clearcoat={1} clearcoatRoughness={0.04} />
      </mesh>
    </Shape>
  );
}

function Capsule() {
  return (
    <Shape id="capsule" par={0.7} spin={[0.1, 0.07]} phase={3.4}>
      <mesh rotation={[0, 0, Math.PI / 5]}>
        <capsuleGeometry args={[0.38, 1.1, 16, 32]} />
        <meshPhysicalMaterial color="#0c0c0e" roughness={0.06} metalness={0.5} clearcoat={1} clearcoatRoughness={0.02} envMapIntensity={1.8} />
      </mesh>
    </Shape>
  );
}

function Octa() {
  return (
    <Shape id="octa" par={0.55} spin={[0.14, 0.18]} phase={4.2}>
      <mesh>
        <octahedronGeometry args={[0.85, 0]} />
        <meshPhysicalMaterial color="#2a3cff" roughness={0.1} metalness={0.25} clearcoat={1} flatShading envMapIntensity={1.4} />
      </mesh>
    </Shape>
  );
}

function Box() {
  return (
    <Shape id="box" par={0.65} spin={[0.09, 0.13]} phase={5.1}>
      <RoundedBox args={[1.2, 1.2, 1.2]} radius={0.24} smoothness={6}>
        <meshPhysicalMaterial color="#e9ecff" roughness={0.12} metalness={0.2} iridescence={1} iridescenceIOR={1.3} clearcoat={1} envMapIntensity={1.4} />
      </RoundedBox>
    </Shape>
  );
}

function Pearls() {
  return (
    <Shape id="pearl" par={0.9} spin={[0.02, 0.05]} bob={0.18} phase={0.6}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.22, 48, 48]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      <mesh position={[0.55, 0.38, -0.2]}>
        <sphereGeometry args={[0.14, 48, 48]} />
        <meshStandardMaterial color="#ff4a1c" metalness={0.9} roughness={0.12} envMapIntensity={1.5} />
      </mesh>
      <mesh position={[-0.4, -0.45, 0.1]}>
        <sphereGeometry args={[0.11, 48, 48]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
    </Shape>
  );
}

/** Studio-style reflections built from light panels — no external HDR download needed. */
function Studio() {
  return (
    <Environment resolution={512} frames={1}>
      <color attach="background" args={["#13141a"]} />
      <Lightformer form="rect" intensity={7} position={[0, 6, -3]} scale={[16, 3, 1]} />
      <Lightformer form="rect" intensity={5} position={[-8, 1, 1]} rotation-y={Math.PI / 2} scale={[10, 5, 1]} />
      <Lightformer form="rect" intensity={5} position={[8, 1, 1]} rotation-y={-Math.PI / 2} scale={[10, 5, 1]} />
      <Lightformer form="rect" intensity={3} position={[0, -5, 2]} rotation-x={Math.PI / 2} scale={[14, 4, 1]} />
      <Lightformer form="rect" color="#ff4a1c" intensity={3.2} position={[6, -1, 4]} rotation-y={-Math.PI / 3} scale={[1.4, 9, 1]} />
      <Lightformer form="rect" color="#6a78ff" intensity={3} position={[-6, 0, 4]} rotation-y={Math.PI / 3} scale={[1.4, 9, 1]} />
      <Lightformer form="rect" intensity={4} position={[0, 3, 7]} rotation-x={-0.5} scale={[12, 1.2, 1]} />
    </Environment>
  );
}

export default function Scene() {
  const [dpr, setDpr] = useState(1.5);
  const [fancy, setFancy] = useState(true);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 8], fov: 35 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      aria-hidden
    >
      <color attach="background" args={["#ffffff"]} />
      <PerformanceMonitor
        onDecline={() => {
          setDpr(1);
          setFancy(false);
        }}
        onIncline={() => setDpr(1.5)}
      />
      <ambientLight intensity={0.35} />
      <Studio />
      <Blob />
      <Ring fancy={fancy && !small} />
      <Knot />
      <Capsule />
      <Octa />
      <Box />
      <Pearls />
    </Canvas>
  );
}
