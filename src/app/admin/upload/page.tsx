"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Channel } from '@/types';

export default function AdminUpload() {
    const router = useRouter();
    const [channels, setChannels] = useState<Channel[]>([]);

    const [file, setFile] = useState<File | null>(null);
    const [posterFile, setPosterFile] = useState<File | null>(null); // New: Poster upload
    const [title, setTitle] = useState('');
    const [channelId, setChannelId] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    // Fetch Channels for Dropdown
    useEffect(() => {
        const fetchChannels = async () => {
            const { data } = await supabase.from('channels').select('*');
            if (data) setChannels(data);
        };
        fetchChannels();
    }, []);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !channelId || !title) return;

        setLoading(true);
        setStatus('Uploading video...');

        try {
            const channel = channels.find(c => c.id === channelId);
            if (!channel) throw new Error("Channel not found");

            const timestamp = Date.now();
            const fileExt = file.name.split('.').pop();
            const filePath = `${channel.slug}/${timestamp}.${fileExt}`;

            // 1. Upload Video
            const { error: uploadError } = await supabase.storage
                .from('videos')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Upload Poster (Optional)
            let posterPath = null;
            if (posterFile) {
                setStatus('Uploading poster...');
                const posterExt = posterFile.name.split('.').pop();
                const pPath = `posters/${channel.slug}/${timestamp}.${posterExt}`;
                const { error: posterError } = await supabase.storage
                    .from('videos')
                    .upload(pPath, posterFile);

                if (posterError) {
                    console.error("Poster upload failed", posterError);
                } else {
                    posterPath = pPath;
                }
            }

            // 3. Create DB Entry
            setStatus('Saving metadata...');
            const { error: dbError } = await supabase.from('videos').insert({
                title,
                channel_id: channelId,
                storage_path: filePath,
                poster_path: posterPath,
                status: 'draft' // Default to draft
            });

            if (dbError) throw dbError;

            setStatus('Success! Video is in Draft.');
            setTimeout(() => {
                router.push('/admin');
            }, 1500);

        } catch (err: any) {
            setStatus(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-white">Upload Video</h1>

            <form onSubmit={handleUpload} className="space-y-6 bg-neutral-900/50 p-8 rounded-xl border border-neutral-800">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Title</label>
                    <Input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Video Title"
                        className="bg-neutral-950 border-neutral-800 text-white"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Channel</label>
                    <select
                        className="w-full h-10 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white"
                        value={channelId}
                        onChange={e => setChannelId(e.target.value)}
                    >
                        <option value="">Select Channel</option>
                        {channels.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Video File (MP4)</label>
                    <Input
                        type="file"
                        accept="video/mp4"
                        onChange={e => setFile(e.target.files?.[0] || null)}
                        className="bg-neutral-950 border-neutral-800 text-white file:text-white"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Poster Image (Optional)</label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={e => setPosterFile(e.target.files?.[0] || null)}
                        className="bg-neutral-950 border-neutral-800 text-white file:text-white"
                    />
                </div>

                <Button disabled={loading} className="w-full">
                    {loading ? 'Processing...' : 'Upload'}
                </Button>

                {status && <p className="text-center text-sm text-neutral-400 animate-pulse">{status}</p>}
            </form>
        </div>
    );
}
