import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FolioPreloaderProps {
  onComplete?: () => void;
}

export const FolioPreloader: React.FC<FolioPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        const jump = Math.floor(Math.random() * 12) + 5;
        return Math.min(100, prev + jump);
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[100] pointer-events-none bg-[#0A0D14] flex flex-col justify-between p-6 sm:p-12 overflow-hidden shadow-2xl"
        >
          {/* Subtle grid backdrop inside preloader */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FF4D2D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* Top Progress Line with Glow */}
          <div className="relative z-10 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF5533] via-[#FF3D18] to-[#FFA07A] shadow-[0_0_15px_#FF4D2D]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>

          {/* Center Brand Monogram with Cyber Ring Pulse */}
          <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center pulse-sonar">
                <span className="w-3 h-3 rounded-full bg-[#FF4D2D] shadow-[0_0_12px_#FF4D2D]" />
              </div>
            </div>

            <div className="font-display font-black text-2xl sm:text-3xl tracking-wider text-white">
              LIVINGSTON PETER
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#FF4D2D] tracking-widest uppercase">
              <span>DevOps Engine</span>
              <span>//</span>
              <span>Loading Systems [{progress}%]</span>
            </div>
          </div>

          {/* Bottom Right Big Typography Percentage */}
          <div className="relative z-10 flex items-end justify-between">
            <div className="flex items-center gap-1 text-slate-500 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CI/CD PIPELINES &amp; CLOUD INFRASTRUCTURE</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-display font-black text-7xl sm:text-9xl text-white tracking-tighter drop-shadow-[0_0_35px_rgba(255,77,45,0.35)]">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
