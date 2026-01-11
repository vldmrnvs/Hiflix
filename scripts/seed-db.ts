/**
 * HIFLIX Database Seeder
 * Populates channels and videos tables from mock data
 * Run with: npx tsx scripts/seed-db.ts
 */

import { createClient } from '@supabase/supabase-js';
import { MOCK_CHANNELS, MOCK_VIDEOS } from '../src/lib/mockData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing environment variables');
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedChannels() {
    console.log('📺 Seeding channels...');

    const { data, error } = await supabase
        .from('channels')
        .upsert(MOCK_CHANNELS, { onConflict: 'id' });

    if (error) {
        console.error('❌ Error seeding channels:', error);
        throw error;
    }

    console.log(`✅ Seeded ${MOCK_CHANNELS.length} channels`);
}

async function seedVideos() {
    console.log('🎬 Seeding videos...');

    const { data, error } = await supabase
        .from('videos')
        .upsert(MOCK_VIDEOS, { onConflict: 'id' });

    if (error) {
        console.error('❌ Error seeding videos:', error);
        throw error;
    }

    console.log(`✅ Seeded ${MOCK_VIDEOS.length} videos`);
}

async function main() {
    console.log('🚀 Starting database seed...\n');

    try {
        await seedChannels();
        await seedVideos();
        console.log('\n✨ Database seeded successfully!');
    } catch (error) {
        console.error('\n💥 Seed failed:', error);
        process.exit(1);
    }
}

main();
