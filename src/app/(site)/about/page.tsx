export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 px-6">
            <div className="max-w-3xl mx-auto space-y-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">About HIFLIX</h1>
                <p className="text-xl text-neutral-300 leading-relaxed font-light">
                    HIFLIX is a curated streaming platform designed for atmosphere, focus, and aesthetic immersion.
                    Unlike traditional streaming services that demand your attention, HIFLIX is designed to coexist with your environment—turning your screens into living art.
                </p>
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="p-6 border border-white/10 rounded-2xl bg-neutral-900/30">
                        <h3 className="text-lg font-bold mb-2">Curated Channels</h3>
                        <p className="text-neutral-400">Hand-picked visuals ranging from Cyberpunk cities to Nature macros.</p>
                    </div>
                    <div className="p-6 border border-white/10 rounded-2xl bg-neutral-900/30">
                        <h3 className="text-lg font-bold mb-2">Club-Ready</h3>
                        <p className="text-neutral-400">Kiosk controls and infinite loops make it perfect for venues and displays.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
