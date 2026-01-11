"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming this component exists or using standard textarea
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function FeedbackPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [type, setType] = useState("suggestion");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const { data: { user } } = await supabase.auth.getUser();

        const { error } = await supabase
            .from('feedback')
            .insert({
                user_id: user?.id,
                type,
                message,
                status: 'open'
            });

        if (error) {
            alert("Error sending feedback: " + error.message);
        } else {
            alert("Feedback sent! Thank you.");
            setMessage("");
        }
        setSubmitting(false);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white">Feedback</h2>
                <p className="text-neutral-400">Report issues, suggest features, or report content.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/5">

                <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={type} onValueChange={setType}>
                        <SelectTrigger className="bg-black/50 border-white/10">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="suggestion">Suggestion</SelectItem>
                            <SelectItem value="issue">Technical Issue</SelectItem>
                            <SelectItem value="content_report">Content Report</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                        id="message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Tell us what you think..."
                        required
                        className="bg-black/50 border-white/10 min-h-[150px]"
                    />
                </div>

                <div className="pt-4">
                    <Button type="submit" disabled={submitting} className="w-full bg-white text-black hover:bg-neutral-200">
                        {submitting ? "Sending..." : "Send Feedback"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
