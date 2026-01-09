"use client";

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface VideoPlayerTVProps {
    src: string;
    poster?: string;
    muted: boolean;
    isPlaying: boolean;
    onEnded: () => void;
    onError: () => void; // Parent handles skipping
    volume?: number;
}

export function VideoPlayerTV({
    src,
    poster,
    muted,
    isPlaying,
    onEnded,
    onError,
    volume = 1
}: VideoPlayerTVProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isBuffering, setIsBuffering] = useState(false);
    const [opacity, setOpacity] = useState(0); // For fade-in/out
    const [errorRetrying, setErrorRetrying] = useState(false);

    // Handle Src Change (Fade Out -> Swap -> Fade In)
    useEffect(() => {
        setOpacity(0);
        setIsBuffering(true);
        setErrorRetrying(false);

        const timeout = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.load();
            }
        }, 700); // Cinematic fade out

        return () => clearTimeout(timeout);
    }, [src]);

    // Sync Play/Pause/Mute
    useEffect(() => {
        if (!videoRef.current) return;

        // Mute
        videoRef.current.muted = muted;
        videoRef.current.volume = volume;

        // Play/Pause
        if (isPlaying) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay prevented or interrupted", error);
                    // If autoplay prevented, we might show a "Click to play" UI (handled by parent mostly)
                });
            }
        } else {
            videoRef.current.pause();
        }
    }, [isPlaying, muted, src, volume]);


    const handleCanPlay = () => {
        setIsBuffering(false);
        setOpacity(1); // Fade in
        if (isPlaying) videoRef.current?.play();
    };

    const handleWaiting = () => {
        setIsBuffering(true);
    };

    const handlePlaying = () => {
        setIsBuffering(false);
        setOpacity(1);
    };

    const handleError = () => {
        console.error("Video Error encountered");
        setErrorRetrying(true);
        // Notify parent to skip after short delay
        setTimeout(() => {
            onError();
        }, 3000);
    };

    return (
        <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
            {/* Video Element */}
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className={cn(
                    "w-full h-full object-contain transition-opacity duration-1000 ease-in-out",
                    opacity === 0 ? "opacity-0" : "opacity-100"
                )}
                playsInline
                onEnded={onEnded}
                onCanPlay={handleCanPlay}
                onWaiting={handleWaiting}
                onPlaying={handlePlaying}
                onError={handleError}
            />

            {/* Buffering Overlay */}
            {isBuffering && !errorRetrying && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-sm pointer-events-none">
                    <div className="flex flex-col items-center space-y-2">
                        <Loader2 className="w-10 h-10 text-white animate-spin" />
                        <span className="text-white/80 text-sm font-medium tracking-widest uppercase">Buffering</span>
                    </div>
                </div>
            )}

            {/* Error Overlay */}
            {errorRetrying && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
                    <p className="text-white/50 text-sm animate-pulse">Connection lost. Skipping...</p>
                </div>
            )}
        </div>
    );
}
