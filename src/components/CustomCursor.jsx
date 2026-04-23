import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (['A', 'BUTTON', 'SPAN'].includes(e.target.tagName) || e.target.closest('.project-card')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--accent-color)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999998,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isHovering ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
          border: `1px solid ${isHovering ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.3)'}`,
          backdropFilter: isHovering ? 'blur(4px)' : 'none'
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;
