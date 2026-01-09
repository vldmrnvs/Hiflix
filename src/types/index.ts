export type Channel = {
    id: string;
    slug: string;
    name: string;
    description: string;
    cover_url?: string | null;
    preview_url?: string | null;
    order: number;
    is_featured: boolean;
    created_at: string;
};

export type Video = {
    id: string;
    channel_id: string;
    title: string;
    storage_path: string;
    poster_path: string | null;
    duration: number | null;
    status: 'draft' | 'approved' | 'rejected';
    tags: string[] | null;
    created_at: string;
};

export type ChannelWithVideos = Channel & {
    videos: Video[];
};
