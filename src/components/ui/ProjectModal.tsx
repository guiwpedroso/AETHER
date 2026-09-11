import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Cpu, Layers, Activity, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../audio/soundManager';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  fullOverview: string;
  stats: { label: string; value: string }[];
  technologies: string[];
  features: string[];
  gradient: string;
  accentColor: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      sound.playWhoosh();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const handleSimulate = (e: React.MouseEvent) => {
    sound.playSelect();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 70,
      spread: 75,
      origin: { x, y },
      colors: ['#00f0ff', '#a855f7', '#10b981', '#ffffff'],
    });
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="modal-backdrop">
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="modal-card"
            style={{
              boxShadow: `0 25px 60px -15px rgba(0,0,0,0.8), 0 0 40px -10px ${project.accentColor}44`,
            }}
          >
            {/* Top Close Button */}
            <button
              onClick={() => {
                sound.playHoverClick();
                onClose();
              }}
              className="modal-close-btn"
              data-cursor="pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Header Metadata */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span className="badge-tech" style={{ color: 'var(--cyan)', borderColor: 'rgba(0,240,255,0.3)' }}>
                {project.category}
              </span>
              <span className="badge-tech">
                CYCLE: {project.year}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--emerald)' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--emerald)', boxShadow: '0 0 8px var(--emerald)' }} />
                ACTIVE PROTOCOL
              </span>
            </div>

            {/* Project Title */}
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
              {project.title}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.75rem', maxWidth: '650px' }}>
              {project.tagline}
            </p>

            {/* Simulated Live Visual Banner */}
            <div
              style={{
                width: '100%',
                height: '180px',
                borderRadius: '16px',
                background: project.gradient,
                border: '1px solid var(--border-medium)',
                marginBottom: '1.75rem',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Activity size={14} style={{ color: 'var(--cyan)' }} />
                  REAL-TIME TELEMETRY STREAM
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  SYS_ID // 0x{project.id.toUpperCase()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--cyan)', marginBottom: '2px' }}>
                    LATENCY OPTIMIZED
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                    60 FPS DETERMINISTIC
                  </div>
                </div>
                <button
                  onClick={handleSimulate}
                  className="btn-primary"
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.72rem' }}
                  data-cursor="pointer"
                >
                  <Cpu size={14} />
                  TRIGGER PULSE
                </button>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="modal-stats-row">
              {project.stats.map((st, i) => (
                <div key={i} className="modal-stat-box">
                  <div className="modal-stat-label">
                    {st.label}
                  </div>
                  <div className="modal-stat-val">
                    {st.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Architectural Overview */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Layers size={14} />
                ARCHITECTURAL SPECIFICATION
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {project.fullOverview}
              </p>
            </div>

            {/* Features list */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={14} />
                CORE CAPABILITIES & SHADERS
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.65rem' }}>
                {project.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--cyan)', marginTop: '6px', flexShrink: 0 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                DEPLOYED STACK & KERNEL
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.technologies.map((tech, i) => (
                  <span key={i} className="project-tag" style={{ color: 'var(--cyan)', padding: '0.35rem 0.65rem' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                PROPRIETARY DESIGN SYSTEM // 2026
              </span>
              <button
                onClick={handleSimulate}
                className="btn-primary"
                data-cursor="pointer"
              >
                <span>EXPLORE ARCHITECTURE</span>
                <ExternalLink size={15} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
