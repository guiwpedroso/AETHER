import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CinematicTunnel: React.FC = () => {
  const ringsRef = useRef<THREE.Group>(null);
  const ringCount = 20;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { pointer } = state;

    if (ringsRef.current) {
      // Rotate the whole tunnel system
      ringsRef.current.rotation.z = time * 0.1;
      ringsRef.current.rotation.x = pointer.y * 0.15;
      ringsRef.current.rotation.y = pointer.x * 0.15;

      // Animate rings along Z axis to create endless flight sensation
      ringsRef.current.children.forEach((child, index) => {
        const ring = child as THREE.Mesh;
        ring.position.z = ((index * 2 + time * 3) % 40) - 20;
        const distFromCenter = Math.abs(ring.position.z);
        const scale = 1 + (ring.position.z + 20) * 0.08;
        ring.scale.set(scale, scale, 1);
        
        // Dynamic opacity fade based on distance
        if (ring.material instanceof THREE.MeshBasicMaterial) {
          ring.material.opacity = Math.max(0, 1 - distFromCenter / 20) * 0.7;
        }
      });
    }
  });

  return (
    <group ref={ringsRef}>
      {Array.from({ length: ringCount }).map((_, i) => (
        <mesh key={i} position={[0, 0, (i * 2) - 20]}>
          <ringGeometry args={[1.8, 1.84, 48]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#00f0ff' : '#a855f7'}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};
