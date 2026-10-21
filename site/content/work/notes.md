---
# Notes — facts checked against note_app_flutter main @ 57f204a (2025-09-10) on 2026-10-21.
# The online mode's backend is not in this repo; the CV describes it as a Laravel REST API.
title: Notes
order: 2
featured: true
status: in-progress
version: "1.0"
statusNote: Last updated September 2025.
tagline: A notes app you can use with an account, or entirely on your phone.
summary: A Flutter notes app with two modes, an online account or notes stored only on the phone. Colours, pins, archive, trash and simple formatting.
role: Flutter app
period: 2025
platforms: [Android, iOS]
stackLine: Flutter, GetX, Hive, REST API
ink: "#6D28D9"
inkDark: "#B79CFF"
tint: "#6D28D9"
coverImage: /assets/work/notes/cover.webp
coverAlt: Notes app illustration
features:
  - title: Two ways to use it
    text: On first launch you choose. Online keeps your notes in your account through a REST API; offline keeps them on the phone in a local Hive database.
  - title: Organise notes
    text: Give a note a colour, pin it, archive it, or move it to the trash. Sort by date and search as you type.
  - title: Simple formatting
    text: Bold, italic, underline, alignment and text size while you write.
  - title: Light, dark or system
    text: The theme follows the phone, or you pick one.
  - title: Sign in safely
    text: Sign-in tokens are kept in the phone’s secure storage.
  - title: Sync between the two modes
    state: planned
    text: Today the modes are separate. Moving notes between them is the next step.
layers:
  - label: App
    title: Flutter and GetX
    text: One interface for notes with two implementations, online and offline, so the screens don’t care which one is in use.
  - label: On the phone
    title: Hive
    text: Offline notes live in a typed Hive box on the device.
  - label: Online
    title: REST API
    text: The online mode talks to an API through GetX’s HTTP client, with the sign-in token added to each request.
next:
  - title: Sync between modes
    text: Move notes from the phone to an account and back.
  - title: Screenshots and a demo build
    text: Real captures for this page, and a build you can try.
---
The interesting part is underneath: the same screens work against two storage backends. Every action goes through one notes interface, with an online implementation that calls an API and an offline one that stores everything on the phone.
