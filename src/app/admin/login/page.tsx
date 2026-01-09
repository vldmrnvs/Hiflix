"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/admin');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md p-8 space-y-6 border border-neutral-800 rounded-xl bg-neutral-900/50">
                <div className="flex justify-center mb-4">
                    <div className="relative w-40 h-12">
                        <Image src="/logos/Hiflix-logo.svg" alt="HIFLIX" fill className="object-contain" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-white text-center">Admin Access</h1>
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="bg-neutral-800 border-neutral-700 text-white"
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="bg-neutral-800 border-neutral-700 text-white"
                    />
                    <Button type="submit" className="w-full">Sign In</Button>
                </form>
            </div>
        </div>
    );
}
