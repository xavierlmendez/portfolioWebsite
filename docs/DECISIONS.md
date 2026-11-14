<!-- from engineering-standards @ 1b9616e -->
# Decisions

Append-only log of decisions with lasting consequences (ADR style — see SOURCES). Don't edit old
entries; supersede them. Newest at the bottom.

## D-001 — Project list has a single source of truth · 2026-11-14 · status: accepted

**Context.** Home, About, the Projects page, the Guinea Pig page and the nav menu each kept their own
copy of project names, statuses, links and descriptions, and the copies had drifted apart.
**Decision.** Project metadata (name, status, link, description, tags) lives only in
`xavis_projects/app/lib/projects.ts`; all five consumers derive from it. Retired projects are removed
from the list; their route files stay in the tree. Statuses are limited to Live, In Development,
Exploring and Planned. Every top-level project appears in the nav, including ones whose page is still a
placeholder (Real-Time Alerts, Sentiment Analyzer). The Guinea Pig page keeps its own intro text; only
its project entries come from the list.
**Consequences.** Adding, retiring or re-statusing a project is a one-file change, checked by
`app/lib/projects.test.ts`. Pages that need different copy (e.g. short card blurbs) must add a field to
the list rather than hard-code text.
