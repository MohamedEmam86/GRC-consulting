// client/src/components/ScrollToTopButton.tsx
import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  /** How far to scroll (px) before showing the button */
  threshold?: number;
  /** Icon size in px */
  size?: number;
  /** Extra tailwind classes for the button */
  className?: string;
  /** Tailwind bg/hover classes (e.g. 'bg-purple-600 hover:bg-purple-700') */
  colorClass?: string;
  /** aria-label / title */
  ariaLabel?: string;
};

const ScrollToTopButton: React.FC<Props> = ({
  threshold = 300,
  size = 20,
  className = '',
  colorClass = 'bg-purple-600 hover:bg-purple-700',
  ariaLabel = 'Scroll to top',
}) => {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // only run in browser
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    // run once to set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const handleClick = () => {
    // smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  const button = (
    <button
      onClick={handleClick}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`fixed bottom-6 right-6 z-50 ${colorClass} text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 ${className}`}
    >
      <ArrowUp size={size} />
    </button>
  );

  // animate unless user prefers reduced motion
  return reduceMotion ? (
    button
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {button}
    </motion.div>
  );
};

export default ScrollToTopButton;
