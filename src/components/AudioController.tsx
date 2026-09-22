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
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border ${
        isPlaying
          ? 'bg-amber-950/40 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
          : 'bg-slate-900/80 text-slate-400 hover:text-amber-200 border-white/10 hover:border-amber-500/30'
      } ${className}`}
      title={isPlaying ? "Mute Cinematic Ambience" : "Engage Ambient Cinematic Soundscape"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="hidden sm:inline text-[11px] font-medium tracking-wider text-amber-300">
            CINEMA AUDIO ON
          </span>
          {/* Animated sound wave bars */}
          <span className="flex items-center gap-0.5 ml-1 h-3">
            <span className="w-0.5 h-full bg-amber-400 animate-[bounce_0.8s_infinite]" />
            <span className="w-0.5 h-2/3 bg-amber-400 animate-[bounce_1.1s_infinite]" />
            <span className="w-0.5 h-full bg-amber-300 animate-[bounce_0.6s_infinite]" />
            <span className="w-0.5 h-1/2 bg-amber-400 animate-[bounce_0.9s_infinite]" />
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline text-[11px] tracking-wider">
            CINEMA AUDIO OFF
          </span>
        </>
      )}
    </button>
  );
};
