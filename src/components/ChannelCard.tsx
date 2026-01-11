"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Channel } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface ChannelCardProps {
    channel: Channel;
    className?: string;
    index?: number;
}

export function ChannelCard({ channel, className, index = 0 }: ChannelCardProps) {
    const [isHovering, setIsHovering] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let playPromise: Promise<void> | undefined;
        if (isHovering && videoRef.current && channel.preview_url) {
            playPromise = videoRef.current.play();
        } else if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }

        return () => {
            // Cleanup if needed, though simpler is better here
        };
    }, [isHovering, channel.preview_url]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Link
                href={`/tv/${channel.slug}`}
                className={cn(
                    "group relative block aspect-video overflow-hidden rounded-xl bg-neutral-900 border border-white/10 md:border-0 md:ring-1 md:ring-white/10",
                    "hover:ring-2 hover:ring-white/50 transition-all duration-500",
                    "hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]", // Glow effect
                    "transform-gpu", // Hardware acceleration
                    className
                )}
            >
                {/* Video Layer (Priority) */}
                {channel.preview_url && (
                    <div className={cn(
                        "absolute inset-0 z-10 transition-opacity duration-700 bg-black",
                        isHovering ? "opacity-100" : "opacity-0"
                    )}>
                        <video
                            ref={videoRef}
                            src={channel.preview_url}
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Image Fallback */}
                {channel.cover_url ? (
                    <div className="relative w-full h-full z-0">
                        <Image
                            src={channel.cover_url}
                            alt={channel.name}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-500 bg-neutral-800">
                        No Cover
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                {/* Content */}
                <div className="absolute inset-0 z-30 p-6 flex flex-col justify-end translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                    <div className="space-y-1">
                        <div className="h-0.5 w-0 bg-white group-hover:w-full transition-all duration-700 ease-in-out mb-3 opacity-0 group-hover:opacity-100" />
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-none tracking-tight">
                            {channel.name}
                        </h3>
                        <p className="text-sm text-neutral-300 line-clamp-2 opacity-0 -translate-y-2 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                            {channel.description}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
