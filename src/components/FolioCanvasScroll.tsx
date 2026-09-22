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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Render loop to canvas with smooth lerp interpolation
  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let currentProgress = scrollProgressRef.current;

    const render = () => {
      // Smooth lerp to target scroll progress
      currentProgress += (scrollProgressRef.current - currentProgress) * 0.12;

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
      // 0.0 - 0.5: frame 0 -> frame 1
      // 0.5 - 1.0: frame 1 -> frame 2
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

        // Draw image A with cover aspect ratio centered
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
            renderW = width;
            renderH = width / imgRatio;
            offsetY = (height - renderH) / 2;
          } else {
            renderH = height;
            renderW = height * imgRatio;
            offsetX = (width - renderW) / 2;
          }

          // Subtle parallax drift on scroll
          const parallaxShiftY = (currentProgress - 0.5) * -40;
          ctx.drawImage(img, offsetX, offsetY + parallaxShiftY, renderW, renderH);
          ctx.restore();
        };

        // Draw base frame and cross-faded next frame
        drawCover(images[frameA], 1 - blend);
        drawCover(images[frameB], blend);
      }

      // Add delicate radial vignette and deep dark edges matching #0A0D14
      const gradient = ctx.createRadialGradient(
        width * 0.5, height * 0.5, Math.min(width, height) * 0.25,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.75
      );
      gradient.addColorStop(0, 'rgba(10, 13, 20, 0.15)');
      gradient.addColorStop(0.65, 'rgba(10, 13, 20, 0.65)');
      gradient.addColorStop(1, 'rgba(10, 13, 20, 0.95)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle bottom fade to blend with footer/bottom
      const bottomFade = ctx.createLinearGradient(0, height - 140, 0, height);
      bottomFade.addColorStop(0, 'rgba(10, 13, 20, 0)');
      bottomFade.addColorStop(1, 'rgba(10, 13, 20, 1)');
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, height - 140, width, 140);

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
        className="w-full h-full object-cover"
      />
      {/* Background warm radial glows matching the video */}
      <div className="absolute inset-0 ambient-glow-top pointer-events-none" />
      <div className="absolute inset-0 ambient-glow-bottom pointer-events-none" />
      <div className="absolute inset-0 filmic-grain pointer-events-none opacity-40" />
    </div>
  );
};
