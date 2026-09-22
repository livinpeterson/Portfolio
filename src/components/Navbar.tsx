import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Menu, 
  X, 
  Send, 
  Film, 
  ShieldCheck, 
  Activity,
  Layers,
  AlertTriangle,
  Cpu,
  History,
  FileCode2,
  Mail
} from 'lucide-react';
import { AudioController } from './AudioController';

interface NavbarProps {
  letterboxActive: boolean;
  setLetterboxActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const navActs = [
  { id: 'cinematic-scrub', label: '3D System', act: 'Cinema', icon: Cpu },
  { id: 'pipeline', label: 'Pipeline', act: 'Act I', icon: Layers },
  { id: 'incidents', label: 'Incident Lab', act: 'Act II', icon: AlertTriangle },
  { id: 'skills', label: 'Arsenal', act: 'Act III', icon: Terminal },
  { id: 'experience', label: 'Odyssey', act: 'Act IV', icon: History },
  { id: 'projects', label: 'Deployments', act: 'Act V', icon: FileCode2 },
  { id: 'contact', label: 'Transmission', act: 'Act VI', icon: Mail },
];

export const Navbar: React.FC<NavbarProps> = ({ letterboxActive, setLetterboxActive }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['home', ...navActs.map((act) => act.id)];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      id="main-cinematic-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#030712]/85 backdrop-blur-xl border-b border-amber-500/20 shadow-[0_15px_40px_rgba(0,0,0,0.8)] py-3'
          : 'bg-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-3 text-left group transition-transform duration-200"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-blue-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all">
            <Terminal className="w-4 h-4 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinematic font-bold text-sm tracking-widest text-slate-100 group-hover:text-amber-200 transition-colors uppercase">
                Livingston Peter
              </span>
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                DevOps
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>manna-prod // zero-downtime</span>
            </p>
          </div>
        </button>

        {/* Desktop Navigation Acts */}
        <nav className="hidden xl:flex items-center space-x-1 font-mono text-xs">
          {navActs.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`group px-3 py-1.5 rounded-lg transition-all duration-200 relative flex items-center gap-1.5 ${
                  isActive
                    ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)] font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="text-[9px] text-amber-400/70 group-hover:text-amber-300">
                  {item.act}
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Cinematic Control Center (Audio, Letterbox, Status) */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Audio controller */}
          <AudioController />

          {/* 2.39:1 Anamorphic Letterbox Toggle */}
          <button
            onClick={() => setLetterboxActive(!letterboxActive)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
              letterboxActive
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-white/10'
            }`}
            title="Toggle 2.39:1 Anamorphic Cinema Mode"
          >
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px]">2.39:1</span>
          </button>

          {/* Availability Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-mono text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-semibold text-emerald-300">Available</span>
          </div>

          {/* Quick Connect CTA */}
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 hover:brightness-110 shadow-[0_0_15px_rgba(245,158,11,0.35)] transition-all font-mono"
          >
            <span>Transmit</span>
            <Send className="w-3 h-3" />
          </button>
        </div>

        {/* Mobile controls & hamburger button */}
        <div className="flex xl:hidden items-center space-x-2">
          <AudioController />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-white/10 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#050b1a]/95 backdrop-blur-2xl border-b border-amber-500/20 px-5 pt-4 pb-6 space-y-2 mt-2 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pb-3 mb-3 border-b border-white/10">
            <button
              onClick={() => setLetterboxActive(!letterboxActive)}
              className={`p-2 rounded-lg text-xs font-mono flex items-center justify-center gap-2 border ${
                letterboxActive ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-slate-900 text-slate-400 border-white/10'
              }`}
            >
              <Film className="w-4 h-4 text-amber-400" />
              <span>Cinema Mode: {letterboxActive ? 'ON' : 'OFF'}</span>
            </button>

            <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open to Roles</span>
            </div>
          </div>

          {navActs.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-mono flex items-center justify-between ${
                  isActive
                    ? 'text-amber-300 bg-amber-500/15 font-bold border-l-2 border-amber-400 pl-4'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{item.label}</span>
                </div>
                <span className="text-xs text-amber-400/70">{item.act}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
