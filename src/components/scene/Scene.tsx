'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Lightformer, MeshDistortMaterial } from '@react-three/drei';
import { MathUtils, type Group, type Points } from 'three';

// Where the centrepiece sits as the page scrolls: [scroll progress, x as a share of half the
// viewport width, scale]. It drifts beside each section instead of sitting behind the text.
const PATH: [number, number, number][] = [
  [0, 0.62, 0.9],
  [0.14, 0.75, 0.55],
  [0.32, -0.6, 0.75],
  [0.55, 0.45, 0.7],
  [0.8, -0.55, 0.7],
  [1, 0.4, 0.9],
];

const SATELLITES: { position: [number, number, number]; size: number; color: string }[] = [
  { position: [2.4, 1.5, -0.8], size: 0.22, color: '#c6ff3d' },
  { position: [-2.3, -1.3, 0.6], size: 0.3, color: '#ff4fa3' },
  { position: [-1.7, 1.8, -1.4], size: 0.16, color: '#22d3ee' },
  { position: [1.9, -1.8, 0.9], size: 0.12, color: '#f4f2ff' },
];

function scrollProgress(): number {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(window.scrollY / max, 1) : 0;
}

function samplePath(progress: number): [number, number] {
  for (let i = 1; i < PATH.length; i++) {
    const [end, x, scale] = PATH[i];
    if (progress <= end) {
      const [start, fromX, fromScale] = PATH[i - 1];
      const t = (progress - start) / (end - start);
      return [MathUtils.lerp(fromX, x, t), MathUtils.lerp(fromScale, scale, t)];
    }
  }
  const [, x, scale] = PATH[PATH.length - 1];
  return [x, scale];
}

// A seeded generator, so the star field is the same on every render and every visit.
function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Centrepiece({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);
  const { viewport, size } = useThree();
  const wide = size.width >= 768;

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const progress = scrollProgress();
    const [x, scale] = samplePath(progress);
    // On a phone it sits centred behind the hero, then slides half off-screen so it never covers
    // the text of the sections below.
    const phoneX = progress < 0.06 ? 0 : Math.sign(x) * viewport.width * 0.5;
    const target = {
      x: wide ? (x * viewport.width) / 2 : phoneX,
      y: wide ? 0 : 0.6,
      scale: scale * (wide ? 1 : 0.62),
      rotY: progress * Math.PI * 4 + state.pointer.x * 0.5,
      rotX: progress * Math.PI * 1.5 - state.pointer.y * 0.35,
    };
    const ease = (from: number, to: number, lambda: number) =>
      animate ? MathUtils.damp(from, to, lambda, delta) : to;
    g.position.x = ease(g.position.x, target.x, 2.5);
    g.position.y = ease(g.position.y, target.y, 2.5);
    g.scale.setScalar(ease(g.scale.x, target.scale, 2.5));
    g.rotation.y = ease(g.rotation.y, target.rotY, 3);
    g.rotation.x = ease(g.rotation.x, target.rotX, 3);
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.35, 32]} />
        <MeshDistortMaterial
          color="#7c4dff"
          distort={0.4}
          speed={animate ? 1.6 : 0}
          roughness={0.08}
          metalness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.08}
          iridescence={1}
          iridescenceIOR={1.4}
        />
      </mesh>
      <mesh rotation={[1.15, 0.2, 0]}>
        <torusGeometry args={[2.2, 0.035, 16, 200]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.4} />
      </mesh>
      <mesh rotation={[-0.45, 0.9, 0.3]}>
        <torusGeometry args={[2.55, 0.014, 16, 200]} />
        <meshStandardMaterial color="#c6ff3d" emissive="#c6ff3d" emissiveIntensity={1.6} />
      </mesh>
      {SATELLITES.map((satellite) => (
        <Float
          key={satellite.color}
          speed={animate ? 2 : 0}
          floatIntensity={1.2}
          rotationIntensity={0.6}
        >
          <mesh position={satellite.position}>
            <sphereGeometry args={[satellite.size, 32, 32]} />
            <meshStandardMaterial color={satellite.color} metalness={0.9} roughness={0.15} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Stars({ count, animate }: { count: number; animate: boolean }) {
  const points = useRef<Points>(null);
  const positions = useMemo(() => {
    const random = seededRandom(7);
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 6 + random() * 9;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      values[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      values[i * 3 + 2] = radius * Math.cos(phi) - 5;
    }
    return values;
  }, [count]);

  useFrame((_, delta) => {
    if (!animate || !points.current) return;
    points.current.rotation.y += delta * 0.02;
    points.current.rotation.x = MathUtils.damp(
      points.current.rotation.x,
      scrollProgress() * 0.6,
      2,
      delta,
    );
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#c4b5fd"
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

export default function Scene({ animate }: { animate: boolean }) {
  const mobile = window.matchMedia('(max-width: 767px)').matches;

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, mobile ? 1.5 : 2]}
      frameloop={animate ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      // The canvas sits behind the page and ignores clicks, so pointer movement is read from
      // the whole document instead.
      eventSource={document.documentElement}
      eventPrefix="client"
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 4]} intensity={60} color="#22d3ee" />
      <pointLight position={[-4, -2, 3]} intensity={45} color="#ff4fa3" />
      <Environment resolution={256}>
        <Lightformer form="ring" intensity={3} color="#8b5cf6" position={[0, 3, -4]} scale={4} />
        <Lightformer
          intensity={2}
          color="#22d3ee"
          position={[-5, 0, 2]}
          rotation-y={Math.PI / 2}
          scale={[8, 2, 1]}
        />
        <Lightformer
          intensity={2}
          color="#c6ff3d"
          position={[5, -1, 1]}
          rotation-y={-Math.PI / 2}
          scale={[6, 1, 1]}
        />
        <Lightformer intensity={1.2} color="#ffffff" position={[0, 0, 6]} scale={[10, 10, 1]} />
      </Environment>
      <Centrepiece animate={animate} />
      <Stars count={mobile ? 500 : 1400} animate={animate} />
    </Canvas>
  );
}
