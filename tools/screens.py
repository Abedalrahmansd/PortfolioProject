#!/usr/bin/env python3
"""Turn raw app screenshots into web-ready images for one project.

    python3 tools/screens.py <slug> <folder-of-screenshots> [--status-bar 108] [--dry-run]

What it does, for every .png/.jpg/.jpeg/.webp in the folder (subfolders too):
- crops the phone's status bar off the top (default 108 px on a 1080 px-wide capture,
  scaled for other widths; pass --status-bar 0 for web or desktop captures),
- pairs light and dark captures by name: "calendarLight.jpg" + "calendarDark.jpg"
  become one screen "calendar" with both themes,
- writes site/assets/work/<slug>/<name>-<theme>-<width>.webp at 360 and 720 px wide,
- prints the `screens:` YAML to paste into site/content/work/<slug>.md.

Needs Pillow (pip install pillow). Existing files are overwritten.
"""
import argparse
import re
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is missing: pip install pillow")

ROOT = Path(__file__).resolve().parent.parent
WIDTHS = (360, 720)
EXTS = {".png", ".jpg", ".jpeg", ".webp"}


def kebab(name: str) -> str:
    name = re.sub(r"([a-z0-9])([A-Z])", r"\1-\2", name)
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def split_theme(stem: str):
    m = re.match(r"(.+?)[ _-]?(light|dark)$", stem, re.IGNORECASE)
    if m:
        return kebab(m.group(1)), m.group(2).lower()
    return kebab(stem), "light"


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("slug", help="project slug, e.g. ssociety")
    ap.add_argument("folder", help="folder with the raw screenshots")
    ap.add_argument("--status-bar", type=int, default=108, help="px to crop at 1080 px width (0 = none)")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    if not re.fullmatch(r"[a-z0-9-]+", args.slug):
        sys.exit("slug must be lowercase letters, digits and dashes")
    src = Path(args.folder)
    files = sorted(p for p in src.rglob("*") if p.suffix.lower() in EXTS)
    if not files:
        sys.exit(f"no images in {src}")
    out = ROOT / "site" / "assets" / "work" / args.slug
    if not args.dry_run:
        out.mkdir(parents=True, exist_ok=True)

    screens = {}
    for f in files:
        name, theme = split_theme(f.stem)
        im = Image.open(f).convert("RGB")
        w, h = im.size
        crop = round(args.status_bar * w / 1080) if args.status_bar else 0
        if crop:
            im = im.crop((0, crop, w, h))
        for width in WIDTHS:
            if width > im.width:
                continue
            r = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
            target = out / f"{name}-{theme}-{width}.webp"
            if not args.dry_run:
                r.save(target, "WEBP", quality=80, method=6)
        screens.setdefault(name, {})[theme] = (im.width, im.height)
        print(f"  {f.relative_to(src)} -> {name} ({theme})", file=sys.stderr)

    print("screens:")
    for name, themes in screens.items():
        w, h = next(iter(themes.values()))
        print(f"  - id: {name}")
        print(f"    title: {name.replace('-', ' ').capitalize()}")
        print("    caption: \"\"")
        print(f"    themes: [{', '.join(sorted(themes))}]")
        print(f"    ratio: {w} / {h}")


if __name__ == "__main__":
    main()
