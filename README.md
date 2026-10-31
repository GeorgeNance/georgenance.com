# George Nance's Portfolio

This is my personal portfolio.

## Writing articles

Create a post with `npm run article -- "Your Article Title"`. All articles have
their own folder, with images beside the Markdown:

```text
content/articles/2026-05-11-shelly/
  index.md
  porch.jpeg
  shelly-2025.jpeg
```

Use ordinary inline relative links, such as `![On the porch](porch.jpeg)`, so images
also display in Obsidian's editing preview. Nuxt Content Assets copies the media
and resolves website URLs during development and static generation; it does not
rewrite the source files.
Article image links and social-preview images use filenames relative to the
article. Previously hotlinked article images are stored locally too. Edit the
images in the article folder; old copies under `public/` preserve existing URLs.

For Obsidian, open this repository's `content` folder as a vault. The included
settings use standard Markdown links and save pasted or dropped images beside
the current note. VS Code's image paste/drop settings do the same for articles.
Use `npm run dev` to preview the actual site at `http://localhost:3080`.

Media placed in the content folders is published as static assets; keep private
research outside this vault. Ulysses' ordinary Markdown mode has limitations
with local images, so this setup is intended for editors that support them.

## Post options

To make an article accessible by URL without listing it publicly, use:

```yaml
published: true
unlisted: true
```

Unlisted articles are generated for direct visits, omitted from article lists, site search,
tags, and the sitemap, and marked `noindex`. Anyone with the URL can read and share them.
Omit `unlisted` or set it to `false` for normal public listing. `published: false`
remains a draft and is unavailable in production.

To hide an article's closing thank-you and share section, add this to its frontmatter:

```yaml
hide_share_prompt: true
```

The section is shown when this option is omitted or set to `false`.

To cap an article's images without cropping them, set a maximum height in pixels:

```yaml
image_max_height: 600
```

Images keep their proportions and remain clickable to enlarge. Other articles are unchanged.



## Tech Stack

1. Nuxt JS
2. Tailwind CSS
3. Vue
