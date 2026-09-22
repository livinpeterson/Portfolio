import React from 'react';
import { GraduationCap, Award, BookOpen, CheckCircle2 } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 border-t border-amber-500/15 relative bg-[#040817]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs mb-2">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>CREDENTIALS // ACADEMIC & INDUSTRY FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinematic font-bold text-white tracking-tight">
            Education & Certifications
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            Grounded in core computer science theory and hardened by rigorous full-stack software development immersion.
          </p>
        </div>

        {/* 2-Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Degree */}
          <div className="cinematic-panel p-6 sm:p-8 rounded-2xl border border-amber-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-amber-400 font-semibold">{EDUCATION_DATA[0].period}</span>
                  <h3 className="text-lg sm:text-xl font-bold font-mono text-white mt-0.5">
                    {EDUCATION_DATA[0].degree}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1">
                    {EDUCATION_DATA[0].institution} | {EDUCATION_DATA[0].location}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-4">
                {EDUCATION_DATA[0].description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                Relevant Coursework:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-xs text-slate-300">
                {EDUCATION_DATA[0].coursework.map((course, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Certification */}
          <div className="cinematic-panel p-6 sm:p-8 rounded-2xl border border-amber-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">{EDUCATION_DATA[1].period}</span>
                  <h3 className="text-lg sm:text-xl font-bold font-mono text-white mt-0.5">
                    {EDUCATION_DATA[1].degree}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1">
                    {EDUCATION_DATA[1].institution} | {EDUCATION_DATA[1].location}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-4">
                {EDUCATION_DATA[1].description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                Verified Skill Coverage (38+ Competencies):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-xs text-slate-300">
                {EDUCATION_DATA[1].coursework.map((course, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
