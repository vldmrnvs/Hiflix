import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">

                <div className="space-y-4">
                    <div className="relative w-32 h-10 md:mx-0 mx-auto">
                        <Image
                            src="/logos/Hiflix-logo.svg"
                            alt="HIFLIX"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <p className="text-neutral-500 text-sm max-w-xs mx-auto md:mx-0">
                        Curated visual journeys for deep focus, relaxation, and creative display.
                    </p>
                </div>

                <div className="flex gap-8 text-neutral-400 text-sm">
                    <a href="/about" className="hover:text-white transition-colors">About</a>
                    <a href="/contact" className="hover:text-white transition-colors">Contact</a>
                    <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
                    <a href="/terms" className="hover:text-white transition-colors">Terms</a>
                </div>

                <div className="text-neutral-600 text-xs">
                    &copy; {new Date().getFullYear()} HIFLIX. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
