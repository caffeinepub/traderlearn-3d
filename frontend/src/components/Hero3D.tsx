import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  const speeds = useMemo(() => {
    return Array.from({ length: count }, () => Math.random() * 0.5 + 0.2);
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += Math.sin(t * speeds[i] + i) * 0.003;
      posArr[i * 3] += Math.cos(t * speeds[i] * 0.5 + i) * 0.002;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#c8a84b"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

interface CandleProps {
  position: [number, number, number];
  height: number;
  isGreen: boolean;
  wickHeight: number;
  delay: number;
}

function Candle({ position, height, isGreen, wickHeight, delay }: CandleProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() + delay;
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.15;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.05;
  });

  const color = isGreen ? '#22c55e' : '#ef4444';
  const emissive = isGreen ? '#16a34a' : '#dc2626';

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.3, height, 0.3]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.3}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      {/* Wick */}
      <mesh position={[0, height / 2 + wickHeight / 2, 0]}>
        <boxGeometry args={[0.04, wickHeight, 0.04]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.5} />
      </mesh>
      {/* Lower wick */}
      <mesh position={[0, -height / 2 - 0.2, 0]}>
        <boxGeometry args={[0.04, 0.4, 0.04]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null!);

  useFrame(({ clock }) => {
    if (!gridRef.current) return;
    gridRef.current.position.z = (clock.getElapsedTime() * 0.5) % 2;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, '#c8a84b', '#1a1a2e']}
      position={[0, -3, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function GlowRing() {
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const t = clock.getElapsedTime();
    ringRef.current.rotation.z = t * 0.2;
    ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    const mat = ringRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.3 + Math.sin(t * 1.5) * 0.2;
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -5]}>
      <torusGeometry args={[4, 0.05, 8, 80]} />
      <meshStandardMaterial
        color="#c8a84b"
        emissive="#c8a84b"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

const candleData: CandleProps[] = [
  { position: [-5, 0, -2], height: 1.2, isGreen: true, wickHeight: 0.5, delay: 0 },
  { position: [-3.5, 0, -2], height: 0.8, isGreen: false, wickHeight: 0.4, delay: 0.5 },
  { position: [-2, 0, -2], height: 1.5, isGreen: true, wickHeight: 0.6, delay: 1 },
  { position: [-0.5, 0, -2], height: 1.0, isGreen: true, wickHeight: 0.3, delay: 1.5 },
  { position: [1, 0, -2], height: 0.6, isGreen: false, wickHeight: 0.5, delay: 2 },
  { position: [2.5, 0, -2], height: 1.8, isGreen: true, wickHeight: 0.7, delay: 2.5 },
  { position: [4, 0, -2], height: 1.3, isGreen: true, wickHeight: 0.4, delay: 3 },
  { position: [5.5, 0, -2], height: 0.9, isGreen: false, wickHeight: 0.6, delay: 3.5 },
];

function Scene() {
  return (
    <>
      <color attach="background" args={['#080b14']} />
      <fog attach="fog" args={['#080b14', 15, 35]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 0]} intensity={1} color="#c8a84b" />
      <pointLight position={[-8, 3, -3]} intensity={0.5} color="#4488ff" />
      <pointLight position={[8, 3, -3]} intensity={0.5} color="#c8a84b" />
      <FloatingParticles />
      <GridFloor />
      <GlowRing />
      {candleData.map((candle, i) => (
        <Candle key={i} {...candle} />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
