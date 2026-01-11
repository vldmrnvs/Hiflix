"use server";

import { revalidatePath } from "next/cache";
import { assertAdmin, getAdminSupabase } from "@/lib/admin-auth";

export async function updateVideoStatus(
    videoId: string,
    status: string,
    reason?: string
) {
    try {
        // Verify admin access
        await assertAdmin();

        const supabase = getAdminSupabase();
        const updateData: Record<string, any> = { status };

        if (reason) {
            updateData.moderation_reason = reason;
        }

        const { error } = await supabase
            .from('videos')
            .update(updateData)
            .eq('id', videoId);

        if (error) {
            console.error('Error updating video status:', error);
            return { success: false, error: error.message };
        }

        revalidatePath('/admin/videos');
        return { success: true };
    } catch (error: any) {
        console.error('Admin action failed:', error);
        return { success: false, error: error.message || 'Unauthorized' };
    }
}
