---
# About page content. The path is rendered as a tree: one entry per step, in order.
# "now: true" marks the step you're on. Keep "props" short: label + value.
headline: I’m Abedalrahman, a self-taught Flutter developer.
intro: I build cross-platform apps with Flutter and the backends they need, in Node.js or Laravel. I learned it by building, one layer at a time, and I still learn something new every week.
path:
  - id: web
    title: The web
    tools: HTML · CSS
    body: Where it started. Building simple web pages showed me I liked making things people could open and use.
    props:
      - k: learned
        v: How a page is put together
      - k: led to
        v: Wanting to understand programming properly
  - id: python
    title: Python
    tools: Python
    body: I picked up Python to learn the fundamentals, how to think through a problem in code.
    props:
      - k: learned
        v: Programming fundamentals
      - k: led to
        v: Looking for a way to build real apps
  - id: flutter
    title: Dart and Flutter
    tools: Dart · Flutter · Firebase
    body: This is where I found my stack. One codebase for Android, the web and desktop, and a UI toolkit I enjoy working in. I started with Firebase for the backend, then tried the main ways to store data and manage state.
    props:
      - k: local storage
        v: Hive, SQFLite, Shared Preferences
      - k: state
        v: GetX, Provider, Bloc
      - k: used in
        v: SSociety, Notes
  - id: php
    title: PHP and SQL
    tools: PHP · MySQL · REST
    body: To stop depending on ready-made backends, I started writing my own APIs in PHP and learned SQL properly.
    props:
      - k: learned
        v: REST API design, relational data
      - k: led to
        v: Owning a feature end to end, server included
  - id: node
    title: Node.js and real time
    tools: Node.js · Express · Socket.io
    body: SSociety’s backend is Node.js and Express, with live updates over Socket.io and role-based access.
    props:
      - k: used in
        v: SSociety
      - k: learned
        v: Real-time features, roles and permissions
  - id: laravel
    title: Laravel
    tools: Laravel · PHP
    now: true
    body: Right now I’m going deeper on full-stack work with Laravel.
    props:
      - k: status
        v: Learning and building with it now
principles:
  - title: Structure first
    text: Clean Architecture keeps screens, logic and data apart, so features can change without breaking each other.
  - title: Offline is a feature
    text: Apps read from local storage first and sync when they can. A weak connection shouldn’t mean a blank screen.
  - title: Both sides of the API
    text: I design the endpoint together with the screen that calls it, because I build both.
---
