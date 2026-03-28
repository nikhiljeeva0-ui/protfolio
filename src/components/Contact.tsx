"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlowButton } from "./UIComponents";
import { Mail, Github, Linkedin, Twitter, ExternalLink, Wifi } from "lucide-react";

const Contact = () => {
    return (
        <section id="contact" className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass p-12 md:p-24 rounded-[2.5rem] border border-white/5 bg-black/40 relative overflow-hidden text-center"
            >
                {/* Background effect */}
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-neon-blue/5 blur-[120px] rounded-full" />
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-neon-blue/5 blur-[120px] rounded-full" />

                <div className="relative z-10 space-y-12">
                    <div className="space-y-4">
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-neon-blue font-mono text-xs font-bold tracking-[0.4em] uppercase"
                        >
                            Get In Touch
                        </motion.p>
                        
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                            LET&apos;S <span className="text-neon-blue">CONVENE</span>
                        </h2>
                    </div>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                        Open for high-impact collaborations where intelligence meets engineering. 
                        Let&apos;s build something that matters.
                    </p>

                    <div className="flex flex-col items-center gap-10 pt-4">
                        <a href="mailto:nikhiljeeva0@gmail.com" className="w-full sm:w-auto">
                            <GlowButton variant="blue" className="w-full sm:w-auto uppercase tracking-widest text-xs px-12">
                                <Mail size={18} className="mr-2" />
                                Send Message
                            </GlowButton>
                        </a>

                        <div className="flex flex-col items-center gap-8">
                            <div className="flex items-center gap-6">
                                {[
                                    { icon: <Github size={24} />, url: "https://github.com/nikhiljeeva0-ui", color: "hover:text-white" },
                                    { icon: <Linkedin size={24} />, url: "https://www.linkedin.com/in/nikhil-jeeva-727105381/", color: "hover:text-neon-blue" },
                                    { icon: <Twitter size={24} />, url: "https://twitter.com", color: "hover:text-neon-blue" }
                                ].map((social, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={social.url}
                                        target="_blank"
                                        whileHover={{ y: -5, opacity: 1 }}
                                        className={`glass p-4 rounded-xl text-gray-500 transition-all ${social.color}`}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                            
                            {/* Signature Section */}
                            <motion.p 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="font-mono text-[10px] text-gray-600 uppercase tracking-[0.3em] font-medium"
                            >
                                Build. Engineering. Impact.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <footer className="mt-32 text-center text-gray-700 font-mono text-[10px] tracking-[0.4em] uppercase">
                &copy; 2026 NIKHIL JEEVA // PORTFOLIO_V1
            </footer>
        </section>
    );
};

export default Contact;
