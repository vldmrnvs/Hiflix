import { Channel, Video } from "@/types";

export const MOCK_CHANNELS: Channel[] = [
    {
        id: 'c-1',
        slug: 'psychedelic-loops',
        name: 'Psychedelic Loops',
        description: 'Mesmerizing patterns and fractals.',
        cover_url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
        preview_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        order: 1,
        is_featured: true,
        type: 'global',
        created_at: new Date().toISOString()
    },
    {
        id: 'c-2',
        slug: 'neon-drift',
        name: 'Neon Drift',
        description: 'High speed lights and city nights.',
        cover_url: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2070&auto=format&fit=crop', // Tokyo Night (Reliable)
        preview_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        order: 2,
        is_featured: false,
        type: 'global',
        created_at: new Date().toISOString()
    },
    {
        id: 'c-3',
        slug: 'liquid-smoke',
        name: 'Liquid & Smoke',
        description: 'Fluid dynamics in slow motion.',
        cover_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop',
        preview_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        order: 3,
        is_featured: false,
        type: 'global',
        created_at: new Date().toISOString()
    },
    {
        id: 'c-4',
        slug: 'sacred-geometry',
        name: 'Sacred Geometry',
        description: 'Mathematical beauty and symmetry.',
        cover_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop',
        preview_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        order: 4,
        is_featured: false,
        type: 'global',
        created_at: new Date().toISOString()
    },
    {
        id: 'c-5',
        slug: 'space-drift',
        name: 'Space Drift',
        description: 'Deep space nebulae and star fields.',
        cover_url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2111&auto=format&fit=crop',
        preview_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        order: 5,
        is_featured: false,
        type: 'global',
        created_at: new Date().toISOString()
    },
    {
        id: 'c-6',
        slug: 'meditation-motion',
        name: 'Meditation Motion',
        description: 'Calm flows for mindfulness.',
        cover_url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=2525&auto=format&fit=crop',
        preview_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        order: 6,
        is_featured: false,
        type: 'global',
        created_at: new Date().toISOString()
    },
    {
        id: 'c-7',
        slug: 'rave-lights-soft',
        name: 'Rave Lights (Soft)',
        description: 'Gentle pulses and light beams.',
        cover_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
        order: 7,
        is_featured: false,
        type: 'global',
        created_at: new Date().toISOString()
    },
    {
        id: 'c-8',
        slug: 'cyber-noir',
        name: 'Cyber Noir',
        description: 'Dark, rain-slicked future streets.',
        cover_url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop', // Reusing retro feel
        order: 8,
        is_featured: false,
        type: 'global',
        created_at: new Date().toISOString()
    },
    {
        id: 'c-9',
        slug: 'retro-vhs',
        name: 'Retro VHS',
        description: 'Analog warmth and static.',
        cover_url: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop',
        order: 9,
        is_featured: false,
        type: 'global',
        created_at: new Date().toISOString()
    },
    {
        id: 'c-10',
        slug: 'nature-macro',
        name: 'Nature Macro',
        description: 'Up close with the natural world.',
        cover_url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop',
        order: 10,
        is_featured: false,
        type: 'global',
        created_at: new Date().toISOString()
    },
    {
        id: 'c-11',
        slug: 'surreal-creatures',
        name: 'Surreal Creatures',
        description: 'Imaginary beings and forms.',
        cover_url: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2070&auto=format&fit=crop', // Replaced
        order: 11,
        is_featured: false,
        type: 'global',
        created_at: new Date().toISOString()
    },
    {
        id: 'c-12',
        slug: 'ai-dreamscapes',
        name: 'AI Dreamscapes',
        description: 'Machine hallucinations.',
        cover_url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop',
        order: 12,
        is_featured: false,
        type: 'global',
        created_at: new Date().toISOString()
    }
];

export const MOCK_VIDEOS: Video[] = [
    {
        id: 'v1',
        channel_id: 'c-2',
        title: 'Tokyo Night Walk',
        storage_path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        poster_path: null,
        duration: 120,
        status: 'approved',
        tags: [],
        created_at: new Date().toISOString()
    },
    {
        id: 'v2',
        channel_id: 'c-1',
        title: 'Fractal Dive',
        storage_path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        poster_path: null,
        duration: 180,
        status: 'approved',
        tags: [],
        created_at: new Date().toISOString()
    },
    {
        id: 'v3',
        channel_id: 'c-9',
        title: 'Analog Signal',
        storage_path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        poster_path: null,
        duration: 45,
        status: 'approved',
        tags: [],
        created_at: new Date().toISOString()
    },
    {
        id: 'v4',
        channel_id: 'c-10',
        title: 'Mountain Peaks',
        storage_path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        poster_path: null,
        duration: 300,
        status: 'approved',
        tags: [],
        created_at: new Date().toISOString()
    },
    {
        id: 'v5',
        channel_id: 'c-3',
        title: 'Ink Flow',
        storage_path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        poster_path: null,
        duration: 200, status: 'approved', tags: [], created_at: new Date().toISOString()
    },
    {
        id: 'v6',
        channel_id: 'c-4',
        title: 'Golden Ratio',
        storage_path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        poster_path: null,
        duration: 200, status: 'approved', tags: [], created_at: new Date().toISOString()
    },
    {
        id: 'v7',
        channel_id: 'c-5',
        title: 'Nebula',
        storage_path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        poster_path: null,
        duration: 200, status: 'approved', tags: [], created_at: new Date().toISOString()
    },
    {
        id: 'v8',
        channel_id: 'c-6',
        title: 'Calm River',
        storage_path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        poster_path: null,
        duration: 200, status: 'approved', tags: [], created_at: new Date().toISOString()
    },
    {
        id: 'v9',
        channel_id: 'c-7',
        title: 'Laser Show',
        storage_path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        poster_path: null,
        duration: 200, status: 'approved', tags: [], created_at: new Date().toISOString()
    },
    {
        id: 'v10',
        channel_id: 'c-8',
        title: 'Rainy Street',
        storage_path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        poster_path: null,
        duration: 200, status: 'approved', tags: [], created_at: new Date().toISOString()
    },
    {
        id: 'v11',
        channel_id: 'c-11',
        title: 'Dream Walker',
        storage_path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        poster_path: null,
        duration: 200, status: 'approved', tags: [], created_at: new Date().toISOString()
    },
    {
        id: 'v12',
        channel_id: 'c-12',
        title: 'Deep Mind',
        storage_path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        poster_path: null,
        duration: 200, status: 'approved', tags: [], created_at: new Date().toISOString()
    }
];

export const getMockVideosByChannel = (channelId: string) => MOCK_VIDEOS.filter(v => v.channel_id === channelId);
export const getMockChannelBySlug = (slug: string) => MOCK_CHANNELS.find(c => c.slug === slug);
