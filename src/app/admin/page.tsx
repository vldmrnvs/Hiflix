"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Video, Channel } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function AdminDashboard() {
    const [videos, setVideos] = useState<(Video & { channels: Channel | null })[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch Videos
    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        setLoading(true);
        // Join with channels
        const { data } = await supabase
            .from('videos')
            .select('*, channels(name)')
            .order('created_at', { ascending: false });

        if (data) setVideos(data as any); // Type casting for join
        setLoading(false);
    };

    const updateStatus = async (id: string, status: 'approved' | 'rejected' | 'draft') => {
        await supabase.from('videos').update({ status }).eq('id', id);
        fetchVideos(); // Refresh
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Content Dashboard</h1>
                <Link href="/admin/upload">
                    <Button>Upload New Video</Button>
                </Link>
            </div>

            <div className="border border-neutral-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm text-neutral-400">
                    <thead className="bg-neutral-900/50 text-neutral-200 font-medium">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Channel</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {loading ? (
                            <tr><td colSpan={4} className="p-8 text-center">Loading...</td></tr>
                        ) : videos.map((video) => (
                            <tr key={video.id} className="hover:bg-neutral-900/30 transition-colors">
                                <td className="p-4 font-medium text-white">{video.title}</td>
                                <td className="p-4">{video.channels?.name || 'Unknown'}</td>
                                <td className="p-4">
                                    <Badge variant={
                                        video.status === 'approved' ? 'default' :
                                            video.status === 'rejected' ? 'secondary' : 'outline'
                                    }>
                                        {video.status}
                                    </Badge>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    {video.status === 'draft' && (
                                        <>
                                            <Button size="sm" onClick={() => updateStatus(video.id, 'approved')}>Approve</Button>
                                            <Button size="sm" variant="outline" onClick={() => updateStatus(video.id, 'rejected')}>Reject</Button>
                                        </>
                                    )}
                                    {video.status === 'approved' && (
                                        <Button size="sm" variant="outline" onClick={() => updateStatus(video.id, 'draft')}>Unpublish</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {!loading && videos.length === 0 && (
                            <tr><td colSpan={4} className="p-8 text-center">No videos found. Upload one!</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
