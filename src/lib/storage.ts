export const getStorageUrl = (path: string) => {
    if (path.startsWith('http')) return path;
    // Assuming 'videos' bucket
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/videos/${path}`;
}
