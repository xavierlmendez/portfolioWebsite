<!-- from engineering-standards @ 1b9616e -->
# Backlog — stripped initiatives and code-level TODOs

Every `# TODO(BL-nn): …` in code resolves to an entry here. When done, move the entry to **Closed**
with the commit that closed it.

| Field | Meaning |
|---|---|
| Verdict | `deleted` (restore from entry + git history) · `kept` (in tree, tagged) · `moved` · `fix` · `backlog-only` |
| Re-entry | Effort to rebuild from this entry |

## Open

### BL-01 — Mobile sign-in/sign-up view in the nav · `kept` · re-entry small
`xavis_projects/app/ui/page/NavBar.tsx`: the desktop nav has a Sign in / Sign out button, the mobile
menu panel has no sign-in/sign-up view. Tagged where the mobile panel ends ("Create Mobile Sign Up
View"). Needs a sign-in/sign-up entry in the mobile list that calls the same `signInStateAction` as the
desktop button.

### BL-02 — Line of best fit computed client-side · `kept` · re-entry small
`xavis_projects/app/ui/projects/GuineaPigProjects/chartBuilder/ChartBuilder.tsx`:
`computeLineOfBestFit` runs in the browser. The original note was to move it to the backend. Needs an
API route that accepts the points and returns `{ m, b }`, and the component switched to call it.

### BL-03 — Watch List duplicate check relies on substring match · `kept` · re-entry small
`xavis_projects/app/ui/projects/watchList/watchListControlPanel.tsx`: the duplicate-ticker check uses
`ticker.id.includes(cleaned)`; the original note reads "fix storage escaping ticker", which suggests the stored id
is not always the bare symbol. Side effect: adding `A` is rejected while `AAPL` is listed. Needs the stored id
made the bare symbol so the check can be an exact match, plus a test.

### BL-04 — Short blurbs for Home and About project cards · `backlog-only` · re-entry small
The Home and About status cards render `showcaseProjects` with the long Projects-page `description`.
Needs an optional short-blurb field on `Project` in `xavis_projects/app/lib/projects.ts`, filled per
project, and the two pages switched to it.

### BL-05 — Chart Builder has no status · `backlog-only` · re-entry small
The `chartBuilder` entry in `xavis_projects/app/lib/projects.ts` has no `status`, so it is left off the
Home/About showcase. Needs a status chosen from Live / In Development / Exploring / Planned.

### BL-06 — Rewrite the Sentiment Analyzer description · `backlog-only` · re-entry small
The `sentimentAnalyzer` description and tags in `xavis_projects/app/lib/projects.ts` no longer match
the project's planned direction. Needs them rewritten.

### BL-07 — Placeholder pages · `kept` · re-entry medium
`/projects/alerts`, `/projects/sentimentAnalyzer` and `/resourcesAndBlog` render a header and an
"under development" notice only. The first two are linked from the project list. Each needs real content
or removal from navigation.

### BL-08 — Unlinked routes kept for later · `kept` · re-entry unknown
These routes exist under `xavis_projects/app/` but nothing in the project list or nav links to them:
`/projects/botBrain`, `/projects/template`, `/projects/stock`, `/projects/guineaPigProjects/kafkaFrontEnd`,
`/projects/courseAiFramework` (kept by owner decision; course-framework code is not modified). Each
needs a decision: link it from the project list, or delete it with an entry here.

### BL-09 — Choose a formatter and pre-commit hooks · `backlog-only` · re-entry small
The engineering-standards rows for a format check (CI step) and pre-commit are not adopted: no
formatter has been chosen for this TypeScript repo. Needs a formatter picked, a format-only commit
(listed in `.git-blame-ignore-revs`), a CI format-check step, and a pre-commit config.

### BL-10 — Build makes outbound calls during static generation · `fix` · re-entry small
The `/projects/watchList`, `/projects/stock` and `/projects/botMaker` pages call out (Yahoo Finance,
`BOT_MAKER_API_URL`) during the build's static-generation pass. Needs those pages marked
`export const dynamic = 'force-dynamic'` and timeouts on their fetches, so CI can't hang or flake on a
slow or unreachable upstream.

### BL-11 — lorecheck page: real sample and repo link after release · `backlog-only` · re-entry small
`xavis_projects/app/projects/lorecheck/page.tsx` shows three static sample findings from an offline
run on a test story. Once the tool has a public release, replace them with a generated ledger or
screenshots, and link the repository when it is public.

### BL-12 — Disaster Paws page: screenshots and walkthrough · `backlog-only` · re-entry small
`xavis_projects/app/projects/disasterPaws/page.tsx` describes the prototype in text only, with three
static sample scores from an offline run of its scoring rules. Add screenshots and a walkthrough once
the dashboard exists; link the repositories if they are made public.

### BL-13 — Blog and Support pages hidden from the menu · `kept` · re-entry small
`/resourcesAndBlog` (a placeholder, see BL-07) and `/support` are no longer linked from the desktop or
mobile menu. The pages still exist and load by direct URL. The blog link returns when BL-14 ships. The
Support page still needs a decision: restore the link once its content is right, or delete the page.
The Home page's navigation guide still mentions a "Blog / Changelog".

### BL-14 — Build out the blog · `backlog-only` · re-entry medium
Owner decision (2026-11-15): the blog will be built, as a dated record of how the owner's work and
working methods change over time, to be read later as a time capsule. Needs a post format and where
posts live, a list page and a post page at `/resourcesAndBlog` (or a new route), a first entry, and the
menu link restored (BL-13).

## Closed
