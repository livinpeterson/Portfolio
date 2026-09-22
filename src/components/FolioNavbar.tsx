import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Menu, X } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', action: () => { setActiveView('home'); onNavigateSection('home'); } },
    { label: 'About', action: () => { setActiveView('home'); onNavigateSection('about'); } },
    { label: 'Deployments', action: () => { setActiveView(activeView === 'projects' ? 'home' : 'projects'); } },
    { label: 'Pipeline', action: () => { setActiveView('home'); onNavigateSection('workflow'); } },
    { label: 'Architecture', action: () => { setActiveView('home'); onNavigateSection('palette'); } },
    { label: 'Telemetry', action: () => { setActiveView('home'); onNavigateSection('stats'); } },
    { label: 'Profile', action: () => { setActiveView('home'); onNavigateSection('studio'); } },
    { label: 'Contact', action: () => { setActiveView('home'); onNavigateSection('contact'); } },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0D14]/80 backdrop-blur-xl border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setActiveView('home');
            onNavigateSection('home');
          }}
          className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight hover:opacity-85 transition-opacity flex items-center gap-2.5"
        >
          <span>Livingston Peter</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#FF4D2D] border border-white/10 font-bold hidden sm:inline-block">
            DEVOPS
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 font-sans text-xs lg:text-sm font-medium text-slate-300">
          {navItems.map((item) => {
            const isProjectsActive = item.label === 'Deployments' && activeView === 'projects';
            return (
              <button
                key={item.label}
                onClick={item.action}
                className={`transition-colors duration-200 hover:text-white ${
                  isProjectsActive ? 'text-[#FF4D2D] font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: Resume & Get in touch */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/Livingston_Peter_DevOps_Resume.doc"
            download="Livingston_Peter_DevOps_Resume.doc"
            className="glass-pill inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold font-sans text-slate-300 hover:text-white hover:border-white/20 transition-all"
            title="Download Livingston's Resume"
          >
            <Download className="w-3.5 h-3.5 text-[#FF4D2D]" />
            <span>CV</span>
          </a>

          <button
            onClick={() => {
              setActiveView('home');
              onNavigateSection('contact');
            }}
            className="coral-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans group"
          >
            <span>Get in touch</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3 h-3 text-white" />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
