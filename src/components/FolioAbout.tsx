import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { TRUSTED_BRANDS, FOLIO_PROJECTS } from '../data/foliobloxData';

interface FolioAboutProps {
  onContact: () => void;
  onSelectProject: (id: string) => void;
}

export const FolioAbout: React.FC<FolioAboutProps> = ({ onContact, onSelectProject }) => {
  const previewProjects = FOLIO_PROJECTS.slice(0, 3);

  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Brands Continuous Infinite Marquee Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-20 p-4 sm:p-5 rounded-2xl glass-pill overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/10"
      >
        <span className="text-xs font-sans text-slate-400 font-medium px-2 flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#FF4D2D] shadow-[0_0_8px_#FF4D2D]" />
          <span>Core Production Stack</span>
        </span>

        {/* Infinite Marquee Track with gradient fade edge masks */}
        <div className="relative overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee gap-8 sm:gap-12 flex items-center py-1">
            {/* Duplicated for seamless continuous loop */}
            {[...TRUSTED_BRANDS, ...TRUSTED_BRANDS, ...TRUSTED_BRANDS].map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 hover:border-[#FF4D2D]/40 text-slate-300 hover:text-white transition-all cursor-default shrink-0"
              >
                <span className="text-[#FF4D2D] font-mono text-xs">{brand.symbol}</span>
                <span className="font-semibold text-xs sm:text-sm tracking-wide">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Narrative Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
        <div className="lg:col-span-7 space-y-3">
          <span className="text-xs uppercase tracking-wider text-[#FF4D2D] font-mono font-medium block">
            Behind the Infrastructure
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
            Engineering Resilient <br className="hidden sm:block" />
            Systems That <br className="hidden sm:block" />
            Never Sleep
          </h2>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <p className="text-slate-300 font-sans text-base sm:text-lg leading-relaxed">
            I&apos;m Livingston Peter, a DevOps and Cloud Infrastructure Engineer at Manna Analytics. I specialize in building high-velocity CI/CD conduits, containerizing microservices with Docker, hardening Linux environments, and deploying self-healing production infrastructure with zero downtime.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <span className="text-xs text-slate-400 block font-sans">
                Ready to Upgrade Infrastructure?
              </span>
              <span className="text-sm font-semibold text-white font-sans flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Zero Downtime Guarantee
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContact}
              className="coral-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans group self-start sm:self-auto cursor-pointer"
            >
              <span>Get in touch</span>
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* 3 Featured Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {previewProjects.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.12 }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            onClick={() => onSelectProject(proj.id)}
            className="group relative rounded-2xl overflow-hidden glass-card cursor-pointer border border-white/10 hover:border-[#FF4D2D]/40 transition-all shadow-lg"
          >
            {/* Tag Badge */}
            <div className="absolute top-4 right-4 z-20">
              <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-black/75 text-white backdrop-blur-md border border-white/10">
                {proj.badge}
              </span>
            </div>

            {/* Image Thumbnail */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900 relative">
              <img
                src={proj.image}
                alt={proj.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-transparent opacity-60" />
            </div>

            {/* Bottom Meta */}
            <div className="p-5 border-t border-white/5 font-sans space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
                  {proj.subtitle}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  {proj.year}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-[#FF4D2D] transition-colors line-clamp-1">
                {proj.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {proj.description}
              </p>
              {proj.metrics && (
                <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-[#FF4D2D]">
                  <CheckCircle2 className="w-3 h-3 text-[#FF4D2D] shrink-0" />
                  <span className="truncate">{proj.metrics}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
