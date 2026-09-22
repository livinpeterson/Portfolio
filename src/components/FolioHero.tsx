import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, Terminal } from 'lucide-react';
import { BRAND_TAGS } from '../data/foliobloxData';

interface FolioHeroProps {
  onExploreProjects: () => void;
  onContact: () => void;
}

export const FolioHero: React.FC<FolioHeroProps> = ({ onExploreProjects, onContact }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-between pt-36 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Top Hero Text Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 sm:pt-12">
        {/* Left Column: Greeting & Big Heading */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Available for DevOps &amp; Cloud Roles</span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-xs sm:text-sm font-sans font-medium text-slate-300 block mb-1"
          >
            Hey, I&apos;m Livingston Peter —
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-[0.98]"
          >
            DevOps <br />
            Engineer
          </motion.h1>
        </div>

        {/* Right Column: Statement, Subtext & Action Buttons */}
        <div className="lg:col-span-5 lg:pt-8 space-y-5">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug"
          >
            Reliable infrastructure <br className="hidden sm:block" />
            should feel invisible.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base text-slate-300 font-sans max-w-md leading-relaxed"
          >
            From Git commit to live container cutover, I architect automated CI/CD pipelines, zero-downtime Linux production servers, and observable infrastructure that scales effortlessly under peak traffic.
          </motion.p>

          {/* Quick CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <button
              onClick={onExploreProjects}
              className="coral-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans group"
            >
              <span>Explore Deployments</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <a
              href="/Livingston_Peter_DevOps_Resume.doc"
              download="Livingston_Peter_DevOps_Resume.doc"
              className="glass-pill inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold font-sans text-slate-200 hover:text-white hover:border-white/20 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#FF4D2D]" />
              <span>Resume (.doc)</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom Service Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="pt-16 sm:pt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/5"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full font-sans text-xs sm:text-sm">
          {BRAND_TAGS.map((tag) => (
            <div key={tag.id} className="flex items-center gap-2 group cursor-pointer hover:opacity-90 transition-opacity">
              <span className="font-mono text-[#FF4D2D] font-bold text-xs sm:text-sm">
                #{tag.id}
              </span>
              <span className="text-white font-medium text-xs sm:text-sm">
                {tag.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
