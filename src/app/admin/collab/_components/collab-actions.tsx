"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CollaborationRequest } from "@/types";

export function CollabActions({ request }: { request: CollaborationRequest }) {
    const [loading, setLoading] = useState(false);

    const handleAction = async (status: 'reviewed' | 'closed') => {
        setLoading(true);
        // TODO: Create updateCollabStatus action
        // const res = await updateCollabStatus(request.id, status);
        setLoading(false);
        alert(`Status updated to: ${status}`);
    };

    return (
        <div className="flex justify-end gap-2">
            {request.status === 'open' && (
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction('reviewed')}
                    disabled={loading}
                >
                    Mark Reviewed
                </Button>
            )}

            {request.status !== 'closed' && (
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction('closed')}
                    disabled={loading}
                >
                    Close
                </Button>
            )}

            {request.status === 'closed' && (
                <span className="text-xs text-neutral-500 self-center">Closed</span>
            )}
        </div>
    );
}
