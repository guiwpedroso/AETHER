import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../../audio/soundManager';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(sound.isMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const unsubscribe = sound.subscribe((muted) => {
      setIsAudioMuted(muted);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'manifesto', 'studio', 'projects', 'capabilities', 'fullscreen', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const handleLinkClick = (id: string) => {
    sound.playSelect();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  const toggleSound = () => {
    sound.toggleMute();
  };

  const navLinks = [
    { id: 'manifesto', label: 'Manifesto' },
    { id: 'studio', label: '3D Lab' },
    { id: 'projects', label: 'Archive' },
    { id: 'capabilities', label: 'Tech' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`navbar-fixed ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="navbar-brand"
            data-cursor="pointer"
          >
            <div className="navbar-brand-icon">
              <span className="navbar-brand-core" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span className="navbar-brand-text">
                AETHER <span style={{ color: 'var(--cyan)' }}>//</span>
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '-2px' }}>
                DYNAMICS
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="nav-links">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  onMouseEnter={() => sound.playHoverClick()}
                  className={`nav-link-btn ${isActive ? 'active' : ''}`}
                  data-cursor="pointer"
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Sound Equalizer Toggle + CTA + Mobile Hamburger */}
          <div className="nav-right-actions">
            <button
              onClick={toggleSound}
              className={`audio-toggle-btn ${!isAudioMuted ? 'unmuted' : ''}`}
              data-cursor="pointer"
              title={isAudioMuted ? 'Unmute procedural soundscapes' : 'Mute soundscapes'}
              aria-label="Toggle audio"
            >
              {isAudioMuted ? (
                <VolumeX size={14} />
              ) : (
                <>
                  <Volume2 size={14} />
                  <div className="equalizer-bars">
                    <span className="eq-bar eq-1" />
                    <span className="eq-bar eq-2" />
                    <span className="eq-bar eq-3" />
                  </div>
                </>
              )}
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className="nav-cta-btn"
              data-cursor="pointer"
            >
              <span>CONNECT</span>
              <ArrowUpRight size={13} />
            </button>

            <button
              onClick={() => {
                sound.playHoverClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="nav-mobile-toggle"
              data-cursor="pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mobile-nav-drawer"
          >
            <div className="mobile-nav-links">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                INDEX NAVIGATION
              </span>
              {navLinks.map((link, idx) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="mobile-nav-item"
                >
                  <span>{link.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    0{idx + 1}
                  </span>
                </button>
              ))}

              <div style={{ paddingTop: '1rem' }}>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  <span>INITIALIZE INQUIRY</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
