import React, { useEffect, useRef, useState } from 'react';
import profileImg from '../assets/images/hero_portrait_profile_1790070985396.jpg';
import turnImg from '../assets/images/hero_portrait_turn_1790071067324.jpg';
import frontImg from '../assets/images/hero_portrait_front_1790071029894.jpg';

export const FolioCanvasScroll: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const scrollProgressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });

  // Preload character frames
  useEffect(() => {
    const urls = [profileImg, turnImg, frontImg];
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    urls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        loadedImages[i] = img;
        if (loadedCount === urls.length) {
          imagesRef.current = loadedImages;
          setImagesLoaded(true);
        }
      };
    });

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, currentScroll / maxScroll)) : 0;
      scrollProgressRef.current = progress;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      mouseTargetRef.current = { x: normX, y: normY };
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Render loop to canvas with smooth lerp interpolation and particle dynamics
  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let currentProgress = scrollProgressRef.current;

    // Atmospheric cyber particles floating upwards
    const particleCount = 36;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.8 + 0.6,
      speedY: -Math.random() * 0.45 - 0.15,
      speedX: (Math.random() - 0.5) * 0.2,
      baseAlpha: Math.random() * 0.45 + 0.15,
      pulse: Math.random() * Math.PI * 2,
      color: Math.random() > 0.4 ? 'rgba(255, 77, 45, ' : 'rgba(255, 180, 50, ',
    }));

    const render = () => {
      // Smooth lerp to target scroll progress
      currentProgress += (scrollProgressRef.current - currentProgress) * 0.1;

      // Smooth lerp to mouse parallax
      mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * 0.06;
      mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * 0.06;

      // Handle retina resolution
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, width, height);

      // Determine which 2 frames to cross-fade between
      const images = imagesRef.current;
      if (images.length >= 3) {
        let frameA = 0;
        let frameB = 1;
        let blend = 0;

        if (currentProgress < 0.45) {
          frameA = 0;
          frameB = 1;
          blend = currentProgress / 0.45;
        } else {
          frameA = 1;
          frameB = 2;
          blend = (currentProgress - 0.45) / 0.55;
        }

        // Draw image with cover aspect ratio and 3D parallax drift
        const drawCover = (img: HTMLImageElement, alpha: number) => {
          if (!img || !img.complete || img.naturalWidth === 0) return;
          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

          const imgRatio = img.naturalWidth / img.naturalHeight;
          const screenRatio = width / height;

          let renderW = width;
          let renderH = height;
          let offsetX = 0;
          let offsetY = 0;

          if (screenRatio > imgRatio) {
            renderW = width * 1.04;
            renderH = (width * 1.04) / imgRatio;
            offsetY = (height - renderH) / 2;
            offsetX = (width - renderW) / 2;
          } else {
            renderH = height * 1.04;
            renderW = (height * 1.04) * imgRatio;
            offsetX = (width - renderW) / 2;
            offsetY = (height - renderH) / 2;
          }

          // Subtle parallax drift on scroll + interactive mouse perspective shift
          const parallaxShiftY = (currentProgress - 0.5) * -50 + mouseCurrentRef.current.y * 14;
          const parallaxShiftX = mouseCurrentRef.current.x * 18;

          ctx.drawImage(img, offsetX + parallaxShiftX, offsetY + parallaxShiftY, renderW, renderH);
          ctx.restore();
        };

        // Draw base frame and cross-faded next frame
        drawCover(images[frameA], 1 - blend);
        drawCover(images[frameB], blend);
      }

      // Interactive Constellation Node Network & Magnetic Physics
      const cursorX = (mouseCurrentRef.current.x + 1) * 0.5 * width;
      const cursorY = (mouseCurrentRef.current.y + 1) * 0.5 * height;

      // Update positions and apply magnetic cursor influence
      particles.forEach((p) => {
        // Distance to cursor
        const dx = cursorX - p.x;
        const dy = cursorY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Gentle magnetic elastic pull near cursor
        if (dist < 160 && dist > 10) {
          const force = (160 - dist) / 160;
          p.x += (dx / dist) * force * 0.8;
          p.y += (dy / dist) * force * 0.8;
        }

        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.025;

        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        const dynamicAlpha = Math.max(0, p.baseAlpha + Math.sin(p.pulse) * 0.2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${dynamicAlpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 77, 45, 0.45)';
        ctx.fill();

        // Connect node to cursor if close
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(cursorX, cursorY);
          ctx.strokeStyle = `rgba(255, 77, 45, ${(1 - dist / 110) * 0.28})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      // Draw constellation filaments between close neighbor particles
      ctx.shadowBlur = 0;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const distNodes = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (distNodes < 90) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 100, 50, ${(1 - distNodes / 90) * 0.18})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      // Add delicate radial vignette and deep dark edges matching #0A0D14
      const gradient = ctx.createRadialGradient(
        width * 0.5 + mouseCurrentRef.current.x * 30,
        height * 0.5 + mouseCurrentRef.current.y * 30,
        Math.min(width, height) * 0.25,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      gradient.addColorStop(0, 'rgba(10, 13, 20, 0.12)');
      gradient.addColorStop(0.6, 'rgba(10, 13, 20, 0.65)');
      gradient.addColorStop(1, 'rgba(10, 13, 20, 0.96)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle bottom fade to blend with footer/bottom
      const bottomFade = ctx.createLinearGradient(0, height - 160, 0, height);
      bottomFade.addColorStop(0, 'rgba(10, 13, 20, 0)');
      bottomFade.addColorStop(1, 'rgba(10, 13, 20, 1)');
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, height - 160, width, 160);

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [imagesLoaded]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: imagesLoaded ? 1 : 0 }}
      />
      {/* Background warm radial glows with pulse animation */}
      <div className="absolute inset-0 ambient-glow-top pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute inset-0 ambient-glow-bottom pointer-events-none" />
      <div className="absolute inset-0 filmic-grain pointer-events-none opacity-35" />
    </div>
  );
};
