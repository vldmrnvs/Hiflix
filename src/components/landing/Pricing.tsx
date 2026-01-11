"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lock } from "lucide-react";

export function Pricing() {
    return (
        <section className="py-32 bg-neutral-950 relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1000px] mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                        <Lock className="w-4 h-4 text-white/70" />
                        <span className="text-sm font-medium text-white/70 uppercase tracking-widest">Private Access Only</span>
                    </div>

                    <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                        Join the Collective.
                    </h2>

                    <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        HIFLIX is strictly invite-only. We are currently accepting applications from Venues, Visual Artists, and Event Organizers.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link href="mailto:access@hiflix.io">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-neutral-200 transition-all font-bold">
                                Request Invite
                            </Button>
                        </Link>
                        <p className="text-neutral-500 text-sm">
                            or <Link href="/contact" className="underline hover:text-white transition-colors">contact us</Link> for enterprise inquiries.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
