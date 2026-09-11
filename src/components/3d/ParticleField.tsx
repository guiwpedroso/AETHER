import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  radius?: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 700,
  radius = 25,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#00f0ff');
    const color2 = new THREE.Color('#a855f7');
    const color3 = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      // Spread in a spherical or cubic volume
      pos[i * 3] = (Math.random() - 0.5) * radius * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * radius * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * radius * 2;

      // Color variation
      const mixRatio = Math.random();
      const chosenColor =
        mixRatio < 0.45 ? color1 : mixRatio < 0.85 ? color2 : color3;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const { pointer } = state;

    pointsRef.current.rotation.y = time * 0.02 + pointer.x * 0.05;
    pointsRef.current.rotation.x = -pointer.y * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
