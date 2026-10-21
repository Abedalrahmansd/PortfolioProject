# Design system

The site's look in one page. Tokens live in `site/assets/css/tokens.css`,
everything else in `site/assets/css/site.css`. Mockups of every version (v1 and v2
rejected, v3 built) are on the design canvas:
https://claude.ai/artifact/8K9GDtN7XdZ7phBBGs4bpH

## The idea: every page is a widget tree

Abedalrahman builds Flutter apps, so the site borrows Flutter's own way of
looking at a screen. Every major block carries `data-w="<WidgetName>"`. The
**Layout** button in the top bar (or the first-visit intro) outlines each
block in dashed inspector blue and labels it, like the Flutter Inspector's
layout explorer. The joke is never spelled out; people who know Flutter get it,
and everyone else sees a clean page with a neat x-ray mode.

Each page has its own version of the idea:

| Page | Signature |
|---|---|
| Home | The name set at full width. A widget-tree card: pointing at a node highlights that part of the page (`site/_partials/home-tree.html`, `inspect.js`). |
| Work | A list with a live preview pane on wide screens (`work.js`). |
| Project | The project's own colour; a screen explorer with the app's light and dark captures, where the app theme follows the site theme until you pin one (`explorer.js`); a table of contents with scrollspy (`toc.js`). |
| About | The path from web to Flutter to Laravel as a DevTools-style tree with a details pane (`path.js`). |
| Contact | Email first with a copy button, WhatsApp, the owner's local time (`contact.js`). |
| 404 | "No route" with the path you asked for. |

New widgets get a `data-w` label named the way a Flutter dev would name them
(`AppBar`, `Text`, `ListView`, `Card`, `Row`…), and an `--i` index if they
should join the first-visit intro.

## Colour

Only in `tokens.css`. Light is `:root`, dark is `:root[data-theme="dark"]`,
and a `prefers-color-scheme` copy covers visitors without JavaScript.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F4F5F2` | `#0D100E` | Page |
| `--surface` / `--surface-2` | `#FFFFFF` / `#E9ECE7` | `#151917` / `#1D2220` | Cards / wells |
| `--ink` | `#111412` | `#E9EDE9` | Text (16.9 / 16.2 : 1) |
| `--muted` | `#4B524D` | `#A3ABA5` | Secondary text (7.3 / 8.1 : 1) |
| `--line` / `--line-strong` | `#D7DBD5` / `#7E8780` | `#2A302C` / `#6B756E` | Dividers / control borders (3.4 / 4.0 : 1) |
| `--brand` + `--on-brand` | `#136F37` + white | `#5CCB8A` + `#06210F` | The green: primary button, current nav item |
| `--insp` + `--on-insp` | `#1A62D6` + white | `#6EA8FF` + `#06122B` | Inspector outlines, labels, highlights, focus ring |

Project colours come from each project's front matter: `ink` / `inkDark` for
text (checked against `--bg`: SSociety 5.4 / 8.9, Notes 6.5 / 8.4) and `tint`
for backdrops. **Any new colour must reach 4.5 : 1 for text and 3 : 1 for
borders and icons in both themes.** Check before committing:

```python
def L(h):
    c=[int(h.lstrip('#')[i:i+2],16)/255 for i in (0,2,4)]
    c=[x/12.92 if x<=0.04045 else ((x+0.055)/1.055)**2.4 for x in c]
    return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]
ratio=lambda a,b:(max(L(a),L(b))+0.05)/(min(L(a),L(b))+0.05)
```

Never: gradients, glows, coloured shadows, yellow, neon.

## Type

| Role | Font | Notes |
|---|---|---|
| Display (name, headings) | Funnel Display, weight 620–720 | Tight tracking (−0.02 to −0.045em). The hero name fits the width: `min(var(--step-hero), (100vw − 2·gutter) / 6.9)`, `nowrap`. |
| Body | Funnel Sans, 400–600 | `--step-0`, line-height 1.55, measure ≤ 68ch |
| Labels, data, code | Spline Sans Mono | `--step--1`; inspector labels, facts, badges |
| Arabic name | IBM Plex Sans Arabic, subset to the name only | `plex-arabic-name.woff2`; re-subset with fonttools `pyftsubset` if the Arabic text changes |

Scale: `--step--1` 13px, `--step-0` 16–17, `--step-1` 18–21, `--step-2` 22–30,
`--step-3` 28–44, `--step-4` 36–68, `--step-hero` 52–168 (all `clamp()`).
Fonts are self-hosted WOFF2 (OFL, see `site/assets/fonts/LICENSE.txt`) with a
metric-matched fallback, so text doesn't jump when they load.

## Layout

- `.wrap`: max 1240px, gutter `clamp(16px, 4vw, 48px)`.
- `.grid`: 12 columns, `.c-3` … `.c-12`; everything stacks to one column on
  narrow screens.
- Radii: 8 / 14 / 22px. Touch targets at least 44px.
- Check every change at 360, 390, 768, 1024 and 1440px, in both themes, with
  no horizontal scroll.

## Components

`.btn` (primary green, secondary outlined), `.badge[data-status]`
(in-progress / shipped / paused / planned), `.seg` (segmented control:
the explorer's Light/Dark), `.tile` (project card: phones, cover image or
monogram), `.screen` (`_partials/screen.html`: one capture with light and dark
versions, `srcset` 360/720, fixed aspect ratio so nothing shifts), `.chap`
(About chapters), the topbar and footer.

## Motion

Tokens: `--ease-out` `cubic-bezier(0.23, 1, 0.32, 1)`; `--dur-fast` 160ms,
`--dur` 280ms, `--dur-slow` 700ms.

- **Page changes**: cross-document View Transitions (240ms fade); project art
  keeps `view-transition-name: art-<slug>` so the card grows into the hero.
- **First visit** (once per session, `main.js` adds `.build`): blocks fade up
  in order and trace a dashed outline, as if the page were being laid out.
- **Swaps** (explorer screens, About chapters, theme): short fade/slide, or a
  View Transition for the theme.
- Every animation sits inside `prefers-reduced-motion: no-preference`; with
  reduce, nothing moves and View Transitions are off.
- Motion explains something (what changed, where it came from). No idle
  loops, parallax, typewriters, marquees, cursor effects or scroll-jacking.

## Accessibility and robustness

- WCAG 2.2 AA: contrast above, visible `:focus-visible` ring in `--focus`,
  skip link, landmarks, one `h1` per page, `aria-current` on nav,
  `aria-expanded`/`aria-controls` on disclosures, a polite live region
  (`announce()` in `main.js`) for copy/theme/layout feedback.
- Works without JavaScript: content is server-rendered, the theme follows the
  system, About shows every chapter, the contact form falls back to `mailto:`.
- Arabic text gets `lang="ar" dir="rtl"`.
- Images: WebP, explicit width/height, `loading="lazy"` except above the fold.
- CSP allows only same-origin scripts, styles, fonts and images (`Caddyfile`).
  No third-party scripts, analytics or fonts.

## Share image

`site/assets/img/og.png` (1200×630) is what LinkedIn, WhatsApp and others show
when the link is shared: the name in its inspector outline, the role and the
domain, in the site's own fonts. It is drawn from `site/content/site.md`, so
after changing the name, role, domain or location run `python3 tools/og.py`.
