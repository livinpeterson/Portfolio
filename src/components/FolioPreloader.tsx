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
          }, 350);
          return 100;
        }
        const jump = Math.floor(Math.random() * 14) + 6;
        return Math.min(100, prev + jump);
      });
    }, 70);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 pointer-events-none bg-[#0A0D14] flex flex-col justify-between p-6 sm:p-12 overflow-hidden"
        >
          {/* Top Progress Line */}
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF5533] to-[#FF3D18]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>

          {/* Center Brand Monogram */}
          <div className="flex items-center justify-center font-display text-2xl tracking-tight text-white/40">
            Folioblox
          </div>

          {/* Bottom Right Big Typography Percentage as seen in video */}
          <div className="flex justify-end items-baseline">
            <span className="font-display font-black text-6xl sm:text-8xl md:text-9xl text-white tracking-tighter">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
