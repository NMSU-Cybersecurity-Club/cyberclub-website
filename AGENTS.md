# Agent Instructions

## Container & Compose Setup

- **`Dockerfile`**: Uses `node:24-bookworm-slim`, installs dependencies with `npm ci`, exposes `4321`, and runs `npm run dev -- --host 0.0.0.0 --port 4321 --strictPort`.
- **`compose.yaml`**: Runs service `web` on `4321:4321` with bind mounts `./src:/app/src:z`, `./public:/app/public:z`, and `./astro.config.mjs:/app/astro.config.mjs:z`. Keep the `:z` SELinux shared-label flag on those mounts for Podman compatibility (without `:z`, the container fails with `EACCES: permission denied, open '/app/astro.config.mjs'`).

## Build, Preview & Cleanup Commands

Run these `docker compose` commands from the project root:

- **Verify static build:**
  ```bash
  docker compose run --rm --build web npm run build
  ```
- **Start dev server (daemon):**
  Run `docker compose up --build` (add `-d` to run in the background). Astro serves the site at `http://localhost:4321/` and watches `src`, `public`, and `astro.config.mjs`.
- **Stop / reset stale container:**
  If `docker compose up` fails with a missing `exec.fifo` error or you need to clean up, run:
  ```bash
  docker compose down
  ```

## Setup for New Contributors

- **GSAP skills:** Run `npx skills install -a opencode` to restore the skills listed in `skills-lock.json`. They install into `.agents/skills/`, which OpenCode reads.
- **Impeccable skill:** Run `npx impeccable install --project`. It installs skills for the agent you use, so they don't need to be committed.
- **Local-only files:** `.impeccable/config.local.json`, `.impeccable/hook.cache.json`, and `.impeccable/questions/` are per-machine state. Don't commit them.
