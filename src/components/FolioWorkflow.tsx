import React from 'react';
import { motion } from 'motion/react';
import { GitBranch, Clock, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';
import { WORKFLOW_MILESTONES } from '../data/foliobloxData';

export const FolioWorkflow: React.FC = () => {
  return (
    <section id="workflow" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Workflow Header Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 text-[#FF4D2D] font-mono text-xs uppercase tracking-wider mb-3">
            <GitBranch className="w-3.5 h-3.5 text-[#FF4D2D]" />
            <span>Continuous Delivery Pipeline</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
            Automated CI/CD Conduit: <br className="hidden sm:block" />
            From Git Push to <br className="hidden sm:block" />
            Zero-Downtime Release.
          </h2>
        </div>

        <div className="lg:col-span-5 lg:pt-8">
          <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
            Every production rollout follows a deterministic, hermetic automated pipeline. Strict linting, parallelized test execution, multi-stage Docker layer caching, automated CVE audits, and atomic Nginx upstream reloads guarantee zero dropped connections for users.
          </p>
        </div>
      </div>

      {/* Interactive Pipeline Timeline Board */}
      <div className="relative rounded-3xl p-6 sm:p-12 glass-card border border-white/10 overflow-hidden">
        {/* Subtle grid pattern inside */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF4D2D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Milestone Steps Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10">
          {WORKFLOW_MILESTONES.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-5 rounded-2xl glass-pill hover:border-[#FF4D2D]/40 transition-all group flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF4D2D] mt-1.5 shrink-0 shadow-[0_0_8px_#FF4D2D]" />
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-[#FF4D2D] transition-colors">
                    {item.label}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                    Stage {String(idx + 1).padStart(2, '0')} // Pipeline Step
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-white/5 text-slate-300 border border-white/10 shrink-0">
                {item.duration}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Pipeline Summary Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-sans text-xs text-slate-400 relative z-10">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FF4D2D]" />
            <span>Mean Pipeline Duration: <strong>~6.0 Minutes End-to-End</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Automated Test Pass Rate: <strong>99.8% Green Gates</strong></span>
          </div>

          <div className="flex items-center gap-2 text-white">
            <CheckCircle2 className="w-4 h-4 text-[#FF4D2D]" />
            <span>Rollout Strategy: <strong>Blue-Green Zero-Downtime Hot Reload</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};
