import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaTimes, FaExpand } from 'react-icons/fa';
import { certificates } from '../data';
import TiltCard from '../components/TiltCard';
import GlowCard from '../components/GlowCard';
import ScrollReveal from '../components/ScrollReveal';

const fadeUp = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const navFadeDown = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const CertificatesPage = () => {
  const [selected, setSelected] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lock body scroll when lightbox is open
  React.useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem' }}>
      <motion.nav 
        className="navbar"
        initial="hidden"
        animate="visible"
        variants={navFadeDown}
      >
        <motion.div whileHover={{ scale: 1.05 }} className="nav-brand" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="Albert Logo" style={{ height: '40px', filter: 'drop-shadow(0 0 5px var(--accent-glow))' }} />
        </motion.div>
        <div className="nav-links">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.div 
              whileHover={{ x: -5, color: 'var(--accent-color)' }}
              className="nav-link" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FaArrowLeft /> Back to Portfolio
            </motion.div>
          </Link>
        </div>
      </motion.nav>

      <section className="section">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.h1 variants={fadeUp} className="section-title">All <span>Certificates</span></motion.h1>
          <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)' }}>A complete collection of my training, achievements, and professional certifications.</motion.p>
        </motion.div>

        <motion.div 
          className="projects-grid" 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          {certificates.map((cert, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div initial="rest" whileHover="hover" whileTap="hover" style={{ height: '100%' }}>
                <GlowCard 
                  className="glass cert-card project-card" 
                  onClick={() => setSelected(index)}
                  style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0', display: 'flex', cursor: 'pointer', position: 'relative', overflow: 'hidden', height: '100%', borderRadius: '16px' }}
                  data-cursor-text="VIEW"
                >
                  {/* Initial State (Image mostly fills) */}
                  <motion.div 
                    variants={{ rest: { y: 0 }, hover: { y: -20, opacity: 0 } }} 
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%', height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <div style={{
                      position: 'absolute', top: '10px', right: '10px',
                      background: 'var(--accent-color)', color: '#000',
                      borderRadius: '50%', width: '28px', height: '28px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.7rem', opacity: 0.85, zIndex: 1
                    }}>
                      <FaExpand />
                    </div>
                    <div className="project-img-wrapper" style={{ width: '100%', height: '180px', marginBottom: '1.5rem', background: '#fff', borderRadius: '8px', padding: '10px' }}>
                      <img 
                        src={cert.img} 
                        alt={cert.title} 
                        className="project-img"
                        style={{ objectFit: 'contain' }}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=Certificate' }} 
                      />
                    </div>
                  </motion.div>

                  {/* Slide-in State */}
                  <motion.div
                    variants={{
                      rest: { y: '100%', opacity: 0 },
                      hover: { y: 0, opacity: 1 }
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '100%',
                      background: 'rgba(5, 7, 10, 0.95)',
                      backdropFilter: 'blur(8px)',
                      padding: '1.5rem',
                      borderTop: '1px solid rgba(6, 182, 212, 0.5)',
                      zIndex: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}
                  >
                    <img 
                      src={cert.img} 
                      alt={cert.title} 
                      style={{ width: '100%', height: '120px', objectFit: 'contain', background: '#fff', borderRadius: '8px', marginBottom: '1rem', padding: '5px' }}
                    />
                    <h3 style={{ color: 'var(--accent-color)', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 700 }}>{cert.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{cert.date}</p>
                  </motion.div>
                </GlowCard>
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>
      </section>
      
      <footer className="footer" style={{ marginTop: '0', borderTop: 'none', padding: '2rem 5%' }}>
        <p>© {new Date().getFullYear()} Albert Livingstan G | Built with React & Vite</p>
      </footer>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.92)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '1.5rem',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.1, background: 'var(--accent-color)', color: '#000' }}
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute', top: '1.2rem', right: '1.2rem',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%', width: '44px', height: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '1.1rem', cursor: 'pointer',
                transition: 'all 0.2s ease', zIndex: 10000,
              }}
            >
              <FaTimes />
            </motion.button>

            {/* Modal Content with Bouncy Spring and TiltCard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
              onClick={e => e.stopPropagation()}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <TiltCard>
                <div
                  style={{
                    background: '#fff',
                    borderRadius: '12px',
                    padding: '16px',
                    maxWidth: 'min(90vw, 820px)',
                    maxHeight: '75vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                  }}
                >
                  <img
                    src={certificates[selected]?.img}
                    alt={certificates[selected]?.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '65vh',
                      objectFit: 'contain',
                      borderRadius: '6px',
                      display: 'block',
                    }}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Certificate'; }}
                  />
                </div>
              </TiltCard>

              {/* Caption */}
              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--accent-color)', fontSize: '1.25rem', marginBottom: '0.4rem', fontWeight: 700 }}>
                  {certificates[selected]?.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                  {certificates[selected]?.date}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', marginTop: '1rem' }}>
                  Tap anywhere outside to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificatesPage;
