#!/usr/bin/env python3
"""Draw the social share image (site/assets/img/og.png, 1200x630) from site/content/site.md.

    python3 tools/og.py

Run it after changing the name, role, roleLine, domain or location. Needs Pillow,
fonttools and PyYAML (pip install pillow fonttools pyyaml).
"""
import tempfile
from pathlib import Path

import yaml
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
FONTS = SITE / "assets/fonts"
OUT = SITE / "assets/img/og.png"

# Light theme tokens (site/assets/css/tokens.css).
BG, INK, MUTED, INSP, ON_INSP = "#F4F5F2", "#111412", "#4B524D", "#1A62D6", "#FFFFFF"
W, H, PAD = 1200, 630, 72


def front_matter(path):
    text = path.read_text(encoding="utf-8")
    return yaml.safe_load(text.split("---", 2)[1])


def static_font(woff2, weight, tmp):
    """Pillow can't pick a weight in a variable WOFF2, so pin one into a TTF."""
    font = TTFont(woff2)
    font.flavor = None
    font = instancer.instantiateVariableFont(font, {"wght": weight})
    out = Path(tmp) / f"{woff2.stem}-{weight}.ttf"
    font.save(out)
    return str(out)


def dashed_box(draw, box, color, dash=7, step=14):
    x0, y0, x1, y1 = box
    for x in range(int(x0), int(x1), step):
        draw.line([(x, y0), (min(x + dash, x1), y0)], fill=color, width=2)
        draw.line([(x, y1), (min(x + dash, x1), y1)], fill=color, width=2)
    for y in range(int(y0), int(y1), step):
        draw.line([(x0, y), (x0, min(y + dash, y1))], fill=color, width=2)
        draw.line([(x1, y), (x1, min(y + dash, y1))], fill=color, width=2)


def main():
    s = front_matter(SITE / "content/site.md")
    domain = s["domain"].split("//")[-1].rstrip("/")
    with tempfile.TemporaryDirectory() as tmp:
        display = static_font(FONTS / "funnel-display.woff2", 720, tmp)
        body = static_font(FONTS / "funnel-sans.woff2", 500, tmp)
        name_font = ImageFont.truetype(display, 150)
        # Long names shrink to fit the width.
        while name_font.getlength(s["name"]) > W - 2 * PAD - 24:
            name_font = ImageFont.truetype(display, name_font.size - 4)
        role_font = ImageFont.truetype(display, 54)
        small = ImageFont.truetype(body, 30)
        label = ImageFont.truetype(body, 20)

        im = Image.new("RGB", (W, H), BG)
        d = ImageDraw.Draw(im)
        d.text((PAD, 270), s["name"], font=name_font, fill=INK, anchor="ls")
        d.text((PAD, 370), s["role"] + ".", font=role_font, fill=INK, anchor="ls")
        d.text((PAD, 432), s["roleLine"], font=role_font, fill=MUTED, anchor="ls")
        d.text((PAD, H - PAD + 2), f"{domain}  ·  {s['location']}, working remotely", font=small, fill=MUTED, anchor="ls")

        # The name inside a Layout-mode outline with its widget label, as on the site.
        x0, y0, x1, y1 = d.textbbox((PAD, 270), s["name"], font=name_font, anchor="ls")
        box = (x0 - 12, y0 - 12, x1 + 12, y1 + 12)
        dashed_box(d, box, INSP)
        tag = "Text · displayLarge"
        d.rounded_rectangle([box[0], box[1] - 34, box[0] + label.getlength(tag) + 20, box[1] - 6], radius=6, fill=INSP)
        d.text((box[0] + 10, box[1] - 13), tag, font=label, fill=ON_INSP, anchor="ls")

        mono = Image.open(SITE / "assets/img/monogram-192.webp").convert("RGBA").resize((96, 96), Image.LANCZOS)
        mask = Image.new("L", (96, 96), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, 95, 95], radius=20, fill=255)
        im.paste(mono, (W - PAD - 96, H - PAD - 88), mask)

        im.save(OUT, optimize=True)
    print(f"wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
