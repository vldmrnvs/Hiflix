import { assertAdmin, getAdminSupabase } from "@/lib/admin-auth";
import { Badge } from "@/components/ui/badge";
import { VideoActions } from "./_components/video-actions";

export default async function AdminVideosPage() {
    await assertAdmin();
    const supabase = getAdminSupabase();

    const { data: videos } = await supabase
        .from('videos')
        .select(`
            *,
            channels (name),
            profiles:owner_id (email)
        `)
        .order('created_at', { ascending: false });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'pending_review': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'pending_removal': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
            case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'removed': return 'bg-red-900/10 text-red-700 border-red-900/20';
            case 'archived': return 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20';
            default: return 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Video Governance</h1>
                    <p className="text-neutral-500">Review and moderate all platform content.</p>
                </div>
            </div>

            <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/20">
                <table className="w-full text-left text-sm text-neutral-400">
                    <thead className="bg-neutral-900 text-neutral-200 font-medium">
                        <tr>
                            <th className="p-4">Video</th>
                            <th className="p-4">Channel</th>
                            <th className="p-4">Uploader</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Decisions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {videos?.map((video: any) => (
                            <tr key={video.id} className="hover:bg-neutral-900/30 transition-colors">
                                <td className="p-4">
                                    <div className="font-medium text-white">{video.title}</div>
                                    <div className="text-xs text-neutral-600 font-mono">{video.id.slice(0, 8)}</div>
                                </td>
                                <td className="p-4">{video.channels?.name || 'Unknown'}</td>
                                <td className="p-4">{video.profiles?.email || 'System'}</td>
                                <td className="p-4">
                                    <Badge className={getStatusColor(video.status)}>
                                        {video.status.replace('_', ' ')}
                                    </Badge>
                                </td>
                                <td className="p-4 text-right">
                                    <VideoActions video={video} />
                                </td>
                            </tr>
                        ))}
                        {videos?.length === 0 && (
                            <tr><td colSpan={5} className="p-16 text-center text-neutral-600">All caught up. No pending actions.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
