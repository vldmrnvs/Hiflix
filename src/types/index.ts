export type UserRole = 'admin' | 'guest';

export type VideoStatus =
    | 'draft'
    | 'pending_review'
    | 'approved'
    | 'rejected'
    | 'pending_removal'
    | 'removed'
    | 'archived';

export type ChannelType = 'global' | 'private';

export type FeedbackType = 'suggestion' | 'issue' | 'content_report';
export type FeedbackStatus = 'open' | 'reviewed' | 'closed';

export type Channel = {
    id: string;
    slug: string;
    name: string;
    description: string;
    cover_url?: string | null;
    preview_url?: string | null;
    order: number;
    is_featured: boolean;
    type: ChannelType;
    owner_id?: string | null;
    created_at: string;
};

export type Video = {
    id: string;
    channel_id: string;
    owner_id?: string; // Optional for now to support legacy mock data, but required in DB
    title: string;
    storage_path: string;
    poster_path: string | null;
    duration: number | null;
    status: VideoStatus;
    moderation_reason?: string | null;
    tags: string[] | null;
    created_at: string;
};

export type Feedback = {
    id: string;
    user_id?: string | null;
    user_email?: string | null; // Optional convenience field if joined
    type: FeedbackType;
    message: string;
    meta?: Record<string, any> | null; // Flexible JSON context
    status: FeedbackStatus;
    admin_note?: string | null;
    reviewed_at?: string | null;
    reviewed_by?: string | null;
    closed_at?: string | null;
    created_at: string;
};

export type CollaborationRequest = {
    id: string;
    user_id?: string | null;
    author_email?: string | null;
    name?: string | null;
    organization?: string | null;
    message: string;
    status: 'open' | 'reviewed' | 'closed';
    reviewed_at?: string | null;
    reviewed_by?: string | null;
    closed_at?: string | null;
    admin_note?: string | null;
    meta?: Record<string, any> | null;
    created_at: string;
};

export type ChannelWithVideos = Channel & {
    videos: Video[];
};
