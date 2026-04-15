import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { certificates } from '../data';

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
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem' }}>
      <motion.nav 
        className="navbar"
        initial="hidden"
        animate="visible"
        variants={navFadeDown}
      >
        <motion.div whileHover={{ scale: 1.05 }} className="nav-brand">
          Albert<span>.</span>
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
            <motion.div 
              key={index} 
              variants={fadeUp} 
              whileHover={{ y: -15, scale: 1.02 }}
              className="glass cert-card project-card" 
              style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 1.5rem', display: 'flex' }}
            >
              <div className="project-img-wrapper" style={{ width: '100%', height: '180px', marginBottom: '1.5rem', background: '#fff', borderRadius: '8px', padding: '10px' }}>
                <img 
                  src={cert.img} 
                  alt={cert.title} 
                  className="project-img"
                  style={{ objectFit: 'contain' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=Certificate' }} 
                />
              </div>
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ color: 'var(--accent-color)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{cert.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      <footer className="footer" style={{ marginTop: '0', borderTop: 'none', padding: '2rem 5%' }}>
        <p>© {new Date().getFullYear()} Albert Livingstan G | Built with React & Vite</p>
      </footer>
    </div>
  );
};

export default CertificatesPage;
