# Design decisions and the owner's feedback

What was tried, what the owner said, and what was decided. Read this before
proposing a new direction. Design canvas with every version (private to the
owner): https://claude.ai/artifact/8K9GDtN7XdZ7phBBGs4bpH (pages v1, v2, v3).

## The old site (now in `legacy/`), audited October 2026

- About twenty effects at once (glow blobs, floating code chips, typewriter,
  tech marquee, cursor trail, tilt, magnetic buttons…): the main reason it
  read as AI-made.
- The contact form could never send (inputs had no `name`).
- The SSociety gallery rendered nothing; the Notes gallery showed one
  illustration four times; no real app UI on the home page.
- Dark-mode green text failed contrast (2.9–3.9:1).
- Project facts were wrong or years out of date (see `PROJECTS.md`).
- 27 MB of images, mostly full-size screenshots with status bars.

## v1 — "Hot Reload" (rejected)

The site as one running app, built around a playable SSociety phone in the
hero, with a case study, "receipts" and an "add a project" explainer.
**Owner:** "wth is this?? i don't need anything like that" — too focused on
one project and on internals; he wants a site about who he is.

## v2 — three playful concepts (rejected)

A cartoon host character ("Meet Aboudy"), "Tweak me" (the developer as a live
widget with mood/energy controls), and "The desk" (objects on a cutting mat).
**Owner:** too jokey. Use "Abedalrahman", never "Aboudy". Focus on who he is
as a Flutter / software developer. Hardware only as a skills line.

## v3 — "Every page is a widget tree" (accepted direction)

**Owner:** "it's better, but work hard on its UX". Identity first, professional,
interactive and animated with meaning, every page with its own character,
every project with full details on its own page, easy to update while the
projects are unfinished.

What it is:
- Home: the name set at full width, role, intro; a widget-tree card where
  pointing at a node highlights that part of the page; the Layout button
  outlines and labels every part of any page, like Flutter's inspector.
- Work: a list with a live preview pane (desktop).
- Project page: the project's own colour, status badge, facts, features
  marked planned / in progress, a screen explorer with the app's light and
  dark captures, how it's built, what's next.
- About: the path as a tree, with a details pane (DevTools-style).
- Contact: email first, a copy button, WhatsApp, local time, a form that
  writes an email.

## Rules that came out of this

- Projects are Markdown files, so they can grow as the apps do.
- Every fact comes from the project's repo or the owner.
- Real screenshots only, light and dark when both exist; label old ones.
- No placeholders shipped to the live site without the owner's say-so.

## Still open

- Real SSociety 3.x screenshots (the current ones are 2.7, July 2026).
- Notes screenshots, and whether its backend repo can be linked.
- A form service for the contact form, if the owner wants one.
- When SSociety started: nothing in the repos dates it, so its page has no
  "When" row until the owner says (`period:`).
- The owner hasn't confirmed: "Arabic, English" as languages; the
  availability line; the Notes "Last updated September 2025" note.
