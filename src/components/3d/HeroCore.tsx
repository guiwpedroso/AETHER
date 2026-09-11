import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Ring } from '@react-three/drei';
import * as THREE from 'three';

export const HeroCore: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const secondRingRef = useRef<THREE.Group>(null);
  const satellitesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { pointer } = state;

    // Smooth rotation with mouse influence
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        time * 0.25 + pointer.y * 0.4,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        time * 0.35 + pointer.x * 0.5,
        0.05
      );
    }

    // Outer orbital rings counter-rotating
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 0.15;
      outerRingRef.current.rotation.x = Math.sin(time * 0.2) * 0.4 + pointer.y * 0.2;
      outerRingRef.current.rotation.y = pointer.x * 0.25;
    }

    if (secondRingRef.current) {
      secondRingRef.current.rotation.z = -time * 0.2;
      secondRingRef.current.rotation.y = Math.cos(time * 0.25) * 0.5;
    }

    // Floating satellite shards
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y = time * 0.18;
      satellitesRef.current.rotation.x = Math.sin(time * 0.15) * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Dynamic Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-6, 4, 3]} intensity={4} color="#00f0ff" distance={15} />
      <pointLight position={[6, -4, 3]} intensity={4} color="#a855f7" distance={15} />
      <pointLight position={[0, -6, -4]} intensity={2} color="#10b981" distance={12} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Core Polymorphic Nucleus */}
        <mesh ref={meshRef} scale={1.4}>
          <icosahedronGeometry args={[1, 16]} />
          <MeshDistortMaterial
            color="#08090f"
            roughness={0.12}
            metalness={0.92}
            distort={0.42}
            speed={2.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={0.9}
          />
        </mesh>

        {/* Primary Orbital Tech Ring */}
        <group ref={outerRingRef}>
          <Ring args={[2.0, 2.03, 64]}>
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={0.6}
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
              wireframe
            />
          </Ring>
        </group>

        {/* Secondary Inclined Ring */}
        <group ref={secondRingRef} rotation={[Math.PI / 3, 0, 0]}>
          <Ring args={[2.3, 2.32, 64]}>
            <meshStandardMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={0.5}
              side={THREE.DoubleSide}
              transparent
              opacity={0.6}
              wireframe
            />
          </Ring>
        </group>

        {/* Floating Satellite Crystals */}
        <group ref={satellitesRef}>
          {[
            { pos: [2.5, 0.8, 0.5] as [number, number, number], scale: 0.12 },
            { pos: [-2.2, -1.2, 0.8] as [number, number, number], scale: 0.15 },
            { pos: [0.8, 2.4, -0.6] as [number, number, number], scale: 0.1 },
            { pos: [-1.4, 2.0, 1.2] as [number, number, number], scale: 0.13 },
            { pos: [1.8, -1.8, -1.0] as [number, number, number], scale: 0.16 },
          ].map((sat, i) => (
            <mesh key={i} position={sat.pos} scale={sat.scale}>
              <octahedronGeometry />
              <meshStandardMaterial
                color="#ffffff"
                emissive={i % 2 === 0 ? "#00f0ff" : "#a855f7"}
                emissiveIntensity={0.8}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
};
