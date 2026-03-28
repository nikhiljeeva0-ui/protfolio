"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { GlassCard } from "./UIComponents";
import { Terminal, Cpu, Database, Globe, Layout } from "lucide-react";

const skillCategories = [
  {
    title: "Core Processing",
    icon: <Cpu size={20} />,
    skills: ["C", "C++", "Java", "Python"]
  },
  {
    title: "Logic Analysis",
    icon: <Database size={20} />,
    skills: ["Problem Solving", "Optimization", "Data Structures", "Algorithms"]
  },
  {
    title: "Comm Protocols",
    icon: <Globe size={20} />,
    skills: ["HTML", "CSS", "JavaScript", "TypeScript"]
  },
  {
    title: "Frontend Interface",
    icon: <Layout size={20} />,
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"]
  }
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-20"
      >
        <div className="inline-block px-4 py-1.5 glass rounded-full text-neon-blue text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Analysis: LOAD_SYSTEM_SPECS
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
          SYSTEM <span className="text-neon-purple">MODULES</span>
        </h2>
        <div className="w-20 h-1 bg-neon-purple mx-auto rounded-full mt-4" />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
          >
            <GlassCard className="p-8 h-full border-t-2 border-t-neon-blue relative group hover:bg-white/5 transition-colors cursor-default">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                 {category.icon}
              </div>
              <h3 className="text-neon-blue font-mono text-sm mb-6 uppercase tracking-widest border-b border-white/5 pb-2">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, si) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: si * 0.06, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-purple shadow-[0_0_8px_rgba(157,78,221,0.8)]" />
                    <span className="text-gray-300 font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
