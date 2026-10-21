# Portfolio — abedalrahman.dev

Abedalrahman Saad's personal site: a Flutter developer (with Node.js / Laravel
backends), Lebanon, working remotely. Plain HTML, CSS and a little JavaScript,
rendered by Caddy's built-in templates. No framework, no build step, no npm.

Read `docs/DECISIONS.md` before changing the design: it records what the owner
rejected and why, so nothing gets proposed twice.

## Branches and deploys

- `main` is live: the VPS checks it every minute and rebuilds this repo's
  `Dockerfile` (infra repo, `scripts/autodeploy.sh`). Never push to `main`
  unless the owner asks; work on a branch and let them merge.
- The image copies only `Caddyfile` and `site/`. `legacy/` (the previous site),
  `docs/` and `tools/` never ship.

## Run it locally

```bash
tools/serve.sh            # http://127.0.0.1:8095 — downloads Caddy once if missing
```

Templates render on every request, so edit a file and reload. Check every page
in both themes at 390 px and 1440 px before pushing (Playwright is available
in cloud sessions: `NODE_PATH=$(npm root -g) node …`).

## Where things are

| What | Where |
|---|---|
| Owner's details (name, role, email, links, availability) | `site/content/site.md` |
| Home copy (services, contact title) | `site/content/home.md` |
| Skills list | `site/content/skills.md` (keep in step with the CV) |
| About page (the path tree, principles) | `site/content/about.md` |
| **One file per project** | `site/content/work/<slug>.md` → `/work/<slug>/` |
| Project screenshots | `site/assets/work/<slug>/<id>-<light|dark>-<360|720>.webp` |
| Page templates | `site/index.html`, `site/work/index.html`, `site/work/_project.html`, `site/about/`, `site/contact/`, `site/404.html` |
| Shared pieces | `site/_partials/` (head, header, footer, tile, screen, home-tree) |
| Design tokens (colour, type, motion) | `site/assets/css/tokens.css` — the only place colours live |
| Styles | `site/assets/css/site.css` |
| JavaScript | `site/assets/js/` — one small module per feature, wired in `main.js` |
| Server config | `Caddyfile` (routes, headers, CSP, caching, 404, redirects) |
| CV | `site/files/Abedalrahman_CV.pdf` |
| Share image (link previews) | `site/assets/img/og.png`, drawn by `python3 tools/og.py` from `site.md` |
| Design system (tokens, type, motion, a11y) | `docs/DESIGN.md` |
| Project sources, verified numbers, open questions | `docs/PROJECTS.md` |

`/_partials/*`, `/content/*` and `/work/_project.html` are never served directly.

## Adding or updating a project

1. Screenshots: put raw captures in a folder, named `<screen>Light.jpg` /
   `<screen>Dark.jpg` (one theme is fine too), then run
   `python3 tools/screens.py <slug> <folder>`. It crops the phone status bar,
   writes 360/720 px WebP pairs and prints the `screens:` YAML. Exclude
   captures with test data or personal details (emails, phone numbers).
2. Write `site/content/work/<slug>.md` — copy an existing one. Front matter:

   | Field | Meaning |
   |---|---|
   | `title`, `summary`, `tagline` | Name; one-line summary (cards, meta description); the line under the title |
   | `order`, `featured`, `draft` | Position in lists; show on the home page; hide everywhere |
   | `status`, `version`, `statusNote` | `in-progress`, `shipped` or `paused`; shown as a badge |
   | `role`, `period`, `platforms`, `stackLine`, `links` | The facts panel (`links`: label, text, url — public repos only) |
   | `ink`, `inkDark`, `tint` | Project colour for text (light/dark; must pass 4.5:1) and backdrop |
   | `cover` | Screen ids shown on cards and the page hero; or `coverImage` + `coverAlt` |
   | `features` | `title`, `text`, optional `state: planned|in-progress` |
   | `screens`, `screensNote` | From `tools/screens.py`; add `group`, `title`, `caption` |
   | `layers` | "How it's built": `label`, `title`, `text` |
   | `next` | "What's next" for unfinished projects |

   The Markdown body is the Overview (use `##` headings).
3. Reload. The home page, the work list, the project page, "Next project" and
   `sitemap.xml` all pick it up. Nothing else to edit.

**Facts must come from the project's own repo** (code, `pubspec.yaml`,
`package.json`, its docs) or from the owner. Never invent numbers, users,
dates or outcomes; recount numbers with your own command. `docs/PROJECTS.md`
lists each project's sources, verified numbers and open questions.

## Design rules (from the owner)

- About **him**: identity first ("Flutter developer"), projects second. Not a
  showcase of one project.
- Professional. No jokes, no mascot, no nickname — always "Abedalrahman".
- Interactive and animated, but every effect means something. The signature:
  every page is a widget tree you can inspect (Layout button, home tree card).
- Hardware (Arduino, ESP32, Raspberry Pi) only as a line in Skills.
- No AI-template look: no gradients, glows, typewriters, marquees, custom
  cursors, emoji, floating code chips, fake stats.
- Both themes, WCAG AA contrast (tokens are pre-checked; recheck any new
  colour), 44 px targets, visible focus, reduced motion respected, works
  without JavaScript.

## Contact form

It composes an email in the visitor's mail app (`mailto:`), so nothing goes
through a third party. To switch to a form service later: give the `<form>` in
`site/contact/index.html` an `action`/`method`, remove the submit handler in
`site/assets/js/contact.js`, and add the service's origin to `form-action` and
`connect-src` in the `Caddyfile` CSP.
