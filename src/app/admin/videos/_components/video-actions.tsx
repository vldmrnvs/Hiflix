"use client";

import { useState } from "react";
import { updateVideoStatus } from "@/app/actions/admin/videos";
import { Button } from "@/components/ui/button";
import { Video } from "@/types";

export function VideoActions({ video }: { video: Video }) {
    const [loading, setLoading] = useState(false);

    const handleAction = async (status: string, reason?: string) => {
        if (!confirm(`Are you sure you want to mark this as ${status}?`)) return;

        setLoading(true);
        const res = await updateVideoStatus(video.id, status, reason);
        setLoading(false);

        if (!res.success) {
            alert("Error: " + res.error);
        }
    };

    return (
        <div className="flex justify-end gap-2">
            {video.status === 'pending_review' && (
                <>
                    <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-500 text-white border-0"
                        onClick={() => handleAction('approved')}
                        disabled={loading}
                    >
                        Approve
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleAction('rejected', 'Does not meet visual standards')}
                        disabled={loading}
                    >
                        Reject
                    </Button>
                </>
            )}

            {video.status === 'pending_removal' && (
                <>
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleAction('removed')}
                        disabled={loading}
                    >
                        Confirm Remove
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction('approved')}
                        disabled={loading}
                    >
                        Deny (Keep)
                    </Button>
                </>
            )}

            {video.status === 'approved' && (
                <Button
                    size="sm"
                    variant="outline"
                    className="text-red-400 hover:text-red-300 border-red-900/50"
                    onClick={() => handleAction('removed')}
                    disabled={loading}
                >
                    Force Remove
                </Button>
            )}

            {(video.status === 'rejected' || video.status === 'removed') && (
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAction('archived')}
                    disabled={loading}
                >
                    Archive
                </Button>
            )}
        </div>
    );
}
