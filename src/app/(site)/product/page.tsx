import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, Infinity, CheckCircle, Waves, Music, Zap, Circle, Building2, Hotel, Palette, GraduationCap, Theater, MapPin, Clock, Sparkles, Eye, TrendingUp } from "lucide-react";
import { SimpleParticles } from "@/components/effects/ParticleField";

export default function ProductPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            {/* Hero with Interactive Effect */}
            <section className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden">
                {/* Simplified Background Effect */}
                <SimpleParticles />

                {/* Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                        Visual media for{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">
                            any screen.
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto">
                        HIFLIX turns screens into continuous visual channels — curated, controlled and designed for real spaces.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link href="/">
                            <Button size="lg" className="gap-2">
                                <Play className="w-5 h-5 fill-current" />
                                Start TV
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="lg" variant="outline">
                                Request Access
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* The Problem */}
            <section className="py-24 px-6 border-t border-neutral-800">
                <div className="max-w-5xl mx-auto space-y-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-center leading-tight">
                        Screens are everywhere.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">
                            Visuals are not.
                        </span>
                    </h2>
                    <p className="text-xl text-neutral-300 text-center max-w-3xl mx-auto">
                        Screens are now part of every physical space — clubs, hotels, museums, campuses, offices.
                        Yet most visuals are treated as an afterthought.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 pt-8">
                        <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/20">
                            <h3 className="text-xl font-semibold mb-3">What usually happens:</h3>
                            <ul className="space-y-3 text-neutral-400">
                                <li>• Repetitive playlists that get old fast</li>
                                <li>• Videos with awkward cuts and black frames</li>
                                <li>• Content that needs constant manual updates</li>
                                <li>• Risky visuals with no real moderation</li>
                            </ul>
                        </div>
                        <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/20 flex items-center justify-center">
                            <p className="text-2xl font-medium text-neutral-500 text-center">
                                Screens exist.<br />Visual systems don&apos;t.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Solution */}
            <section className="py-24 px-6 border-t border-neutral-800">
                <div className="max-w-5xl mx-auto space-y-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-center leading-tight">
                        One system.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">
                            Endless visuals.
                        </span>
                    </h2>
                    <p className="text-xl text-neutral-300 text-center max-w-3xl mx-auto">
                        HIFLIX is a visual media system designed for screens that need atmosphere, not attention.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                        {[
                            { Icon: Infinity, title: 'Continuous playback', desc: 'No start, no end' },
                            { Icon: CheckCircle, title: 'Curated content', desc: 'Approved and safe' },
                            { Icon: Waves, title: 'Smooth transitions', desc: 'No visual breaks' },
                            { Icon: Music, title: 'Works muted', desc: 'Better with sound' },
                            { Icon: Zap, title: 'Centralized control', desc: 'Without complexity' },
                            { Icon: Circle, title: 'Always alive', desc: 'Visuals that breathe' }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="group p-6 rounded-xl border border-white/5 bg-neutral-900/50 hover:bg-neutral-900 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                                    <feature.Icon className="w-6 h-6 text-white/80" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-neutral-400 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-neutral-500 pt-8">
                        No editing. No managing files every week. Just visuals that stay alive.
                    </p>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-24 px-6 border-t border-neutral-800 bg-neutral-900/20">
                <div className="max-w-3xl mx-auto text-center space-y-12">
                    <h2 className="text-4xl md:text-5xl font-bold">How HIFLIX works</h2>
                    <div className="grid gap-8">
                        {[
                            { step: '1', text: 'Choose a visual channel' },
                            { step: '2', text: 'Press Start TV' },
                            { step: '3', text: 'HIFLIX keeps the visuals flowing' }
                        ].map(({ step, text }) => (
                            <div key={step} className="group flex items-center gap-6 hover:scale-105 transition-transform duration-300">
                                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    {step}
                                </div>
                                <p className="text-xl text-left">{text}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-neutral-500 pt-8">That&apos;s it.</p>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-24 px-6 border-t border-neutral-800">
                <div className="max-w-6xl mx-auto space-y-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-center leading-tight">
                        Built for{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">
                            any place with a screen
                        </span>
                    </h2>
                    <p className="text-xl text-neutral-300 text-center">
                        HIFLIX adapts to environments where visuals matter.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                        {[
                            { Icon: Music, title: 'Clubs & venues', desc: 'Visual atmosphere that evolves with the night.' },
                            { Icon: Hotel, title: 'Hotels & lobbies', desc: 'Ambient visuals that elevate space and brand.' },
                            { Icon: Palette, title: 'Museums & exhibitions', desc: 'Visual layers that support content without overpowering it.' },
                            { Icon: GraduationCap, title: 'Universities & campuses', desc: 'Information, motion and calm combined.' },
                            { Icon: Theater, title: 'Theaters & cultural spaces', desc: 'Pre-show, intermissions and contextual visuals.' },
                            { Icon: Building2, title: 'Corporate spaces & showrooms', desc: 'Living visual identity on large displays.' }
                        ].map((useCase, i) => (
                            <div
                                key={i}
                                className="group p-6 rounded-xl border border-white/5 bg-neutral-900/50 hover:bg-neutral-900 transition-all duration-300 space-y-3"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-2 group-hover:bg-white/10 transition-colors">
                                    <useCase.Icon className="w-6 h-6 text-white/80" />
                                </div>
                                <h3 className="text-xl font-semibold">{useCase.title}</h3>
                                <p className="text-neutral-400">{useCase.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-neutral-500 pt-8">
                        If there&apos;s a screen, HIFLIX can live there.
                    </p>
                </div>
            </section>

            {/* Corporate Angle */}
            <section className="py-24 px-6 border-t border-neutral-800 bg-neutral-900/20">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        Your visuals.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">
                            Your rules.
                        </span>
                    </h2>
                    <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                        For corporate and institutional partners, HIFLIX can support custom visual channels.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 pt-8">
                        {[
                            'Upload your own visuals',
                            'Organize them by channel',
                            'Publish through the same controlled system'
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-xl border border-neutral-800 bg-black/40">
                                <p className="text-lg">{item}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-neutral-400 pt-8">
                        Always curated. Always safe.
                    </p>
                    <p className="text-neutral-500">
                        HIFLIX is not open UGC. It&apos;s controlled visual publishing.
                    </p>
                </div>
            </section>

            {/* Why HIFLIX */}
            <section className="py-24 px-6 border-t border-neutral-800">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-center">Why HIFLIX</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { Icon: MapPin, text: 'Designed for physical spaces, not feeds' },
                            { Icon: Clock, text: 'Built for long-running screens' },
                            { Icon: Sparkles, text: 'Curated instead of chaotic' },
                            { Icon: Eye, text: 'Visual-first, distraction-free' },
                            { Icon: TrendingUp, text: 'Scales from one screen to many' }
                        ].map((reason, i) => (
                            <div
                                key={i}
                                className="group flex items-start gap-4 p-4 rounded-lg hover:bg-neutral-900/20 transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                                    <reason.Icon className="w-5 h-5 text-white/80" />
                                </div>
                                <p className="text-lg pt-2">{reason.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 border-t border-neutral-800">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Interested in using HIFLIX on your screens?
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link href="/contact">
                            <Button size="lg">Request Access</Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="lg" variant="outline">Contact Us</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
