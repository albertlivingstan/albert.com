import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show splash for 2 seconds, then trigger exit
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.85, 0, 0.15, 1] } }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '105vh', // Slightly larger to prevent sub-pixel white gaps
            background: '#0a0a0a',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)', transition: { duration: 0.5 } }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              fontSize: '5rem',
              fontWeight: 900,
              color: 'var(--accent-color)',
              textShadow: '0 0 30px var(--accent-glow)',
              letterSpacing: '2px',
              fontFamily: 'monospace'
            }}
          >
            &lt;/&gt;
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
