"use client";

import type { Variants } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import { motion } from "framer-motion";
import React from "react";

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut",
        },
    },
};

const SectionWrapper = ({
    children,
    id,
    delay = 0,
}: {
    children: React.ReactNode;
    id: string;
    delay?: number;
}) => {
    return (
        <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay }}
            id={id}
        >
            {children}
        </motion.div>
    );
};

export default function Home() {
    return (
        <div className="flex flex-col gap-24 py-10 overflow-x-hidden">
            <Hero />
            <SectionWrapper id="about" delay={0}>
                <About />
            </SectionWrapper>
            <SectionWrapper id="skills" delay={0.05}>
                <Skills />
            </SectionWrapper>
            <SectionWrapper id="projects" delay={0.05}>
                <Projects />
            </SectionWrapper>
            <SectionWrapper id="contact" delay={0.05}>
                <Contact />
            </SectionWrapper>
        </div>
    );
}
