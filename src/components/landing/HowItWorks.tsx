"use client";

import { motion } from "framer-motion";
import { Monitor, Play, ShieldCheck } from "lucide-react";

const steps = [
    {
        icon: Monitor,
        title: "Connect",
        description: "Open HIFLIX on your TV, Projector, or LED Wall."
    },
    {
        icon: Play,
        title: "Select",
        description: "Choose a channel that matches your venue's vibe."
    },
    {
        icon: ShieldCheck,
        title: "Trust",
        description: "Let it loop. 100% safe, curated, and diverse content."
    }
];

export function HowItWorks() {
    return (
        <section className="py-24 bg-neutral-950 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How it Works</h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        A seamless visual experience designed for spaces, not just screens.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            className="bg-neutral-900/50 border border-white/5 p-8 rounded-3xl flex flex-col items-center text-center hover:bg-neutral-900 transition-colors"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-white text-opacity-80">
                                <step.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-neutral-400 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
