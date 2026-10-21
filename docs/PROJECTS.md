# Project facts: sources, numbers, open questions

Every claim on a project page has to trace back to the project's repo or to the
owner. This file says where each fact came from, how each number was counted,
and what is still unknown. When a project moves on, recount and update both
this file and `site/content/work/<slug>.md`.

## SSociety (`site/content/work/ssociety.md`)

**Sources, checked 2026-10-21**
- App: `Abedalrahmansd/NewSSociety`, `main` @ `ec6443a`. Read `pubspec.yaml`,
  `CLAUDE.md`, `docs/RELEASE_3_0.md`, `docs/design/BUILD_PLAN.md`, `lib/`, `test/`.
- API: `Abedalrahmansd/SSociety-API`, `main` @ `232e811`. Read `package.json`,
  `CLAUDE.md`, `docs/CHAT_PLAN.md`, `routes/`, `models/`, `socket/`, `utils/`, `test/`.
- Both clones were shallow (one commit each), so git history can't date anything.

**Numbers on the page, and how they were counted**

| Claim | Value | Command (run in the repo) |
|---|---|---|
| App version | 3.4 | `grep '^version:' pubspec.yaml` → `3.4.0+18` |
| Strings in each language | 1,465 | keys without `@` in `lib/l10n/app_en.arb` and `app_ar.arb` (equal) |
| App tests | 116 | `grep -rhE "^\s*(test\|testWidgets)\(" test \| wc -l` |
| API endpoints | 143 (page says "over 140") | `grep -hE "^\s*[A-Za-z]*[Rr]outer\.(get\|post\|put\|patch\|delete)\(" routes/*.routes.js \| wc -l`; 143 unique method+path pairs, none commented out |
| API tests | 200 | `grep -hE "^\s*(test\|it)\(" test/*.test.js \| wc -l` (38 test files) |
| Revocable sessions | yes | `middleware/auth.middleware.js` compares the token's `tv` with `user.token_version` |
| Four roles | student, class admin, teacher, manager | `models/user.model.js` (`is_admin`, `is_teacher`, `is_manager`), `utils/teachers.js` |

Counted but not published (recount before using): 15 route groups, 36 models,
66 Joi schemas, about 11.6k lines of API source and 5.7k of tests, about
179 Dart files and 70k lines in the app. Socket.io events were counted twice
with different results (11 and 16 client events); don't publish a number
without a careful recount.

**Release status**: 3.0 to 3.4 (milestones R0 to R6) are done. 3.5 (join
codes, consent), 3.6 (teacher tools), 3.7 (study together, widgets), the web
manager panel and 3.8 (web and tablet) are planned; none of their API work
exists yet (no `join_code`, `consent` or CSV import in the code).

**Screenshots**: the ones on the site are from 2.7 (July 2026), and the page
says so. Excluded: captures with real-looking emails or test data.

**What the old site got wrong** (`legacy/project-ssociety.html`, `legacy/index.html`)
- "Student, admin and manager roles": there are four (teachers too, invite-only,
  scoped per class and subject).
- "School management application": it is a class app. No attendance, no
  gradebook; `grades` in the API means classes, not marks.
- Exams "with rooms": an exam is an assignment of type `exam`; rooms exist
  only on timetable slots.
- "Status (pending/completed)": pending means a student's suggestion waiting
  for a class admin; done is a private per-student mark.
- The stack left out Express 5, Sequelize, Joi, Gemini, FCM, Resend, S3
  storage and the self-hosted Docker setup.

**Open questions for the owner**
1. Credit for AI assistance: the repos show the work is done with Claude Code.
   Say so on the site, or not?
2. Has it launched at a real school? (Both databases hold mock data.) If yes:
   which school, how many students.
3. Dates: when the PHP + Firestore version started, when the Node.js move
   happened, when hosting moved to the VPS. Nothing in either repo dates the
   start, so the page has no "When" row until the owner gives one
   (`period:` in the front matter).
4. Can the app and API repos be linked publicly? (No links on the page until yes.)
5. OK to name Gemini publicly? (The page does, in the stack line and "How it's built".)
6. iOS: shipped, planned, or not at all? (The page says Android, Web, Windows.)
7. Rough order or dates for 3.5 to 3.8.

## Notes (`site/content/work/notes.md`)

**Sources, checked 2026-10-21**: `Abedalrahmansd/note_app_flutter`, `main` @
`57f204a` (2025-09-10, "Enhance UI"). Shallow clone, one commit. Read
`pubspec.yaml`, `README.md`, `lib/`.

**Facts**
- `version: 1.0.0+1`; 33 Dart files, about 3.9k lines; no tests.
- GetX, Hive (offline mode), `flutter_secure_storage` (the token), `intl`, Lottie.
- Two modes chosen at first launch: online (REST API) or offline (Hive). The
  modes don't sync with each other; the page lists sync as planned.
- The online mode's API address is a local development address, so the
  online mode has never run against a public server.
- The backend is not in this repo. The CV calls it a Laravel REST API;
  unconfirmed, so the page says "REST API" only.
- Platform folders exist for all six; the page says Android and iOS (what
  the old site and the CV claim). Not verified on a device.

**What the old site got wrong** (`legacy/project-notes.html`)
- "Changes syncing automatically when you reconnect": there is no sync. Online
  and offline are separate modes.
- Its gallery showed one illustration four times; no real screenshots exist yet.

**Open questions for the owner**
1. Where is the backend? Laravel? Can it be linked?
2. Is Notes finished (keep "Last updated September 2025") or still going?
3. Real screenshots: run the app and capture light and dark (see `CLAUDE.md`).
4. Can `note_app_flutter` be linked from the page?

## This site (`site/content/work/this-site.md`)

Facts are this repo. Keep its "How it's built" in step with `Caddyfile` and
`site/` when the stack changes.

## Unconfirmed site-wide details (`site/content/site.md`)

- Languages "Arabic, English" and the availability line came from the old
  site and the CV; the owner hasn't confirmed them.
- Phone and WhatsApp are on the contact page because they were on the old
  site and the CV. Ask before adding any new personal detail.
