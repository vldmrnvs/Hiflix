"use client";

import { useEffect, useRef } from 'react';

export function SimpleParticles() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            container.style.setProperty('--mouse-x', `${x}%`);
            container.style.setProperty('--mouse-y', `${y}%`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden"
            style={{
                '--mouse-x': '50%',
                '--mouse-y': '50%',
            } as React.CSSProperties}
        >
            {/* Animated gradient orbs */}
            <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 bg-white animate-float"
                style={{
                    left: 'var(--mouse-x)',
                    top: 'var(--mouse-y)',
                    transform: 'translate(-50%, -50%)',
                    transition: 'left 0.3s ease-out, top 0.3s ease-out'
                }}
            />
            <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 bg-neutral-300 animate-float-delayed"
                style={{
                    left: 'calc(var(--mouse-x) + 100px)',
                    top: 'calc(var(--mouse-y) - 50px)',
                    transform: 'translate(-50%, -50%)',
                    transition: 'left 0.4s ease-out, top 0.4s ease-out'
                }}
            />

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                         linear-gradient(to right, white 1px, transparent 1px),
                         linear-gradient(to bottom, white 1px, transparent 1px)
                     `,
                    backgroundSize: '80px 80px'
                }}
            />
        </div>
    );
}
