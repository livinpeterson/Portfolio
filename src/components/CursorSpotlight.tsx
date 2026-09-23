import React, { useEffect, useState } from 'react';

export const CursorSpotlight: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only engage cursor spotlight on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let animId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const smoothTrail = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailingPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(smoothTrail);
    };
    animId = requestAnimationFrame(smoothTrail);

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.closest('.cursor-pointer') !== null ||
          target.getAttribute('role') === 'button';
        setIsPointer(isClickable);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* 1. Ambient Warm Spotlight Glow */}
      <div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-[width,height,opacity] duration-300 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '380px' : '280px',
          height: isPointer ? '380px' : '280px',
          background: isPointer
            ? 'radial-gradient(circle, rgba(255, 77, 45, 0.15) 0%, rgba(255, 130, 45, 0.06) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 77, 45, 0.08) 0%, transparent 65%)',
        }}
      />

      {/* 2. Trailing Smooth Ring */}
      <div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-[border-color,background-color] duration-200"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isClicking ? '28px' : isPointer ? '44px' : '32px',
          height: isClicking ? '28px' : isPointer ? '44px' : '32px',
          border: isPointer ? '1.5px solid rgba(255, 77, 45, 0.8)' : '1px solid rgba(255, 255, 255, 0.25)',
          backgroundColor: isPointer ? 'rgba(255, 77, 45, 0.08)' : 'transparent',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease-out, height 0.2s ease-out, border-color 0.2s, background-color 0.2s',
        }}
      />

      {/* 3. Center Precision Micro-Dot */}
      <div
        className="absolute w-1.5 h-1.5 rounded-full bg-[#FF4D2D] -translate-x-1/2 -translate-y-1/2 pointer-events-none shadow-[0_0_8px_#FF4D2D]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isPointer ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%) scale(1)',
          transition: 'transform 0.15s ease-out',
        }}
      />
    </div>
  );
};
