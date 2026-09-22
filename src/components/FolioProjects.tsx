import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Download, Layers, ShieldCheck, Terminal } from 'lucide-react';
import { FOLIO_PROJECTS, METHODOLOGY_STEPS, FolioProject } from '../data/foliobloxData';

interface FolioProjectsProps {
  onContact: () => void;
  isStandalonePage?: boolean;
}

export const FolioProjects: React.FC<FolioProjectsProps> = ({ onContact, isStandalonePage = false }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All Deployments (6)');
  const [selectedProjectModal, setSelectedProjectModal] = useState<FolioProject | null>(null);

  const filterTabs = [
    'All Deployments (6)',
    'CI/CD & Containers',
    'Cloud & Linux',
    'Database & Migrations',
    'Observability & Security'
  ];

  const filteredProjects = activeFilter === 'All Deployments (6)'
    ? FOLIO_PROJECTS
    : FOLIO_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div id="projects" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Header Container */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-[#FF4D2D] font-mono text-xs uppercase tracking-wider mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FF4D2D]" />
          <span>DevOps &amp; Cloud Engineering Portfolio</span>
        </div>

        <h2 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
          Production Systems &amp; <br />
          Deployments
        </h2>

        <p className="text-slate-300 font-sans text-sm sm:text-base mt-4 leading-relaxed max-w-2xl">
          A verified portfolio of high-concurrency Linux server hardening, zero-downtime cutover engines, automated CI/CD conduits, and observability platforms engineered by Livingston Peter.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2.5 mb-14 font-sans text-xs sm:text-sm">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#FF4D2D] text-white font-semibold shadow-[0_0_20px_rgba(255,77,45,0.4)]'
                  : 'glass-pill text-slate-300 hover:text-white hover:border-white/20'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 2-Column Bento Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {filteredProjects.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            onClick={() => setSelectedProjectModal(proj)}
            className="group rounded-3xl overflow-hidden glass-card border border-white/10 cursor-pointer flex flex-col justify-between"
          >
            {/* Top Bar inside card */}
            <div className="p-6 sm:p-7 flex items-center justify-between border-b border-white/5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  {proj.subtitle}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#FF4D2D] transition-colors">
                  {proj.title}
                </h3>
              </div>
              <span className="font-mono text-xs text-slate-400">
                {proj.year}
              </span>
            </div>

            {/* Project Image Preview */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
              <img
                src={proj.image}
                alt={proj.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold uppercase tracking-wider bg-black/70 text-white backdrop-blur-md border border-white/15">
                  {proj.badge}
                </span>
              </div>
            </div>

            {/* Bottom Project Details & Tech Stack */}
            <div className="p-6 sm:p-7 space-y-4 font-sans border-t border-white/5">
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                {proj.description}
              </p>

              {/* Tech Stack Tags */}
              {proj.techStack && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Metric & Arrow CTA */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#FF4D2D]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4D2D] shrink-0" />
                  <span className="truncate">{proj.metrics}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#FF4D2D] transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Methodology Section: Lifecycle & Pipeline Rigor */}
      <div className="pt-12 mb-24 border-t border-white/10">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-[#FF4D2D] font-mono text-xs uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4D2D]" />
            <span>DevOps Methodology</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            How I Architect Resilient Infrastructure
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {METHODOLOGY_STEPS.map((step) => (
            <div key={step.num} className="p-8 rounded-2xl glass-card border border-white/10 space-y-4">
              <span className="font-display font-black text-2xl text-[#FF4D2D] block">
                {step.num}
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                {step.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Work With Us Banner as seen in video */}
      <div className="rounded-3xl glass-card p-8 sm:p-14 text-center border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D2D]/10 to-transparent pointer-events-none" />
        <span className="font-mono text-xs uppercase tracking-wider text-[#FF4D2D] block mb-3">
          INFRASTRUCTURE &amp; HIRING
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
          Need Resilient DevOps or Cloud Migration?
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
          Whether you need end-to-end CI/CD automation, Docker containerization, Linux performance tuning, or a full-time DevOps engineer on your team, let&apos;s talk.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onContact}
            className="coral-btn inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider font-sans group shadow-xl"
          >
            <span>Initiate Technical Discussion</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
          </button>

          <a
            href="/Livingston_Peter_DevOps_Resume.doc"
            download="Livingston_Peter_DevOps_Resume.doc"
            className="glass-pill inline-flex items-center gap-2 px-6 py-4 rounded-full text-xs font-semibold font-sans text-slate-200 hover:text-white hover:border-white/25 transition-all"
          >
            <Download className="w-4 h-4 text-[#FF4D2D]" />
            <span>Download Resume (.doc)</span>
          </a>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProjectModal(null)}
              className="fixed inset-0 bg-[#0A0D14]/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl rounded-3xl glass-card border border-white/20 shadow-2xl overflow-hidden z-10 my-8"
            >
              {/* Modal Cover Image */}
              <div className="aspect-[16/9] w-full bg-slate-900 relative">
                <img
                  src={selectedProjectModal.image}
                  alt={selectedProjectModal.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProjectModal(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Details */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#FF4D2D] font-bold uppercase tracking-wider">
                    {selectedProjectModal.subtitle} // {selectedProjectModal.year}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white">
                    {selectedProjectModal.badge}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {selectedProjectModal.title}
                </h3>

                <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
                  {selectedProjectModal.description}
                </p>

                {/* Tech Stack */}
                {selectedProjectModal.techStack && (
                  <div className="pt-2">
                    <span className="text-xs font-mono text-slate-400 block mb-2">Technologies &amp; Tools:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProjectModal.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Performance Metric */}
                {selectedProjectModal.metrics && (
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-mono text-white">
                    <CheckCircle2 className="w-4 h-4 text-[#FF4D2D] shrink-0" />
                    <span><strong>Verified Metric:</strong> {selectedProjectModal.metrics}</span>
                  </div>
                )}

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedProjectModal(null);
                      onContact();
                    }}
                    className="coral-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
                  >
                    <span>Request Infrastructure Like This</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setSelectedProjectModal(null)}
                    className="px-5 py-3 rounded-full glass-pill text-xs text-slate-300 hover:text-white"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
