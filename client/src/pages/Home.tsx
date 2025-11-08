// Home.tsx (updated)
// Replace your existing Home.tsx with this file. Adjust import path if needed.
import { useState, useRef, useEffect, Fragment } from 'react';
import { Menu, X, ChevronDown, ExternalLink, Play, CheckCircle, ArrowRight, BookOpen, Globe, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'wouter';

// Slide panel component — accessible dialog that renders HTML content
function SlidePanel({ open, title, html, onClose }: { open: boolean; title?: string; html?: string; onClose: () => void; }) {
  // lock scroll when open
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label={title || 'Details panel'}
          className="fixed top-0 right-0 w-full md:w-2/5 lg:w-1/3 h-full bg-white shadow-2xl z-50 overflow-auto"
        >
          <div className="p-6 md:p-10">
            <button id="close-panel" onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100" aria-label="Close panel">
              <X className="w-5 h-5" />
            </button>
            {title && <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>}
            <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: html || '<p>No content</p>' }} />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

// Animated card component — receives onOpen callback
const AnimatedCard = ({ id, title, excerpt, imagePath, isCaseStudy = false, onOpen }: {
  id: string;
  title: string;
  excerpt: string;
  imagePath: string;
  isCaseStudy?: boolean;
  onOpen: (id: string) => void;
}) => {
  const ariaLabel = isCaseStudy ? `Open case study: ${title}` : `Open service details: ${title}`;

  return (
    <button
      onClick={() => onOpen(id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(id); } }}
      role="button"
      tabIndex={0}
      className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer text-left"
      aria-label={ariaLabel}
    >
      <div className="relative h-56 md:h-64">
        <img
          src={imagePath}
          alt={`${title} image`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-white/90 mt-1 hidden md:block">{excerpt}</p>
          <ChevronRight className="w-6 h-6 text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </button>
  );
};

export
