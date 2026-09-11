import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { sound } from '../../audio/soundManager';
import confetti from 'canvas-confetti';
import { Send, CheckCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Spatial Computing',
    message: '',
  });

  const projectTypes = [
    'Spatial Computing',
    '3D Web Experience',
    'Custom GLSL Engine',
    'Enterprise Platform',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    sound.playSelect();
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#a855f7', '#10b981', '#ffffff'],
    });

    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="contact-section">
      {/* Background Radial Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '450px',
          borderRadius: '50%',
          background: 'rgba(0, 240, 255, 0.08)',
          filter: 'blur(140px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-custom">
        {/* Giant CTA Statement */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span className="section-tag-dot" />
            05 // INITIATE TRANSMISSION
          </div>

          <h2 className="section-title">
            READY TO SCULPT THE <br />
            <span className="gradient-text-cyan glow-text-cyan">
              NEXT DIMENSION?
            </span>
          </h2>

          <p className="section-desc" style={{ margin: '0 auto' }}>
            We partner with ambitious founders, cultural institutions, and global technology leaders. Let’s create something legendary.
          </p>
        </div>

        {/* Contact Form Container */}
        <div className="contact-form-container">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
              >
                {/* Project Category Scope Selector */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">
                    SELECT ENGAGEMENT SCOPE
                  </label>
                  <div className="scope-selector-grid">
                    {projectTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => {
                          sound.playHoverClick();
                          setFormData({ ...formData, projectType: type });
                        }}
                        className={`scope-selector-btn ${formData.projectType === type ? 'active' : ''}`}
                        data-cursor="pointer"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input 1: Name */}
                <div className="form-group">
                  <label className="form-label">
                    IDENTIFIER / NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Satoshi Nakamoto"
                    className="form-input"
                  />
                </div>

                {/* Input 2: Email */}
                <div className="form-group">
                  <label className="form-label">
                    COMMUNICATION CHANNEL / EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    className="form-input"
                  />
                </div>

                {/* Input 3: Message */}
                <div className="form-group">
                  <label className="form-label">
                    MISSION BRIEF / SCOPE
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your vision, target timeline, and architectural targets..."
                    className="form-textarea"
                    style={{ resize: 'none' }}
                  />
                </div>

                {/* Submit Action */}
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '0.5rem' }}>
                  <MagneticButton variant="primary" dataCursor="pointer">
                    <Send size={15} />
                    <span>TRANSMIT INQUIRY</span>
                  </MagneticButton>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '2.5rem 1rem' }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 240, 255, 0.15)',
                    border: '1px solid var(--cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 0 30px var(--cyan-glow)',
                  }}
                >
                  <CheckCircle size={32} style={{ color: 'var(--cyan)' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                  TRANSMISSION RECEIVED
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
                  Our spatial engineering team has received your brief. A creative director will initiate contact within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)', background: 'transparent', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
                  data-cursor="pointer"
                >
                  TRANSMIT ANOTHER INQUIRY
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
