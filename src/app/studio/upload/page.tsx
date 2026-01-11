"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function UploadPage() {
    const router = useRouter();
    const [uploading, setUploading] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); // TODO: Add to schema if needed, currently unused in Video type
    // In a real app, we'd handle file selection and upload to Storage here
    const [videoUrl, setVideoUrl] = useState("");

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // 1. (Mock) Upload to Storage would happen here
        // const { data: storageData, error: storageError } = await supabase.storage...

        // 2. Insert into DB
        const { error } = await supabase
            .from('videos')
            .insert({
                owner_id: user.id,
                channel_id: 'c-1', // Mock: Default to first channel or let user pick
                title: title,
                storage_path: videoUrl || 'https://placeholder-video.mp4',
                status: 'pending_review'
            });

        if (error) {
            alert("Error uploading: " + error.message);
        } else {
            router.push("/studio");
        }
        setUploading(false);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white">Upload Video</h2>
                <p className="text-neutral-400">Submit your content for review.</p>
            </div>

            <form onSubmit={handleUpload} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/5">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="e.g. Neon Nights"
                        required
                        className="bg-black/50 border-white/10"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="url">Video URL (Mock Upload)</Label>
                    <Input
                        id="url"
                        value={videoUrl}
                        onChange={e => setVideoUrl(e.target.value)}
                        placeholder="https://..."
                        required
                        className="bg-black/50 border-white/10"
                    />
                    <p className="text-xs text-neutral-500">
                        * In this MVP, paste a direct MP4 link since Storage isn't fully configured.
                    </p>
                </div>

                <div className="pt-4">
                    <Button type="submit" disabled={uploading} className="w-full bg-white text-black hover:bg-neutral-200">
                        {uploading ? "Submitting..." : "Submit for Review"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
