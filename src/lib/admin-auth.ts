import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const getAdminSupabase = () => {
    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
};

export async function assertAdmin() {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const authCookie = allCookies.find(c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'));

    if (!authCookie) {
        throw new Error("Unauthorized: No session found");
    }

    let token;
    try {
        const parsed = JSON.parse(authCookie.value);
        token = parsed.access_token;
    } catch (e) {
        token = authCookie.value;
    }

    if (!token) throw new Error("Unauthorized");

    const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) throw new Error("Unauthorized");

    const adminClient = getAdminSupabase();
    const { data: profile } = await adminClient.from('profiles').select('role').eq('id', user.id).single();

    if (profile?.role !== 'admin') {
        throw new Error("Forbidden: Admin access only");
    }

    return user.id;
}
