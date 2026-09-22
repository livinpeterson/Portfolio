import React from 'react';
import { motion } from 'motion/react';
import { History, Briefcase, MapPin, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { EXPERIENCE_ITEMS } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 border-t border-amber-500/15 relative bg-[#040817]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs mb-2">
            <History className="w-4 h-4 text-amber-400" />
            <span>ACT IV // THE CAREER ODYSSEY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinematic font-bold text-white tracking-tight">
            Work Experience & Milestones
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            A track record of stabilizing architectures, deploying zero-downtime microservices, and leading database migrations.
          </p>
        </div>

        {/* Timeline Track */}
        <div className="relative border-l border-amber-500/30 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-10">
          {EXPERIENCE_ITEMS.map((item, idx) => (
            <div key={item.id} className="relative group">
              {/* Timeline Gold Pulse Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-400 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.6)] transition-all duration-300" />

              {/* Experience Card */}
              <div className="cinematic-panel p-6 sm:p-8 rounded-2xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300">
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-3">
                      {item.role}
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {item.company}
                      </span>
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        {item.location}
                      </span>
                      <span>•</span>
                      <span className="text-slate-400">{item.type}</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 font-semibold shadow-sm">
                    {item.period}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-300 font-sans mt-3 leading-relaxed">
                  {item.summary}
                </p>

                {/* Bullets List */}
                <div className="mt-5 space-y-2.5 border-t border-white/10 pt-4">
                  <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider block mb-2">
                    Key Architectural Accomplishments:
                  </span>
                  <ul className="space-y-2">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-950/80 text-slate-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
