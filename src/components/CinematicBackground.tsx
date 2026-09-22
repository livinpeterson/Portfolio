import React, { useEffect, useRef } from 'react';

interface CinematicBackgroundProps {
  letterboxActive?: boolean;
}

export const CinematicBackground: React.FC<CinematicBackgroundProps> = ({ letterboxActive = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Floating cinematic gold motes and starlight particles
    const particleCount = 48;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      color: Math.random() > 0.4 ? 'rgba(250, 204, 21, ' : 'rgba(56, 189, 248, ',
      alpha: Math.random() * 0.6 + 0.1,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.35 - 0.1, // gently drift upwards like film embers
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = Math.max(0, p.alpha + Math.sin(p.pulse) * 0.25);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color.includes('250') ? 'rgba(234, 179, 8, 0.6)' : 'rgba(56, 189, 248, 0.6)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* 1. Deep Midnight Base with Anamorphic Radial Lighting */}
      <div className="absolute inset-0 bg-[#030712]" />
      
      {/* 2. Cinematic Volumetric Lighting Wells */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1200px] h-[750px] bg-gradient-to-b from-[#1e3a8a]/20 via-[#0c1e4a]/15 to-transparent blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-[35%] -left-[10%] w-[800px] h-[600px] bg-gradient-to-tr from-[#ca8a04]/10 via-[#172554]/10 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-[60%] -right-[15%] w-[900px] h-[650px] bg-gradient-to-tl from-[#eab308]/8 via-[#0f172a]/20 to-transparent blur-[150px] rounded-full pointer-events-none" />

      {/* 3. Celestial Perspective Grid */}
      <div className="celestial-grid absolute inset-0 opacity-75" />

      {/* 4. Canvas Floating Gold Starlight & Embers */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      {/* 5. Authentic Filmic Grain Layer */}
      <div className="filmic-grain absolute inset-0 opacity-60 mix-blend-overlay" />

      {/* 6. Subtle Anamorphic Horizontal Vignette Glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_40%,_rgba(3,7,18,0.7)_100%]" />

      {/* 7. Optional 2.39:1 Anamorphic Cinematic Letterbox Bars */}
      {letterboxActive && (
        <div className="fixed inset-0 z-40 pointer-events-none flex flex-col justify-between">
          <div className="h-10 sm:h-14 bg-black/95 border-b border-amber-500/20 backdrop-blur-md shadow-2xl transition-all duration-700 flex items-center justify-between px-6 font-mono text-[10px] text-amber-500/60">
            <span>// ASPECT: 2.39:1 ANAMORPHIC WIDESCREEN</span>
            <span>CINEMATIC PRODUCTION MASTER</span>
          </div>
          <div className="h-10 sm:h-14 bg-black/95 border-t border-amber-500/20 backdrop-blur-md shadow-2xl transition-all duration-700 flex items-center justify-between px-6 font-mono text-[10px] text-amber-500/60">
            <span>CLUSTER TELEMETRY LIVE</span>
            <span>MANNA ANALYTICS · LIVINGSTON PETER</span>
          </div>
        </div>
      )}
    </div>
  );
};
