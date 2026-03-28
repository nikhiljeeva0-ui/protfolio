"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Fast dot — tight spring
    const dotX = useSpring(0, { stiffness: 600, damping: 35 });
    const dotY = useSpring(0, { stiffness: 600, damping: 35 });

    // Slower trailing ring — looser spring
    const ringX = useSpring(0, { stiffness: 120, damping: 22 });
    const ringY = useSpring(0, { stiffness: 120, damping: 22 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            dotX.set(e.clientX);
            dotY.set(e.clientY);
            ringX.set(e.clientX);
            ringY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [dotX, dotY, ringX, ringY, isVisible]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Outer trailing ring */}
            <motion.div
                animate={{
                    width: isHovering ? 36 : 24,
                    height: isHovering ? 36 : 24,
                    opacity: isVisible ? (isHovering ? 0.6 : 0.35) : 0,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute rounded-full border border-neon-blue"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                    boxShadow: "0 0 8px rgba(0, 212, 255, 0.3)",
                }}
            />

            {/* Inner glow dot */}
            <motion.div
                animate={{
                    width: isHovering ? 6 : 10,
                    height: isHovering ? 6 : 10,
                    opacity: isVisible ? (isHovering ? 0.5 : 0.8) : 0,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute rounded-full bg-neon-blue"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: "-50%",
                    translateY: "-50%",
                    filter: "blur(2px)",
                    boxShadow: "0 0 10px rgba(0, 212, 255, 0.6)",
                }}
            />

            {/* Tiny white core dot */}
            <motion.div
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
            />
        </div>
    );
};

export default CustomCursor;
