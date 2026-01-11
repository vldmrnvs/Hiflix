import { getAdminSupabase, assertAdmin } from "@/lib/admin-auth";
import { CollaborationRequest } from "@/types";
import { CollabActions } from "./_components/collab-actions";
import { redirect } from "next/navigation";

export default async function CollabPage() {
    try {
        await assertAdmin();
    } catch {
        redirect('/admin/login');
    }

    const supabase = getAdminSupabase();
    const { data: requests, error } = await supabase
        .from('collaboration_requests')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching collaboration requests:', error);
    }

    const collabRequests = (requests || []) as CollaborationRequest[];

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Collaboration Requests</h1>
                    <span className="text-neutral-500">{collabRequests.length} total</span>
                </div>

                <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-neutral-800">
                            <tr>
                                <th className="text-left p-4 text-sm font-medium">Name</th>
                                <th className="text-left p-4 text-sm font-medium">Email</th>
                                <th className="text-left p-4 text-sm font-medium">Organization</th>
                                <th className="text-left p-4 text-sm font-medium">Message</th>
                                <th className="text-left p-4 text-sm font-medium">Status</th>
                                <th className="text-left p-4 text-sm font-medium">Created</th>
                                <th className="text-right p-4 text-sm font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collabRequests.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center p-8 text-neutral-500">
                                        No collaboration requests yet
                                    </td>
                                </tr>
                            ) : (
                                collabRequests.map((request) => (
                                    <tr key={request.id} className="border-t border-neutral-800 hover:bg-neutral-800/50">
                                        <td className="p-4">{request.name || '—'}</td>
                                        <td className="p-4 text-sm">{request.author_email}</td>
                                        <td className="p-4 text-sm">{request.organization || '—'}</td>
                                        <td className="p-4 text-sm max-w-xs truncate">{request.message}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${request.status === 'open' ? 'bg-blue-500/20 text-blue-400' :
                                                    request.status === 'reviewed' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-neutral-500/20 text-neutral-400'
                                                }`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-neutral-400">
                                            {new Date(request.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <CollabActions request={request} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
