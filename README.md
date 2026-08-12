# Bradley & MaKinna Wedding — RSVP Admin (Archive)

Admin dashboard that tracked wedding RSVP status by guest list (attending, pending, dietary restrictions).

**Status:** Historical archive / portfolio demo of the RSVP admin used for Bradley & MaKinna Hanson’s wedding (married **July 11, 2026**).

**All guest and RSVP data is fictional** (`src/data/demo-*.ts`). There is **no database**, no Azure Cosmos, and no password gate — pure static demo.

Companion public site: [bradleyandmakinna.com](https://www.bradleyandmakinna.com) (`brad-makinna-wedding`).

## Features (demo)

- 📋 Guest parties organized by list (A / B / Family sample lists)
- ✅ RSVP’d vs pending parties
- 🥗 Dietary restrictions summary tab
- 📝 Full RSVP submission detail (attending guests, notes, songs)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm (preferred) or npm

### Installation

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — you land on `/rsvps` with demo data. No env vars required.

## Stack

- Next.js (App Router)
- React 19
- Tailwind CSS v4
