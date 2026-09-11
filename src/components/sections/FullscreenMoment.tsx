import React from 'react';
import { motion } from 'framer-motion';
import { SceneContainer } from '../3d/SceneContainer';
import { CinematicTunnel } from '../3d/CinematicTunnel';
import { ParticleField } from '../3d/ParticleField';

export const FullscreenMoment: React.FC = () => {
  return (
    <section id="fullscreen" className="fullscreen-section">
      {/* 3D Infinite Perspective Tunnel */}
      <div className="fullscreen-canvas">
        <SceneContainer camera={{ position: [0, 0, 10], fov: 60 }}>
          <ParticleField count={600} radius={30} />
          <CinematicTunnel />
        </SceneContainer>
      </div>

      {/* Cinematic Vignette */}
      <div className="fullscreen-vignette" />

      {/* Overlay Typography */}
      <div className="fullscreen-text-wrap">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
            <span className="section-tag-dot" />
            THE QUANTUM HORIZON // PHASE TRANSITION
          </div>

          <h2 className="fullscreen-title">
            WHERE REALITY <br />
            <span className="gradient-text-cyan glow-text-cyan">
              DISSOLVES
            </span>
          </h2>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 2vw, 1.35rem)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '650px', margin: '0 auto 2rem' }}>
            "The future belongs to those who don’t merely adapt to the digital medium, but sculpt it into something unprecedented."
          </p>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            COORDINATES // [0.00, 0.00, -∞]
          </div>
        </motion.div>
      </div>
    </section>
  );
};
