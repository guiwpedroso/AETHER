import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

export type GeometryType = 'torusKnot' | 'icosahedron' | 'dodecahedron' | 'octahedron' | 'ring';
export type MaterialType = 'chrome' | 'glass' | 'obsidian' | 'wireframe';

interface InteractiveStudioProps {
  geometry: GeometryType;
  material: MaterialType;
  color: string;
  wireframe: boolean;
  autoRotate: boolean;
  speed: number;
}

export const InteractiveStudio: React.FC<InteractiveStudioProps> = ({
  geometry,
  material,
  color,
  wireframe,
  autoRotate,
  speed,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.x = time * 0.3 * speed;
      meshRef.current.rotation.y = time * 0.4 * speed;
    }
  });

  // Render chosen geometry
  const renderGeometry = () => {
    switch (geometry) {
      case 'torusKnot':
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1.3, 2]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1.3, 1]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1.4, 0]} />;
      case 'ring':
        return <torusGeometry args={[1.2, 0.25, 32, 100]} />;
      default:
        return <torusKnotGeometry args={[1, 0.35, 128, 32]} />;
    }
  };

  // Render chosen material
  const renderMaterial = () => {
    if (wireframe || material === 'wireframe') {
      return (
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          wireframe
          roughness={0.2}
          metalness={0.8}
        />
      );
    }

    switch (material) {
      case 'chrome':
        return (
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.06}
            metalness={0.96}
            envMapIntensity={2}
          />
        );
      case 'glass':
        return (
          <meshPhysicalMaterial
            color={color}
            roughness={0.15}
            transmission={0.85}
            thickness={1.5}
            ior={1.6}
            transparent
            opacity={0.85}
            metalness={0.1}
          />
        );
      case 'obsidian':
        return (
          <meshStandardMaterial
            color="#090a0f"
            roughness={0.12}
            metalness={0.92}
            emissive={color}
            emissiveIntensity={0.15}
          />
        );
      default:
        return (
          <meshStandardMaterial
            color={color}
            roughness={0.2}
            metalness={0.8}
          />
        );
    }
  };

  return (
    <>
      <OrbitControls
        enableZoom={true}
        minDistance={2.5}
        maxDistance={8}
        enablePan={false}
        dampingFactor={0.05}
      />

      {/* Studio Lighting Rig */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.8} />
      <directionalLight position={[-5, -4, -5]} intensity={0.8} color="#ffffff" />
      <pointLight
        ref={glowRef}
        position={[3, 2, 4]}
        intensity={5}
        color={color}
        distance={10}
      />
      <pointLight position={[-4, -2, -3]} intensity={3} color="#ffffff" distance={10} />

      {/* Floating 3D Object */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={meshRef} scale={1.2}>
          {renderGeometry()}
          {renderMaterial()}
        </mesh>
      </Float>
    </>
  );
};
