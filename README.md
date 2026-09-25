# Website

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

## Content backend (Appwrite)

Books and projects are read from [Appwrite](https://appwrite.io) at runtime.
Blog posts are not in Appwrite; they are Markdown files in the repo (see
[Writing posts](#writing-posts-markdown-built-at-build-time)). Before the site will show anything, fill in the placeholders at the top
of [`src/appwrite.ts`](src/appwrite.ts):

- `APPWRITE_ENDPOINT` — your region's Cloud endpoint, e.g. `https://fra.cloud.appwrite.io/v1`
- `APPWRITE_PROJECT_ID` — from Appwrite console → project settings
- `APPWRITE_DATABASE_ID` — the database holding the two tables below

These values are public by design (the web SDK runs in the browser); access is
controlled by table permissions, not by hiding them. Add your site's domain
under **project settings → platforms → Web** so the SDK is allowed to call the
API, and grant **Read** to the **Any** role on each table so visitors can load
content without signing in.

### Tables

Create a database with two tables — `books` and `projects` — with these
columns. The row `$id` is used as the URL segment (`/philosophy/:id`,
`/projects/:id`), so give rows readable custom IDs.

**`books`**

| Column | Type | Required |
| --- | --- | --- |
| `bookName` | String | yes |
| `authorName` | String | yes |
| `description` | String (long) | yes |
| `image` | String (URL) | yes |
| `note` | String | no |

**`projects`**

| Column | Type | Required |
| --- | --- | --- |
| `projectName` | String | yes |
| `description` | String (long) | yes |
| `image` | String (URL) | yes |
| `tags` | String, **array** | no |
| `links` | String (long) | no |

`links` holds a JSON object as a string, e.g.
`{"github":"https://github.com/...","demo":"https://..."}` — Appwrite has no map
column type. Invalid JSON is logged and treated as "no links".

## Writing posts (Markdown, built at build time)

Blog posts live in the repo as Markdown files and are turned into HTML when
the site is built, the same way Hugo or Jekyll work. They support equations,
images, code and a per-post stylesheet. The Writing page lists them newest
first.

### Adding a post

1. **Create a folder** under `content/posts/`. The folder name becomes the URL,
   so `content/posts/my-first-post/` is served at `/posts/my-first-post`. Use
   lowercase words joined by hyphens.

2. **Add `index.md`** to that folder, starting with this header (the
   "frontmatter"):

   ```markdown
   ---
   title: My first post
   date: 2026-09-25
   excerpt: One or two sentences shown on the Writing page.
   ---

   The post starts here.
   ```

   `date` must be `YYYY-MM-DD`; it sets the order on the Writing page. Add
   `draft: true` to the header to keep a post out of the site while you work on it.

3. **Put images in the same folder** and refer to them by file name:

   ```markdown
   ![A short description of the image](diagram.png)
   ```

   For a caption under the image, use a figure instead:

   ```html
   <figure>
     <img src="diagram.png" alt="A short description of the image">
     <figcaption>The caption.</figcaption>
   </figure>
   ```

   Images load lazily as the reader scrolls. SVG, PNG, JPG and WebP all work.

4. **Optionally add `style.css`** to the folder to give this one post its own
   look. It's loaded only on that post's page. Start every rule with
   `.post[data-post="<folder-name>"]` so it can't affect anything else:

   ```css
   .post[data-post="my-first-post"] .page-title { font-size: var(--step-4); }
   .post[data-post="my-first-post"] .post-body h2 { text-transform: uppercase; }
   ```

   The site's tokens (`--ink`, `--paper`, `--step-*`, `--space-*`, …) from
   `src/styles.css` are available.

5. **Preview it** with `npm start` (see [Development server](#development-server)),
   then open `http://localhost:4200/writing`.

6. **Publish** by committing the folder and deploying as usual. No Angular
   code changes are needed.

`content/posts/gradient-descent/` is a complete example that uses every feature.

### What you can write in `index.md`

| You want | Write |
| --- | --- |
| Heading | `## Section title` (the post title is already the page's `#` heading) |
| Bold / italic | `**bold**`, `*italic*` |
| Link | `[text](https://example.com)` |
| Inline math | `$E = mc^2$` |
| Display math | `$$` on its own line, the equation, then `$$` on its own line |
| Code block | a fenced block with the language: ` ```python ` … ` ``` ` |
| Inline code | `` `x = x - lr * grad(x)` `` |
| Quote | `> A quoted line` |
| List | `- item` or `1. item` |
| Table | standard Markdown pipe table |
| Anything else | plain HTML, e.g. `<div class="two-col">…</div>`, styled from `style.css` |

Math is [KaTeX](https://katex.org/docs/supported.html), which supports most
LaTeX math. A typo in an equation shows the source in red instead of breaking
the build. Code highlighting is [highlight.js](https://highlightjs.org/), which
recognises most languages.

### How a post gets rendered

```
content/posts/<slug>/index.md, images, style.css      ← you edit these
        │
        │  npm run posts  (runs automatically before npm start / npm run build)
        │  scripts/build-posts.mjs:
        │    • reads the frontmatter (gray-matter)
        │    • turns Markdown into HTML (marked)
        │    • renders equations to HTML (KaTeX) and colours code (highlight.js)
        │    • points image paths at /posts/<slug>/…
        ▼
public/posts/index.json                ← list of all posts, for the Writing page
public/posts/<slug>/post.json          ← title, date, excerpt + finished HTML
public/posts/<slug>/images, style.css  ← copied as-is
        │
        │  ng build copies public/ into dist/, like any static file
        ▼
Browser
  /writing       → src/app/writing fetches /posts/index.json and lists posts
  /posts/<slug>  → src/app/static-post fetches post.json, inserts the HTML,
                   and adds the post's style.css while the page is open
```

The equations and code are turned into HTML at build time, so the browser does
no Markdown or math work. It only needs the KaTeX stylesheet, which is part of
the global styles in `angular.json`. Shared post styles (figures, code blocks,
tables, quotes) are in the "Static posts" section of `src/styles.css`.

`public/posts/` is generated and git-ignored, so never edit it by hand; it's
deleted and rebuilt on every run. The source of truth is `content/posts/`.

### Commands

| Command | What it does |
| --- | --- |
| `npm start` | Builds the posts, then starts the dev server |
| `npm run posts:watch` | Rebuilds posts whenever a file in `content/` changes. Run it in a second terminal next to `npm start` while writing, then refresh the browser |
| `npm run posts` | Builds the posts once |
| `npm run build` | Builds the posts, then the production site |

Use the `npm` commands, not `ng serve` / `ng build` directly: those skip the
post step, and `/posts/...` will show "Not found." For the same reason, your
hosting provider's build command must be `npm run build`.

## Development server

To start a local development server, run:

```bash
npm start
```

This builds the Markdown posts first, then runs `ng serve`. Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files. Changes under `content/posts/` need `npm run posts:watch` running, as described above.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
npm run build
```

This builds the Markdown posts, then will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
