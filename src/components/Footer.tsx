import React from 'react';
import { Terminal, ArrowUp, ShieldCheck, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-amber-500/20 py-12 bg-[#02050e] text-xs font-mono text-slate-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="font-cinematic font-bold text-sm tracking-wider text-slate-200 uppercase block">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] text-slate-500">
                Architect of Continuous High-Availability Infrastructure
              </span>
            </div>
          </div>

          {/* Quick coordinates */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-amber-300 transition-colors">
              {PERSONAL_INFO.email}
            </a>
            <span className="text-slate-700">|</span>
            <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-amber-300 transition-colors">
              {PERSONAL_INFO.phone}
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0077b5] hover:text-cyan-300 transition-colors"
            >
              LinkedIn Profile
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5"
            title="Return to Prologue"
          >
            <span className="text-[10px]">ASCEND</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Nagercoil, Tamil Nadu, India — Available for Global Opportunities</span>
          </div>
          <div>
            © {new Date().getFullYear()} Livingston Peter. Built with React 19, Motion, & Web Audio.
          </div>
        </div>
      </div>
    </footer>
  );
};
