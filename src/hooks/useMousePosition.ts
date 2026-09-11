import { useState, useEffect, useRef } from 'react';

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1 (useful for Three.js camera & rotation)
  normalizedY: number; // -1 to 1
  targetX: number;
  targetY: number;
}

export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    normalizedX: 0,
    normalizedY: 0,
    targetX: 0,
    targetY: 0,
  });

  const requestRef = useRef<number>(0);
  const currentPos = useRef({ x: position.x, y: position.y });
  const targetPos = useRef({ x: position.x, y: position.y });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      // Smooth lerp (linear interpolation) for fluid lag
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.15;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.15;

      const normX = (targetPos.current.x / window.innerWidth) * 2 - 1;
      const normY = -(targetPos.current.y / window.innerHeight) * 2 + 1;

      setPosition({
        x: currentPos.current.x,
        y: currentPos.current.y,
        targetX: targetPos.current.x,
        targetY: targetPos.current.y,
        normalizedX: normX,
        normalizedY: normY,
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return position;
}
