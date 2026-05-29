# LUMIÈRE Photography Portfolio

> Premium photography portfolio — Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Sanity · Cloudinary · Vercel

---

## Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Framework   | Next.js 14 (App Router)       |
| Language    | TypeScript                    |
| Styling     | Tailwind CSS                  |
| Animations  | Framer Motion                 |
| CMS         | Sanity (headless)             |
| Images/CDN  | Cloudinary                    |
| Deployment  | Vercel                        |

---

## Quick Start

### 1. Clone & install

```bash
git clone https://github.com/your-user/lumiere-portfolio.git
cd lumiere-portfolio
npm install
```

### 2. Environment variables

```bash
cp .env.local.example .env.local
# Fill in your Sanity, Cloudinary, and site values
```

### 3. Run dev server

```bash
npm run dev
# → http://localhost:3000
```

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout (fonts, metadata, providers)
│   └── page.tsx          # Home page
├── components/
│   ├── layout/           # DockNav, Footer, Providers
│   ├── sections/         # Hero, FeaturedWork, About, Stats, CTA ...
│   ├── ui/               # CustomCursor, LangToggle, RevealBlock ...
│   └── shared/           # SectionHeader, etc.
├── hooks/                # useLang, useReveal, useCursor
├── lib/                  # sanity.ts, cloudinary.ts, utils.ts
├── styles/               # globals.css (Tailwind + design tokens)
└── types/                # index.ts (all TypeScript types)
```

---

## Environment Variables

| Variable                          | Description                   |
|-----------------------------------|-------------------------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID`   | Sanity project ID             |
| `NEXT_PUBLIC_SANITY_DATASET`      | `production`                  |
| `NEXT_PUBLIC_SANITY_API_VERSION`  | e.g. `2024-01-01`             |
| `SANITY_API_READ_TOKEN`           | Sanity read token             |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name       |
| `CLOUDINARY_API_KEY`              | Cloudinary API key            |
| `CLOUDINARY_API_SECRET`           | Cloudinary API secret         |
| `NEXT_PUBLIC_SITE_URL`            | Production URL                |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`     | WhatsApp contact number       |
| `NEXT_PUBLIC_INSTAGRAM_HANDLE`    | Instagram username            |
| `NEXT_PUBLIC_EMAIL`               | Contact email                 |

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Add all `.env.local` values in **Vercel → Project → Settings → Environment Variables**.

---

## Development Roadmap

- [x] Base structure (Next.js 14 + Tailwind + TS)
- [x] Design system (tokens, fonts, globals.css)
- [x] Layout (DockNav, Footer, Providers)
- [x] Custom cursor
- [x] Language toggle (ES/EN)
- [x] Hooks (useLang, useReveal, useCursor)
- [ ] Hero section
- [ ] Featured Work (masonry)
- [ ] About section
- [ ] Stats section
- [ ] Testimonials
- [ ] CTA section
- [ ] Portfolio page
- [ ] Project detail page
- [ ] Services page
- [ ] Blog
- [ ] Contact page
- [ ] Sanity schemas
- [ ] Cloudinary integration
