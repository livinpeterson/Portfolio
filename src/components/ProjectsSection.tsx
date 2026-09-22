import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileCode2, ExternalLink, ShieldCheck, Zap, ArrowUpRight, CheckCircle2, Maximize2 } from 'lucide-react';
import { PROJECT_DEPLOYMENTS } from '../data/portfolioData';
import { ArchitectureModal } from './ArchitectureModal';
import { ProjectDeployment } from '../types';

export const ProjectsSection: React.FC = () => {
  const [activeDeployment, setActiveDeployment] = useState(PROJECT_DEPLOYMENTS[0]);
  const [modalProject, setModalProject] = useState<ProjectDeployment | null>(null);

  return (
    <section id="projects" className="py-24 border-t border-amber-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs mb-2">
            <FileCode2 className="w-4 h-4 text-amber-400" />
            <span>ACT V // LANDMARK DEPLOYMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinematic font-bold text-white tracking-tight">
            Featured Engineering Deployments
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            In-depth architectural breakdowns of mission-critical migrations, ETL pipelines, and automation rescues.
          </p>
        </div>

        {/* 3 Case Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PROJECT_DEPLOYMENTS.map((proj) => {
            const isSelected = activeDeployment.id === proj.id;

            return (
              <button
                key={proj.id}
                onClick={() => setActiveDeployment(proj)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900/90 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)] -translate-y-1.5'
                    : 'bg-slate-950/70 border-white/10 hover:border-amber-500/30 hover:-translate-y-0.5'
                }`}
              >
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {proj.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-amber-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white font-mono leading-snug mb-2">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-sans line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Key Metrics Snapshot */}
                <div className="mt-5 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 font-mono text-xs">
                  {proj.keyMetrics.slice(0, 2).map((m, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-950/80 border border-white/5">
                      <span className="text-slate-500 text-[9px] block uppercase">{m.label}</span>
                      <span className="text-amber-300 font-bold text-xs">{m.value}</span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Deployment Deep Architecture Blueprint View */}
        <div className="cinematic-panel p-6 sm:p-8 rounded-2xl border border-amber-500/25 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider uppercase block mb-1">
                SYSTEM BLUEPRINT & ARCHITECTURE SPECIFICATION
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-mono text-white">
                {activeDeployment.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1">
                {activeDeployment.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-wrap gap-1.5 font-mono text-xs">
                {activeDeployment.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setModalProject(activeDeployment)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/15 text-amber-300 hover:text-white border border-amber-500/40 hover:bg-amber-500/30 font-mono text-xs font-semibold transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Deep Blueprint</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Architecture Details (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <h4 className="text-sm font-mono text-slate-400 font-semibold uppercase tracking-wider">
                Engineering Execution & Topology:
              </h4>
              <div className="space-y-2.5">
                {activeDeployment.architectureDetails.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-white/5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {/* Verdict Banner */}
              <div className="mt-4 p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-sans flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold font-mono block mb-0.5 text-amber-300 uppercase">
                    Production Impact:
                  </span>
                  {activeDeployment.verdict}
                </div>
              </div>
            </div>

            {/* Verified Metrics (4 cols) */}
            <div className="lg:col-span-4 space-y-3 font-mono">
              <h4 className="text-sm text-slate-400 font-semibold uppercase tracking-wider">
                Verified Verification KPIs:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {activeDeployment.keyMetrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-amber-500/30 transition-colors"
                  >
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      {m.label}
                    </span>
                    <span className="text-xl font-bold text-amber-300 block mt-1">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive Case Study Architecture Modal */}
      <ArchitectureModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
};
