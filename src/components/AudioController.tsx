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
  const toggleAudio = () => {
    if (!isPlaying) {
      startSound();
    } else {
      stopSound();
    }
  };

  const startSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      // Smooth fade in to a subtle, warm ambient volume (non-intrusive)
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2.5);
      gainNodeRef.current = masterGain;

      // Low-pass cinematic filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, ctx.currentTime);
      filterRef.current = filter;

      // Primary deep drone oscillator (55Hz, A1)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);
      osc1Ref.current = osc1;

      // Secondary warm harmonic oscillator (82.4Hz, E2 fifth)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(82.4, ctx.currentTime);
      osc2Ref.current = osc2;

      // Slow LFO for cinematic breathing effect
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(40, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // Routing
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      lfo.start();

      setIsPlaying(true);
    } catch (e) {
      console.warn("AudioContext not supported or blocked", e);
    }
  };

  const stopSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      setTimeout(() => {
        try {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          ctx.close();
        } catch {
          // ignore
        }
        setIsPlaying(false);
      }, 1200);
    } else {
      setIsPlaying(false);
    }
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
