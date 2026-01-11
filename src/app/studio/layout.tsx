"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Film, LogOut, Upload as UploadIcon, MessageSquare } from "lucide-react";

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/admin/login");
            } else {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
                <div className="mb-8">
                    <h1 className="text-xl font-bold tracking-tight">HIFLIX Studio</h1>
                    <span className="text-xs text-neutral-500 uppercase tracking-widest">Guest Access</span>
                </div>

                <nav className="space-y-2 flex-1">
                    <Link href="/studio">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-neutral-400 hover:text-white hover:bg-white/5">
                            <Film className="w-4 h-4" />
                            My Videos
                        </Button>
                    </Link>
                    <Link href="/studio/upload">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-neutral-400 hover:text-white hover:bg-white/5">
                            <UploadIcon className="w-4 h-4" />
                            Upload
                        </Button>
                    </Link>
                    <Link href="/studio/feedback">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-neutral-400 hover:text-white hover:bg-white/5">
                            <MessageSquare className="w-4 h-4" />
                            Feedback
                        </Button>
                    </Link>
                </nav>

                <div className="pt-6 border-t border-white/10">
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                        <LogOut className="w-4 h-4" />
                        Log Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
