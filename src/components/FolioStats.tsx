import React from 'react';
import { motion } from 'motion/react';
import { STATS_ITEMS } from '../data/foliobloxData';

interface CounterProps {
  value: string;
}

const AnimatedStatValue: React.FC<CounterProps> = ({ value }) => {
  const [displayValue, setDisplayValue] = React.useState<string>(value);
  const [hasAnimated, setHasAnimated] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          if (value.includes('99.98')) {
            let start = 85.0;
            const target = 99.98;
            const step = () => {
              start += (target - start) * 0.12;
              if (target - start < 0.05) {
                setDisplayValue('99.98%');
              } else {
                setDisplayValue(`${start.toFixed(2)}%`);
                requestAnimationFrame(step);
              }
            };
            requestAnimationFrame(step);
          } else if (value.includes('140')) {
            let current = 0;
            const target = 140;
            const interval = setInterval(() => {
              current += 7;
              if (current >= target) {
                setDisplayValue('140+');
                clearInterval(interval);
              } else {
                setDisplayValue(`${current}+`);
              }
            }, 30);
          } else if (value.includes('18')) {
            let current = 95;
            const target = 18;
            const interval = setInterval(() => {
              current -= 4;
              if (current <= target) {
                setDisplayValue('<18ms');
                clearInterval(interval);
              } else {
                setDisplayValue(`<${current}ms`);
              }
            }, 35);
          } else {
            setDisplayValue(value);
          }
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tighter my-3 group-hover:text-[#FF8A65] transition-colors drop-shadow-[0_0_30px_rgba(255,77,45,0.2)]">
      {displayValue}
    </div>
  );
};

export const FolioStats: React.FC = () => {
  return (
    <section id="stats" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {STATS_ITEMS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group p-7 sm:p-10 rounded-3xl glass-card border border-white/10 flex flex-col justify-between hover:border-[#FF4D2D]/40 transition-all shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF4D2D]/5 rounded-full blur-2xl group-hover:bg-[#FF4D2D]/15 transition-all pointer-events-none" />

            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block">
                {stat.label}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FF4D2D]/60 group-hover:bg-[#FF4D2D] group-hover:shadow-[0_0_8px_#FF4D2D] transition-all" />
            </div>

            <AnimatedStatValue value={stat.value} />

            <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
