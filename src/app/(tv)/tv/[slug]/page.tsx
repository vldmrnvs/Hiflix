import { supabase } from "@/lib/supabase";
import { TVManager } from "@/components/TVManager";
import { getMockChannelBySlug, getMockVideosByChannel, MOCK_CHANNELS } from "@/lib/mockData";

export const revalidate = 0; // Always fresh for TV mode/randomness check

export default async function TVPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let channel;
    let videos;
    let allChannels: any[] = []; // Use explicit type or Channel[] if imported

    try {
        // Parallel fetch for current channel and all channels list
        const [channelRes, allChannelsRes] = await Promise.all([
            supabase.from('channels').select('*').eq('slug', slug).single(),
            supabase.from('channels').select('*').order('order', { ascending: true })
        ]);

        const c = channelRes.data;
        if (c) {
            channel = c;
            const { data: v } = await supabase.from('videos').select('*').eq('channel_id', c.id).eq('status', 'approved').order('created_at', { ascending: false });
            videos = v;
        } else {
            throw new Error("DB Error");
        }

        if (allChannelsRes.data) {
            allChannels = allChannelsRes.data;
        }

    } catch (e) {
        channel = getMockChannelBySlug(slug);
        if (channel) videos = getMockVideosByChannel(channel.id);
        allChannels = MOCK_CHANNELS;
    }

    if (!channel) {
        return (
            <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-neutral-500 space-y-4">
                <h1 className="text-4xl font-bold">Channel Not Found</h1>
                <p>The requested channel "{slug}" does not exist.</p>
                <a href="/" className="text-white underline">Back to Home</a>
            </div>
        );
    }

    if (!videos || videos.length === 0) {
        return (
            <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-neutral-500 space-y-4">
                <h1 className="text-4xl font-bold">{channel.name} is Offline</h1>
                <p>No videos available.</p>
                <div className="flex gap-4">
                    <a href="/" className="text-white underline">Back to Home</a>
                </div>
            </div>
        );
    }

    return <TVManager videos={videos} channel={channel} allChannels={allChannels as any} />;
}
