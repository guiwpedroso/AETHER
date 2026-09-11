import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../../audio/soundManager';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SPATIAL ENGINE...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const statuses = [
      'INITIALIZING SPATIAL ENGINE...',
      'COMPILING WEBGL 2.0 SHADERS...',
      'SYNTHESIZING PROCEDURAL PARTICLES...',
      'CALIBRATING 60FPS TELEMETRY...',
      'LAUNCHING AETHER // DYNAMICS...',
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setStatusText('INITIALIZATION COMPLETE');
        clearInterval(interval);

        sound.playSelect();

        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 800);
        }, 400);
      } else {
        setProgress(current);
        sound.playTick();

        const statusIdx = Math.floor((current / 100) * (statuses.length - 1));
        setStatusText(statuses[statusIdx]);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(12px)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
          className="preloader-overlay"
        >
          {/* Subtle background glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'rgba(0, 240, 255, 0.08)',
              filter: 'blur(120px)',
              pointerEvents: 'none',
            }}
          />

          {/* Central Logo & Title */}
          <div className="preloader-center">
            {/* Minimalist Geometric Emblem */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="preloader-emblem"
            >
              <div className="preloader-emblem-ring" />
              <div className="preloader-emblem-core" />
            </motion.div>

            {/* Split Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="preloader-title"
            >
              AETHER <span style={{ color: 'var(--cyan)' }}>//</span> DYNAMICS
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="preloader-subtitle"
            >
              SPATIAL COMPUTING & 3D WEBGL LABORATORY
            </motion.div>

            {/* Progress Counter */}
            <div className="preloader-counter">
              <span className="preloader-digits">
                {progress < 10 ? `0${progress}` : progress}
              </span>
              <span className="preloader-percent">%</span>
            </div>

            {/* Progress Bar */}
            <div className="preloader-bar-wrap">
              <div
                className="preloader-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status Telemetry */}
            <div className="preloader-telemetry">
              {statusText}
            </div>
          </div>

          {/* Bottom HUD info */}
          <div className="preloader-footer">
            <span>KERNEL: 0x7E3F</span>
            <span>SYSTEM STATUS: OPTIMAL</span>
            <span>SECURE SESSION</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
