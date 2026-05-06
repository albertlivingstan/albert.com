import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CertificatesPage from './pages/CertificatesPage';
import CustomCursor from './components/CustomCursor';
import Chatbot from './components/Chatbot';
import { motion, useScroll, useSpring } from 'framer-motion';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import './App.css';

function App() {
  const [init, setInit] = useState(false);

  // Initialize tsparticles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.3,
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="app-container">
      <CustomCursor />
      
      {/* Particles Integration */}
      {init && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <Particles id="tsparticles" options={particlesOptions} />
        </div>
      )}

      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'var(--accent-color)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 999999
        }}
      />
      
      {/* Background Orbs */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.8 }}
         style={{ position: 'relative', zIndex: 1 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificates" element={<CertificatesPage />} />
        </Routes>
      </motion.div>
      <Chatbot />
    </div>
  );
}

export default App;
