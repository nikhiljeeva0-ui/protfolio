"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useGitHub, Repository } from "@/hooks/useGitHub";
import { GlassCard } from "./UIComponents";
import { Github, ExternalLink, Star, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { useMotionValue, useTransform, useMotionTemplate } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 },
  },
};

const ProjectCard = ({ repo }: { repo: Repository }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const rotateX = useTransform(mouseY, [0, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 400], [-8, 8]);

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseMove={onMouseMove}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      className="group perspective cursor-default"
    >
      <GlassCard className="h-full min-h-[420px] p-8 md:p-9 flex flex-col relative overflow-hidden transition-all duration-300 group-hover:shadow-[0_8px_40px_rgba(0,212,255,0.12)] group-hover:border-neon-blue/40">
        <div className="flex justify-between items-start mb-6" style={{ transform: "translateZ(50px)" }}>
          <div className="p-3 glass rounded-xl text-neon-blue group-hover:scale-110 transition-transform">
            <Code2 size={26} />
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <Star size={14} className="text-yellow-500" />
            {repo.stargazers_count}
          </div>
        </div>

        <h3
          className="text-xl font-black mb-3 group-hover:text-neon-blue transition-colors tracking-tight"
          style={{ transform: "translateZ(40px)" }}
        >
          {repo.name.replace(/-/g, " ")}
        </h3>

        <p
          className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3"
          style={{ transform: "translateZ(30px)" }}
        >
          {repo.description || "System module identified. Initializing description protocol..."}
        </p>

        <div className="flex flex-wrap gap-2 mb-6" style={{ transform: "translateZ(20px)" }}>
          {repo.topics.slice(0, 3).map((topic) => (
            <span key={topic} className="px-2 py-1 text-[10px] uppercase font-bold glass text-neon-purple tracking-widest">
              {topic}
            </span>
          ))}
          {repo.language && (
             <span className="px-2 py-1 text-[10px] uppercase font-bold glass text-neon-blue tracking-widest">
              {repo.language}
           </span>
          )}
        </div>

        <div className="flex items-center gap-4 mt-auto" style={{ transform: "translateZ(50px)" }}>
          <motion.a
            href={repo.html_url}
            target="_blank"
            className="text-white hover:text-neon-purple transition-colors"
            whileHover={{ scale: 1.15 }}
          >
            <Github size={20} />
          </motion.a>
          {repo.homepage && (
            <motion.a
              href={repo.homepage}
              target="_blank"
              className="text-white hover:text-neon-blue transition-colors"
              whileHover={{ scale: 1.15 }}
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
        </div>

        {/* Dynamic radial glow following mouse */}
        <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
                background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(0, 212, 255, 0.07), transparent 80%)`
            }}
        />
      </GlassCard>
    </motion.div>
  );
};

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Projects = () => {
  const { repos, loading, error } = useGitHub("nikhiljeeva0-ui");
  const [filter, setFilter] = useState("all");

  const filteredRepos = repos.filter((repo) => {
    if (filter === "all") return true;
    if (filter === "ai") return repo.topics.includes("ai") || repo.name.toLowerCase().includes("ai") || repo.name.toLowerCase().includes("intelligence");
    if (filter === "web") return repo.topics.includes("react") || repo.topics.includes("nextjs") || repo.language === "JavaScript" || repo.language === "TypeScript";
    return true;
  });

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Featured <span className="text-neon-blue">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-neon-blue mx-auto rounded-full mb-8" />

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["all", "ai", "web"].map((f) => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all",
                filter === f ? "glass text-neon-blue border border-neon-blue/50" : "text-gray-500 hover:text-white border border-transparent"
              )}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 glass p-8 rounded-2xl max-w-lg mx-auto">
          {error}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredRepos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
