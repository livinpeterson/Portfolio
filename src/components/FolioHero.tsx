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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-4 backdrop-blur-md shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-200">Available for DevOps &amp; Cloud Roles</span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs sm:text-sm font-sans font-medium text-slate-400 block mb-2 tracking-wide"
          >
            Hey, I&apos;m Livingston Peter —
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* VFX Anamorphic Flare Glow */}
            <div className="absolute -top-6 -left-6 w-96 h-32 bg-gradient-to-r from-[#FF4D2D]/20 via-[#FF8A65]/15 to-transparent blur-3xl -z-10 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

            <h1 className="font-display font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.96]">
              <span className="text-white">DevOps</span> <br />
              <span className="relative inline-block">
                <span className="animate-text-shimmer drop-shadow-[0_0_40px_rgba(255,77,45,0.3)]">
                  Engineer
                </span>
                {/* Thin laser underline accent */}
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF4D2D] via-[#FF8A65] to-transparent opacity-80" />
              </span>
            </h1>
          </motion.div>

          {/* Floating Live Telemetry Metric Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 inline-flex items-center gap-3 p-2.5 pr-4 rounded-2xl glass-card border border-white/10 animate-float shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FF4D2D]/20 border border-[#FF4D2D]/40 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-[#FF4D2D]" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <span>Live System Health</span>
                <span className="text-[10px] text-emerald-400 font-bold px-1.5 py-0.2 rounded bg-emerald-950/60 border border-emerald-500/30">
                  HEALTHY
                </span>
              </div>
              <div className="text-xs font-semibold text-white flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>99.99% Uptime // Zero Dropped Sockets</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Statement, Subtext & Action Buttons */}
        <div className="lg:col-span-5 lg:pt-8 space-y-5">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug"
          >
            Reliable infrastructure <br className="hidden sm:block" />
            should feel invisible.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-sm sm:text-base text-slate-300 font-sans max-w-md leading-relaxed"
          >
            From Git commit to live container cutover, I architect automated CI/CD pipelines, zero-downtime Linux production servers, and observable infrastructure that scales effortlessly under peak traffic.
          </motion.p>

          {/* Quick CTA row with interactive spring animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExploreProjects}
              className="coral-btn inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider font-sans group cursor-pointer"
            >
              <span>Explore Deployments</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="/Livingston_Peter_DevOps_Resume.doc"
              download="Livingston_Peter_DevOps_Resume.doc"
              className="glass-pill inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold font-sans text-slate-200 hover:text-white hover:border-white/30 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#FF4D2D]" />
              <span>Resume (.doc)</span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Bottom Service Tags with interactive cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="pt-16 sm:pt-20 border-t border-white/5 relative"
      >
        {/* VFX Laser line accent */}
        <div className="absolute top-0 left-0 right-0 laser-divider" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full font-sans text-xs sm:text-sm">
          {BRAND_TAGS.map((tag) => (
            <motion.div
              key={tag.id}
              whileHover={{ y: -3, scale: 1.02 }}
              className="p-3 sm:p-4 rounded-xl glass-card border border-white/5 hover:border-[#FF4D2D]/40 transition-all flex items-center gap-2.5 cursor-pointer group"
            >
              <span className="font-mono text-[#FF4D2D] font-bold text-xs sm:text-sm group-hover:drop-shadow-[0_0_8px_#FF4D2D] transition-all">
                #{tag.id}
              </span>
              <span className="text-white font-medium text-xs sm:text-sm group-hover:text-[#FF8A65] transition-colors">
                {tag.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
