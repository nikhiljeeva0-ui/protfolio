"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAudio } from "./AudioProvider";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export const GlassCard = ({ children, className, ...props }: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        "glass border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const LetterAnimation = ({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) => {
  return (
    <span className={cn("inline-block overflow-hidden", className)}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.05,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

export const GlowButton = ({ 
    children, 
    variant = "blue", 
    className = "",
    onClick
}: { 
    children: React.ReactNode; 
    variant?: "blue" | "purple" | "white"; 
    className?: string;
    onClick?: () => void;
}) => {
    const { playHover, playClick } = useAudio();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isClicked, setIsClicked] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        playHover();
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        // Very subtle magnetic pull (0.1)
        setPosition({ x: x * 0.1, y: y * 0.1 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const handleClick = () => {
        playClick();
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 400);
        if (onClick) onClick();
    };

    const variants = {
        // Solid Blue (Primary)
        blue: "bg-neon-blue text-black border-transparent shadow-[0_4px_20px_rgba(0,242,255,0.3)] hover:shadow-[0_4px_25px_rgba(0,242,255,0.5)]",
        // Outline Purple
        purple: "bg-transparent border-neon-purple/50 text-neon-purple hover:bg-neon-purple/5 hover:border-neon-purple",
        // Outline White
        white: "bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-white/40",
    };

    return (
        <motion.button
            ref={buttonRef}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={cn(
                "px-10 py-3.5 rounded-xl border font-bold transition-all relative group overflow-hidden tracking-wider text-sm", 
                variants[variant], 
                className
            )}
        >
            {/* Content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>

            {/* Subtle Hover Glow Light */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-white pointer-events-none"
            />
            
            {/* Click Ripple */}
            {isClicked && (
                <motion.div
                    initial={{ scale: 0, opacity: 0.4 }}
                    animate={{ scale: 2, opacity: 0 }}
                    className="absolute inset-0 bg-white pointer-events-none rounded-xl"
                />
            )}
        </motion.button>
    );
};
