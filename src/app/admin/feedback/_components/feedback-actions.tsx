"use client";

import { useState } from "react";
import { updateFeedbackStatus } from "@/app/actions/admin/feedback";
import { Button } from "@/components/ui/button";
import { Feedback } from "@/types";

export function FeedbackActions({ feedback }: { feedback: Feedback }) {
    const [loading, setLoading] = useState(false);

    const handleAction = async (status: 'reviewed' | 'closed') => {
        setLoading(true);
        const res = await updateFeedbackStatus(feedback.id, status);
        setLoading(false);

        if (!res.success) {
            alert("Error: " + res.error);
        }
    };

    return (
        <div className="flex justify-end gap-2">
            {feedback.status === 'open' && (
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction('reviewed')}
                    disabled={loading}
                >
                    Mark Reviewed
                </Button>
            )}

            {feedback.status !== 'closed' && (
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction('closed')}
                    disabled={loading}
                >
                    Close
                </Button>
            )}

            {feedback.status === 'closed' && (
                <span className="text-xs text-neutral-500 self-center">Closed</span>
            )}
        </div>
    );
}
