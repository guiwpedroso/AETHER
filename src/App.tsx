import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { CinematicIntro } from './components/intro/CinematicIntro';
import { CustomCursor } from './components/cursor/CustomCursor';
import { NoiseOverlay } from './components/ui/NoiseOverlay';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ManifestoSection } from './components/sections/ManifestoSection';
import { StudioSection } from './components/sections/StudioSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { TechnologySection } from './components/sections/TechnologySection';
import { FullscreenMoment } from './components/sections/FullscreenMoment';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';

export const App: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -50, duration: 1.4 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#040406] text-white selection:bg-cyan-400 selection:text-black">
      {/* Film Grain Texture Overlay */}
      <NoiseOverlay />

      {/* Dual Precision Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Intro Preloader */}
      {!introFinished && (
        <CinematicIntro onComplete={() => setIntroFinished(true)} />
      )}

      {/* Main Layout & Sections */}
      <Navbar onNavigate={handleNavigate} />

      <main className="relative z-10">
        <HeroSection
          onExploreClick={() => handleNavigate('projects')}
          onLaunchStudio={() => handleNavigate('studio')}
        />

        <ManifestoSection />

        <StudioSection />

        <ProjectsSection />

        <TechnologySection />

        <FullscreenMoment />

        <ContactSection />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
