"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./UIComponents";
import { Brain, Code2 } from "lucide-react";

const TypewriterText = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = React.useState("");
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 30);
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    return (
        <span className="font-mono">
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-5 bg-neon-blue ml-1 align-middle"
            />
        </span>
    );
};

const About = () => {
    return (
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
                {/* Left Side: System Narrative */}
                <div className="space-y-8">
                    <div className="inline-block px-4 py-1.5 glass rounded-full text-neon-purple text-xs font-bold tracking-[0.2em] uppercase">
                        Protocol: CORE_INTERFACE
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase">
                        SYSTEM <span className="text-neon-blue">ARCHITECTURE</span>
                    </h2>
                    
                    <div className="glass p-8 rounded-2xl border border-white/5 bg-black/40 relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-transparent transform -skew-x-12" />
                        <div className="text-sm text-gray-500 font-mono mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            ROOT@NIKHIL-JV:~$ cat mission.txt
                        </div>
                        <div className="text-lg text-gray-300 leading-relaxed min-h-[140px] font-mono">
                            <TypewriterText text="Building AI-powered products focused on real problems, not trends. This interface decodes my architectural approach to engineering intelligent systems and futuristic web experiences. Young India is the mission." />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <GlassCard className="p-6 border-l-2 border-l-neon-blue group hover:bg-neon-blue/5 transition-colors">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 glass rounded-lg text-neon-blue group-hover:scale-110 transition-transform">
                                    <Brain size={24} />
                                </div>
                                <h3 className="font-bold text-white uppercase tracking-wider text-sm">Decision Logic</h3>
                            </div>
                            <p className="text-gray-400 text-sm">Strong problem-solving and optimized coding implementation.</p>
                        </GlassCard>

                        <GlassCard className="p-6 border-l-2 border-l-neon-purple group hover:bg-neon-purple/5 transition-colors">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 glass rounded-lg text-neon-purple group-hover:scale-110 transition-transform">
                                    <Code2 size={24} />
                                </div>
                                <h3 className="font-bold text-white uppercase tracking-wider text-sm">System Ops</h3>
                            </div>
                            <p className="text-gray-400 text-sm">Focus on building efficient systems and modern web technologies.</p>
                        </GlassCard>
                    </div>
                </div>

                {/* Right Side: Visual Representation */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative group lg:pl-12"
                >
                    <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-3xl glass border-2 border-neon-blue/30 lg:-rotate-3 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-neon-blue/10" />
                        
                        {/* Dynamic Grid Overlay */}
                        <div className="absolute inset-0 opacity-20" 
                             style={{ backgroundImage: "radial-gradient(var(--color-neon-blue) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                        <div className="relative z-10 text-center">
                            <Brain size={120} className="text-neon-blue animate-pulse-slow mx-auto mb-6" />
                            <div className="space-y-2 font-mono text-[10px] text-neon-blue/60 uppercase tracking-widest">
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-1 h-1 bg-neon-blue rounded-full animate-ping" />
                                    NEURAL_ENGINE: ACTIVE
                                </div>
                                <div>CORE_TEMP: OPTIMAL</div>
                                <div>LOGIC_LOAD: 2.4%</div>
                            </div>
                        </div>
                        
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    </div>
                    {/* Glowing background */}
                    <div className="absolute -inset-4 bg-neon-blue/10 blur-[60px] -z-10 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default About;
