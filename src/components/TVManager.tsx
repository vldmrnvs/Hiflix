"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Video, Channel } from '@/types';
import { VideoPlayerTV } from './VideoPlayerTV';
import {
    VideoOff, Volume2, VolumeX, Heart, Share2,
    SkipBack, SkipForward, Play, Pause, RotateCcw, List as ListIcon, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { getStorageUrl } from '@/lib/storage';
import { logEvent } from '@/lib/events';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';

interface TVManagerProps {
    videos: Video[];
    channel: Channel;
    allChannels: Channel[];
}

export function TVManager({ videos, channel: currentChannel, allChannels }: TVManagerProps) {
    const router = useRouter();

    // --- State ---
    const [playlist, setPlaylist] = useState<Video[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Playback
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    // UI
    const [showControls, setShowControls] = useState(false);
    const [isHoveringControls, setIsHoveringControls] = useState(false);
    const [showChannelList, setShowChannelList] = useState(false);
    const [direction, setDirection] = useState(0);

    // Analytics
    const [hasLiked, setHasLiked] = useState(false);

    // Init Playlist
    useEffect(() => {
        if (!videos || videos.length === 0) return;
        let newPlaylist = [...videos];
        if (newPlaylist.length > 0 && newPlaylist.length < 5) {
            while (newPlaylist.length < 10) {
                newPlaylist = [...newPlaylist, ...videos];
            }
        }
        setPlaylist(newPlaylist);
        setCurrentIndex(0);
    }, [videos]);

    const currentVideo = playlist[currentIndex];

    // Timer Refs
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastActivityRef = useRef(0);
    const lastScrollTime = useRef(0);

    // --- Logging ---
    useEffect(() => {
        setHasLiked(false);
        if (currentVideo && hasInteracted) {
            logEvent('view_start', currentVideo.id, currentChannel.id);
            const timer = setTimeout(() => {
                logEvent('view_10s', currentVideo.id, currentChannel.id);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, hasInteracted, currentVideo, currentChannel.id]);

    // Fullscreen Logging
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFullscreen = !!document.fullscreenElement;
            if (isFullscreen) logEvent('fullscreen_on', currentVideo?.id || 'unknown', currentChannel.id);
            else logEvent('fullscreen_off', currentVideo?.id || 'unknown', currentChannel.id);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [currentChannel.id, currentVideo]);

    // --- Activity & Controls ---
    const resetControlsTimer = useCallback(() => {
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        if (!isHoveringControls && !showChannelList) {
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        }
    }, [isHoveringControls, showChannelList]);

    const handleUserActivity = useCallback(() => {
        const now = Date.now();
        if (now - lastActivityRef.current < 100 && showControls) return;
        lastActivityRef.current = now;
        setShowControls(true);
        resetControlsTimer();
    }, [showControls, resetControlsTimer]);

    useEffect(() => {
        if (isHoveringControls || showChannelList) {
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
            setShowControls(true);
        } else {
            resetControlsTimer();
        }
    }, [isHoveringControls, showChannelList, resetControlsTimer]);


    // --- Navigation Logic ---
    const playNext = useCallback(() => {
        if (playlist.length === 0) return;
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % playlist.length);
    }, [playlist.length]);

    const playPrev = useCallback(() => {
        if (playlist.length === 0) return;
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    }, [playlist.length]);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHasLiked(true);
        if (currentVideo) logEvent('like', currentVideo.id, currentChannel.id);
    };

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `HIFLIX: ${currentVideo.title}`,
                    text: `Watching ${currentVideo.title} on ${currentChannel.name}`,
                    url: url
                });
                logEvent('share_native', currentVideo.id, currentChannel.id);
            } catch (err) {
                console.log("Share cancelled or failed", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                alert("Link copied to clipboard!"); // Simple feedback for now
                logEvent('share_clipboard', currentVideo.id, currentChannel.id);
            } catch (err) {
                console.error("Clipboard failed", err);
            }
        }
    };

    const replayVideo = () => {
        const videoElement = document.querySelector('video');
        if (videoElement) {
            videoElement.currentTime = 0;
            videoElement.play();
            setIsPlaying(true);
        }
    };

    // --- Gestures (Drag) ---
    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const { offset, velocity } = info;
        const swipeThreshold = 80;
        const velocityThreshold = 800;

        if (offset.y > swipeThreshold || velocity.y > velocityThreshold) {
            playNext();
        }
        else if (offset.y < -swipeThreshold || velocity.y < -velocityThreshold) {
            playPrev();
        }
    };

    const handleScroll = (e: React.WheelEvent) => {
        if (!hasInteracted) return;
        const now = Date.now();
        if (now - lastScrollTime.current < 800) return;

        if (Math.abs(e.deltaY) > 30) {
            if (e.deltaY > 0) playNext();
            else playPrev();
            lastScrollTime.current = now;
            setShowControls(true);
            resetControlsTimer();
        }
    };

    // --- Keyboard ---
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!hasInteracted) return;
            handleUserActivity();

            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    setIsPlaying(p => !p);
                    break;
                case 'ArrowRight':
                    playNext();
                    break;
                case 'ArrowLeft':
                    playPrev();
                    break;
                case 'ArrowDown':
                    playNext();
                    break;
                case 'ArrowUp':
                    playPrev();
                    break;
                case 'KeyF':
                    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
                    else document.exitFullscreen();
                    break;
                case 'KeyM':
                    setIsMuted(m => !m);
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [hasInteracted, playNext, playPrev, handleUserActivity]);


    const handleStart = async () => {
        setHasInteracted(true);
        setIsMuted(false);
        setIsPlaying(true);
        handleUserActivity();

        // Cinema Mode Auto-Trigger
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            }
        } catch (err) {
            console.warn("Fullscreen auto-trigger failed (likely blocked by browser)", err);
        }
    };

    const handleChannelSwitch = (slug: string) => {
        setShowControls(false);
        router.push(`/tv/${slug}`);
    };

    if (!currentVideo) {
        return (
            <div className="w-screen h-screen bg-black flex flex-col items-center justify-center space-y-6 text-white text-center p-6">
                <div className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center mb-2 animate-pulse">
                    <VideoOff className="w-8 h-8 opacity-50" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Channel Offline</h2>
                <div className="flex gap-4 mt-4">
                    <button onClick={() => router.push('/')} className="px-6 py-3 border border-white/20 rounded-full">Back Home</button>
                </div>
            </div>
        )
    }

    const variants = {
        enter: (d: number) => ({
            y: d > 0 ? '-100%' : '100%',
            opacity: 1
        }),
        center: {
            y: 0,
            opacity: 1
        },
        exit: (d: number) => ({
            y: d > 0 ? '100%' : '-100%',
            opacity: 1
        })
    };

    return (
        <div
            className="relative w-screen h-[100dvh] bg-black overflow-hidden bg-black touch-none select-none"
            onMouseMove={handleUserActivity}
            onClick={handleUserActivity}
            onWheel={handleScroll}
        >
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    className="absolute inset-0 w-full h-full"
                >
                    <VideoPlayerTV
                        src={getStorageUrl(currentVideo.storage_path)}
                        poster={currentVideo.poster_path ? getStorageUrl(currentVideo.poster_path) : undefined}
                        muted={isMuted}
                        isPlaying={isPlaying && hasInteracted}
                        onEnded={playNext}
                        onError={playNext}
                    />
                </motion.div>
            </AnimatePresence>

            {/* KIOSK OVERLAY */}
            {!hasInteracted && (
                <div onClick={handleStart} className="absolute inset-0 z-[60] flex items-center justify-center bg-black/80 cursor-pointer">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-6"
                    >
                        <h1 className="text-4xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl px-4">
                            {currentChannel.name}
                        </h1>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center animate-pulse">
                                <Play className="w-8 h-8 fill-current ml-1" />
                            </div>
                            <span className="text-white/80 font-medium tracking-widest uppercase text-sm">Click to Start TV</span>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* INFO OVERLAY */}
            <AnimatePresence>
                {(showControls && hasInteracted) && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-8 left-8 z-40 max-w-md pointer-events-none"
                    >
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold text-white leading-none drop-shadow-md">{currentVideo.title}</h2>
                            <p className="text-white/60 text-lg font-medium">{currentChannel.name}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* LOGO */}
            <div className="absolute top-8 right-8 z-30 opacity-50 pointer-events-none mix-blend-screen w-24 h-8">
                <Image
                    src="/logos/Hiflix-logo.svg"
                    alt="HIFLIX"
                    fill
                    className="object-contain"
                />
            </div>

            {/* CHANNEL PICKER */}
            <AnimatePresence>
                {showChannelList && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-5xl bg-neutral-900/95 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl landscape:bottom-16 landscape:max-h-[85vh]"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Select Channel</h3>
                            <button onClick={() => setShowChannelList(false)} className="p-2 hover:bg-white/10 rounded-full text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[60vh] landscape:max-h-[70vh] overflow-y-auto">
                            {allChannels.map(c => (
                                <button
                                    key={c.id}
                                    onClick={() => handleChannelSwitch(c.slug)}
                                    className={cn(
                                        "relative group aspect-video rounded-lg overflow-hidden border border-white/10 text-left transition-all",
                                        c.id === currentChannel.id ? "ring-2 ring-white" : "hover:ring-2 hover:ring-white/50"
                                    )}
                                >
                                    {c.cover_url ? (
                                        <Image src={c.cover_url} alt={c.name} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                    ) : <div className="w-full h-full bg-neutral-800" />}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col justify-end">
                                        <span className="font-bold text-white">{c.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CONTROL DOCK */}
            <AnimatePresence>
                {(showControls && hasInteracted) && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="absolute bottom-6 md:bottom-10 landscape:bottom-4 left-1/2 -translate-x-1/2 z-50 transform-gpu w-full max-w-[95vw] md:max-w-none landscape:w-auto flex justify-center"
                        onMouseEnter={() => setIsHoveringControls(true)}
                        onMouseLeave={() => setIsHoveringControls(false)}
                    >
                        <div className="flex items-center justify-between md:justify-center gap-1 md:gap-3 px-3 py-2 md:px-6 md:py-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-full shadow-2xl w-full md:w-auto">

                            {/* Navigation */}
                            <div className="flex items-center gap-0.5 md:gap-1 bg-white/5 rounded-full p-1">
                                <button onClick={playPrev} className="p-2.5 md:p-4 hover:bg-white/20 rounded-full text-white transition-colors group">
                                    <SkipBack className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                                </button>
                                <button onClick={() => setIsPlaying(!isPlaying)} className="p-2.5 md:p-4 bg-white text-black hover:bg-neutral-200 rounded-full transition-transform hover:scale-105 active:scale-95">
                                    {isPlaying ? <Pause className="w-5 h-5 md:w-7 md:h-7 fill-current" /> : <Play className="w-5 h-5 md:w-7 md:h-7 fill-current ml-1" />}
                                </button>
                                <button onClick={playNext} className="p-2.5 md:p-4 hover:bg-white/20 rounded-full text-white transition-colors">
                                    <SkipForward className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                                </button>
                            </div>

                            <div className="hidden md:block w-px h-6 md:h-8 bg-white/10 mx-1 md:mx-2" />

                            <div className="flex items-center gap-0.5 md:gap-1">
                                <button onClick={replayVideo} className="p-2 md:p-3 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors" title="Replay">
                                    <RotateCcw className="w-5 h-5 md:w-5 md:h-5" />
                                </button>
                                <motion.button
                                    onClick={handleLike}
                                    whileTap={{ scale: 0.8 }}
                                    animate={hasLiked ? { scale: [1, 1.2, 1] } : {}}
                                    className={cn("p-2 md:p-3 hover:bg-white/10 rounded-full transition-colors", hasLiked ? "text-red-500" : "text-white/80 hover:text-white")}
                                    title="Like"
                                >
                                    <Heart className={cn("w-5 h-5 md:w-5 md:h-5", hasLiked && "fill-current")} />
                                </motion.button>
                                <button onClick={handleShare} className="p-2 md:p-3 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors" title="Share">
                                    <Share2 className="w-5 h-5 md:w-5 md:h-5" />
                                </button>
                                <button onClick={() => setIsMuted(!isMuted)} className="p-2 md:p-3 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors">
                                    {isMuted ? <VolumeX className="w-5 h-5 md:w-5 md:h-5" /> : <Volume2 className="w-5 h-5 md:w-5 md:h-5" />}
                                </button>
                            </div>

                            <div className="hidden md:block w-px h-6 md:h-8 bg-white/10 mx-1 md:mx-2" />

                            <div className="flex items-center gap-0.5 md:gap-2">
                                <button
                                    onClick={() => setShowChannelList(!showChannelList)}
                                    className={cn(
                                        "p-2 md:py-2.5 md:px-5 rounded-full font-medium text-sm transition-all flex items-center gap-2",
                                        showChannelList ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
                                    )}
                                >
                                    <ListIcon className="w-5 h-5 md:w-4 md:h-4" />
                                    <span className="hidden md:inline">Channels</span>
                                </button>

                                <button onClick={() => router.push('/')} className="p-2 md:p-4 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors" title="Home">
                                    <X className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
