import React, { useEffect, useState } from 'react';

export const CursorSpotlight: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only engage cursor spotlight on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = 
          target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.closest('button') !== null || 
          target.closest('a') !== null ||
          target.getAttribute('role') === 'button';
        setIsPointer(isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Dynamic radial gradient glow that follows mouse pointer */}
      <div
        className="absolute rounded-full transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '340px' : '260px',
          height: isPointer ? '340px' : '260px',
          background: isPointer
            ? 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(56, 189, 248, 0.05) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 65%)'
        }}
      />
    </div>
  );
};
