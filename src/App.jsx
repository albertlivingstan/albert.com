import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CertificatesPage from './pages/CertificatesPage';
import SplashScreen from './components/SplashScreen';
import CustomCursor from './components/CustomCursor';
import { motion, useScroll, useSpring } from 'framer-motion';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="app-container">
      <CustomCursor />
      
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

      {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/certificates" element={<CertificatesPage />} />
          </Routes>
        </motion.div>
      )}
    </div>
  );
}

export default App;
