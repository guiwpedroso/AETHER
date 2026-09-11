import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../audio/soundManager';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'glass';
  dataCursor?: string;
  href?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  dataCursor = 'pointer',
  href,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Magnetic pull strength
    const distanceX = (clientX - centerX) * 0.25;
    const distanceY = (clientY - centerY) * 0.25;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseEnter = () => {
    sound.playHoverClick();
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = () => {
    sound.playSelect();
    if (onClick) onClick();
  };

  const buttonStyleClass =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'secondary'
      ? 'btn-secondary'
      : 'glass-pill px-6 py-3 text-xs font-mono tracking-wider text-white hover:border-cyan-400/50 transition-all';

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.2 }}
      className={`inline-block cursor-pointer ${className}`}
      data-cursor={dataCursor}
    >
      <div className={buttonStyleClass}>
        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block no-underline">
        {content}
      </a>
    );
  }

  return content;
};
