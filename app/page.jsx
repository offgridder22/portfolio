'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Nav, { ProgressDots } from '../components/Nav';
import HeroSection from '../components/HeroSection';
import BreatheSection from '../components/BreatheSection';
import JourneySection from '../components/JourneySection';
import CloseSection from '../components/CloseSection';
import Footer from '../components/Footer';
import {
  sectionIds,
  sectionScenes,
  sceneConfigs,
  sceneTransitionColors,
} from '../components/SceneThemes';
import { playSceneSound, stopSound } from '../components/AudioEngine';

export default function Home() {
  const [currentScene, setCurrentScene] = useState('dawn');
  const [activeSection, setActiveSection] = useState(0);
  const [userChosenScene, setUserChosenScene] = useState(null);
  const [soundOn, setSoundOn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const [sweepColor, setSweepColor] = useState('');
  const currentSceneRef = useRef(currentScene);
  currentSceneRef.current = currentScene;

  // Scene change logic
  const changeScene = useCallback((name, withSound) => {
    if (name === currentSceneRef.current) return;

    // Sweep transition
    setSweepColor(sceneTransitionColors[name]);
    setSweeping(true);
    setTimeout(() => setSweeping(false), 500);

    setCurrentScene(name);

    // Update CSS custom properties
    const c = sceneConfigs[name];
    document.documentElement.style.setProperty('--accent', c.accent);
    document.documentElement.style.setProperty('--accent-dark', c.accentDark);

    // Update blob colors
    const b1 = document.getElementById('blob1');
    const b2 = document.getElementById('blob2');
    if (b1) b1.style.background = `radial-gradient(circle, ${c.b1}, transparent 70%)`;
    if (b2) b2.style.background = `radial-gradient(circle, ${c.b2}, transparent 70%)`;

    if (withSound) playSceneSound(name);
  }, []);

  // Scroll tracking
  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      let active = 0;
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - windowH * 0.4) active = i;
      });
      setActiveSection(active);

      const targetScene = (userChosenScene && (active === 1 || active === 2))
        ? userChosenScene
        : sectionScenes[active];
      changeScene(targetScene, soundOn);

      // Parallax
      const hero = document.getElementById('s-hero');
      if (hero && scrollY <= hero.offsetHeight) {
        document.querySelectorAll('.hero-parallax-bg').forEach(el => {
          el.style.transform = `translateY(${scrollY * 0.12}px)`;
        });
        document.querySelectorAll('.hero-parallax-mid').forEach(el => {
          el.style.transform = `translateY(${scrollY * 0.22}px)`;
        });
        document.querySelectorAll('.hero-parallax-fg').forEach(el => {
          el.style.transform = `translateY(${scrollY * 0.32}px)`;
        });
        const plant = document.querySelector('.flower-scene');
        if (plant) plant.style.transform = `translateY(${scrollY * 0.08}px)`;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [userChosenScene, soundOn, changeScene]);

  // Blobs fade in
  useEffect(() => {
    setTimeout(() => {
      const b1 = document.getElementById('blob1');
      const b2 = document.getElementById('blob2');
      if (b1) b1.style.opacity = '1';
      if (b2) b2.style.opacity = '1';
    }, 500);
  }, []);

  function scrollToSection(i) {
    document.getElementById(sectionIds[i])?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleChooseJourney(scene) {
    setUserChosenScene(scene);
    changeScene(scene, soundOn);
    setTimeout(() => scrollToSection(1), 300);
  }

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    if (next) playSceneSound(currentScene);
    else stopSound();
  }

  function toggleFullscreen() {
    const next = !isFullscreen;
    setIsFullscreen(next);
    if (next) {
      document.body.classList.add('is-fullscreen');
      scrollToSection(1);
    } else {
      document.body.classList.remove('is-fullscreen');
    }
  }

  function closeFullscreen() {
    setIsFullscreen(false);
    document.body.classList.remove('is-fullscreen');
  }

  return (
    <>
      {/* Scene backgrounds */}
      <div className="scene-layer" id="scene-dawn" style={{ opacity: currentScene === 'dawn' ? 1 : 0 }} />
      <div className="scene-layer" id="scene-forest" style={{ opacity: currentScene === 'forest' ? 1 : 0 }} />
      <div className="scene-layer" id="scene-ocean" style={{ opacity: currentScene === 'ocean' ? 1 : 0 }} />
      <div className="scene-layer" id="scene-dusk" style={{ opacity: currentScene === 'dusk' ? 1 : 0 }} />

      {/* Ambient blobs */}
      <div className="ambient" id="blob1" />
      <div className="ambient" id="blob2" />

      {/* Overlays */}
      <div id="fs-close-overlay" onClick={closeFullscreen} />
      <div
        id="scene-transition"
        className={sweeping ? 'sweeping' : ''}
        style={{ background: sweepColor }}
      />

      {/* Sound toggle */}
      <button
        className={`sound-btn ${soundOn ? 'active' : ''}`}
        onClick={toggleSound}
      >
        {soundOn ? '\u266B' : '\u266A'}
      </button>

      {/* Navigation */}
      <Nav activeSection={activeSection} onNavigate={scrollToSection} />
      <ProgressDots activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main content */}
      <main>
        <HeroSection onBegin={() => scrollToSection(1)} />
        <BreatheSection
          scene={currentScene}
          onToggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
        />
        <JourneySection onChoose={handleChooseJourney} />
        <CloseSection />
      </main>

      <Footer />
    </>
  );
}
