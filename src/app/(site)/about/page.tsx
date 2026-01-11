"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitCollaborationRequest } from "@/app/actions/contact";
import { Package, HeartCrack, AlertTriangle, Megaphone, Film, Building, Sparkles, Users, Trash2, Smartphone, Palette, Wand2, BookOpen, Landmark, Theater } from "lucide-react";

export default function AboutPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.append('submitted_at', Date.now().toString());
        formData.append('user_agent', navigator.userAgent);
        formData.append('referrer', document.referrer);

        const result = await submitCollaborationRequest(formData);
        setLoading(false);

        if (result.success) {
            setSuccess(true);
            (e.target as HTMLFormElement).reset();
        } else {
            alert(result.error || 'Submission failed');
        }
    };

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Parallax Hero */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black"
                />
                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold"
                    >
                        HIFLIX is a visual experiment.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-neutral-300"
                    >
                        Born from clubs, art spaces and the belief that screens deserve better visuals.
                    </motion.p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-24 px-6 border-t border-neutral-800">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-center">Our mission</h2>
                    <div className="space-y-6 text-xl text-neutral-300">
                        <p>We believe screens shouldn&apos;t be dead surfaces.</p>
                        <p>They shouldn&apos;t loop the same videos forever. They shouldn&apos;t distract, overwhelm or feel improvised.</p>
                        <p className="text-2xl font-medium text-white">Screens should breathe. They should move with intention. They should adapt to the space they inhabit.</p>
                        <p>HIFLIX exists to rethink how visuals live in the physical world.</p>
                    </div>
                </div>
            </section>

            {/* Why We Build This */}
            <section className="py-24 px-6 border-t border-neutral-800 bg-neutral-900/20">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-center">Why HIFLIX exists</h2>
                    <div className="space-y-6 text-lg text-neutral-300">
                        <p>We&apos;ve seen the same problems everywhere:</p>
                        <div className="grid md:grid-cols-2 gap-4 pt-4">
                            {[
                                { Icon: Package, text: 'Visuals treated as filler' },
                                { Icon: HeartCrack, text: 'Playlists that break immersion' },
                                { Icon: AlertTriangle, text: 'Content that feels random or unsafe' },
                                { Icon: Megaphone, text: 'Too much noise, not enough intention' }
                            ].map((problem, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-900/40 transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                                        <problem.Icon className="w-5 h-5 text-white/80" />
                                    </div>
                                    <span className="pt-2">{problem.text}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xl font-medium text-white pt-6">HIFLIX is our response.</p>
                        <p>A system where visuals are curated, continuous and respectful of the space — whether that space is a club, a museum or a university hall.</p>
                    </div>
                </div>
            </section>

            {/* What HIFLIX Is/Isn't */}
            <section className="py-24 px-6 border-t border-neutral-800">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold text-green-400 flex items-center gap-3">
                                <span>✓</span> What HIFLIX is
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { Icon: Film, text: 'A visual media system' },
                                    { Icon: Building, text: 'A curated visual infrastructure' },
                                    { Icon: Sparkles, text: 'A tool for atmosphere and context' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 text-lg text-neutral-300 p-3 rounded-lg hover:bg-neutral-900/20 transition-all duration-300">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                                            <item.Icon className="w-5 h-5 text-white/80" />
                                        </div>
                                        <span className="pt-2">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold text-red-400 flex items-center gap-3">
                                <span>✗</span> What HIFLIX is not
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { Icon: Users, text: 'A social network' },
                                    { Icon: Trash2, text: 'An open content dump' },
                                    { Icon: Smartphone, text: 'A short-form video platform' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 text-lg text-neutral-300 p-3 rounded-lg hover:bg-neutral-900/20 transition-all duration-300">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 opacity-50">
                                            <item.Icon className="w-5 h-5 text-white/80" />
                                        </div>
                                        <span className="pt-2">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-neutral-500 pt-12">This distinction matters.</p>
                </div>
            </section>

            {/* Collaboration Form */}
            <section className="py-24 px-6 border-t border-neutral-800 bg-neutral-900/20">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="text-center space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold">Collaborate with HIFLIX</h2>
                        <p className="text-xl text-neutral-300">HIFLIX grows through collaboration.</p>
                        <p className="text-lg text-neutral-400">
                            We&apos;re interested in working with:
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 pt-4">
                            {[
                                { Icon: Palette, role: 'Visual artists' },
                                { Icon: Wand2, role: 'Motion designers' },
                                { Icon: BookOpen, role: 'Curators' },
                                { Icon: Landmark, role: 'Cultural spaces' },
                                { Icon: Theater, role: 'Venues and institutions' }
                            ].map(({ Icon, role }) => (
                                <span
                                    key={role}
                                    className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-sm transition-all duration-300 hover:scale-105 flex items-center gap-2"
                                >
                                    <Icon className="w-4 h-4" />
                                    {role}
                                </span>
                            ))}
                        </div>
                        <p className="text-neutral-400 pt-6">
                            If you believe visuals can shape spaces, we&apos;d love to hear from you.
                        </p>
                    </div>

                    {success ? (
                        <div className="p-8 rounded-xl border border-green-500/20 bg-green-500/10 text-center">
                            <p className="text-xl text-green-400">Thank you for your interest!</p>
                            <p className="text-neutral-400 mt-2">We&apos;ll review your request and get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Honeypot */}
                            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Your name"
                                        className="bg-neutral-900 border-neutral-800"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        className="bg-neutral-900 border-neutral-800"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="organization">Organization</Label>
                                <Input
                                    id="organization"
                                    name="organization"
                                    placeholder="Your organization or project"
                                    className="bg-neutral-900 border-neutral-800"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message *</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    placeholder="Tell us about your idea, project, or how you'd like to collaborate..."
                                    className="bg-neutral-900 border-neutral-800"
                                />
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? 'Sending...' : 'Submit Request'}
                            </Button>
                        </form>
                    )}
                </div>
            </section>

            {/* Footer Note */}
            <section className="py-12 px-6 border-t border-neutral-800">
                <p className="text-center text-neutral-500 max-w-2xl mx-auto">
                    HIFLIX is evolving. We&apos;re starting small, learning fast and building carefully.
                </p>
            </section>
        </main>
    );
}
