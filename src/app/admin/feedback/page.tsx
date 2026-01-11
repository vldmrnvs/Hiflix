import { assertAdmin, getAdminSupabase } from "@/lib/admin-auth";
import { Badge } from "@/components/ui/badge";
import { FeedbackActions } from "./_components/feedback-actions";
import Link from 'next/link';

export default async function AdminFeedbackPage() {
    await assertAdmin();
    const supabase = getAdminSupabase();

    const { data: feedback } = await supabase
        .from('feedback')
        .select(`
            *,
            profiles:user_id (email)
        `)
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Feedback</h1>
                    <p className="text-neutral-500">User suggestions, issues, and reports.</p>
                </div>
            </div>

            <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/20">
                <table className="w-full text-left text-sm text-neutral-400">
                    <thead className="bg-neutral-900 text-neutral-200 font-medium">
                        <tr>
                            <th className="p-4">Type</th>
                            <th className="p-4 w-1/3">Message</th>
                            <th className="p-4">Context</th>
                            <th className="p-4">Author</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {feedback?.map((item: any) => (
                            <tr key={item.id} className="hover:bg-neutral-900/30 transition-colors">
                                <td className="p-4 capitalize text-white">
                                    {item.type.replace('_', ' ')}
                                </td>
                                <td className="p-4">
                                    <p className="line-clamp-2" title={item.message}>{item.message}</p>
                                </td>
                                <td className="p-4">
                                    {item.meta?.url ? (
                                        <Link href={item.meta.url} target="_blank" className="text-blue-400 hover:underline">
                                            Open Link
                                        </Link>
                                    ) : (
                                        <span className="text-neutral-600">-</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    {item.profiles?.email || item.user_email || 'Anonymous'}
                                </td>
                                <td className="p-4">
                                    <Badge variant={item.status === 'open' ? 'default' : 'secondary'}>
                                        {item.status}
                                    </Badge>
                                </td>
                                <td className="p-4 text-right">
                                    <FeedbackActions feedback={item} />
                                </td>
                            </tr>
                        ))}
                        {feedback?.length === 0 && (
                            <tr><td colSpan={6} className="p-16 text-center text-neutral-600">No feedback yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
