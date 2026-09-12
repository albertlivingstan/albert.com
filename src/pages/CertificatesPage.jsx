import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft, FaTimes, FaExpand, FaChevronLeft, FaChevronRight,
  FaSearch, FaAward, FaCheckCircle, FaExternalLinkAlt, FaBuilding, FaFilter, FaStar, FaBars, FaBriefcase, FaFileAlt
} from 'react-icons/fa';
import { certificates } from '../data';
import TiltCard from '../components/TiltCard';
import GlowCard from '../components/GlowCard';
import ScrollReveal from '../components/ScrollReveal';
import SparkleBurst from '../components/SparkleBurst';
import RecruiterModal from '../components/RecruiterModal';
import { useLanguage } from '../context/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const navFadeDown = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// Helper for brand badge and category assignment
const getCertDetails = (cert) => {
  const titleLower = cert.title.toLowerCase();
  if (titleLower.includes('microsoft') || titleLower.includes('azure')) {
    return { brand: 'Microsoft', color: '#00a4ef', category: 'Cloud & Infra' };
  }
  if (titleLower.includes('google') || titleLower.includes('digital marketing') || titleLower.includes('solutionchallenge') || titleLower.includes('hckathon')) {
    return { brand: 'Google', color: '#4285F4', category: 'Top Tech' };
  }
  if (titleLower.includes('aws') || titleLower.includes('cloud practitioner')) {
    return { brand: 'AWS', color: '#FF9900', category: 'Cloud & Infra' };
  }
  if (titleLower.includes('ibm') || titleLower.includes('user experience')) {
    return { brand: 'IBM', color: '#0062ff', category: 'Top Tech' };
  }
  if (titleLower.includes('deloitte')) {
    return { brand: 'Deloitte', color: '#86BC25', category: 'Top Tech' };
  }
  if (titleLower.includes('cisco') || titleLower.includes('html') || titleLower.includes('css') || titleLower.includes('networking') || titleLower.includes('packet tracer') || titleLower.includes('cybersecurity')) {
    return { brand: 'Cisco', color: '#1BA0D7', category: 'Software & Web' };
  }
  if (titleLower.includes('infosys') || titleLower.includes('java')) {
    return { brand: 'Infosys', color: '#007CC3', category: 'Software & Web' };
  }
  if (titleLower.includes('mongodb') || titleLower.includes('sql') || titleLower.includes('machine learning') || titleLower.includes('ai') || titleLower.includes('prompt') || titleLower.includes('chatbot') || titleLower.includes('data')) {
    return { brand: 'AI & Data', color: '#10B981', category: 'AI & Data' };
  }
  if (titleLower.includes('sih') || titleLower.includes('hackathon') || titleLower.includes('ethics')) {
    return { brand: 'Achievement', color: '#F59E0B', category: 'Hackathons' };
  }
  return { brand: 'Certification', color: '#38bdf8', category: 'Software & Web' };
};

const categories = ['All', '👔 Recruiter Top Picks', 'Cloud & Infra', 'AI & Data', 'Software & Web', 'Top Tech', 'Hackathons'];

const CertificatesPage = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter logic
  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      const details = getCertDetails(cert);
      const isTopPick = ['Microsoft', 'Google', 'AWS', 'IBM', 'Deloitte', 'Infosys', 'Cisco'].includes(details.brand);
      
      const matchesCategory =
        activeCategory === 'All'
          ? true
          : activeCategory === '👔 Recruiter Top Picks'
          ? isTopPick
          : details.category === activeCategory;

      const matchesSearch =
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        details.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.date.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selected === null || filteredCertificates.length === 0) return;
      if (e.key === 'ArrowRight') {
        setSelected((prev) => (prev + 1) % filteredCertificates.length);
        triggerSparkle();
      } else if (e.key === 'ArrowLeft') {
        setSelected(
          (prev) => (prev - 1 + filteredCertificates.length) % filteredCertificates.length
        );
        triggerSparkle();
      } else if (e.key === 'Escape') {
        setSelected(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, filteredCertificates]);

  const triggerSparkle = () => {
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 900);
  };

  const openLightbox = (index) => {
    setSelected(index);
    triggerSparkle();
  };

  const currentCert = selected !== null ? filteredCertificates[selected] : null;
  const currentDetails = currentCert ? getCertDetails(currentCert) : null;

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem', position: 'relative' }}>
      {/* Top Navbar */}
      <motion.nav
        className="navbar"
        initial="hidden"
        animate="visible"
        variants={navFadeDown}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="nav-brand"
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img
            src="/logo.png"
            alt="Albert Logo"
            style={{ height: '40px', filter: 'drop-shadow(0 0 5px var(--accent-glow))' }}
          />
        </motion.div>
        <div className="nav-links">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ x: -4, color: 'var(--accent-color)' }}
              whileTap={{ scale: 0.95 }}
              className="nav-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600,
                color: 'var(--accent-color)'
              }}
            >
              <FaArrowLeft /> Back to Portfolio
            </motion.div>
          </Link>
          {['home', 'about', 'skills', 'projects', 'certificates'].map((item) => (
            <motion.span
              key={item}
              className={`nav-link ${item === 'certificates' ? 'active' : ''}`}
              onClick={() => {
                if (item === 'certificates') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  navigate('/', { state: { scrollTo: item } });
                }
              }}
              whileHover={{ y: -3, color: 'var(--accent-color)' }}
              style={{
                color: item === 'certificates' ? 'var(--accent-color)' : '',
                textTransform: 'capitalize'
              }}
            >
              {item}
            </motion.span>
          ))}
          <select
            value={language}
            onChange={(e) => toggleLanguage(e.target.value)}
            className="lang-select"
          >
            <option value="en">US English</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="ja">日本語</option>
            <option value="es">Español</option>
            <option value="ar">العربية</option>
            <option value="zh">中文</option>
            <option value="pt">Português</option>
          </select>
        </div>
        <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--nav-bg)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid var(--card-border)',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem 5%',
                gap: '1.5rem',
                zIndex: 40
              }}
            >
              <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>
                <span
                  style={{
                    color: 'var(--accent-color)',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FaArrowLeft /> Back to Portfolio
                </span>
              </Link>
              {['home', 'about', 'skills', 'projects', 'certificates'].map((item) => (
                <span
                  key={item}
                  className={`nav-link ${item === 'certificates' ? 'active' : ''}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (item === 'certificates') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      navigate('/', { state: { scrollTo: item } });
                    }
                  }}
                  style={{
                    color: item === 'certificates' ? 'var(--accent-color)' : 'var(--text-primary)',
                    padding: '0.5rem 0',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    display: 'block',
                    textTransform: 'capitalize'
                  }}
                >
                  {item}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Section */}
      <section className="section">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem',
              flexWrap: 'wrap',
              marginBottom: '1rem'
            }}
          >
            <span className="open-to-work-pill">
              <span className="pulse-dot"></span> OPEN FOR RECRUITMENT & HIRING
            </span>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRecruiterModalOpen(true)}
              className="recruiter-badge"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              <FaBriefcase /> 👔 Recruiter Snapshot (HR Executive Summary)
            </motion.button>
          </motion.div>

          <motion.h1 variants={fadeUp} className="section-title" style={{ marginBottom: '1rem' }}>
            All <span>Certifications</span>
          </motion.h1>
          <motion.p variants={fadeUp} style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto' }}>
            Explore my official credentials, global hackathon achievements, cloud certifications, and technical specialized training.
          </motion.p>

          {/* Stats Bar */}
          <motion.div variants={fadeUp} className="cert-stats-banner">
            <div className="cert-stat-card">
              <FaAward className="cert-stat-icon" />
              <div>
                <div className="cert-stat-num">{certificates.length}+</div>
                <div className="cert-stat-label">Certificates</div>
              </div>
            </div>

            <div className="cert-stat-card">
              <FaBuilding className="cert-stat-icon" style={{ color: '#0ea5e9' }} />
              <div>
                <div className="cert-stat-num">7+</div>
                <div className="cert-stat-label">Global Partners</div>
              </div>
            </div>

            <div className="cert-stat-card">
              <FaCheckCircle className="cert-stat-icon" style={{ color: '#10b981' }} />
              <div>
                <div className="cert-stat-num">100%</div>
                <div className="cert-stat-label">Skills Verified</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="cert-search-container"
        >
          <FaSearch className="cert-search-icon" />
          <input
            type="text"
            placeholder="Search certificates by title, provider, or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cert-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              <FaTimes />
            </button>
          )}
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="cert-category-bar"
        >
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? certificates.length
                : cat === '👔 Recruiter Top Picks'
                ? certificates.filter((c) => ['Microsoft', 'Google', 'AWS', 'IBM', 'Deloitte', 'Infosys', 'Cisco'].includes(getCertDetails(c).brand)).length
                : certificates.filter((c) => getCertDetails(c).category === cat).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`cert-cat-btn ${isActive ? 'active' : ''}`}
              >
                <span>{cat}</span>
                <span className="cert-cat-count">{count}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid Results Info */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Showing <span style={{ color: 'var(--accent-color)', fontWeight: 700 }}>{filteredCertificates.length}</span> of {certificates.length} certificates
        </div>

        {/* Certificates Animated Grid */}
        <motion.div
          layout
          className="projects-grid"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert, index) => {
              const details = getCertDetails(cert);

              return (
                <motion.div
                  layout
                  key={cert.title + index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.4 }}
                  whileHover="hover"
                  whileTap="hover"
                  style={{ height: '100%' }}
                >
                  <GlowCard
                    className="glass cert-card project-card holo-card"
                    onClick={() => openLightbox(index)}
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '0',
                      display: 'flex',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      height: '100%',
                      borderRadius: '16px',
                      border: `1px solid ${details.color}33`,
                      boxShadow: `0 8px 30px ${details.color}15`
                    }}
                    data-cursor-text="VIEW"
                  >
                    {/* Brand Pill Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: `${details.color}22`,
                        color: details.color,
                        border: `1px solid ${details.color}66`,
                        borderRadius: '20px',
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        zIndex: 5,
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <FaStar size={10} /> {details.brand}
                    </div>

                    {/* Expand icon button */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'var(--accent-color)',
                        color: '#000',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        opacity: 0.9,
                        zIndex: 5,
                        boxShadow: '0 0 10px var(--accent-color)'
                      }}
                    >
                      <FaExpand />
                    </div>

                    {/* Card Front Content */}
                    <motion.div
                      variants={{ rest: { y: 0 }, hover: { y: -20, opacity: 0 } }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        padding: '2.5rem 1.5rem 1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <div
                        className="project-img-wrapper"
                        style={{
                          width: '100%',
                          height: '180px',
                          marginBottom: '1rem',
                          background: '#ffffff',
                          borderRadius: '12px',
                          padding: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                        }}
                      >
                        <img
                          src={cert.img}
                          alt={cert.title}
                          className="project-img"
                          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200?text=Certificate';
                          }}
                        />
                      </div>
                      <h4
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          lineHeight: 1.3,
                          marginTop: '0.5rem'
                        }}
                      >
                        {cert.title}
                      </h4>
                    </motion.div>

                    {/* Slide-in Overlay */}
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
                        background: 'rgba(5, 7, 10, 0.96)',
                        backdropFilter: 'blur(12px)',
                        padding: '1.5rem',
                        borderTop: `2px solid ${details.color}`,
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
                        style={{
                          width: '100%',
                          height: '110px',
                          objectFit: 'contain',
                          background: '#fff',
                          borderRadius: '8px',
                          marginBottom: '1rem',
                          padding: '6px'
                        }}
                      />
                      <h3
                        style={{
                          color: details.color,
                          fontSize: '1.1rem',
                          marginBottom: '0.4rem',
                          fontWeight: 700,
                          lineHeight: 1.3
                        }}
                      >
                        {cert.title}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.8rem' }}>
                        {cert.date}
                      </p>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.4rem 1rem',
                          borderRadius: '20px',
                          background: details.color,
                          color: '#000',
                          fontWeight: 700,
                          fontSize: '0.8rem'
                        }}
                      >
                        Click to Inspect <FaExpand size={12} />
                      </div>
                    </motion.div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredCertificates.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-secondary)' }}>
            <h3>No certificates found matching your search.</h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="btn btn-secondary"
              style={{ marginTop: '1rem' }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer" style={{ marginTop: '3rem', borderTop: 'none', padding: '2rem 5%' }}>
        <p>© {new Date().getFullYear()} Albert Livingstan G | Built with React & Vite</p>
      </footer>

      {/* ── Advanced Lightbox Modal ── */}
      <AnimatePresence>
        {selected !== null && currentCert && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0, 0, 0, 0.94)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}
          >
            {/* Sparkle burst on modal change */}
            {showSparkle && <SparkleBurst />}

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.1, background: 'var(--accent-color)', color: '#000' }}
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '46px',
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.2rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                zIndex: 10002
              }}
            >
              <FaTimes />
            </motion.button>

            {/* Previous Button */}
            {filteredCertificates.length > 1 && (
              <button
                className="lightbox-nav-btn lightbox-nav-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(
                    (prev) => (prev - 1 + filteredCertificates.length) % filteredCertificates.length
                  );
                  triggerSparkle();
                }}
              >
                <FaChevronLeft />
              </button>
            )}

            {/* Next Button */}
            {filteredCertificates.length > 1 && (
              <button
                className="lightbox-nav-btn lightbox-nav-next"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected((prev) => (prev + 1) % filteredCertificates.length);
                  triggerSparkle();
                }}
              >
                <FaChevronRight />
              </button>
            )}

            {/* Modal Card Content */}
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.175, 0.885, 0.32, 1.275] }}
              onClick={(e) => e.stopPropagation()}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '100%' }}
            >
              {/* Index Indicator */}
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  marginBottom: '0.8rem',
                  letterSpacing: '1px'
                }}
              >
                CERTIFICATE {selected + 1} OF {filteredCertificates.length}
              </div>

              <TiltCard>
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '16px',
                    maxWidth: 'min(90vw, 850px)',
                    maxHeight: '70vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 25px 70px ${currentDetails.color}40`,
                    border: `2px solid ${currentDetails.color}66`
                  }}
                >
                  <img
                    src={currentCert.img}
                    alt={currentCert.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '60vh',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x400?text=Certificate';
                    }}
                  />
                </div>
              </TiltCard>

              {/* Caption & Actions */}
              <div style={{ marginTop: '1.5rem', textAlign: 'center', maxWidth: '600px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: `${currentDetails.color}22`,
                    color: currentDetails.color,
                    border: `1px solid ${currentDetails.color}66`,
                    borderRadius: '16px',
                    padding: '0.2rem 0.8rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}
                >
                  {currentDetails.brand}
                </span>

                <h3
                  style={{
                    color: '#ffffff',
                    fontSize: '1.3rem',
                    marginBottom: '0.4rem',
                    fontWeight: 700
                  }}
                >
                  {currentCert.title}
                </h3>

                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  {currentCert.date}
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <a
                    href={currentCert.img}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-primary"
                      style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}
                    >
                      Open Full Image <FaExternalLinkAlt size={12} />
                    </motion.button>
                  </a>
                </div>

                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', marginTop: '0.8rem' }}>
                  Use ← Left / Right → Keys to navigate • Tap outside to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recruiter Executive Summary Modal */}
      <RecruiterModal
        isOpen={isRecruiterModalOpen}
        onClose={() => setIsRecruiterModalOpen(false)}
      />
    </div>
  );
};

export default CertificatesPage;
