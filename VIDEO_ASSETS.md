# Video Assets for Product Page Hero

## Requirement
3 looping sci-fi videos with cyberpunk aesthetic:
- Particles forming robot faces
- Cyberpunk style
- Short loops (5-10 seconds recommended)

## Current Limitation
The AI assistant cannot generate video content, only static images.

## Recommended Solutions

### Option 1: Free Stock Video Sites (Quickest)
Download 3 cyberpunk/sci-fi videos from:
- **Pexels Videos**: https://www.pexels.com/search/videos/cyberpunk/
- **Pixabay**: https://pixabay.com/videos/search/sci-fi/
- **Coverr**: https://coverr.co/ (search "technology" or "abstract")

Search terms: "cyberpunk", "particles", "digital face", "AI", "hologram", "sci-fi"

### Option 2: AI Video Generation Tools
Use these tools to generate custom videos:
- **Runway Gen-2**: https://runwayml.com/ (best quality, paid)
- **Pika Labs**: https://pika.art/ (free tier available)
- **Kaiber**: https://kaiber.ai/ (AI video from text)

Prompt suggestion:
```
"Cyberpunk robot face forming from glowing particles, 
neon blue and purple, digital hologram, 
futuristic technology, seamless loop"
```

### Option 3: Placeholder Solution (Use Now)
I can generate 3 static cyberpunk images as placeholders while you source videos.

### Option 4: CSS Animation Fallback
Use animated gradients/particles with CSS instead of video (lighter, faster).

## File Locations
Videos should be placed in:
```
/Users/vlad/Desktop/HIFLIX/public/videos/
├── sci-fi-1.mp4
├── sci-fi-2.mp4
└── sci-fi-3.mp4
```

## Current Code
The product page is already configured to use these videos with:
- Auto-play, loop, muted
- 20% opacity overlay
- 3-column grid layout
- Gradient overlay for text legibility

## Next Steps
1. Choose one of the options above
2. Download/generate 3 videos
3. Place them in `/public/videos/`
4. Refresh the page - videos will auto-play

**Temporary workaround**: The page will still look good without videos (black background with gradient text).
