"use client";

import { Channel } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

// Placeholder loop video (High quality sample)
const HERO_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";

export function Hero({ channel }: { channel: Channel }) {
    if (!channel) return null;

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-105 opacity-50"
                    poster={channel.cover_url || ""}
                >
                    <source src={HERO_VIDEO_URL} type="video/mp4" />
                </video>

                {/* Overlays for readability and atmosphere */}
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black" />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center max-w-5xl px-6 flex flex-col items-center mt-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <h1 className="text-4xl md:text-7xl lg:text-[120px] font-normal tracking-[1px] text-white leading-[0.9] drop-shadow-2xl text-balance">
                        A visual TV made for altered minds.
                    </h1>

                    <p className="text-lg md:text-2xl text-neutral-300 max-w-3xl mx-auto font-light leading-relaxed text-balance">
                        Loops, light and motion. Curated visuals for clubs, lounges & late nights.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="pt-12"
                >
                    <Link href={`/tv/${channel.slug}`}>
                        <Button
                            size="lg"
                            className="
                                group relative h-16 px-12 text-xl font-bold rounded-full 
                                bg-white text-black 
                                hover:bg-neutral-200 hover:scale-105 active:scale-95
                                transition-all duration-300
                                shadow-[0_0_50px_rgba(255,255,255,0.25)]
                            "
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                <Play className="w-6 h-6 fill-black" />
                                START WATCHING
                            </span>
                        </Button>
                    </Link>

                    <p className="mt-6 text-xs text-neutral-500 tracking-widest uppercase">
                        Featured Channel: <span className="text-neutral-300">{channel.name}</span>
                    </p>
                </motion.div>

                {/* Scroll Down Hint */}
                <motion.div
                    className="absolute bottom-[-15vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase">Scroll to Discover</span>
                    <div className="w-px h-16 bg-gradient-to-b from-neutral-500 to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
