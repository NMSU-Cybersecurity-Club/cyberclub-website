---
title: "Style reference: every element in the article layout"
date: 2026-11-08
description: "A draft that shows every heading, text style, list, callout, code block, table, and file tree the article layout supports."
author: "Example author"
draft: true
---

This draft is a reference page for the article layout. It stays unpublished while `draft: true` is set. Remove the draft line or set it to `false` to publish it.

## Headings and text

### Third-level heading

#### Fourth-level heading

Ordinary paragraph text. It has **bold text**, *italic text*, ***bold and italic***, ~~struck-through text~~, and `inline code`. Links look like [this external link](https://www.nmsu.edu) and [this link to the news page](/news).

Line breaks inside a paragraph are kept
on the next line when you end the first line with two spaces.

## Lists

- A bulleted item
- Another bulleted item
  - A nested item
  - Another nested item
    - A third level item
- A final bulleted item

1. A numbered item
2. Another numbered item
   1. A nested numbered item
   2. Another nested numbered item
3. A final numbered item

- [x] A completed task
- [ ] An open task

## Quotes and rules

> A plain blockquote. It is useful for quoting a member, a source, or a line from documentation.

---

## Callouts

Each callout is a blockquote whose first line names its type.

> [!note] Note
> Notes add context that the reader should know.

> [!abstract] Summary
> A short summary of the section or article.

> [!tip] Tip
> A tip suggests a better way to do something.

> [!success] Success
> Use this for a result that worked.

> [!question] Question
> Use this to pose a question the reader might have.

> [!warning] Warning
> A warning points out something that could cause problems.

> [!danger] Danger
> A danger callout is for something that can cause serious harm.

> [!bug] Bug
> A bug callout describes a known problem and its workaround.

## Code blocks

Shell commands use the `bash` language. The language icon appears in the corner.

```bash
docker compose up --build
```

JSON uses the `json` language.

```json
{
  "academicYear": "2025–2026",
  "leaders": [
    { "role": "President", "name": "Example Person" }
  ]
}
```

YAML, SQL, and JavaScript each get their own label.

```yaml
title: "Example"
draft: false
```

```sql
SELECT name, role FROM leaders WHERE academic_year = '2026–2027';
```

```ts
const greeting: string = 'Hello, club'
console.log(greeting)
```

A block with no language still gets the same frame and copy button.

```
plain text block
with no language set
```

A long block collapses so it doesn't dominate the page, and an expand control shows the rest.

```bash
#!/usr/bin/env bash
# Build a small lab environment for a CTF practice session.
set -euo pipefail

LAB_DIR="${HOME}/ctf-lab"
mkdir -p "${LAB_DIR}/challenges" "${LAB_DIR}/writeups"

for challenge in web crypto forensics osint; do
  mkdir -p "${LAB_DIR}/challenges/${challenge}"
  echo "Created ${challenge} workspace"
done

echo "Lab ready at ${LAB_DIR}"
echo "Start with the challenges directory and keep notes in writeups."
echo "Remember to remove any sample flags before you publish a writeup."
```

## Files and folders

A file tree shows a project's structure. Folders open and close.

<div class="file-tree">
<ul class="ft-list">
<li class="ft-item ft-item-folder">
<details class="ft-folder" open>
<summary class="ft-row"><span class="ft-chevron" aria-hidden="true"></span><span class="ft-icon ft-icon-folder" aria-hidden="true"></span><span class="ft-name">src</span></summary>
<ul class="ft-children">
<li class="ft-item ft-item-folder">
<details class="ft-folder" open>
<summary class="ft-row"><span class="ft-chevron" aria-hidden="true"></span><span class="ft-icon ft-icon-folder" aria-hidden="true"></span><span class="ft-name">pages</span></summary>
<ul class="ft-children">
<li class="ft-item ft-item-file" data-ext="astro">
<div class="ft-row"><span class="ft-spacer" aria-hidden="true"></span><span class="ft-icon ft-icon-file" aria-hidden="true"></span><span class="ft-name">index.astro</span></div>
</li>
<li class="ft-item ft-item-file" data-ext="astro">
<div class="ft-row"><span class="ft-spacer" aria-hidden="true"></span><span class="ft-icon ft-icon-file" aria-hidden="true"></span><span class="ft-name">news.astro</span></div>
</li>
</ul>
</details>
</li>
<li class="ft-item ft-item-file" data-ext="css">
<div class="ft-row"><span class="ft-spacer" aria-hidden="true"></span><span class="ft-icon ft-icon-file" aria-hidden="true"></span><span class="ft-name">main.css</span></div>
</li>
</ul>
</details>
</li>
<li class="ft-item ft-item-file" data-ext="json">
<div class="ft-row"><span class="ft-spacer" aria-hidden="true"></span><span class="ft-icon ft-icon-file" aria-hidden="true"></span><span class="ft-name">package.json</span></div>
</li>
</ul>
</div>

## Tables

| Element | Where it is used | Notes |
| --- | --- | --- |
| Headings | Titles and sections | Use the second level for main sections |
| Callouts | Notes and warnings | Name the type on the first line |
| Code blocks | Commands and config | Set a language when you can |
| Tables | Comparisons and schedules | Scroll sideways on small screens |

## Images

![The club shield logo](/brand-shield-color.svg)

Images are shown at the width of the article and keep their proportions. Place image files in `public/` and reference them from the root, as in the example above.
