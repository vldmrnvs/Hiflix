import { supabase } from "@/lib/supabase";
import { ChannelCard } from "@/components/ChannelCard";
import { Channel } from "@/types";
import { MOCK_CHANNELS } from "@/lib/mockData";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Benefits } from "@/components/landing/Benefits";
import { Pricing } from "@/components/landing/Pricing";
import Image from "next/image";

export const revalidate = 60;

export default async function Home() {
    let channels: Channel[] = [];
    try {
        const { data, error } = await supabase
            .from('channels')
            .select('*')
            .order('is_featured', { ascending: false })
            .order('order', { ascending: true });

        if (error || !data || data.length === 0) throw new Error("No data");
        channels = data;
    } catch (err) {
        // console.log("Supabase unavailable, using MOCK data.");
        channels = MOCK_CHANNELS;
    }

    const featuredChannel = channels.find(c => c.is_featured) || channels[0];

    return (
        <main className="min-h-screen bg-black">
            {featuredChannel ? (
                <Hero channel={featuredChannel} />
            ) : (
                <div className="h-[50vh] flex items-center justify-center">
                    <div className="relative w-80 h-32">
                        <Image
                            src="/logos/Hiflix-logo.svg"
                            alt="HIFLIX"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            )}

            <div className="max-w-[1800px] mx-auto p-8 md:p-16 space-y-12">
                <header id="channels" className="flex items-center justify-between border-b border-neutral-800 pb-6 scroll-mt-24">
                    <h2 className="text-2xl font-medium tracking-wide text-white">All Channels</h2>
                    <span className="text-neutral-500 text-sm">{channels.length} Available</span>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {channels.map((channel: Channel, idx: number) => (
                        <ChannelCard key={channel.id} channel={channel} index={idx} />
                    ))}
                </div>
            </div>

            <HowItWorks />
            <Benefits />
            <Pricing />
        </main>
    );
}
