import Link from "next/link";
import { MessageSquare, Video as VideoIcon, Users } from "lucide-react";

export default function AdminHubPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    <p className="text-neutral-500">Select a module to manage.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/admin/videos" className="group">
                    <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/20 hover:bg-neutral-900/40 transition-colors space-y-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500/20 transition-colors">
                            <VideoIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">Video Governance</h3>
                            <p className="text-neutral-400 mt-2">Review submissions, approve content, and manage takedowns.</p>
                        </div>
                        <div className="pt-4 flex items-center text-sm text-blue-400 font-medium">
                            Manage Videos &rarr;
                        </div>
                    </div>
                </Link>

                <Link href="/admin/feedback" className="group">
                    <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/20 hover:bg-neutral-900/40 transition-colors space-y-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500/20 transition-colors">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">Feedback & Support</h3>
                            <p className="text-neutral-400 mt-2">Read suggestions, track issues, and respond to reports.</p>
                        </div>
                        <div className="pt-4 flex items-center text-sm text-purple-400 font-medium">
                            View Feedback &rarr;
                        </div>
                    </div>
                </Link>

                <Link href="/admin/collab" className="group">
                    <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/20 hover:bg-neutral-900/40 transition-colors space-y-4">
                        <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500/20 transition-colors">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">Collaboration</h3>
                            <p className="text-neutral-400 mt-2">Review partnership requests and collaboration proposals.</p>
                        </div>
                        <div className="pt-4 flex items-center text-sm text-green-400 font-medium">
                            View Requests &rarr;
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
