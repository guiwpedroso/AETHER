import React, { useState, useEffect } from 'react';
import { ArrowUp, Globe } from 'lucide-react';
import { sound } from '../../audio/soundManager';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toTimeString().split(' ')[0] + ' ' + (now.getTimezoneOffset() <= 0 ? 'GMT+' : 'GMT-') + Math.abs(now.getTimezoneOffset() / 60)
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    sound.playSelect();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = [
    { label: 'Overview', id: 'hero' },
    { label: 'Manifesto', id: 'manifesto' },
    { label: '3D Studio', id: 'studio' },
    { label: 'Archive', id: 'projects' },
    { label: 'Capabilities', id: 'capabilities' },
    { label: 'Contact', id: 'contact' },
  ];

  const socials = [
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'X / Twitter', url: 'https://twitter.com' },
    { label: 'Awwwards', url: 'https://awwwards.com' },
    { label: 'Discord', url: 'https://discord.com' },
  ];

  return (
    <footer className="footer-section">
      <div className="container-custom">
        {/* Top Grid */}
        <div className="footer-grid">
          {/* Col 1 & 2: Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div className="navbar-brand-icon">
                <span className="navbar-brand-core" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>
                AETHER <span style={{ color: 'var(--cyan)' }}>//</span> DYNAMICS
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '340px', marginBottom: '1.5rem' }}>
              Pioneering the next evolution of spatial computing, real-time WebGL architectures, and avant-garde interactive engineering.
            </p>

            {/* Live Clock & Node status */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <Globe size={13} style={{ color: 'var(--cyan)' }} />
                <span>LOCAL TIME: <strong style={{ color: '#ffffff' }}>{currentTime}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--emerald)' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--emerald)', boxShadow: '0 0 8px var(--emerald)' }} />
                <span>GLOBAL CLUSTER // 100% OPERATIONAL</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="footer-heading">
              INDEX
            </h4>
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  sound.playHoverClick();
                  onNavigate(link.id);
                }}
                className="footer-link-item"
                data-cursor="pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Col 3: Network */}
          <div>
            <h4 className="footer-heading">
              ECOSYSTEM
            </h4>
            {socials.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHoverClick()}
                className="footer-link-item"
                data-cursor="pointer"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Col 4: Engine Spec & Back to Top */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4 className="footer-heading">
                ENGINE SPEC
              </h4>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div>REACT 18.3 // THREE.JS r160</div>
                <div>R3F SHADER PIPELINE</div>
                <div>WEB AUDIO PROCEDURAL</div>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="scroll-down-btn"
              style={{ position: 'static', transform: 'none', marginTop: '1.5rem' }}
              data-cursor="pointer"
              title="Return to top"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} AETHER DYNAMICS INC. ALL RIGHTS RESERVED.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>PRIVACY PROTOCOL</span>
            <span>•</span>
            <span>TERMS OF COMPLIANCE</span>
            <span>•</span>
            <span style={{ color: 'var(--cyan)' }}>BUILD 4.9.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
