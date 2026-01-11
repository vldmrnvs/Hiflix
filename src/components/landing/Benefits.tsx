"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const benefits = [
    "No black frames between loops",
    "Curated for public safety (No Gore/Nudity)",
    "4K HDR Quality Standards",
    "Offline-First Architecture",
    "Multi-screen synchronization (Coming Soon)",
    "Exclusive Artist Collabs"
];

export function Benefits() {
    return (
        <section className="py-24 bg-black relative">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-black pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex-1"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                        Designed for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">Altered States.</span>
                    </h2>
                    <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                        HIFLIX isn't YouTube. It's a utility for atmosphere. We strip away the ads, the noise, and the buffering to deliver pure visual flow.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 w-full"
                >
                    <div className="bg-neutral-900 rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                        <ul className="space-y-6">
                            {benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                        <Check className="w-3.5 h-3.5 text-green-500" />
                                    </div>
                                    <span className="text-lg text-white/90 font-medium">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
