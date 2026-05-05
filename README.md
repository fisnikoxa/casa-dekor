# CASA DECOR · marketing site

Next.js (**App Router**) front end for CASA DECOR — PVC wall panels and marble-effect décor aimed at homeowners and trade in **North Macedonia**. Authoritative scope and acceptance criteria live in [WEBSITE_SPEC.md](./WEBSITE_SPEC.md); phased implementation notes are in [WEBSITE_EXECUTION_STEPS.md](./WEBSITE_EXECUTION_STEPS.md).

## Prerequisites

Node.js **18.18** or newer (Next.js 16).

## Scripts

Install dependencies once:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Lint and production bundle:

```bash
npm run lint
npm run build
npm run start
```

## Deploy on Vercel

1. Push this repo to GitHub/GitLab/Bitbucket and import the project in [Vercel](https://vercel.com).
2. Framework preset **Next.js**; build command **`npm run build`**; install **`npm install`**.
3. Add the environment variables below in **Project → Settings → Environment Variables** (Production and Preview as needed).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_FACEBOOK_URL` | Recommended before launch | Absolute profile URL used for header, footer, and Contact page icons. Leave empty locally if not ready. |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Recommended before launch | Same as Facebook. |
| `NEXT_PUBLIC_HERO_VIDEO_URL` | Optional | Muted looping **MP4** for the home hero (`autoPlay`, no audio). Omit to use still imagery only; disabled automatically when users prefer reduced motion. |

Copy [`.env.example`](./.env.example) into `.env.local` for development.

Brand assets live under **`public/`** (notably **`public/logo.jpg`** → served as **`/logo.jpg`**).
