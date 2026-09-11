import React from 'react';
import { Cpu, Zap, Eye, Award } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';

export const ManifestoSection: React.FC = () => {
  const telemetryStats = [
    {
      icon: <Cpu style={{ color: 'var(--cyan)' }} size={24} />,
      value: '120 FPS',
      label: 'KINETIC REFRESH RATE',
      description: 'Sub-millisecond WebGL frame dispatch with zero CPU bottlenecks.',
    },
    {
      icon: <Zap style={{ color: 'var(--violet)' }} size={24} />,
      value: '< 40ms',
      label: 'INPUT-TO-PHOTON',
      description: 'Ultra-low latency pointer interpolation across all viewport bounds.',
    },
    {
      icon: <Eye style={{ color: 'var(--emerald)' }} size={24} />,
      value: '100%',
      label: 'PHYSICALLY ACCURATE',
      description: 'Custom micro-facet BRDF shaders and transmission optics in real-time.',
    },
    {
      icon: <Award style={{ color: 'var(--amber)' }} size={24} />,
      value: '38+',
      label: 'GLOBAL RECOGNITIONS',
      description: 'Honored across Awwwards, FWA of the Day, and Developer Site of the Year.',
    },
  ];

  const marqueeWords = [
    'SPATIAL COMPUTING',
    '•',
    'ALGORITHMIC BEAUTY',
    '•',
    'WEBGL 2.0',
    '•',
    'TACTILE MICROINTERACTIONS',
    '•',
    'ZERO COMPROMISE',
    '•',
    'NEURAL GRAPHICS',
    '•',
  ];

  return (
    <section id="manifesto" className="manifesto-section">
      {/* Kinetic Infinite Marquee */}
      <div className="marquee-strip">
        <div className="marquee-content">
          {marqueeWords.concat(marqueeWords).map((word, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '2rem' }}>
              <span>{word}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container-custom">
        {/* Section Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <span className="section-tag-dot" />
            01 // CORE PHILOSOPHY
          </div>

          <h2 className="section-title">
            BEYOND STATIC PAGES.{' '}
            <span className="gradient-text-cyan">
              WE ARCHITECT TACTILE DIGITAL UNIVERSES.
            </span>
          </h2>

          <p className="section-desc">
            The conventional web is planar, predictable, and quiet. We treat the browser as a volumetric viewport — crafting spatial dimensions where real-time light, physical inertia, and generative geometry coalesce to spark genuine human wonder.
          </p>
        </div>

        {/* Telemetry Stat Cards with 3D Tilt */}
        <div className="stats-grid">
          {telemetryStats.map((stat, idx) => (
            <TiltCard key={idx} dataCursor="pointer">
              <div className="stat-card-inner">
                <div>
                  <div className="stat-icon-wrap">
                    {stat.icon}
                  </div>
                  <div className="stat-value">
                    {stat.value}
                  </div>
                  <div className="stat-label">
                    {stat.label}
                  </div>
                </div>
                <p className="stat-desc">
                  {stat.description}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
