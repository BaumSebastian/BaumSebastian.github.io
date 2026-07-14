# baumsebastian.github.io

My personal website. Plain HTML/CSS/JS, no build step, hosted on GitHub Pages.

## Where things are

- **Bio & role** are in `index.html` (the `#about` section).
- **Links** (github, orcid, ...) are in the `CONFIG` block at the top of `main.js`.
- **Repositories** are in `pinned.json` — one entry per repo, with an optional
  `icon` URL. Stars and latest release/push are fetched live from the GitHub API.
- **Attendances** are in `attendances.json` — with an optional `project`
  link (use a web.archive.org snapshot so it never dies).
- **Publications** are in `publications.json` — auto-generated weekly from my
  ORCID record by `.github/workflows/publications.yml`, so don't edit it by
  hand except to add an `"image": "..."` to an entry (images survive the
  regeneration). New paper? Add it to ORCID and it shows up by itself.
- **Profile picture** is `profile.jpg`.
- **Colors & fonts** are CSS variables at the top of `style.css`.

## Gotchas

- After changing `main.js`, bump the version in `index.html`
  (`main.js?v=2` → `?v=3`) so browsers pick up the new script.
- The publications workflow can be run manually: Actions tab →
  "Refresh publications" → Run workflow.
