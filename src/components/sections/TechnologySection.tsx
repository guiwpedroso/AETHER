import React from 'react';
import {
  Code2,
  Boxes,
  Waves,
  Sparkles,
  Gauge,
  Glasses,
} from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';

export const TechnologySection: React.FC = () => {
  const capabilities = [
    {
      icon: <Code2 size={24} style={{ color: 'var(--cyan)' }} />,
      title: 'CUSTOM GLSL SHADERS',
      category: 'OPTICS & LIGHTING',
      description:
        'Tailored vertex distortion, Fresnel chromatic aberrations, and procedural noise surfaces compiled natively on GPU pipelines.',
      tech: ['GLSL 3.0', 'BRDF Optics', 'Noise Algorithms'],
    },
    {
      icon: <Boxes size={24} style={{ color: 'var(--violet)' }} />,
      title: 'INSTANCED PARTICLES',
      category: 'PHYSICS SIMULATION',
      description:
        'Rendering millions of spatial vectors simultaneously through InstancedBufferGeometry with minimal memory and zero CPU strain.',
      tech: ['Instancing', 'Barnes-Hut', 'Compute Emulation'],
    },
    {
      icon: <Waves size={24} style={{ color: 'var(--emerald)' }} />,
      title: 'SPATIAL AUDIO SYNTHESIS',
      category: 'AUDITORY HAPTICS',
      description:
        'Procedural audio oscillator grids that dynamically modulate pitch, resonance, and stereo panning based on cursor velocity and 3D camera depth.',
      tech: ['Web Audio API', 'Binaural Panners', 'Convolution Reverb'],
    },
    {
      icon: <Sparkles size={24} style={{ color: 'var(--amber)' }} />,
      title: 'KINETIC MOTION ENGINE',
      category: 'CHOREOGRAPHY',
      description:
        'Sub-pixel smooth scrolling and spring physics harmonized between Lenis, GSAP, and Framer Motion for cinematic interaction.',
      tech: ['Lenis Scroll', 'GSAP Timeline', 'Spring Dampening'],
    },
    {
      icon: <Gauge size={24} style={{ color: 'var(--cyan)' }} />,
      title: '120 FPS CALIBRATION',
      category: 'PERFORMANCE',
      description:
        'Dynamic Resolution Scaling (DRS) and automatic device profiling ensure fluid high-refresh-rate operation from mobile to 8K workstations.',
      tech: ['DPR Clamping', 'Draw-call Batching', 'KTX2 Textures'],
    },
    {
      icon: <Glasses size={24} style={{ color: 'var(--violet)' }} />,
      title: 'WEBXR & SPATIAL READY',
      category: 'NEXT PLATFORMS',
      description:
        'Architected from day one for spatial computing headsets, VisionOS, and tactile 6-DoF volumetric navigation.',
      tech: ['WebXR Device API', 'Hand Tracking', 'Spatial Anchors'],
    },
  ];

  return (
    <section id="capabilities" style={{ position: 'relative', width: '100%', padding: '6rem 0', backgroundColor: '#040407', overflow: 'hidden' }}>
      <div className="container-custom">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <span className="section-tag-dot" />
            04 // TECHNICAL SPECIFICATION
          </div>
          <h2 className="section-title">
            ENGINEERED WITH <span className="gradient-text-cyan">ZERO LIMITS</span>
          </h2>
          <p className="section-desc">
            Every layer of our stack is hand-tuned for sensory immersion, frame budget determinism, and architectural longevity.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="capabilities-grid">
          {capabilities.map((item, idx) => (
            <TiltCard key={idx} dataCursor="pointer">
              <div className="capability-card-inner">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div className="stat-icon-wrap" style={{ marginBottom: 0 }}>
                      {item.icon}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {item.category}
                    </span>
                  </div>

                  <h3 className="capability-title">
                    {item.title}
                  </h3>
                  <p className="capability-desc">
                    {item.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  {item.tech.map((t, tIdx) => (
                    <span key={tIdx} className="project-tag" style={{ color: 'var(--cyan)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
