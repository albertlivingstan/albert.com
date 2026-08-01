import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronRight, FaExternalLinkAlt, FaDownload, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import Player from '@vimeo/player';
import { SiLeetcode, SiGeeksforgeeks, SiMongodb, SiExpress, SiReact, SiNodedotjs, SiPython, SiPytorch, SiTensorflow, SiTailwindcss, SiJavascript, SiTypescript, SiFastapi, SiFlask, SiDjango, SiMysql, SiN8N } from 'react-icons/si';
import { FaHackerrank, FaHtml5, FaCss3Alt, FaGitAlt, FaRobot, FaJava } from 'react-icons/fa';
import ProjectModal from '../components/ProjectModal';
import Magnetic from '../components/Magnetic';
import Marquee from '../components/Marquee';
import { projectsData, certificates } from '../data';
import { useLanguage } from '../context/LanguageContext';

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

const Home = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isToggled, setIsToggled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [skillFilter, setSkillFilter] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const iframeRef = useRef(null);
  const [vimeoPlayer, setVimeoPlayer] = useState(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  useEffect(() => {
    if (iframeRef.current && !vimeoPlayer) {
      const player = new Player(iframeRef.current);
      setVimeoPlayer(player);
    }
  }, [iframeRef, vimeoPlayer]);

  const toggleMute = () => {
    if (vimeoPlayer) {
      if (isVideoMuted) {
        vimeoPlayer.setVolume(1);
        vimeoPlayer.setMuted(false);
        setIsVideoMuted(false);
      } else {
        vimeoPlayer.setVolume(0);
        vimeoPlayer.setMuted(true);
        setIsVideoMuted(true);
      }
    }
  };

  const [recommendations, setRecommendations] = useState([
    { id: 1, name: "Anonymous", message: "Albert is hardworking and dedicated." },
    { id: 2, name: "Anonymous", message: "Excellent programming and communication skills." }
  ]);
  const [recFormData, setRecFormData] = useState({ name: '', message: '' });
  const [recErrors, setRecErrors] = useState({});

  const allSkills = [
    { name: 'Python', icon: <SiPython />, category: 'Language', level: 90 },
    { name: 'PyTorch', icon: <SiPytorch />, category: 'AI/ML', level: 80 },
    { name: 'TensorFlow', icon: <SiTensorflow />, category: 'AI/ML', level: 78 },
    { name: 'NLP', icon: <FaRobot />, category: 'AI/ML', level: 75 },
    { name: 'HTML', icon: <FaHtml5 />, category: 'Frontend', level: 88 },
    { name: 'React', icon: <SiReact />, category: 'Frontend', level: 92 },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, category: 'Frontend', level: 88 },
    { name: 'JavaScript', icon: <SiJavascript />, category: 'Frontend', level: 90 },
    { name: 'TypeScript', icon: <SiTypescript />, category: 'Frontend', level: 78 },
    { name: 'FastAPI', icon: <SiFastapi />, category: 'Backend', level: 82 },
    { name: 'Flask', icon: <SiFlask />, category: 'Backend', level: 80 },
    { name: 'Django', icon: <SiDjango />, category: 'Backend', level: 75 },
    { name: 'Node.js', icon: <SiNodedotjs />, category: 'Backend', level: 85 },
    { name: 'Java', icon: <FaJava />, category: 'Language', level: 80 },
    { name: 'MongoDB', icon: <SiMongodb />, category: 'Database', level: 85 },
    { name: 'MySQL', icon: <SiMysql />, category: 'Database', level: 80 },
    { name: 'n8n', icon: <SiN8N />, category: 'Automation', level: 70 },
  ];
  const skillFilters = ['All', 'AI/ML', 'Frontend', 'Backend', 'Database', 'Language', 'Automation'];
  const filteredSkills = skillFilter === 'All' ? allSkills : allSkills.filter(s => s.category === skillFilter);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePhone = (phone) => {
    // Basic regex allowing optional +, spaces, dashes, parentheses and at least 10 digits
    const cleaned = phone.replace(/[\s\-()]/g, '');
    return /^[+]?[0-9]{10,15}$/.test(cleaned);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (at least 10 digits).";
    }

    if (!formData.message.trim()) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:albertlivingstan73@gmail.com?subject=${subject}&body=${body}`;
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleRecSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (!recFormData.name.trim()) errors.name = "Name is required.";
    if (!recFormData.message.trim()) errors.message = "Message is required.";

    if (Object.keys(errors).length > 0) {
      setRecErrors(errors);
      return;
    }

    setRecommendations([...recommendations, {
      id: Date.now(),
      name: recFormData.name,
      message: recFormData.message
    }]);
    setRecFormData({ name: '', message: '' });
    setRecErrors({});
    alert("Recommendation added successfully!");
  };

  // Typing Effect State
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = t.hero.titles;

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'recommendations'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
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
          {['home', 'about', 'skills', 'projects', 'certificates', 'recommendations'].map((item, i) => (
            <motion.span
              key={item}
              className={`nav-link ${activeSection === item ? 'active' : ''}`}
              onClick={() => scrollTo(item)}
              whileHover={{ y: -3, color: 'var(--accent-color)' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.5, ease: 'easeOut' }}
              style={{ color: activeSection === item ? 'var(--accent-color)' : '' }}
            >
              {t.nav[item]}
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
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Full-Screen Video Fold */}
        <div className="hero-video-container" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', zIndex: 0 }}>
          <div style={{ pointerEvents: 'none' }}>
            <iframe 
              ref={iframeRef}
              src="https://player.vimeo.com/video/1214843180?autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&transparent=1" 
              style={{ width: '100vw', height: '56.25vw', minHeight: '100vh', minWidth: '177.77vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} 
              frameBorder="0" 
              allow="autoplay; fullscreen" 
            ></iframe>
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.25)', pointerEvents: 'none' }}></div>
          
          {/* Mute/Unmute Button in the bottom-left corner */}
          <div style={{ position: 'absolute', bottom: '40px', left: '5%', zIndex: 10 }}>
            <Magnetic>
              <button 
                className="btn btn-primary" 
                onClick={toggleMute}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  background: 'rgba(0, 0, 0, 0.6)', 
                  border: '1px solid rgba(255, 255, 255, 0.2)', 
                  backdropFilter: 'blur(8px)', 
                  color: '#fff',
                  padding: '0.8rem 1.8rem',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
              >
                {isVideoMuted ? <><FaVolumeMute size={18} /> Play Audio</> : <><FaVolumeUp size={18} /> Mute Audio</>}
              </button>
            </Magnetic>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{ position: 'absolute', bottom: '30px', left: '50%', x: '-50%', opacity: 0.7, cursor: 'pointer', zIndex: 10 }}
            onClick={() => scrollTo('hero-content')}
          >
            <div style={{ width: '28px', height: '46px', border: '2px solid var(--text-secondary)', borderRadius: '15px', display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
              <motion.div
                animate={{ y: [0, 15, 0], opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                style={{ width: '4px', height: '8px', background: 'var(--accent-color)', borderRadius: '2px' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Hero Content Fold (Pushed Down) */}
        <div id="hero-content" className="hero-content-wrapper" style={{ position: 'relative', zIndex: 1, minHeight: 'calc(100vh - 80px)', padding: '6rem 5% 4rem' }}>
          <motion.div 
            className="hero-text" 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.1 }} 
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="hero-subtitle">{t.hero.subtitle}</motion.p>
            <motion.h1 variants={fadeUp} className="hero-title">
              {t.hero.hi}<br />
              <motion.span
                key={titleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'inline-block' }}
              >
                {titles[titleIndex]}
              </motion.span>
            </motion.h1>
            <motion.p variants={fadeUp} className="hero-desc">
              {t.hero.desc}
            </motion.p>
            <motion.div variants={fadeUp} className="hero-buttons" style={{ flexWrap: 'wrap' }}>
              <Magnetic>
                <button className="btn btn-primary" onClick={toggleMute}>
                  {isVideoMuted ? <><FaVolumeMute size={20} /> About me</> : <><FaVolumeUp size={20} /> Mute audio</>}
                </button>
              </Magnetic>
              <Magnetic>
                <button className="btn btn-secondary" onClick={() => scrollTo('projects')}>
                  {t.hero.viewWork} <FaChevronRight size={20} />
                </button>
              </Magnetic>
              <Magnetic>
                <button className="btn btn-secondary" onClick={() => scrollTo('contact')}>
                  {t.hero.contactMe}
                </button>
              </Magnetic>
              <Magnetic>
                <a href="Albert_Livingstan_G(urk23cs1099).pdf" download="Albert_Livingstan_G(urk23cs1099).pdf" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                  {t.hero.resume} <FaDownload size={18} />
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              opacity: { duration: 1, delay: 0.2, ease: "easeOut" },
              scale: { duration: 1, delay: 0.2, ease: "easeOut" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <motion.div
              className="hero-image-glow"
              animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <img
              src={isToggled ? "/passport.png" : "/Albert.svg"}
              alt="Albert Livingstan"
              className="hero-image"
              onClick={() => setIsToggled(!isToggled)}
              style={{ cursor: 'pointer' }}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Add+me.jpg+in+public' }}
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
          <h2 className="section-title">{t.about.title} <span>{t.about.titleSpan}</span></h2>
          <motion.div whileHover={{ scale: 1.02 }} className="glass" style={{ padding: '2rem' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              {t.about.desc}
            </p>
          </motion.div>
        </motion.div>
      </section>

      <Marquee text="INNOVATION • ENGINEERING • ARTIFICIAL INTELLIGENCE • IOT ARCHITECTURE" />

      {/* Skills Section */}
      <section id="skills" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          <motion.h2 variants={fadeUp} className="section-title">{t.skills.title} <span>{t.skills.titleSpan}</span></motion.h2>

          {/* Filter Tabs */}
          <motion.div variants={fadeUp} className="skill-filters">
            {skillFilters.map(filter => (
              <motion.button
                key={filter}
                onClick={() => setSkillFilter(filter)}
                className={`skill-filter-btn ${skillFilter === filter ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
                {skillFilter === filter && (
                  <motion.div className="skill-filter-indicator" layoutId="filterIndicator" />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div className="skills-grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -10, scale: 1.05, borderColor: 'var(--accent-color)', boxShadow: '0 10px 30px rgba(56, 189, 248, 0.2)' }}
                  className="glass skill-card skill-card-interactive"
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="skill-icon"
                  >
                    {skill.icon}
                  </motion.div>
                  <div style={{ width: '100%' }}>
                    <h3 className="skill-name">{skill.name}</h3>
                    <p className="skill-level">{skill.category}</p>
                    <div className="skill-progress-container">
                      <motion.div
                        className="skill-progress-bar"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                      />
                    </div>
                    <AnimatePresence>
                      {hoveredSkill === skill.name && (
                        <motion.span
                          className="skill-percent"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          {skill.level}%
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          <motion.h2 variants={fadeUp} className="section-title">{t.projects.title} <span>{t.projects.titleSpan}</span></motion.h2>
          <div className="projects-grid">
            {projectsData.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                whileHover={{ y: -15, scale: 1.02 }}
                className="glass project-card"
                onClick={() => setSelectedProject(project)}
                style={{ cursor: 'pointer' }}
              >
                <div className="project-img-wrapper">
                  <img src={project.mainImg} alt={project.title} className="project-img" onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Project+Image' }} />
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-color)', borderRadius: '12px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <motion.span whileHover={{ x: 5 }} className="project-link">{t.projects.viewDetails} <FaExternalLinkAlt size={16} /></motion.span>
                    <motion.a
                      href={project.github || `https://github.com/albertlivingstan${project.id}`}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none', fontSize: '0.9rem' }}
                    >
                      <FaGithub size={18} /> {t.projects.code}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Profiles & Certificates */}
      <section id="certificates" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          <div className="two-col-grid">
            {/* Coding Profiles */}
            <div>
              <motion.h2 variants={fadeUp} className="section-title">{t.certificates.codingProfiles} <span>{t.certificates.codingProfilesSpan}</span></motion.h2>
              <motion.div variants={fadeUp} whileHover={{ x: 10 }} className="glass profile-card">
                <div className="profile-icon"><SiLeetcode /></div>
                <div className="profile-info" style={{ flexGrow: 1 }}>
                  <h4><a href="https://leetcode.com/u/Albert_Livingstan/" target="_blank" rel="noreferrer">LeetCode</a></h4>
                  <p>150+ Problems Solved</p>
                  <div className="progress-container"><motion.div initial={{ width: 0 }} whileInView={{ width: '75%' }} transition={{ duration: 1.5, ease: 'easeOut' }} className="progress-bar"></motion.div></div>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} whileHover={{ x: 10 }} className="glass profile-card">
                <div className="profile-icon"><SiGeeksforgeeks /></div>
                <div className="profile-info" style={{ flexGrow: 1 }}>
                  <h4><a href="https://www.geeksforgeeks.org/profile/albertliv4u7m/" target="_blank" rel="noreferrer">GeeksforGeeks</a></h4>
                  <p>120+ Problems Solved</p>
                  <div className="progress-container"><motion.div initial={{ width: 0 }} whileInView={{ width: '65%' }} transition={{ duration: 1.5, ease: 'easeOut' }} className="progress-bar"></motion.div></div>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} whileHover={{ x: 10 }} className="glass profile-card">
                <div className="profile-icon"><FaHackerrank /></div>
                <div className="profile-info" style={{ flexGrow: 1 }}>
                  <h4><a href="https://www.hackerrank.com/profile/albertlivingstan" target="_blank" rel="noreferrer">HackerRank</a></h4>
                  <p>1★ in Python | 3★ in C</p>
                  <div className="progress-container"><motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 1.5, ease: 'easeOut' }} className="progress-bar"></motion.div></div>
                </div>
              </motion.div>
            </div>

            {/* Featured Certifications */}
            <div>
              <motion.h2 variants={fadeUp} className="section-title">{t.certificates.certifications}</motion.h2>
              <div className="featured-certs-grid">
                {[
                  {
                    brand: 'Microsoft',
                    color: '#00a4ef',
                    gradient: 'linear-gradient(135deg, #00a4ef22 0%, #0078d422 100%)',
                    border: '#00a4ef44',
                    logo: (
                      <svg viewBox="0 0 23 23" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="10" height="10" fill="#f25022" />
                        <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
                        <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
                        <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
                      </svg>
                    ),
                    cert: certificates.find(c => c.title.includes('Microsoft')),
                  },
                  {
                    brand: 'Google',
                    color: '#4285F4',
                    gradient: 'linear-gradient(135deg, #4285F422 0%, #34A85322 100%)',
                    border: '#4285F444',
                    logo: (
                      <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                    ),
                    cert: certificates.find(c => c.title.toLowerCase().includes('digital marketing')),
                  },
                  {
                    brand: 'IBM',
                    color: '#0062ff',
                    gradient: 'linear-gradient(135deg, #0062ff22 0%, #054ada22 100%)',
                    border: '#0062ff44',
                    logo: (
                      <svg viewBox="0 0 300 120" width="44" height="18" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0" y="0" width="300" height="120" rx="0" fill="none" />
                        <text x="0" y="100" fontFamily="Arial" fontWeight="bold" fontSize="120" fill="#0062ff">IBM</text>
                      </svg>
                    ),
                    cert: certificates.find(c => c.title.toLowerCase().includes('ibm') || c.title.toLowerCase().includes('user experience')),
                  },
                  {
                    brand: 'AWS',
                    color: '#FF9900',
                    gradient: 'linear-gradient(135deg, #FF990022 0%, #FF670022 100%)',
                    border: '#FF990044',
                    logo: (
                      <svg viewBox="0 0 100 40" width="44" height="18" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="30" fontFamily="Arial" fontWeight="bold" fontSize="28" fill="#FF9900">aws</text>
                      </svg>
                    ),
                    cert: certificates.find(c => c.title.toLowerCase().includes('aws')),
                  },
                  {
                    brand: 'Deloitte',
                    color: '#86BC25',
                    gradient: 'linear-gradient(135deg, #86BC2522 0%, #5a8a1222 100%)',
                    border: '#86BC2544',
                    logo: (
                      <svg viewBox="0 0 220 60" width="90" height="24" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="46" fontFamily="Arial" fontWeight="900" fontSize="50" letterSpacing="-1" fill="#86BC25">Deloitte.</text>
                      </svg>
                    ),
                    cert: certificates.find(c => c.title.toLowerCase().includes('deloitte')),
                  },
                  {
                    brand: 'Infosys',
                    color: '#007CC3',
                    gradient: 'linear-gradient(135deg, #007CC322 0%, #005a9022 100%)',
                    border: '#007CC344',
                    logo: (
                      <svg viewBox="0 0 200 44" width="82" height="22" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="32" fontFamily="Arial" fontWeight="bold" fontSize="30" fill="#007CC3">Infosys</text>
                      </svg>
                    ),
                    cert: certificates.find(c => c.title.toLowerCase().includes('infosys')),
                  }
                ].map(item => (
                  <motion.div
                    key={item.brand}
                    variants={fadeUp}
                    whileHover={{ y: -6, scale: 1.02, boxShadow: `0 12px 32px ${item.color}33` }}
                    className="featured-cert-card glass"
                    style={{ background: item.gradient, borderColor: item.border }}
                  >
                    <div className="featured-cert-brand">
                      <div className="featured-cert-logo">{item.logo}</div>
                      <span className="featured-cert-badge" style={{ background: `${item.color}22`, color: item.color, border: `1px solid ${item.color}55` }}>Certified</span>
                    </div>
                    {item.cert && (
                      <>
                        <img
                          src={item.cert.img}
                          alt={item.cert.title}
                          className="featured-cert-img"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <p className="featured-cert-title">{item.cert.title}</p>
                        <p className="featured-cert-date">{item.cert.date}</p>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
              <motion.div variants={fadeUp} style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <Link to="/certificates" style={{ textDecoration: 'none' }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-primary" style={{ display: 'inline-flex', width: 'auto' }}>
                    {t.certificates.viewAll} <FaChevronRight size={16} />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Recommendations Section */}
      <section id="recommendations" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          <motion.h2 variants={fadeUp} className="section-title">{t.recommendations.title}</motion.h2>

          <div className="recommendations-grid">
            {recommendations.map((rec) => (
              <motion.div key={rec.id} variants={fadeUp} className="glass recommendation-card">
                <p className="recommendation-text">"{rec.message}"</p>
                <span className="recommendation-author">- {rec.name}</span>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} style={{ marginTop: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>{t.recommendations.addTitle}</h3>
            <form onSubmit={handleRecSubmit} className="contact-form" style={{ maxWidth: '600px', margin: '0' }}>
              <div style={{ width: '100%', textAlign: 'left', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder={t.recommendations.namePlaceholder}
                  value={recFormData.name}
                  onChange={(e) => { setRecFormData({ ...recFormData, name: e.target.value }); if (recErrors.name) setRecErrors({ ...recErrors, name: null }); }}
                  className={`contact-input ${recErrors.name ? 'error' : ''}`}
                />
                {recErrors.name && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{recErrors.name}</span>}
              </div>

              <div style={{ width: '100%', textAlign: 'left', marginBottom: '1rem' }}>
                <textarea
                  placeholder={t.recommendations.messagePlaceholder}
                  value={recFormData.message}
                  onChange={(e) => { setRecFormData({ ...recFormData, message: e.target.value }); if (recErrors.message) setRecErrors({ ...recErrors, message: null }); }}
                  className={`contact-textarea ${recErrors.message ? 'error' : ''}`}
                  rows="4"
                ></textarea>
                {recErrors.message && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{recErrors.message}</span>}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn btn-primary"
                style={{ width: 'fit-content' }}
              >
                {t.recommendations.submitButton}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="footer">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} style={{ marginBottom: '2rem' }}>
          <motion.h2 variants={fadeUp} style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>{t.contact.title} <span style={{ color: 'var(--accent-color)' }}>{t.contact.titleSpan}</span></motion.h2>
          <motion.p variants={fadeUp} style={{ maxWidth: '500px', margin: '0 auto', marginBottom: '2rem' }}>{t.contact.desc}</motion.p>

          {/* Contact Form */}
          <motion.form variants={fadeUp} onSubmit={handleContactSubmit} className="contact-form" style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '100%', textAlign: 'left' }}>
              <input
                type="text"
                placeholder={t.contact.namePlaceholder}
                value={formData.name}
                onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: null }); }}
                className={`contact-input ${errors.name ? 'error' : ''}`}
              />
              {errors.name && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{errors.name}</span>}
            </div>

            <div style={{ width: '100%', textAlign: 'left' }}>
              <input
                type="text"
                placeholder={t.contact.emailPlaceholder}
                value={formData.email}
                onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: null }); }}
                className={`contact-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{errors.email}</span>}
            </div>

            <div style={{ width: '100%', textAlign: 'left' }}>
              <input
                type="tel"
                placeholder={t.contact.phonePlaceholder}
                value={formData.phone}
                onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); if (errors.phone) setErrors({ ...errors, phone: null }); }}
                className={`contact-input ${errors.phone ? 'error' : ''}`}
              />
              {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{errors.phone}</span>}
            </div>

            <div style={{ width: '100%', textAlign: 'left' }}>
              <textarea
                placeholder={t.contact.messagePlaceholder}
                value={formData.message}
                onChange={(e) => { setFormData({ ...formData, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: null }); }}
                className={`contact-textarea ${errors.message ? 'error' : ''}`}
                rows="5"
              ></textarea>
              {errors.message && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{errors.message}</span>}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
            >
              {t.contact.sendButton} <FaEnvelope size={18} />
            </motion.button>
          </motion.form>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="social-links">
          <motion.a variants={fadeUp} whileHover={{ y: -5, backgroundColor: 'var(--accent-color)', color: '#000' }} href="mailto:albertlivingstan73@gmail.com" className="social-link" title="Email"><FaEnvelope size={20} /></motion.a>
          <motion.a variants={fadeUp} whileHover={{ y: -5, backgroundColor: 'var(--accent-color)', color: '#000' }} href="https://github.com/albertlivingstan" target="_blank" rel="noreferrer" className="social-link" title="GitHub"><FaGithub size={20} /></motion.a>
          <motion.a variants={fadeUp} whileHover={{ y: -5, backgroundColor: 'var(--accent-color)', color: '#000' }} href="https://www.linkedin.com/in/albert-livingstan-g" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn"><FaLinkedin size={20} /></motion.a>
        </motion.div>
        <p>© {new Date().getFullYear()} Albert Livingstan G </p>
      </footer>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
};

export default Home;
