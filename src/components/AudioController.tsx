import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControllerProps {
  className?: string;
}

export const AudioController: React.FC<AudioControllerProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  // Initialize or toggle cinematic procedural ambient soundscape
  // Reference to the HTMLAudioElement that will play a gentle ambient loop
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!isPlaying) {
      startSound();
    } else {
      stopSound();
    }
  };

  const startSound = () => {
    try {
      // Use a pre‑recorded gentle ambient file (e.g., soft wind tones)
      const audio = new Audio('/ambient-wind.mp3');
      audio.loop = true;
      // Set a low, soothing volume – user can still adjust the system volume.
      audio.volume = 0.04;
      audio.play();
      audioRef.current = audio;
      setIsPlaying(true);
    } catch (e) {
      console.warn('Failed to play ambient sound', e);
    }
  };

  const stopSound = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      try {
        audioCtxRef.current?.close();
      } catch {
        // cleanup
      }
    };
  }, []);

  return (
    <button
      id="cinematic-audio-toggle"
      onClick={toggleAudio}
      className={`relative w-9 h-9 rounded-full glass-pill border transition-all duration-300 flex items-center justify-center cursor-pointer group ${
        isPlaying
          ? 'border-[#FF4D2D]/50 bg-[#FF4D2D]/10 shadow-[0_0_15px_rgba(255,77,45,0.35)]'
          : 'border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
      } ${className}`}
      title={isPlaying ? "Mute Ambient Soundscape" : "Play Ambient Soundscape"}
      aria-label={isPlaying ? "Mute Ambient Soundscape" : "Play Ambient Soundscape"}
    >
      {/* 4 Animated Minimalist Equalizer Bars */}
      <div className="flex items-end justify-center gap-[2.5px] h-3.5 w-3.5 pointer-events-none">
        <span
          className={`w-[2px] rounded-full transition-all duration-300 ${
            isPlaying
              ? 'bg-[#FF4D2D] animate-[soundbar-1_0.9s_ease-in-out_infinite_alternate]'
              : 'h-[4px] bg-slate-500 group-hover:bg-slate-300'
          }`}
          style={{ height: isPlaying ? '12px' : '4px' }}
        />
        <span
          className={`w-[2px] rounded-full transition-all duration-300 ${
            isPlaying
              ? 'bg-[#FF5533] animate-[soundbar-2_0.7s_ease-in-out_infinite_alternate]'
              : 'h-[7px] bg-slate-500 group-hover:bg-slate-300'
          }`}
          style={{ height: isPlaying ? '15px' : '7px' }}
        />
        <span
          className={`w-[2px] rounded-full transition-all duration-300 ${
            isPlaying
              ? 'bg-[#FF7A59] animate-[soundbar-3_1.1s_ease-in-out_infinite_alternate]'
              : 'h-[3px] bg-slate-500 group-hover:bg-slate-300'
          }`}
          style={{ height: isPlaying ? '10px' : '3px' }}
        />
        <span
          className={`w-[2px] rounded-full transition-all duration-300 ${
            isPlaying
              ? 'bg-[#FF4D2D] animate-[soundbar-4_0.8s_ease-in-out_infinite_alternate]'
              : 'h-[5px] bg-slate-500 group-hover:bg-slate-300'
          }`}
          style={{ height: isPlaying ? '13px' : '5px' }}
        />
      </div>

      {/* Subtle audio waves pulse halo when playing */}
      {isPlaying && (
        <span className="absolute inset-0 rounded-full border border-[#FF4D2D]/30 animate-ping pointer-events-none opacity-60" />
      )}
    </button>
  );
};
