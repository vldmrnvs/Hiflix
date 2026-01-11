"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Video } from "@/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function StudioPage() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('videos')
                .select('*')
                .eq('owner_id', user.id)
                .order('created_at', { ascending: false });

            if (!error && data) {
                // Cast to Video type - Status is string in DB, simplified here
                setVideos(data as any);
            }
            setLoading(false);
        };
        fetchVideos();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'pending_review': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20';
        }
    };

    if (loading) return <div>Loading videos...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white">My Videos</h2>
                    <p className="text-neutral-400">Manage your contributions.</p>
                </div>
                <Link href="/studio/upload">
                    <Button className="bg-white text-black hover:bg-neutral-200">
                        <Plus className="w-4 h-4 mr-2" />
                        New Upload
                    </Button>
                </Link>
            </div>

            {videos.length === 0 ? (
                <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl">
                    <p className="text-neutral-500 mb-4">No videos found.</p>
                    <Link href="/studio/upload">
                        <Button variant="outline">Upload your first video</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {videos.map((video) => (
                        <div key={video.id} className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-32 h-20 bg-black rounded-lg overflow-hidden relative">
                                    {/* Thumbnail Placeholder */}
                                    <div className="absolute inset-0 flex items-center justify-center text-neutral-700 text-xs">No Thumb</div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{video.title}</h3>
                                    <p className="text-xs text-neutral-500 font-mono">{video.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge className={getStatusColor(video.status)}>
                                    {video.status.replace('_', ' ')}
                                </Badge>
                                {/* Future: Actions like Request Removal */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
