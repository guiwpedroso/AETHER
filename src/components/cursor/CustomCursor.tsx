import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text' | 'drag' | 'view'>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check element under cursor for special attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, textarea, [data-cursor], [role="button"]');
      const customCursorData = target.closest('[data-cursor-type]');
      const customTextData = target.closest('[data-cursor-text]');

      if (customTextData) {
        setCursorType('text');
        setCursorLabel(customTextData.getAttribute('data-cursor-text') || '');
      } else if (customCursorData) {
        const type = customCursorData.getAttribute('data-cursor-type') as 'drag' | 'view' | 'pointer';
        setCursorType(type || 'pointer');
        setCursorLabel(type === 'drag' ? 'DRAG' : type === 'view' ? 'VIEW' : '');
      } else if (interactive) {
        setCursorType('pointer');
        setCursorLabel('');
      } else {
        setCursorType('default');
        setCursorLabel('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch) return null;

  const isExpanded = cursorType === 'pointer' || cursorType === 'view' || cursorType === 'drag' || cursorType === 'text';

  return (
    <div className="custom-cursor-container pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Central sharp dot */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? (isExpanded ? 0 : 1) : 0,
        }}
        className="w-1.5 h-1.5 rounded-full bg-white pointer-events-none transition-opacity duration-200"
      />

      {/* Smooth trailing outer ring */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: cursorType === 'text' ? 70 : cursorType === 'drag' ? 64 : cursorType === 'view' ? 64 : cursorType === 'pointer' ? 44 : 26,
          height: cursorType === 'text' ? 70 : cursorType === 'drag' ? 64 : cursorType === 'view' ? 64 : cursorType === 'pointer' ? 44 : 26,
          backgroundColor: isExpanded ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
          borderColor: isExpanded ? 'rgba(0, 240, 255, 0.7)' : 'rgba(255, 255, 255, 0.35)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="rounded-full border flex items-center justify-center backdrop-blur-[2px] pointer-events-none"
      >
        {cursorLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="font-mono text-[9px] font-bold tracking-widest text-cyan-300 uppercase select-none"
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};
