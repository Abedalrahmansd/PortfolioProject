---
title: This website
order: 3
featured: false
status: in-progress
statusNote: Rebuilt in October 2026.
tagline: A portfolio that shows how it’s built. Press Layout in the top bar on any page.
summary: Hand-written HTML, CSS and JavaScript, rendered by Caddy from Markdown files. No framework and no build step.
role: Design and code
period: 2025 to now
platforms: [Web]
stackLine: HTML, CSS, JavaScript, Caddy templates
ink: "#136F37"
inkDark: "#5CCB8A"
tint: "#136F37"
links:
  - label: Code
    text: GitHub
    url: https://github.com/Abedalrahmansd/PortfolioProject
features:
  - title: Every page is a widget tree
    text: The Layout button outlines and labels each part of the page, the way Flutter’s inspector does. On the home page, pointing at a node in the tree highlights it.
  - title: Projects are Markdown files
    text: Each project page, the project list and the sitemap come from one file per project. Adding a project means adding a file and its screenshots.
  - title: Screens follow the theme
    text: App screenshots come in light and dark pairs and switch with the site’s theme.
  - title: Light on the network
    text: Self-hosted fonts of about 75 KB, small WebP screenshots, and a few small JavaScript modules. Everything still reads without JavaScript.
  - title: Accessible
    text: Every text colour meets WCAG AA in both themes, with keyboard focus on everything, a skip link and reduced motion respected.
layers:
  - label: Server
    title: Caddy templates
    text: Caddy reads the Markdown, fills the page templates and serves them, compressed, with security headers.
  - label: Pages
    title: HTML and CSS
    text: Design tokens for colour, type and motion, shared by every page, in light and dark.
  - label: Behaviour
    title: Small JavaScript modules
    text: Theme, layout inspector, screen explorer and contact form. Each one switches on only where a page needs it.
  - label: Hosting
    title: Docker on my server
    text: The same server as SSociety’s API. Pushing to main deploys the site.
next:
  - title: Real form sending
    text: Send messages from the contact form without opening a mail app.
  - title: New project pages
    text: Fresh SSociety screenshots from 3.x, and Notes captures.
---
The previous version of this site stacked about twenty effects on top of each other and still didn’t show my work. This one does less, on purpose. The one idea it keeps is the one I care about as a Flutter developer: everything on screen is a tree of widgets, and you can see it.
