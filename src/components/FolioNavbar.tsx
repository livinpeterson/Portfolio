import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AudioController } from './AudioController';

interface FolioNavbarProps {
  activeView: 'home' | 'projects';
  setActiveView: (view: 'home' | 'projects') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const FolioNavbar: React.FC<FolioNavbarProps> = ({
  activeView,
  setActiveView,
  onNavigateSection
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', action: () => { setActiveView('home'); onNavigateSection('home'); } },
    { label: 'About', action: () => { setActiveView('home'); onNavigateSection('about'); } },
    { label: 'Deployments', action: () => { setActiveView(activeView === 'projects' ? 'home' : 'projects'); } },
    { label: 'Pipeline', action: () => { setActiveView('home'); onNavigateSection('workflow'); } },
    { label: 'Telemetry', action: () => { setActiveView('home'); onNavigateSection('stats'); } },
    { label: 'Profile', action: () => { setActiveView('home'); onNavigateSection('studio'); } },
    { label: 'Contact', action: () => { setActiveView('home'); onNavigateSection('contact'); } },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out flex justify-center ${
        scrolled ? 'pt-3 sm:pt-4 px-3 sm:px-6' : 'pt-5 sm:pt-6 px-4 sm:px-8'
      }`}
    >
      <div
        className={`w-full transition-all duration-500 ease-out flex items-center justify-between ${
          scrolled
            ? 'max-w-6xl py-2.5 px-4 sm:px-6 rounded-full bg-[#0A0D14]/85 backdrop-blur-2xl border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(255,77,45,0.06)]'
            : 'max-w-7xl py-2 bg-transparent'
        }`}
      >
        {/* Brand Logo with glowing beacon pulse */}
        <button
          onClick={() => {
            setActiveView('home');
            onNavigateSection('home');
          }}
          className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight hover:opacity-90 transition-all flex items-center gap-2.5 cursor-pointer group"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D2D] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF4D2D]" />
          </span>
          <span className="group-hover:text-slate-100 transition-colors">Livingston Peter</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-[#FF4D2D] border border-white/10 font-bold hidden sm:inline-block">
            DEVOPS
          </span>
        </button>

        {/* Desktop Navigation Links with sliding pill indicator */}
        <nav
          onMouseLeave={() => setHoveredItem(null)}
          className="hidden md:flex items-center gap-1 font-sans text-xs lg:text-sm font-medium text-slate-300 relative p-1 rounded-full"
        >
          {navItems.map((item) => {
            const isProjectsActive = item.label === 'Deployments' && activeView === 'projects';
            const isHovered = hoveredItem === item.label;

            return (
              <button
                key={item.label}
                onClick={item.action}
                onMouseEnter={() => setHoveredItem(item.label)}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer ${
                  isProjectsActive ? 'text-white font-semibold' : 'hover:text-white'
                }`}
              >
                {/* Sliding indicator on hover */}
                {isHovered && (
                  <motion.div
                    layoutId="navHoverIndicator"
                    className="absolute inset-0 bg-white/8 rounded-full border border-white/10 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Active marker dot */}
                {isProjectsActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF4D2D] shadow-[0_0_6px_#FF4D2D]" />
                )}

                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: Minimalist Audio, Resume & Get in touch */}
        <div className="hidden sm:flex items-center gap-2.5">
          <AudioController />

          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="/Livingston_Peter_DevOps_Resume.doc"
            download="Livingston_Peter_DevOps_Resume.doc"
            className="glass-pill inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold font-sans text-slate-300 hover:text-white hover:border-white/25 transition-all cursor-pointer"
            title="Download Livingston's Resume"
          >
            <Download className="w-3.5 h-3.5 text-[#FF4D2D]" />
            <span>CV</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setActiveView('home');
              onNavigateSection('contact');
            }}
            className="coral-btn inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider font-sans group cursor-pointer"
          >
            <span>Get in touch</span>
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3 h-3 text-white" />
            </div>
          </motion.button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <AudioController />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-full bg-white/5 border border-white/10 cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0D14]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setMobileMenuOpen(false);
                item.action();
              }}
              className="block w-full text-left py-2 text-base text-slate-200 hover:text-[#FF4D2D]"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <a
              href="/Livingston_Peter_DevOps_Resume.doc"
              download="Livingston_Peter_DevOps_Resume.doc"
              className="w-full glass-pill flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-200"
            >
              <Download className="w-4 h-4 text-[#FF4D2D]" />
              <span>Download Resume (.doc)</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveView('home');
                onNavigateSection('contact');
              }}
              className="w-full coral-btn flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
