"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";

const AudioContext = createContext<{
  playHover: () => void;
  playClick: () => void;
  playBoot: () => void;
} | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
};

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on first interaction
    const init = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    window.addEventListener("click", init);
    return () => window.removeEventListener("click", init);
  }, []);

  const createOscillator = (freq: number, type: OscillatorType, duration: number, volume: number) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const playHover = () => createOscillator(150, "sine", 0.05, 0.01);
  const playClick = () => createOscillator(100, "square", 0.02, 0.02);
  const playBoot = () => {
    setTimeout(() => createOscillator(50, "sine", 0.5, 0.05), 100);
    setTimeout(() => createOscillator(100, "sine", 0.3, 0.03), 400);
  };

  return (
    <AudioContext.Provider value={{ playHover, playClick, playBoot }}>
      {children}
    </AudioContext.Provider>
  );
};
