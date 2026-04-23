import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaGithub } from 'react-icons/fa';

const ProjectModal = ({ project, onClose }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  if (!project) return null;

  const images = project.images || [];

  const nextImg = () => setCurrentImgIndex((prev) => (prev + 1) % images.length);
  const prevImg = () => setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}
      >
        <motion.div
          className="modal-content glass"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: '#020617',
            padding: '2rem',
            borderRadius: '16px',
            position: 'relative'
          }}
        >
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            <FaTimes />
          </button>

          <h2 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>{project.title}</h2>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <p style={{ color: 'var(--text-secondary)', margin: 0, flexGrow: 1 }}>{project.desc}</p>
            <a 
              href={project.github || `https://github.com/albertlivingstan/${project.id}`} 
              target="_blank" 
              rel="noreferrer"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                textDecoration: 'none', 
                padding: '0.5rem 1rem',
                border: '1px solid var(--card-border)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                background: 'var(--card-bg)'
              }}
            >
              <FaGithub size={18} /> View Code
            </a>
          </div>

          {images.length > 0 && (
            <div style={{ position: 'relative', marginBottom: '2rem', background: '#000', borderRadius: '12px', overflow: 'hidden' }}>
              <img 
                src={images[currentImgIndex]} 
                alt="Project snapshot" 
                style={{ width: '100%', height: '400px', objectFit: 'contain' }}
              />
              {images.length > 1 && (
                <>
                  <button onClick={prevImg} style={{...navBtnStyle, left: '10px'}}><FaChevronLeft /></button>
                  <button onClick={nextImg} style={{...navBtnStyle, right: '10px'}}><FaChevronRight /></button>
                </>
              )}
            </div>
          )}

          {project.video && (
            <div style={{ position: 'relative', paddingTop: '56.25%', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
              <iframe
                src={`https://player.vimeo.com/video/${project.video}?title=0&byline=0&portrait=0`}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const navBtnStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(56, 189, 248, 0.8)',
  color: '#000',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '1.2rem'
};

export default ProjectModal;
