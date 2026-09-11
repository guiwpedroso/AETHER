import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../audio/soundManager';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glareColor?: string;
  dataCursor?: string;
  dataCursorType?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  onClick,
  glareColor = 'rgba(0, 240, 255, 0.15)',
  dataCursor = 'pointer',
  dataCursorType,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-12deg to 12deg max)
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    // Glare position percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotation({ x: rotateX, y: rotateY });
    setGlarePos({ x: glareX, y: glareY, opacity: 1 });
  };

  const handleMouseEnter = () => {
    sound.playHoverClick();
    setGlarePos(prev => ({ ...prev, opacity: 1 }));
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="relative"
      data-cursor={dataCursor}
      data-cursor-type={dataCursorType}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (onClick) {
            sound.playSelect();
            onClick();
          }
        }}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 260,
          mass: 0.4,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/80 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/40 ${className}`}
      >
        {/* Specular glare overlay following mouse */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 10,
            opacity: glarePos.opacity,
            transition: 'opacity 0.3s ease',
            background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, ${glareColor}, transparent 70%)`,
          }}
        />

        {/* Content with 3D offset */}
        <div style={{ transform: 'translateZ(20px)' }} className="relative z-0">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
