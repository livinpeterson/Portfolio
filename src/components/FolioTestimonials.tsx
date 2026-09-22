import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/foliobloxData';

export const FolioTestimonials: React.FC = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-2xl mb-14">
        <div className="flex items-center gap-2 text-[#FF4D2D] font-mono text-xs uppercase tracking-wider mb-3">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>Client Feedback</span>
        </div>

        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
          What Clients &amp; Partners Say
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="p-7 rounded-2xl glass-card border border-white/10 flex flex-col justify-between"
          >
            {/* 5 Coral Stars */}
            <div className="flex items-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#FF4D2D] text-[#FF4D2D]" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed italic mb-6">
              &ldquo;{item.comment}&rdquo;
            </p>

            {/* Author */}
            <div className="pt-4 border-t border-white/10 font-sans">
              <h3 className="font-bold text-sm text-white">{item.name}</h3>
              <span className="text-xs text-slate-400 font-medium block mt-0.5">
                {item.role}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
