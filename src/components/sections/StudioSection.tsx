import React, { useState } from 'react';
import { SceneContainer } from '../3d/SceneContainer';
import {
  InteractiveStudio,
  GeometryType,
  MaterialType,
} from '../3d/InteractiveStudio';
import { sound } from '../../audio/soundManager';
import {
  Sliders,
  RotateCw,
  Eye,
  Layers,
  Palette,
  Maximize2,
  Sparkles,
} from 'lucide-react';

export const StudioSection: React.FC = () => {
  const [geometry, setGeometry] = useState<GeometryType>('torusKnot');
  const [material, setMaterial] = useState<MaterialType>('chrome');
  const [color, setColor] = useState('#00f0ff');
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [speed, setSpeed] = useState(1);

  const geometries: { id: GeometryType; label: string }[] = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'dodecahedron', label: 'Dodecahedron' },
    { id: 'octahedron', label: 'Octahedron' },
    { id: 'ring', label: 'Quantum Ring' },
  ];

  const materials: { id: MaterialType; label: string }[] = [
    { id: 'chrome', label: 'Liquid Chrome' },
    { id: 'glass', label: 'Optical Glass' },
    { id: 'obsidian', label: 'Obsidian Void' },
    { id: 'wireframe', label: 'Vector Grid' },
  ];

  const colors = [
    { label: 'Cyan', hex: '#00f0ff' },
    { label: 'Violet', hex: '#a855f7' },
    { label: 'Emerald', hex: '#10b981' },
    { label: 'Amber', hex: '#f59e0b' },
  ];

  const handleGeometryChange = (geom: GeometryType) => {
    sound.playSwitch();
    setGeometry(geom);
  };

  const handleMaterialChange = (mat: MaterialType) => {
    sound.playSwitch();
    setMaterial(mat);
  };

  const handleColorChange = (c: string) => {
    sound.playSwitch();
    setColor(c);
  };

  const toggleWireframe = () => {
    sound.playSwitch();
    setWireframe(!wireframe);
  };

  const toggleAutoRotate = () => {
    sound.playSwitch();
    setAutoRotate(!autoRotate);
  };

  return (
    <section id="studio" className="studio-section">
      <div className="container-custom">
        {/* Section Heading */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          <div className="section-tag">
            <span className="section-tag-dot" />
            02 // EXPERIMENTAL PLAYGROUND
          </div>
          <h2 className="section-title">
            INTERACTIVE 3D <span className="gradient-text-cyan">LABORATORY</span>
          </h2>
          <p className="section-desc">
            Directly manipulate physical geometry, surface optics, and photon dispersion in real-time. Drag within the canvas to orbit and inspect.
          </p>
        </div>

        {/* 3D Lab Studio Container: Canvas + Control Panel */}
        <div className="studio-card-container">
          {/* Main 3D Viewport */}
          <div
            className="studio-viewport"
            data-cursor-type="drag"
            data-cursor-text="ORBIT"
          >
            {/* Viewport HUD tags */}
            <div className="viewport-tag-top">
              <Sparkles size={12} style={{ color: 'var(--cyan)' }} />
              <span>SHADERS: COMPILED</span>
            </div>

            {/* Live 3D Scene */}
            <SceneContainer camera={{ position: [0, 0, 4.5], fov: 45 }}>
              <InteractiveStudio
                geometry={geometry}
                material={material}
                color={color}
                wireframe={wireframe}
                autoRotate={autoRotate}
                speed={speed}
              />
            </SceneContainer>

            {/* Bottom Hint */}
            <div className="viewport-hint-bottom">
              DRAG TO ROTATE • PINCH/SCROLL TO ZOOM
            </div>
          </div>

          {/* Interactive Control Dashboard */}
          <div className="studio-controls">
            {/* Control Group 1: Geometry */}
            <div>
              <div className="control-group-title">
                <Layers size={14} style={{ color: 'var(--cyan)' }} />
                <span>TOPOLOGICAL MESH</span>
              </div>
              <div className="control-grid-buttons">
                {geometries.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => handleGeometryChange(g.id)}
                    className={`ctrl-btn ${geometry === g.id ? 'active' : ''}`}
                    data-cursor="pointer"
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control Group 2: Materials */}
            <div>
              <div className="control-group-title">
                <Sliders size={14} style={{ color: 'var(--cyan)' }} />
                <span>SURFACE MATERIAL</span>
              </div>
              <div className="control-grid-buttons">
                {materials.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleMaterialChange(m.id)}
                    className={`ctrl-btn ${material === m.id ? 'active' : ''}`}
                    data-cursor="pointer"
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control Group 3: Lighting Spectrum */}
            <div>
              <div className="control-group-title">
                <Palette size={14} style={{ color: 'var(--cyan)' }} />
                <span>PHOTON SPECTRUM</span>
              </div>
              <div className="color-swatches">
                {colors.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => handleColorChange(c.hex)}
                    className={`color-swatch-btn ${color === c.hex ? 'active' : ''}`}
                    style={{
                      backgroundColor: c.hex,
                      boxShadow: color === c.hex ? `0 0 16px ${c.hex}` : 'none',
                    }}
                    title={c.label}
                    data-cursor="pointer"
                  />
                ))}
              </div>
            </div>

            {/* Control Group 4: Physics & Toggles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div className="toggle-switch-row">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <RotateCw size={13} className={autoRotate ? 'animate-spin' : ''} />
                  KINETIC INERTIA
                </span>
                <button
                  onClick={toggleAutoRotate}
                  className={`toggle-switch-pill ${autoRotate ? 'on' : 'off'}`}
                  data-cursor="pointer"
                  aria-label="Toggle auto rotation"
                >
                  <span className="toggle-switch-thumb" />
                </button>
              </div>

              <div className="toggle-switch-row">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Eye size={13} />
                  VECTOR WIREFRAME
                </span>
                <button
                  onClick={toggleWireframe}
                  className={`toggle-switch-pill ${wireframe ? 'on' : 'off'}`}
                  data-cursor="pointer"
                  aria-label="Toggle wireframe mode"
                >
                  <span className="toggle-switch-thumb" />
                </button>
              </div>

              {/* Speed Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  <span>ANGULAR VELOCITY</span>
                  <span>{speed}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.2"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--cyan)', cursor: 'pointer' }}
                  data-cursor="pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
