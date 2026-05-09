# Next.js SaaS Starter

Opinionated starter for AI SaaS products. Auth, real-time backend, file uploads, rate limiting, and a full component library — wired up and ready to build on.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Auth | [Clerk](https://clerk.com) |
| Backend / DB | [Convex](https://convex.dev) |
| Caching | [Upstash Redis](https://upstash.com) |
| Rate limiting | [Upstash Ratelimit](https://upstash.com/docs/ratelimit) |
| File uploads | [UploadThing](https://uploadthing.com) |
| UI | [shadcn/ui](https://ui.shadcn.com) + Tailwind CSS v4 |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| State | Zustand |
| Env validation | [@t3-oss/env-nextjs](https://env.t3.gg) |
| Testing | Vitest + Storybook + Playwright |

LLM provider keys for OpenAI and Anthropic are included in `.env.example` — add the AI SDK of your choice.

---

## Prerequisites

You need accounts on these services before running locally:

- **Convex** — [dashboard.convex.dev](https://dashboard.convex.dev) — create a project (or let the CLI do it)
- **Clerk** — [dashboard.clerk.com](https://dashboard.clerk.com) — create an application, grab API keys
- **Upstash** — [upstash.com](https://upstash.com) — create a Redis database, grab REST URL + token
- **UploadThing** — [uploadthing.com](https://uploadthing.com) — create an app, grab the token

---

## Setup

```bash
git clone <your-repo-url>
cd <project-folder>
pnpm install
```

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

Start Convex (keep this running alongside the dev server):

```bash
npx convex dev
```

Start the app:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

See `.env.example` for the full list. Required to boot:

```env
NEXT_PUBLIC_CONVEX_URL=        # auto-written by `npx convex dev`
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
UPLOADTHING_TOKEN=
```

---

## Storybook

```bash
pnpm storybook
```

Open [http://localhost:6006](http://localhost:6006).

---

## Deployment

Deploy to [Vercel](https://vercel.com). Add all env vars in the project settings. For Convex, run `npx convex deploy` once to create a production deployment — it will print the URL to add as `NEXT_PUBLIC_CONVEX_URL`.
