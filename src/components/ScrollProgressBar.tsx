"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            id="scroll-progress-bar"
            className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left"
            style={{
                scaleX,
                background: "linear-gradient(90deg, #00d4ff 0%, #7000ff 50%, #ff00c8 100%)",
                transformOrigin: "0%",
            }}
        />
    );
};

export default ScrollProgressBar;
