# Hacker House Goa — ID Generator

A single-page generator matching the uploaded screenshots: deep green field, neon yellow high-fashion serif, hot pink "गोवा" sticker, palm-tree backdrop, and a live preview that exports as PNG.

## Note on the stack
The project runs on TanStack Start (React 19 + Vite + Tailwind v4), not Next.js. Everything requested — App-Router-style routing, Tailwind, Framer Motion (`motion`), `html-to-image` export — works identically here; only the routing file lives at `src/routes/index.tsx`.

## Design system
- Colors as tokens: green `#0B6B3A` base with a darker card green, neon yellow `#FFD600`, hot pink `#FF2D7A`, white.
- Fonts loaded via `<link>` in the root route head: Playfair Display (display serif, condensed-tight tracking for the huge title), Space Grotesk / JetBrains Mono for the monospace UI labels seen in the screenshots, Noto Sans Devanagari for "गोवा".
- Background layers: solid green, low-opacity palm silhouettes (generated illustration, mirrored left/right), faint dot grid, grain overlay, slow parallax float.
- Glass panels: translucent green/white, backdrop blur, rounded-2xl, soft shadow, neon edge highlight.

## Screens
**Intro loader** (matching screenshot 4): centered ring with yellow + pink arc segments spinning, "Hacker House / गोवा" wordmark inside, 2:47 PM STUDIO lockup, thin progress bar, "WARMING UP THE BEACH…" tracked-out caption. Fades out into the app.

**Main page**
- Top bar: 2:47 PM STUDIO wordmark left, "GOA, INDIA · 28–31 OCT 2026" pill right.
- Hero: enormous `HACKER HOUSE` in Playfair with the pink-outlined yellow `गोवा` sticker overlapping the letterforms, plus subtitle "Create your Hacker House Goa ID & PFP Frame".
- Left column: `PFP FRAME` / `ID CARD` toggle, drag-and-drop upload box (JPG/PNG/HEIC, dashed rounded border), then form fields — Name, Stack / Role, X Handle, Title with a pink `ROLL 🎲` button that cycles random hacker titles (DeFi Ninja, Smart Contract Wizard, Protocol Pirate, Zero-Knowledge Monk, and more).
- Right column: sticky live preview card, updating on every keystroke.

**ID card preview**: dark green card, patterned pink/yellow ticket edging, studio mark + date line at top, `HACKER HOUSE` serif title, photo square, big yellow name, pink title badge, small white stack/role, `#FramedInGoa` bottom-left, `hhgoa · 2026` bottom-right, palm/sunset illustration in the corner.

**PFP frame preview**: circular avatar with a thick yellow→pink gradient ring on dark green, small wordmark below.

## Export & share
- `html-to-image` renders the preview node to a 2x PNG; Download saves it.
- Share opens the X composer pre-filled with "Just got my Hacker House Goa ID 🔥 #FramedInGoa", plus a "Share image…" button using the Web Share API where available.

## Motion
Framer Motion: staggered fade-slide entrance for hero and panels, layout-animated toggle pill, neon glow on button hover, gentle parallax drift on the palm layers, crossfade when switching card modes.

## Responsive
Mobile-first single column (hero → toggle → upload → form → preview), promoting to the two-column split at `lg`. Title scales with `clamp()` so it stays oversized on phones.

## Technical notes
- All work in `src/routes/index.tsx` plus components under `src/components/hh/` (Hero, UploadDrop, BuilderForm, IdCard, PfpFrame, Backdrop, IntroLoader) and `src/lib/titles.ts`.
- Tokens added to `src/styles.css` under `@theme inline`; no hardcoded color utilities in components.
- Packages to add: `motion`, `html-to-image`.
- Palm-tree background and card sunset generated as assets.
- Route `head()` gets a unique title/description/OG for the event.
- Everything is client-side; no backend or accounts needed.
