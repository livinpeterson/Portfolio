import React from 'react';
import { motion } from 'motion/react';
import { Download, Mail, Phone, MapPin } from 'lucide-react';
import studioModelImg from '../assets/images/studio_model_1790071088968.jpg';

export const FolioStudio: React.FC = () => {
  return (
    <section id="studio" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden text-center">
      {/* Giant Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 select-none overflow-hidden">
        <span className="font-display font-black text-6xl sm:text-8xl md:text-[11rem] text-white tracking-tighter whitespace-nowrap">
          LIVINGSTON PETER
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
        <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block mb-6">
          DEVOPS &amp; CLOUD INFRASTRUCTURE // NAGERCOIL, TAMILNADU
        </span>

        {/* Central Floating Portrait Card with Ambient Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-64 sm:w-80 aspect-square rounded-3xl overflow-hidden glass-card p-2 border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] mb-8 animate-float group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4D2D]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

          <img
            src={studioModelImg}
            alt="Livingston Peter — DevOps Engineer"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
          />

          {/* Floating Pill Badge */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-sans font-medium text-white flex items-center gap-1.5 shadow-xl z-20">
            <span className="text-[#FF4D2D] animate-pulse">✦</span>
            <span>DevOps // Cloud &amp; CI/CD</span>
          </div>
        </motion.div>

        {/* Statement Narrative */}
        <p className="font-sans text-base sm:text-xl text-slate-200 leading-relaxed font-normal mb-8 max-w-2xl">
          Livingston Peter is a DevOps Engineer and Cloud Infrastructure Specialist at Manna Analytics, engineering high-availability deployment pipelines, Docker container ecosystems, and observable systems designed to handle enterprise workloads with zero downtime.
        </p>

        {/* Quick Contact & Resume Action Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="mailto:livinpeterson@gmail.com"
            className="glass-pill inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono text-slate-300 hover:text-white hover:border-white/30 transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#FF4D2D]" />
            <span>livinpeterson@gmail.com</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="tel:+918870724190"
            className="glass-pill inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono text-slate-300 hover:text-white hover:border-white/30 transition-all cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-[#FF4D2D]" />
            <span>+91 8870724190</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="/Livingston_Peter_DevOps_Resume.doc"
            download="Livingston_Peter_DevOps_Resume.doc"
            className="coral-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume (.doc)</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};
