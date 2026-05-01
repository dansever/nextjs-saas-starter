# Next.js SaaS Starter

A generic Next.js template with authentication, a real-time backend, and a component library pre-configured and ready to go.

## Stack

- **[Next.js](https://nextjs.org)** — React framework
- **[Convex](https://convex.dev)** — real-time backend and database
- **[Clerk](https://clerk.com)** — authentication and user management
- **[shadcn/ui](https://ui.shadcn.com)** — component library built on Radix UI and Tailwind CSS
- **[Upstash Redis](https://upstash.com)** — serverless Redis for rate limiting and caching
- **[Zod](https://zod.dev)** — schema validation for forms, API payloads, and environment variables
- **[Storybook](https://storybook.js.org)** — isolated component development and documentation

---

## Prerequisites

Before running locally, you need accounts and applications set up on these services:

1. **Convex** — create a free account at [convex.dev](https://dashboard.convex.dev) and have a project ready (or let the CLI create one for you).
2. **Clerk** — create a free account at [clerk.com](https://dashboard.clerk.com), create a new application, and choose your sign-in methods.
3. **Upstash** — create a free account at [upstash.com](https://upstash.com), create a Redis database, and copy the REST URL and token.

---

## Setup

### 1. Clone and install

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

### 2. Set up Convex

Run the Convex dev CLI. It will prompt you to log in and link (or create) a deployment:

```bash
npx convex dev
```

Once connected, it writes a `NEXT_PUBLIC_CONVEX_URL` to your `.env.local` automatically and starts watching your `convex/` folder for schema and function changes. Keep this terminal running alongside your Next.js dev server.

### 3. Set up Clerk

In your [Clerk dashboard](https://dashboard.clerk.com), open your application and go to **API Keys**. Copy the two keys and add them to `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Optionally configure redirect URLs to match your routes:

```env
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 4. Run the dev server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

> Make sure `npx convex dev` is also running in a separate terminal so your backend functions and schema stay in sync.

---

## Environment variables

Your `.env.local` should look like this when fully configured:

```env
# Convex (auto-populated by `npx convex dev`)
NEXT_PUBLIC_CONVEX_URL=https://<your-deployment>.convex.cloud

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://<your-db>.upstash.io
UPSTASH_REDIS_REST_TOKEN=...
```

---

## Storybook

Run Storybook to develop and preview components in isolation:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006).

---

## Adding shadcn components

```bash
npx shadcn@latest add button
npx shadcn@latest add input
# etc.
```

---

## Deployment

Deploy to [Vercel](https://vercel.com) and add the same environment variables in the project settings. For Convex, run `npx convex deploy` once to create a production deployment and copy its URL into Vercel's `NEXT_PUBLIC_CONVEX_URL`.
