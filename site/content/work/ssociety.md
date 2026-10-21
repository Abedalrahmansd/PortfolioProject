---
# SSociety — facts checked against the app and API repos on 2026-10-21
# (NewSSociety main @ ec6443a, SSociety-API main @ 232e811). See docs/PROJECTS.md.
title: SSociety
order: 1
featured: true
status: in-progress
version: "3.4"
statusNote: 3.4 is out. 3.5 to 3.8 are planned.
tagline: Your class in one app. The schedule, the chat, the files, and an AI tutor that helps without doing the homework.
summary: A class app for school students. Shared schedule, class chat, files and an AI tutor, in English and Arabic. Flutter app, Node.js API.
role: Design, Flutter app and Node.js API
period: 2024 to now
platforms: [Android, Web, Windows]
stackLine: Flutter, GetX, Node.js, Express, Socket.io, MySQL, Gemini
ink: "#1660C9"
inkDark: "#7FB2FF"
tint: "#1A73E9"
cover: [agenda, files]
screensNote: These captures are from version 2.7 (July 2026), before the 3.0 redesign. New ones are coming.
features:
  - title: Shared schedule, with approval
    text: Homework, quizzes, exams and projects for each class. Students suggest items, class admins approve them or reject them with a reason.
  - title: Timetable as a time grid
    text: Class and personal timetables, by week or day, with each lesson as long as it really is and a line for now.
  - title: Class chat
    text: Class, private, subject-group and school-news chats with threads, polls, photos, voice notes, reactions and scheduled messages.
  - title: Questions, even anonymous ones
    text: Ask the class in a thread and mark the best answer, or ask anonymously so classmates never see who asked.
  - title: Pilot, the AI tutor
    text: Explains step by step without handing over homework answers, makes quizzes and revision plans, and reads class files and photos. Each student has a daily limit.
  - title: Files hub
    text: Files by subject, file requests, pinned files, page previews and copies that open offline.
  - title: Safe by default
    text: A word filter for English, Arabic and Arabizi, reports, slow mode and announcement-only chats.
  - title: English and Arabic
    text: Every string in both languages, right-to-left layouts, and Arabic written the way students actually speak.
  - title: Joining with class codes
    state: planned
    text: A four-step sign-up with join codes and consent (3.5).
  - title: Tools for teachers
    state: planned
    text: A teacher home, an approvals queue and a class log (3.6).
screens:
  - id: agenda
    group: Student
    title: Day agenda
    caption: The day’s items, each with its sync status.
    themes: [light, dark]
  - id: search
    group: Student
    title: Search
    caption: Search reads descriptions too. A few letters of “oscillations” find the Physics exam they belong to.
    themes: [light, dark]
  - id: loading
    group: Student
    title: Loading
    caption: While data loads, skeletons in the shape of the calendar, so nothing jumps.
    themes: [light, dark]
  - id: files
    group: Student
    title: Files
    caption: Class files, grouped by subject.
    themes: [light, dark]
  - id: downloaded
    group: Student
    title: Offline file
    caption: A downloaded file opens without a connection.
    themes: [light, dark]
  - id: empty
    group: Student
    title: Empty subject
    caption: An empty subject says so, instead of showing a blank screen.
    themes: [light, dark]
  - id: profile
    group: Student
    title: Profile
    caption: Avatar, personal info and settings.
    themes: [light, dark]
  - id: welcome
    group: Sign-up
    title: Welcome
    caption: The first screen a new student sees.
    themes: [light]
  - id: manager
    group: Manager
    title: Manager panel
    caption: Users, classes, assignments, grades, files and app versions in one place.
    themes: [light, dark]
  - id: versions
    group: Manager
    title: App versions
    caption: The minimum supported version for each platform, with a forced-update switch.
    themes: [light, dark]
layers:
  - label: App
    title: Flutter and GetX
    text: One codebase for Android, the web and Windows. A local cache and an outbox let messages wait for a connection.
  - label: Real time
    title: Socket.io
    text: One access check decides who can read and post in every kind of chat room.
  - label: API
    title: Node.js and Express 5
    text: Over 130 REST endpoints, Joi validation, JWT sessions that can be revoked, and 200 automated tests.
  - label: Data and files
    title: MySQL and S3 storage
    text: Sequelize on MySQL 8.4. Uploads go to self-hosted S3-compatible storage, with photos re-encoded to WebP.
  - label: AI
    title: Gemini
    text: Pilot’s answers stream to the app as they’re written, with daily limits counted per student.
  - label: Hosting
    title: My own server
    text: Docker behind Caddy and Cloudflare. Pushing to main deploys itself, and backups run every night.
next:
  - title: 3.5 · Joining and onboarding
    text: Join codes or admin approval, consent, notification setup and a My class page.
  - title: 3.6 · Teachers and class admins
    text: A teacher home, an approvals queue, a class log and a timetable editor.
  - title: 3.7 · Study together and widgets
    text: Studying with classmates, richer notifications and three Android home-screen widgets.
  - title: Manager panel on the web
    text: Reports, files, teachers, grades, CSV import and a new-school-year flow.
  - title: 3.8 · Web and tablet
    text: Pilot, files and settings on the web, side panels, shortcuts and tablet layouts.
---
Students keep track of homework, exams, files and class conversations across too many places. SSociety puts a class’s schedule, chat and files in one app, and adds Pilot, an AI tutor that explains instead of answering for you.

It is built around the people in a school, with four roles:

- **Students** follow the schedule, chat, share files and study with Pilot.
- **Class admins** run their class: they approve schedule items, handle file requests and moderate the chat.
- **Teachers** join by invitation and see only the classes and subjects they teach.
- **Managers** run the school: users, classes, settings and which app versions may connect.

## How it grew

The first version used a PHP API and Firebase for chat. I rewrote the backend in Node.js with Express and Socket.io, and later moved it from free hosting to my own server: Docker, MySQL and S3-compatible storage, with nightly encrypted backups.

Version 3.0 redesigned the whole app, in light and dark, English and Arabic. Since then each release has added one area: chat gestures and anonymous questions (3.1), assignments and revision plans (3.2), file requests and previews (3.3), and a much bigger Pilot (3.4).

## By the numbers

- 1,465 strings, each in English and Arabic
- Over 130 API endpoints, covered by 200 API tests
- 116 tests in the app
