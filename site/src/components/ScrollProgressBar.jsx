import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, useAnimationControls } from 'framer-motion';

const Spark = ({ delay }) => {
  const controls = useAnimationControls();
  
  useEffect(() => {
    controls.start({
      y: [0, -20, 0],
      opacity: [1, 0.5, 0],
      scale: [0, 1, 0.5],
      transition: { duration: 0.8, delay, ease: "easeOut" }
    });
  }, [controls, delay]);

  return (
    <motion.div
      className="absolute top-0 w-1 h-1 bg-yellow-300 rounded-full"
      style={{ left: `${Math.random() * 100}%` }}
      animate={controls}
    />
  );
};

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [sparks, setSparks] = useState([]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const barHeight = useSpring(useTransform(scrollYProgress, [0, 1], [3, 6]), {
    stiffness: 300,
    damping: 30
  });

  const barOpacity = useSpring(useTransform(scrollYProgress, [0, 0.05], [0, 1]), {
    stiffness: 300,
    damping: 30
  });

  const glowOpacity = useSpring(useTransform(scrollYProgress, [0, 1], [0, 0.5]), {
    stiffness: 300,
    damping: 30
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsVisible(latest > 0.02);
    if (Math.random() > 0.7) {
      setSparks(prev => [...prev, Date.now()]);
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSparks(prev => prev.slice(1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [sparks]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
      style={{ height: barHeight, opacity: barOpacity }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="h-full bg-blue-500 origin-left"
        style={{ 
          scaleX,
          boxShadow: useSpring(useTransform(scrollYProgress, 
            [0, 1], 
            ['0px 0px 0px rgba(59, 130, 246, 0)', '0px 0px 10px rgba(59, 130, 246, 0.5)']
          ), { stiffness: 300, damping: 30 })
        }}
      />
      <motion.div
        className="absolute top-0 left-0 right-0 h-full bg-white"
        style={{ 
          scaleX, 
          opacity: glowOpacity,
          filter: 'blur(4px)'
        }}
      />
      {sparks.map((id, index) => (
        <Spark key={id} delay={index * 0.1} />
      ))}
      {isHovered && (
        <motion.div
          className="absolute top-full left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {Math.round(scrollYProgress.get() * 100)}% scrolled
        </motion.div>
      )}
    </motion.div>
  );
};

export default ScrollProgressBar;