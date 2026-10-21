# abedalrahman.dev

The personal site of Abedalrahman Saad, a Flutter developer in Lebanon.

Every page is a widget tree: press **Layout** in the top bar and the page
outlines and labels its parts, the way Flutter's inspector does.

## How it works

Plain HTML, CSS and a few small JavaScript modules, rendered by
[Caddy](https://caddyserver.com)'s built-in templates. No framework, no build
step, no `node_modules`.

- Each project is one Markdown file in `site/content/work/`. Adding a file adds
  the project to the home page, the work list, its own page at `/work/<slug>/`
  and the sitemap.
- The owner's details, skills and About page are Markdown too, in `site/content/`.
- The `Dockerfile` copies `Caddyfile` and `site/` into `caddy:2-alpine`.

```bash
tools/serve.sh                              # run it locally on :8095
python3 tools/screens.py <slug> <captures>  # app screenshots → WebP pairs + YAML
python3 tools/og.py                         # redraw the link-preview image
```

## Docs

- `CLAUDE.md`: working on the site (where things are, adding a project, rules)
- `docs/DESIGN.md`: the design system
- `docs/PROJECTS.md`: where each project fact comes from
- `docs/DECISIONS.md`: what was tried and why this design won

`legacy/` holds the previous version of the site, for reference only; it isn't
deployed.

Fonts are under the SIL Open Font License (`site/assets/fonts/LICENSE.txt`).
The content, screenshots and CV are © Abedalrahman Saad.
