import React from 'react';
import { motion } from 'framer-motion';
import { SceneContainer } from '../3d/SceneContainer';
import { HeroCore } from '../3d/HeroCore';
import { ParticleField } from '../3d/ParticleField';
import { MagneticButton } from '../ui/MagneticButton';
import { useMousePosition } from '../../hooks/useMousePosition';
import { ArrowDown, Compass, Sparkles, Terminal } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onLaunchStudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onLaunchStudio,
}) => {
  const mouse = useMousePosition();
  const headlineWords = ['ENGINEERING', 'THE', 'UNSEEN'];

  return (
    <section id="hero" className="hero-section">
      {/* Background 3D Canvas Layer */}
      <div
        className="hero-canvas-wrap"
        data-cursor-type="drag"
        data-cursor-text="DRAG"
      >
        <SceneContainer camera={{ position: [0, 0, 5.2], fov: 42 }}>
          <ParticleField count={450} radius={22} />
          <HeroCore />
        </SceneContainer>
      </div>

      {/* Bottom Vignette */}
      <div className="hero-vignette-bottom" />

      {/* Floating HUD Telemetry Tags */}
      <div className="hud-tag top-left">
        <div className="hud-pill">
          <Terminal size={12} style={{ color: 'var(--cyan)' }} />
          <span>SPATIAL_PIPELINE // R3F_V8</span>
        </div>
        <div className="hud-pill">
          COORD: [{(mouse.normalizedX * 100).toFixed(0)}, {(mouse.normalizedY * 100).toFixed(0)}]
        </div>
      </div>

      <div className="hud-tag top-right">
        <div className="hud-pill">
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--emerald)', boxShadow: '0 0 8px var(--emerald)' }} />
          <span>REALTIME: 60 FPS</span>
        </div>
        <div className="hud-pill">
          DPR: AUTO_CALIBRATED
        </div>
      </div>

      {/* Foreground Hero Content */}
      <div className="container-custom">
        <div className="hero-content">
          {/* Top Tag Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-pill"
          >
            <Sparkles size={13} style={{ color: 'var(--cyan)' }} />
            <span>NEXT-GEN SPATIAL COMPUTING // 2026 ARCHIVE</span>
          </motion.div>

          {/* Kinetic Headline */}
          <h1 className="hero-headline">
            {headlineWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`word ${index === 2 ? 'gradient-text-cyan glow-text-cyan' : ''}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="hero-subheadline"
          >
            We architect ultra-immersive 3D environments, algorithmic physics, and bespoke spatial interfaces for organizations redefining the edge of the internet.
          </motion.p>

          {/* Magnetic CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            className="hero-ctas"
          >
            <MagneticButton
              variant="primary"
              onClick={onLaunchStudio}
              dataCursor="pointer"
            >
              <Compass size={16} />
              <span>ENTER 3D LAB</span>
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              onClick={onExploreClick}
              dataCursor="pointer"
            >
              <span>EXPLORE ARCHIVE</span>
            </MagneticButton>
          </motion.div>

          {/* Mouse Orbit hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="hero-orbit-hint"
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }} />
            <span>INTERACTIVE 3D MESH // MOVE CURSOR TO DEFLECT</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={onExploreClick}
        className="scroll-down-btn"
        aria-label="Scroll to next section"
        data-cursor="pointer"
      >
        <ArrowDown size={18} />
      </button>
    </section>
  );
};
