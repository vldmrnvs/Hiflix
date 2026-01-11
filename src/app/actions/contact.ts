"use server";

import { Resend } from 'resend';
import { getAdminSupabase } from "@/lib/admin-auth";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function submitCollaborationRequest(formData: FormData) {
    try {
        // Anti-spam: honeypot check
        const honeypot = formData.get('website');
        if (honeypot) {
            console.warn('Honeypot triggered');
            return { success: false, error: 'Invalid submission' };
        }

        // Anti-spam: timestamp check (min 800ms)
        const submittedAt = formData.get('submitted_at');
        if (submittedAt) {
            const elapsed = Date.now() - parseInt(submittedAt as string);
            if (elapsed < 800) {
                console.warn('Submission too fast');
                return { success: false, error: 'Please slow down' };
            }
        }

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const organization = formData.get('organization') as string;
        const message = formData.get('message') as string;

        if (!email || !message) {
            return { success: false, error: 'Email and message are required' };
        }

        // Persist to database
        const supabase = getAdminSupabase();
        const { data, error } = await supabase
            .from('collaboration_requests')
            .insert({
                author_email: email,
                name: name || null,
                organization: organization || null,
                message,
                status: 'open',
                meta: {
                    user_agent: formData.get('user_agent') || null,
                    referrer: formData.get('referrer') || null,
                }
            })
            .select()
            .single();

        if (error) {
            console.error('Error saving collaboration request:', error);
            return { success: false, error: 'Failed to save request' };
        }

        // Send email if Resend is configured
        if (resend) {
            try {
                await resend.emails.send({
                    from: 'HIFLIX <noreply@hiflix.tv>',
                    to: 'vldmrnvs@gmail.com',
                    subject: 'Inscription HIFLIX',
                    html: `
                        <h2>New Collaboration Request</h2>
                        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Organization:</strong> ${organization || 'Not provided'}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message}</p>
                        <hr>
                        <p><small>Request ID: ${data.id}</small></p>
                    `
                });
                console.log('✅ Email sent via Resend');
            } catch (emailError) {
                console.error('Email send failed (non-blocking):', emailError);
            }
        } else {
            console.log('📧 Resend not configured, request saved to DB only');
        }

        return { success: true };
    } catch (error: any) {
        console.error('Collaboration request failed:', error);
        return { success: false, error: error.message || 'Submission failed' };
    }
}
