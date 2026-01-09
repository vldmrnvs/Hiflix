import { supabase } from "@/lib/supabase";
import { Video } from "@/types";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Play } from "lucide-react";
import { getStorageUrl } from "@/lib/storage";
import Image from "next/image";
import { getMockChannelBySlug, getMockVideosByChannel } from "@/lib/mockData";

export const revalidate = 60;

export default async function ChannelPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let channel;
    let videos: Video[] = [];

    try {
        const { data: c } = await supabase.from('channels').select('*').eq('slug', slug).single();
        if (c) {
            channel = c;
            const { data: v } = await supabase.from('videos').select('*').eq('channel_id', c.id).eq('status', 'approved').order('created_at', { ascending: false });
            videos = (v as unknown as Video[]) || [];
        } else {
            throw new Error("Channel not found DB");
        }
    } catch (e) {
        channel = getMockChannelBySlug(slug);
        if (channel) videos = getMockVideosByChannel(channel.id);
    }

    if (!channel) {
        return (
            <div className="min-h-screen flex items-center justify-center text-neutral-500">
                Channel not found
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 md:p-16 space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm text-neutral-400 uppercase tracking-widest">
                        <Link href="/" className="hover:text-white transition-colors">Channels</Link>
                        <span>/</span>
                        <span className="text-white">{channel.slug}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                        {channel.name}
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl">
                        {channel.description}
                    </p>
                </div>

                <div className="flex space-x-4">
                    <Link href={`/tv/${channel.slug}`}>
                        <Button size="lg" className="rounded-full px-8 h-14 text-lg gap-2">
                            <Play className="fill-current w-5 h-5" />
                            Start TV
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Video List */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-6">Library ({videos?.length || 0})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos?.map((video: Video) => (
                        <Link key={video.id} href={`/tv/${channel.slug}`} className="group block space-y-3">
                            <div className="relative aspect-video bg-neutral-900 rounded-lg overflow-hidden ring-1 ring-white/10 group-hover:ring-white/50 transition-all">
                                {video.poster_path ? (
                                    <Image
                                        src={getStorageUrl(video.poster_path)}
                                        alt={video.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-neutral-700">No Preview</div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                    <Play className="fill-white text-white w-12 h-12 drop-shadow-lg" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium text-white group-hover:text-primary transition-colors line-clamp-1">{video.title}</h3>
                                <p className="text-sm text-neutral-500">{video.duration ? `${Math.floor(video.duration / 60)}m` : 'Unknown duration'}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
