# NMSU Cybersecurity Club

## Run with Docker

With Docker and Docker Compose installed, run:

```sh
docker compose up --build
```

Open <http://localhost:4321>. Changes to `src`, `public`, and `astro.config.mjs` are reflected in the development server. After changing dependencies in `package.json` or `package-lock.json`, rebuild with `docker compose up --build`.

Stop the server with Ctrl+C, then run `docker compose down` to remove the container.

To run the tests, use `npm test` in a local install (`npm install` first), or run `docker compose run --rm --no-deps web npm test`.

## Pages

- `/` — Home: hero, intro, and mission.
- `/events` — Meetings and the club calendar link.
- `/activities` — Competitions, projects, and workshops.
- `/news` — News and writeups from `src/content/news/`.
- `/members` — Leadership by academic year.
- `/sponsorship` — How to start a conversation about support.
- `/contact` — Email and other channels.

## Adding news and writeups

Create a Markdown file in `src/content/news/`. The filename becomes its URL: `my-writeup.md` appears at `/news/my-writeup/`. Use a unique, lowercase, hyphenated filename and avoid renaming published files, since that changes their URLs.

```markdown
---
title: "Your title"
date: 2026-11-08
description: "A short summary for the news list."
author: "Author name"
draft: false
---

Your article goes here. Use Markdown for headings, links, lists, images, and fenced code blocks.
```

`title`, `date`, and `description` are required; `author` is optional. Set `draft: true` to keep an entry out of both the news list and the built site. The included `example-draft.md` is a template and is not published. Remove `draft` or set it to `false` when ready. Dates are displayed in UTC, and entries are sorted newest first; a future date does not schedule publication. Place images in `public/` and reference them with paths such as `![Description](/images/photo.jpg)`.

Preview with Docker, then commit the Markdown and any images to Git. The site must be rebuilt and deployed for changes to go live. No GitHub Actions deployment workflow is configured yet; the correct workflow depends on where the site will be hosted.

## Meeting and event listings

The Events page is ready to link to a published, read-only Outlook calendar. Until a calendar is configured, it links to the club's Crimson Connection events page instead.

To connect the calendar, edit `src/data/calendar.json` and set `htmlUrl` to Outlook's public **HTML** publishing link. Optionally set `icsUrl` to the published **ICS** subscription link. Leave `icsUrl` empty if there is none. Only HTTPS URLs are accepted. These links become public on the website: do not use a private sharing invitation or publish a calendar with private information. Confirm the HTML link works in a private browser window without signing in.

Rebuild and deploy once after changing the links. Visitors then open Outlook's calendar directly, so event changes don't require a site rebuild, though Outlook or calendar subscribers may cache updates. This is a link to the full calendar, not an embedded calendar or an automatically filtered two-week event list. Outlook's embedding policy varies; the public example checked during development did not allow a reliable embed.

## Motion

Animations use GSAP (`src/lib/motion.ts`), installed with `npm install`. The hero intro, page headings, scroll reveals, the leadership panels, and the mobile menu are all set up there. Visitors who have reduced motion turned on see none of these effects. To remove the animations, delete `src/lib/motion.ts`, remove the script at the bottom of `src/layouts/base.astro`, and uninstall `gsap`.

## Brand assets

The header logo is `public/brand-shield-color.svg`. The browser icon is `public/brand-shield-mono.svg`. The hero uses `public/images/binary-banner.webp`. `public/brand-roadrunner.svg` and `public/brand-roadrunner-head.svg` are available for placement, and `public/brand-shield-roadrunner.svg` is also available. All SVGs in `public/` have been optimized; keep the optimized versions for web use and store any original source files outside the project.

## Updating leadership

Edit `src/data/leadership.json` to update the Members page. Set `current` to the confirmed current academic year and its leaders. When a new team takes office, move the old `current` entry to the beginning of `past` and add the new team as `current`. Keep historical years newest first; the page shows them as expandable sections. Each entry uses this format (the names below are examples, not club records):

```json
{
  "academicYear": "2025–2026",
  "leaders": [
    { "role": "President", "name": "Example Person" }
  ]
}
```

Leave `current` as `null` and `past` as an empty array when no information has been confirmed. Only publish names with the members' approval.

Officers use a portrait placeholder by default. To add an approved photo, place it in `public/` and add an `image` path to that officer, for example:

```json
{ "role": "President", "name": "Example Person", "image": "/images/example-person.jpg" }
```

Photos are cropped to a square within the portrait circle. Obtain the officer's approval before publishing their photo.

Add optional `links` to any officer in the current or a past team. Use a descriptive `label` and a full `https://` URL for each link:

```json
{
  "role": "President",
  "name": "Example Person",
  "links": [
    { "label": "LinkedIn", "url": "https://www.linkedin.com/in/example-person/" },
    { "label": "Portfolio", "url": "https://example.com/" }
  ]
}
```

LinkedIn and GitHub links get their respective icons; other websites use a globe. Invalid or non-HTTP(S) links are not shown. Only publish links with the officer's approval.
