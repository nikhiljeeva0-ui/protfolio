"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { GlowButton } from "./UIComponents";

const Hero = () => {
    const targetRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    // ── Text: fades + lifts at normal pace
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const textY       = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

    // ── Image: moves slower than text → parallax depth feel
    const imageY      = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const imageOpacity= useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    // ── Text entrance stagger
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.13, delayChildren: 0.2 },
        },
    };

    const itemVariants: Variants = {
        hidden:   { opacity: 0, y: 24 },
        visible:  { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
    };

    const imageVariants: Variants = {
        hidden:  { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut", delay: 0.1 } },
    };

    return (
        <section
            id="home"
            ref={targetRef}
            className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        >
            {/* Very subtle page-level accent — barely visible */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 50% at 68% 52%, rgba(0,180,255,0.035) 0%, transparent 65%)",
                }}
            />

            {/* ── Outer scroll wrapper (text track) */}
            <motion.div
                style={{ opacity: textOpacity, y: textY }}
                className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
            >
                {/* ──────────── LEFT: Text ──────────── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8 z-10 text-center lg:text-left"
                >
                    <motion.p
                        variants={itemVariants}
                        className="text-neon-blue font-mono text-xs tracking-[0.45em] uppercase"
                    >
                        AI Product Builder · Systems Engineer
                    </motion.p>

                    <motion.div variants={itemVariants} className="space-y-0">
                        <h1 className="text-[5.5rem] md:text-[7rem] lg:text-[8rem] font-black tracking-tighter leading-[0.88] text-white">
                            Nikhil
                        </h1>
                        <h1 className="text-[5.5rem] md:text-[7rem] lg:text-[8rem] font-black tracking-tighter leading-[0.88] text-neon-blue">
                            Jeeva
                        </h1>
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-gray-400 max-w-md mx-auto lg:mx-0 text-base leading-relaxed"
                    >
                        Building AI-powered products at the intersection of intelligence and
                        engineering. Focused on real problems, not fleeting trends.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
                    >
                        <a href="#projects">
                            <GlowButton variant="blue" className="px-9">
                                View Work
                            </GlowButton>
                        </a>
                        <a href="#contact">
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="px-9 py-3.5 rounded-xl border border-white/10 hover:border-white/20 text-white/80 hover:text-white text-sm font-medium transition-colors"
                            >
                                Get in touch
                            </motion.button>
                        </a>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center lg:justify-start gap-8 pt-4"
                    >
                        {[
                            { label: "Projects", value: "10+" },
                            { label: "Focus",    value: "AI"  },
                            { label: "Based in", value: "India" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center lg:text-left">
                                <div className="text-white font-bold text-lg">{stat.value}</div>
                                <div className="text-gray-600 text-xs uppercase tracking-widest">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* ──────────── RIGHT: Image (parallax track) ──────────── */}
                <motion.div
                    style={{ y: imageY, opacity: imageOpacity }}
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center justify-center lg:justify-end relative"
                >
                    {/*
                     * Tight dark-blue radial backdrop — NOT a glow.
                     * Simulates an ambient shadow cast on the wall behind the card.
                     */}
                    <div
                        aria-hidden="true"
                        className="absolute pointer-events-none"
                        style={{
                            inset: "-10% -12%",
                            background:
                                "radial-gradient(ellipse 78% 72% at 50% 48%, rgba(0,20,60,0.55) 0%, transparent 70%)",
                            borderRadius: "50%",
                            zIndex: 0,
                        }}
                    />

                    {/*
                     * Slow-float + hover-lift wrapper.
                     * whileHover drives the shadow/scale — no glow added.
                     */}
                    <motion.div
                        className="relative"
                        style={{ zIndex: 1 }}
                        animate={{ y: [0, -7, 0] }}
                        transition={{
                            duration: 7,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                        whileHover="hover"
                    >
                        {/*
                         * Ground shadow — separate element so it
                         * compresses/expands with float, like a real object.
                         */}
                        <motion.div
                            aria-hidden="true"
                            variants={{
                                hover: { scaleX: 1.08, opacity: 0.45 },
                            }}
                            style={{
                                position: "absolute",
                                bottom: "-18px",
                                left: "10%",
                                width: "80%",
                                height: "20px",
                                background: "rgba(0,0,0,0.55)",
                                borderRadius: "50%",
                                filter: "blur(14px)",
                                opacity: 0.38,
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        />

                        {/*
                         * Card: glass border + subtle top-left light source.
                         * hover → scale 1.02 + deeper shadow.
                         */}
                        <motion.div
                            variants={{
                                hover: {
                                    scale: 1.02,
                                    boxShadow: [
                                        "0 28px 70px rgba(0,0,0,0.65), 0 6px 20px rgba(0,0,0,0.40)",
                                        "0 32px 80px rgba(0,0,0,0.70), 0 8px 24px rgba(0,0,0,0.45)",
                                    ].join(", "),
                                },
                            }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            style={{
                                position: "relative",
                                borderRadius: "22px",
                                width:  "clamp(260px, 34vw, 380px)",
                                aspectRatio: "4 / 5",
                                overflow: "hidden",
                                // Resting shadow — multi-layer, realistic depth
                                boxShadow: [
                                    "0 20px 60px rgba(0,0,0,0.55)",
                                    "0 4px 16px rgba(0,0,0,0.35)",
                                    "0 1px 3px rgba(0,0,0,0.25)",
                                ].join(", "),
                                // Glass-style border: top-left bright, rest dim
                                border: "1px solid transparent",
                                backgroundClip: "padding-box",
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/profile.jpg"
                                alt="Nikhil Jeeva"
                                style={{
                                    width:  "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "top center",
                                    display: "block",
                                    // No filter — keep original skin tones intact
                                }}
                            />

                            {/*
                             * Top-left soft highlight — simulates a light source
                             * hitting the top-left corner of the card.
                             * Very subtle linear gradient, low opacity.
                             */}
                            <div
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: [
                                        "linear-gradient(135deg,",
                                        "  rgba(255,255,255,0.07) 0%,",
                                        "  rgba(255,255,255,0.02) 25%,",
                                        "  transparent 55%",
                                        ")",
                                    ].join(" "),
                                    pointerEvents: "none",
                                    borderRadius: "22px",
                                }}
                            />

                            {/*
                             * Glass border overlay — top+left edges slightly
                             * lighter (light source), bottom+right darker.
                             */}
                            <div
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "22px",
                                    pointerEvents: "none",
                                    boxShadow: [
                                        // Top edge: soft white catch-light
                                        "inset 0 1px 0 rgba(255,255,255,0.12)",
                                        // Left edge: faint highlight
                                        "inset 1px 0 0 rgba(255,255,255,0.07)",
                                        // Bottom: very faint cyan (screen bounce)
                                        "inset 0 -1px 0 rgba(0,212,255,0.06)",
                                        // Overall inner shadow to add interior depth
                                        "inset 0 0 30px rgba(0,0,0,0.15)",
                                    ].join(", "),
                                }}
                            />
                        </motion.div>

                        {/* Tiny accent line below — almost invisible */}
                        <div
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                bottom: "-10px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "55%",
                                height: "1px",
                                background:
                                    "linear-gradient(90deg, transparent, rgba(0,212,255,0.18), transparent)",
                            }}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
