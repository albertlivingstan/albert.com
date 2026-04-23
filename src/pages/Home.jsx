import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronRight, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks, SiMongodb, SiExpress, SiReact, SiNodedotjs, SiPython, SiPytorch, SiTensorflow, SiTailwindcss, SiJavascript, SiTypescript, SiFastapi, SiFlask, SiDjango, SiPostgresql, SiMysql, SiN8N } from 'react-icons/si';
import { FaHackerrank, FaHtml5, FaCss3Alt, FaGitAlt, FaRobot } from 'react-icons/fa';
import ProjectModal from '../components/ProjectModal';
import Magnetic from '../components/Magnetic';
import Marquee from '../components/Marquee';
import { projectsData } from '../data';

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
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  // Typing Effect State
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = ["Full Stack Developer", "AI Enthusiast", "IoT Developer", "Creative Engine"];

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'certificates'];
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
          {['home', 'about', 'skills', 'projects', 'certificates'].map((item, i) => (
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
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </motion.span>
          ))}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="section hero">
        <div className="hero-content-wrapper">
          <motion.div className="hero-text" initial="hidden" animate="visible" variants={staggerContainer} style={{ y: heroY, opacity: heroOpacity }}>
            <motion.p variants={fadeUp} className="hero-subtitle">Welcome to my portfolio</motion.p>
            <motion.h1 variants={fadeUp} className="hero-title">
              Hi, I'm Albert Livingstan<br />
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
              B.Tech Computer Science and Engineering Student with a strong passion for web development, AI, and IoT-based systems. I build real-world projects that solve practical problems.
            </motion.p>
            <motion.div variants={fadeUp} className="hero-buttons" style={{ flexWrap: 'wrap' }}>
              <Magnetic>
                <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
                  View My Work <FaChevronRight size={20} />
                </button>
              </Magnetic>
              <Magnetic>
                <button className="btn btn-secondary" onClick={() => scrollTo('contact')}>
                  Contact Me
                </button>
              </Magnetic>
              <Magnetic>
                <a href="/ALBERT_LIVINGSTANG_Resume.pdf" download="ALBERT_LIVINGSTANG_Resume.pdf" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                  Resume <FaDownload size={18} />
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
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
            <img src="/Albert.svg" alt="Albert Livingstan" className="hero-image" onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Add+me.jpg+in+public' }} />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
          <h2 className="section-title">About <span>Me</span></h2>
          <motion.div whileHover={{ scale: 1.02 }} className="glass" style={{ padding: '2rem' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              I am a B.Tech Computer Science and Engineering student with a strong interest in web development, AI, and IoT-based systems. I enjoy building real-world projects that solve practical problems and enhance user experience. I am currently seeking placement opportunities where I can apply my skills and grow as a professional.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <Marquee text="INNOVATION • ENGINEERING • ARTIFICIAL INTELLIGENCE • IOT ARCHITECTURE" />

      {/* Skills Section */}
      <section id="skills" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          <motion.h2 variants={fadeUp} className="section-title">My <span>Skills</span></motion.h2>
          <div className="skills-grid">
            {[
              { name: 'Python', icon: <SiPython />, category: 'CSE' },
              { name: 'PyTorch', icon: <SiPytorch />, category: 'CSE' },
              { name: 'TensorFlow', icon: <SiTensorflow />, category: 'CSE' },
              { name: 'NLP', icon: <FaRobot />, category: 'CSE' },
              { name: 'React', icon: <SiReact />, category: 'Frontend' },
              { name: 'Tailwind CSS', icon: <SiTailwindcss />, category: 'Frontend' },
              { name: 'JavaScript', icon: <SiJavascript />, category: 'Frontend' },
              { name: 'TypeScript', icon: <SiTypescript />, category: 'Frontend' },
              { name: 'FastAPI', icon: <SiFastapi />, category: 'Backend' },
              { name: 'Flask', icon: <SiFlask />, category: 'Backend' },
              { name: 'Django', icon: <SiDjango />, category: 'Backend' },
              { name: 'Node.js', icon: <SiNodedotjs />, category: 'Backend' },
              { name: 'PostgreSQL', icon: <SiPostgresql />, category: 'Database' },
              { name: 'MongoDB', icon: <SiMongodb />, category: 'Database' },
              { name: 'MySQL', icon: <SiMysql />, category: 'Database' },
              { name: 'n8n', icon: <SiN8N />, category: 'Automation' },
            ].map((skill, index) => (
              <motion.div key={index} variants={fadeUp} whileHover={{ y: -10, scale: 1.05, borderColor: 'var(--accent-color)', boxShadow: '0 10px 30px rgba(56,189,248,0.1)' }} className="glass skill-card">
                <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="skill-icon">{skill.icon}</motion.div>
                <div>
                  <h3 className="skill-name">{skill.name}</h3>
                  <p className="skill-level">{skill.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          <motion.h2 variants={fadeUp} className="section-title">Featured <span>Projects</span></motion.h2>
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
                      <span key={tag} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'rgba(56,189,248,0.1)', color: 'var(--accent-color)', borderRadius: '12px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <motion.span whileHover={{ x: 5 }} className="project-link">View Details <FaExternalLinkAlt size={16} /></motion.span>
                    <motion.a
                      href={project.github || `https://github.com/albertlivingstan${project.id}`}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none', fontSize: '0.9rem' }}
                    >
                      <FaGithub size={18} /> Code
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
              <motion.h2 variants={fadeUp} className="section-title">Coding <span>Profiles</span></motion.h2>
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

            {/* Certificates Sidebar Promo */}
            <div>
              <motion.h2 variants={fadeUp} className="section-title">Certifications</motion.h2>
              <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>🏆</motion.div>
                <h3>30+ Certifications Completed</h3>
                <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 2rem' }}>From institutions like Microsoft Azure, IBM, Cisco, and more.</p>
                <Link to="/certificates" style={{ textDecoration: 'none' }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-primary" style={{ display: 'inline-flex', width: 'auto' }}>
                    View All Certificates <FaChevronRight size={16} />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="footer">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} style={{ marginBottom: '2rem' }}>
          <motion.h2 variants={fadeUp} style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>Get In <span style={{ color: 'var(--accent-color)' }}>Touch</span></motion.h2>
          <motion.p variants={fadeUp} style={{ maxWidth: '500px', margin: '0 auto' }}>Looking for placement opportunities. Feel free to reach out to me for any work or suggestions!</motion.p>
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
