import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Palette } from 'lucide-react';
import { COLOR_PALETTE_ITEMS } from '../data/foliobloxData';

export const FolioPalette: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section id="palette" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Palette Header */}
      <div className="max-w-3xl mb-14">
        <div className="flex items-center gap-2 text-[#FF4D2D] font-mono text-xs uppercase tracking-wider mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FF4D2D] animate-pulse" />
          <span>Telemetry &amp; Design Specs</span>
        </div>

        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
          The palette supports night-ops focus, terminal clarity, and high-contrast telemetry readability.
        </h2>
      </div>

      {/* 3 Color Swatch Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLOR_PALETTE_ITEMS.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="p-6 sm:p-7 rounded-2xl glass-card flex flex-col justify-between border border-white/10 group hover:border-[#FF4D2D]/40 transition-all"
          >
            <div>
              {/* Header and Visual Color Pill */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-lg text-white">
                  {item.name}
                </h3>
                <div
                  className={`w-6 h-6 rounded-full ${item.border}`}
                  style={{ backgroundColor: item.sampleBg }}
                />
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                {item.role}
              </p>
            </div>

            {/* Spec Table (HEX / RGB / Opacity) */}
            <div className="pt-4 border-t border-white/10 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>HEX</span>
                <button
                  onClick={() => handleCopy(item.hex)}
                  className="flex items-center gap-1.5 text-white hover:text-[#FF4D2D] transition-colors"
                  title="Copy Hex"
                >
                  <span className="font-semibold">{item.hex}</span>
                  {copiedHex === item.hex ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  )}
                  <span className="text-[10px] text-slate-500 ml-1">{item.opacity}</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span>RGB</span>
                <span className="text-white font-medium">
                  {item.rgb} <span className="text-[10px] text-slate-500 ml-1">{item.opacity}</span>
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
