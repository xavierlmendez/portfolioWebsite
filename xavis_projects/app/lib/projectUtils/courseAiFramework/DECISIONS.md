# Decisions — course AI project framework on this site

Decisions with lasting consequences for the course ledger and the published resource.
Append; do not rewrite. Dates ISO 8601. `F-nn` refers to
`docs/review/findings.md` in the `course-ai-project-framework` repository.

## D-1 (2026-09-08) — The ledger lives in this Next app, not on a separate server

The framework ships `tools/ledger_server.py`, a standard-library HTTP server that
serves the published resource and appends signed ledger entries. Running it for a
semester means a second host, a second TLS certificate and a second thing to keep up
during grading week. This site is already deployed, already has a domain and TLS, and
already has a deployment pipeline, so the resource route
(`app/api/courseResource/[example]`) and the ledger route (`app/api/courseLedger`)
were added here instead and `ledger_server.py` stays what it is: the reference
implementation and the local practice server.

Consequence: the site is on the critical path on grading day. The ledger is a Type A
gate, so a 500 from `POST /api/courseLedger` fails students. That is why the append
path has no dependencies beyond the filesystem and why it is unit-tested.

## D-2 (2026-09-08) — Validation and file format mirror `ledger_server.py` exactly

`app/lib/projectUtils/courseAiFramework/ledger.ts` reproduces the reference server's
behaviour rather than improving on it: the same `ID_RE` / `TAG_RE` / `VAR_RE`, the same
comma-separated IDs normalised to `A+B`, the same nonce check, the same defaulting of
`run_tag` to `practice`, the same rejection messages, the same second-resolution UTC
timestamp, the same five TSV columns
(`utc_timestamp, student_ids, run_tag, variant, client`) and the same two header lines.
Form bodies drop blank values and keep the first value of a repeated key, matching
`urllib.parse.parse_qs`; a JSON body that is not an object is `bad json`, matching
`json.loads(raw).items()`.

The reason is TA tooling: the runbook greps the file (`grep -P '\tgrading-k[123]\t'`)
and reconciles it against the roster. A ledger written by this site and one written by
the reference server have to be the same artefact. `ledger.test.ts` locks each of these
so a future edit to a regex or the header desyncs a test rather than a semester.

Two deliberate departures, both narrower than the reference:

- An empty server-side nonce is rejected with the same message. The reference cannot
  start without `--nonce`; here the value comes from a Kubernetes Secret that can be
  missing, and accepting every signature is worse than rejecting every signature.
- The `client` column. The reference reads the peer address off the socket
  (`self.client_address[0]`). A Next route handler has no socket, and `X-Forwarded-For`
  is forgeable with `curl -H 'X-Forwarded-For: 1.2.3.4'`. The header is read only when
  `COURSE_LEDGER_TRUST_PROXY` is set, which is correct only behind an ingress that
  overwrites it; behind the current `type: LoadBalancer` Service (L4) it is unset and
  the column reads `unknown`. The column is informational and no grade depends on it
  (F-55).

## D-3 (2026-09-08) — `Recreate`, and one atomic write per entry

The ledger is a file on a ReadWriteOnce PVC with `replicas: 1`.

A default RollingUpdate creates the surge pod before deleting the old one; if it lands
on another node it stays Pending with a Multi-Attach error and the rollout never
finishes, so a mid-semester nonce or resource fix cannot ship. The Deployment therefore
sets `strategy: {type: Recreate}` and accepts a few seconds of downtime per deploy
(F-51).

Within the pod, the header used to be a check-then-write: two concurrent first
signatures could both find the file missing and one would truncate the other's entry.
The header is now written together with the first entry in a single `writeFileSync`
with the exclusive `wx` flag — the loser gets `EEXIST` and appends instead — and every
subsequent entry is one `appendFileSync`. A per-process promise chain serialises
handlers on top of that so entries land in arrival order (F-51).

## D-4 (2026-09-08) — The container runs as uid 1001 and the volume is `fsGroup` 1001

A freshly provisioned EBS volume mounts `root:root 0755`, and the image runs as uid
1001 (`USER nextjs`), so without an `fsGroup` every append fails `EACCES` and every
signature returns 500 on the first day of grading. The pod spec sets
`runAsUser/runAsGroup/fsGroup: 1001` with `fsGroupChangePolicy: OnRootMismatch`, which
makes the kubelet chgrp the volume before the container starts, instead of adding a
root init container that chowns the mount (F-23). This cannot be verified outside the
cluster; verify on the first deploy by signing one practice entry.

## D-5 (2026-09-08) — Vitest for site unit tests

The app had no test runner. `vitest` (v2, the line whose peer range matches the
project's `@types/node@20`) is the devDependency, `npm test` runs it, and
`vitest.config.ts` restricts it to `app/**/*.test.ts` in a node environment with
PostCSS disabled (Vite cannot load the Next PostCSS config, and these tests touch no
CSS). Only the ledger library is covered: it is the part whose output another
repository's tooling parses (F-56).
