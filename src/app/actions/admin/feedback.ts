"use server";

import { revalidatePath } from "next/cache";
import { assertAdmin, getAdminSupabase } from "@/lib/admin-auth";

export async function updateFeedbackStatus(
    feedbackId: string,
    newStatus: 'reviewed' | 'closed',
    adminNote?: string
) {
    try {
        // Verify admin access
        const adminUserId = await assertAdmin();

        const supabase = getAdminSupabase();
        const updateData: Record<string, any> = { status: newStatus };

        if (newStatus === 'reviewed') {
            updateData.reviewed_at = new Date().toISOString();
            updateData.reviewed_by = adminUserId;
        } else if (newStatus === 'closed') {
            updateData.closed_at = new Date().toISOString();
        }

        if (adminNote) {
            updateData.admin_note = adminNote;
        }

        const { error } = await supabase
            .from('feedback')
            .update(updateData)
            .eq('id', feedbackId);

        if (error) {
            console.error('Error updating feedback status:', error);
            return { success: false, error: error.message };
        }

        revalidatePath('/admin/feedback');
        return { success: true };
    } catch (error: any) {
        console.error('Admin action failed:', error);
        return { success: false, error: error.message || 'Unauthorized' };
    }
}
