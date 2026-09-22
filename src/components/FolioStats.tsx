import React from 'react';
import { motion } from 'motion/react';
import { STATS_ITEMS } from '../data/foliobloxData';

export const FolioStats: React.FC = () => {
  return (
    <section id="stats" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {STATS_ITEMS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="p-7 sm:p-10 rounded-3xl glass-card border border-white/10 flex flex-col justify-between hover:border-[#FF4D2D]/30 transition-colors"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block mb-2">
              {stat.label}
            </span>

            <div className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tighter my-3">
              {stat.value}
            </div>

            <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
