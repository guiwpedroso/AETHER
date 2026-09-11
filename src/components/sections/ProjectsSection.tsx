import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard } from '../ui/TiltCard';
import { ProjectModal, ProjectData } from '../ui/ProjectModal';
import { sound } from '../../audio/soundManager';
import { ArrowUpRight, Sparkles, Filter } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const projects: ProjectData[] = [
    {
      id: 'chronos',
      title: 'PROJECT CHRONOS',
      category: 'Spatial OS',
      year: '2026',
      tagline: 'High-frequency algorithmic trading viewport with multi-dimensional depth.',
      description: 'Translating terabytes of millisecond financial order-book telemetry into real-time volumetric WebGL landscapes.',
      fullOverview: 'Project Chronos replaces legacy planar financial dashboards with a 6-DoF spatial canvas. Traders navigate through liquidity depth clouds rendered via custom instanced geometry shaders, reducing critical decision latency from 4.2 seconds to sub-second instinctual perception.',
      stats: [
        { label: 'Throughput', value: '2.4M msg/s' },
        { label: 'Frame Rate', value: '120 FPS' },
        { label: 'Shader Pass', value: '3-stage PBR' },
        { label: 'Accuracy', value: '99.999%' },
      ],
      technologies: ['React Three Fiber', 'Web Workers', 'Custom GLSL', 'WebSockets', 'Tailored BRDF'],
      features: [
        'Volumetric liquidity point cloud with mouse repel physics',
        'Deterministic order flow tracing with color-coded latency spikes',
        'Sub-millisecond Web Audio haptic feedback on execution events',
        'Dynamic depth-of-field post-processing pipeline',
      ],
      gradient: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(10, 15, 25, 0.95) 100%)',
      accentColor: '#00f0ff',
    },
    {
      id: 'vortex',
      title: 'VORTEX SPATIAL',
      category: 'WebGL 3D',
      year: '2025',
      tagline: 'Spatial Computing Operating System for next-generation volumetric optics.',
      description: 'A revolutionary WebGL workspace environment designed for gesture-driven spatial computing and boundless multi-window canvases.',
      fullOverview: 'Vortex Spatial unifies 3D interface physics with fluid gestural dynamics. Built with custom Signed Distance Field (SDF) shaders and dynamic raymarching, every UI element refracts ambient environment light while preserving extreme battery and thermal efficiency.',
      stats: [
        { label: 'Optics IOR', value: '1.52 Refract' },
        { label: 'Render Loop', value: '60 FPS Fixed' },
        { label: 'Draw Calls', value: '< 18 Batched' },
        { label: 'Payload', value: '142 KB Core' },
      ],
      technologies: ['Three.js', 'Raymarching GLSL', 'Framer Motion', 'WebXR', 'Compute Shaders'],
      features: [
        'Zero-latency hand-tracking pointer deflection',
        'Fresnel rim-light edge dispersion on glassmorphic window panes',
        'Volumetric spatial audio positioning in 3D coordinate space',
        'Adaptive dynamic resolution scaling for low-power hardware',
      ],
      gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(15, 10, 25, 0.95) 100%)',
      accentColor: '#a855f7',
    },
    {
      id: 'neural',
      title: 'NEURAL HORIZON',
      category: 'Generative AI',
      year: '2026',
      tagline: 'Multi-dimensional latent space navigator rendered in physical 3D space.',
      description: 'Transforming 4096-dimensional transformer embeddings into an interactive, explorable cosmos of interconnected concepts.',
      fullOverview: 'Neural Horizon breaks the conversational chatbot barrier by projecting large multimodal model representations into a reactive 3D topological manifold. Users can fly through conceptual clusters, pinch semantic branches, and synthesize real-time nodes.',
      stats: [
        { label: 'Manifold Nodes', value: '500,000' },
        { label: 'Inference', value: '18ms Global' },
        { label: 'Memory', value: '48MB VRAM' },
        { label: 'Precision', value: 'FP16 SIMD' },
      ],
      technologies: ['WebGL 2.0', 'U-MAP SIMD', 'Web Audio API', 'TypeScript', 'InstancedBufferGeometry'],
      features: [
        'GPU-accelerated Barnes-Hut gravitational node positioning',
        'Bioluminescent semantic clustering with proximity-based glow',
        'Continuous pinch-to-zoom through deep hierarchical abstractions',
        'Procedural audio frequency modulation reflecting cluster density',
      ],
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(10, 25, 18, 0.95) 100%)',
      accentColor: '#10b981',
    },
    {
      id: 'aura',
      title: 'AURA HYPERCAR',
      category: 'WebGL 3D',
      year: '2025',
      tagline: 'Photorealistic real-time automotive configurator with custom transmission optics.',
      description: 'Real-time studio lighting, micro-metallic flake paint shaders, and interactive aerodynamic airflow simulation on the web.',
      fullOverview: 'Crafted for a luxury electric hypercar marque, Aura delivers cinematic showroom fidelity directly inside mobile and desktop web browsers without any plugin or heavy streaming service required.',
      stats: [
        { label: 'Polygons', value: '1.2M Optimized' },
        { label: 'Textures', value: '4K KTX2 BC7' },
        { label: 'Load Time', value: '1.2s CDN' },
        { label: 'Fidelity', value: 'Unreal Tier' },
      ],
      technologies: ['React Three Fiber', 'KTX2 Compression', 'HDRI Radiance', 'Postprocessing', 'GSAP'],
      features: [
        'Multi-coat pearlescent paint shader with dynamic clearcoat refraction',
        'Interactive aerodynamic streamline visualization with velocity vectors',
        'Interior cockpit panoramic 360 inspection with ambient light transitions',
        'Instantaneous AR export to Apple QuickLook & Google SceneViewer',
      ],
      gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(25, 20, 10, 0.95) 100%)',
      accentColor: '#f59e0b',
    },
  ];

  const categories = ['All', 'Spatial OS', 'WebGL 3D', 'Generative AI'];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleCategoryClick = (cat: string) => {
    sound.playHoverClick();
    setActiveCategory(cat);
  };

  const handleProjectClick = (p: ProjectData) => {
    setSelectedProject(p);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="projects-top-bar">
          <div>
            <div className="section-tag">
              <span className="section-tag-dot" />
              03 // CURATED PORTFOLIO
            </div>
            <h2 className="section-title">
              LANDMARK <span className="gradient-text-cyan">COMMISSIONS</span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="category-filter-group">
            <Filter size={14} style={{ color: 'var(--text-muted)', marginRight: '0.25rem' }} />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                data-cursor="pointer"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard
                  className="project-card-box"
                  onClick={() => handleProjectClick(project)}
                  glareColor={`${project.accentColor}25`}
                  dataCursorType="view"
                >
                  {/* Card Visual Banner */}
                  <div
                    className="project-banner-visual"
                    style={{ background: project.gradient }}
                  >
                    {/* Top Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
                      <span className="badge-tech">
                        {project.category}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>
                        {project.year}
                      </span>
                    </div>

                    {/* Center Accent Icon */}
                    <div style={{ alignSelf: 'center', zIndex: 2 }}>
                      <div
                        style={{
                          width: '58px',
                          height: '58px',
                          borderRadius: '14px',
                          backgroundColor: `${project.accentColor}20`,
                          border: `1px solid ${project.accentColor}50`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 0 25px ${project.accentColor}33`,
                        }}
                      >
                        <Sparkles size={24} style={{ color: project.accentColor }} />
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2, fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.8)' }}>
                      <span>
                        {project.stats[0].label}: <strong style={{ color: '#fff' }}>{project.stats[0].value}</strong>
                      </span>
                      <span>
                        FPS: <strong style={{ color: 'var(--emerald)' }}>120</strong>
                      </span>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div>
                    <div className="project-title-row">
                      <h3 className="project-card-title">
                        {project.title}
                      </h3>
                      <div className="arrow-icon-circle">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>

                    <p className="project-card-desc">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="project-tags-list">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="project-tag">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="project-tag" style={{ color: 'var(--cyan)' }}>
                          +{project.technologies.length - 3} MORE
                        </span>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
