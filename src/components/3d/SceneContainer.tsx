import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

interface SceneContainerProps {
  children: React.ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov?: number };
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export const SceneContainer: React.FC<SceneContainerProps> = ({
  children,
  className = '',
  camera = { position: [0, 0, 5], fov: 45 },
  onPointerOver,
  onPointerOut,
}) => {
  return (
    <div
      className={`relative w-full h-full ${className}`}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <Canvas
        dpr={[1, 2]} // Cap DPR between 1 and 2 for optimal high-DPI rendering and battery conservation
        camera={camera}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'auto' }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};
