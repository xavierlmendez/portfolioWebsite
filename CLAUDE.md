<!-- from engineering-standards @ 1b9616e (CLAUDE.template.md) -->
# portfolioWebsite — Agent Guide

Personal projects site. The app lives in `xavis_projects/`: Next.js 15 App Router, React 19,
Tailwind, Supabase auth, deployed on Vercel. The `Dockerfile` and Kubernetes manifest are from an
earlier deployment that is no longer running. The repo is public on GitHub: nothing secret or personal
goes into any file.

## Read before working (in order, only what the task needs)

1. `docs/DECISIONS.md` — settled decisions; don't re-litigate, append new ones
2. `docs/BACKLOG.md` — every `TODO(BL-nn)` in code resolves here
3. `CONTRIBUTING.md` — slices, branches, definition of done, commit format
4. `README.md` — server set-up script

## Hard rules

- Public repo: no secrets, keys, or personal data (address, phone, employer details) in any file.
  Secrets only in `xavis_projects/.env.local` (gitignored). Never print or commit key values.
- `main` is always green. All changes arrive by PR from a short-lived branch (`CONTRIBUTING.md`).
- Never commit or push on the owner's behalf; leave changes in the working tree.
- No unstarted code on `main`: intent goes to `docs/BACKLOG.md`, not empty modules.
- Every feature or fix ships with a deterministic test (`.claude/agents/testing-agent.md`).
- Do not modify the course-framework code unless asked: `app/projects/courseAiFramework/**`,
  `app/api/courseLedger/**`, `app/api/courseResource/**`, `app/lib/projectUtils/courseAiFramework/**`.

## Commands (run in `xavis_projects/`)

- Install: `npm ci`
- Dev server: `npm run dev`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Test: `npm run test` (vitest, node environment, `app/**/*.test.ts`)
- Build: `npm run build`
- Running the app (`npm run dev` / `npm run start`) needs `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `xavis_projects/.env.local`; without them every page
  returns 500. The build does not need them.
- The agent files below say `uv run pytest` / `ruff`; in this repo read those as `npm run test` and
  `npm run lint` + `npm run typecheck`. No formatter is configured yet.

## Conventions

- Indent: 2-space for new files; existing files are mixed, so match the file you are editing
  (normalising is BL-09). `camelCase` functions and variables, `PascalCase` components.
- Tests: vitest `describe`/`it`, each `it` named after the behaviour, not the function.
- TODO form: `// TODO(BL-nn): …` or `{/* TODO(BL-nn): … */}` in JSX; CI fails on any other TODO/FIXME.
- Commits: `<type>(<scope>): <imperative summary>` per Conventional Commits. Branches `<type>/<slug>`.
- Dates ISO 8601.
- After any decision with lasting consequences, append to `docs/DECISIONS.md` in the same PR.

## Agents (`.claude/agents/`)

- `testing-agent` — the testing standard; spawn for test work.
- `reviewer-agent` — reviews a diff against the plan/backlog before a PR is opened.
