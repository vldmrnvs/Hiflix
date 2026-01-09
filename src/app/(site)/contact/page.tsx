"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const subject = `HIFLIX Contact: ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;

        // Use mailto for client-side redirection as requested
        window.location.href = `mailto:vldmrnvs@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="min-h-screen bg-black text-white pt-32 px-6">
            <div className="max-w-lg mx-auto space-y-8">
                <div className="space-y-2 text-center md:text-left">
                    <h1 className="text-4xl font-bold tracking-tighter">Contact Us</h1>
                    <p className="text-neutral-400">
                        Interested in featuring your art or using HIFLIX in your venue?
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Name</label>
                        <Input
                            required
                            placeholder="Your name"
                            className="bg-neutral-900/50 border-white/10 text-white focus:border-white/30"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Email</label>
                        <Input
                            required
                            type="email"
                            placeholder="your@email.com"
                            className="bg-neutral-900/50 border-white/10 text-white focus:border-white/30"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Message</label>
                        <Textarea
                            required
                            placeholder="How can we help?"
                            className="min-h-[150px] bg-neutral-900/50 border-white/10 text-white focus:border-white/30"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-white text-black hover:bg-neutral-200 font-bold"
                    >
                        Send Message
                    </Button>
                </form>
            </div>
        </div>
    );
}
