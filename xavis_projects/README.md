This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Course AI Project Framework routes

Pages and endpoints for the course-project framework examples (`/projects/courseAiFramework`).

| Route | What |
|---|---|
| `/projects/courseAiFramework` | Overview and links to the four published resources |
| `/projects/courseAiFramework/ledger` | Text box + submit button form that signs the ledger |
| `GET /api/courseResource/<example>[?v=<variant>]` | Serves a published resource as `text/plain` with `{{NONCE}}`, `{{VARIANT}}`, `{{BASE_URL}}` substituted. Examples: `01-morris`, `02-astar`, `03-bencode`, `03-snapshot-bep_0003`, `04-scheduling` |
| `POST /api/courseLedger` | Appends a signed ledger entry (form-encoded or JSON: `student_id`, `nonce`, `run_tag`, `variant`). Write-only; `GET` returns 405 |

Environment variables:

- `COURSE_LEDGER_NONCE` — the nonce printed on every resource page; a POST must carry it exactly. Unset means every signature is rejected.
- `COURSE_LEDGER_PATH` — path of the tab-separated ledger file (default `./course-ledger.tsv`, relative to the process working directory). It contains student IDs: keep it **outside `public/`** and outside the repo, and never serve it.

These two API routes are excluded from the Supabase session proxy matcher so unauthenticated harnesses can reach them.

### Deploying the course framework routes

The course page (`/projects/courseAiFramework`), the resource routes (`/api/courseResource/<example>`) and the ledger form are public; the auth proxy excludes them. The ledger endpoint appends to a file, so production needs:

1. A nonce secret: `kubectl create secret generic course-ledger --from-literal=nonce=<NONCE>`.
2. A persistent volume for `/ledger` (the deployment yaml declares a ReadWriteOnce claim and sets `replicas: 1`). Two replicas need a ReadWriteMany volume, or the entries split between pods.
3. Build and push the image as before, then `kubectl apply -f xavis-projects-deployment.yaml`.

Read the ledger with `kubectl exec deploy/xavis-projects-deployment -- cat /ledger/course-ledger.tsv`. Never mount it under `public/`.

### Running locally

```
npm install
COURSE_LEDGER_NONCE=<nonce> COURSE_LEDGER_PATH=/tmp/course-ledger.tsv \
  NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=... \
  ./node_modules/.bin/next dev --turbopack -p 3005
```

Use the local `next` binary, not `npx next`: a lockfile outside this repo makes `npx` resolve a different Next.js version.
