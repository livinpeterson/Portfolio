import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Terminal, 
  CheckCircle, 
  Sparkles, 
  Layers, 
  Activity, 
  Server, 
  Database, 
  Workflow, 
  Cloud 
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories = activeCategory === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((c) => c.id === activeCategory);

  return (
    <section id="skills" className="py-24 border-t border-amber-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs mb-2">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>ACT III // THE TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinematic font-bold text-white tracking-tight">
              DevOps & Infrastructure Competencies
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-sans">
              Battle-tested tools, protocols, and engineering principles honed across live production environments.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              All Matrix
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {cat.title.split('&')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="cinematic-panel p-6 rounded-2xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono">
                  <h3 className="text-base font-bold text-amber-200">
                    {category.title}
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-amber-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                <p className="text-xs text-slate-400 font-mono mb-5 leading-relaxed">
                  {category.tagline}
                </p>

                {/* Skills List */}
                <div className="space-y-3 font-mono">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 hover:border-amber-500/30 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white font-semibold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          {skill.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 pl-3">
                        {skill.highlight}
                      </p>
                    </div>
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
