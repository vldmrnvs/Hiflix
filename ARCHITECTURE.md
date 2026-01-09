# Architecture Documentation

## 1. Routing Strategy (Route Groups)
The application uses Next.js Route Groups to strictly separate the marketing/browsing experience from the immersive TV player.

-   `app/(site)`: Contains standard pages (`/`, `/about`, `/contact`).
    -   **Layout**: Includes global `Header` and `Footer`.
-   `app/(tv)`: Contains the TV player (`/tv/[slug]`).
    -   **Layout**: Full-screen, `overflow-hidden`, `touch-action: none`. No global navigation elements.

This structure prevents hydration errors and layout shifts that occur when conditionally rendering headers based on `usePathname`.

## 2. TV Player Logic (`TVManager`)
The TV Player is designed to mimic a "TikTok-style" vertical feed or a traditional TV zapping experience.

### Infinite Scroll / Circular Index
-   **Logic**: `nextIndex = (current + 1) % distinctVideos.length`.
-   **Virtual Playlist**: If a channel has fewer than 5 videos, they are duplicated in the playlist state to at least 10 items. This ensures that users don't feel "stuck" in a short loop and animations always flow correctly.

### Gestures & Navigation
We use `framer-motion` for gesture handling.
-   **Drag Down (Swipe Down)**: Trigger `Next Video`.
    -   * rationale*: Matches the user's mental model of "pulling down" to see what's next (or inverted scroll).
-   **Drag Up (Swipe Up)**: Trigger `Previous Video`.
-   **Keyboard**:
    -   `ArrowRight / ArrowDown`: Next Video.
    -   `ArrowLeft / ArrowUp`: Previous Video.
    -   `Space`: Toggle Play/Pause.

## 3. Stability
-   **Hydration**: `suppressHydrationWarning` is enabled on `<html>` to mitigate attribute mismatches from browser extensions.
-   **Links**: All internal navigation uses Next.js `Link` components to ensure Single Page Application (SPA) transitions without full reloads.
