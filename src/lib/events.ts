import { supabase } from "./supabase";

export const logEvent = async (
    eventType: string,
    videoId: string,
    channelId: string,
    meta: any = {}
) => {
    // Generate simple session ID if not exists
    let sessionId = '';
    if (typeof window !== 'undefined') {
        sessionId = sessionStorage.getItem('hiflix_sid') || '';
        if (!sessionId) {
            sessionId = Math.random().toString(36).substring(7);
            sessionStorage.setItem('hiflix_sid', sessionId);
        }
    }

    try {
        await supabase.from('events').insert({
            event_type: eventType,
            video_id: videoId,
            channel_id: channelId,
            session_id: sessionId,
            meta
        });
    } catch (err) {
        console.error("Failed to log event", err);
    }
};
