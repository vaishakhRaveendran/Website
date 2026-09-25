// Static post generator.
//
// Turns every content/posts/<slug>/index.md into ready-made HTML at build time:
//   content/posts/<slug>/index.md + assets  →  public/posts/<slug>/post.json + assets
// and writes public/posts/index.json listing every post, newest first.
//
// Runs before `npm start` / `npm run build`; `npm run posts:watch` rebuilds on save.

import { readdir, readFile, writeFile, mkdir, rm, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { Marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'content', 'posts');
const outDir = join(root, 'public', 'posts');

function createRenderer(slug) {
  const marked = new Marked(
    markedHighlight({
      emptyLangClass: 'hljs',
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
    }),
    // $…$ inline, $$…$$ on its own line for display math.
    markedKatex({ throwOnError: false, nonStandard: true }),
  );

  // Relative image paths resolve against the post's own folder.
  marked.use({
    renderer: {
      image({ href, title, text }) {
        const src = /^([a-z]+:|\/)/i.test(href) ? href : `/posts/${slug}/${href}`;
        const t = title ? ` title="${title}"` : '';
        return `<img src="${src}" alt="${text}"${t} loading="lazy">`;
      },
    },
  });
  return marked;
}

// Raw <img src="x.svg"> written inside HTML blocks (e.g. <figure>) also needs rewriting.
function rewriteRawImages(html, slug) {
  return html.replace(/<img\s+([^>]*?)src="(?![a-z]+:|\/)([^"]+)"([^>]*)>/gi, (_, pre, src, post) => {
    const lazy = /loading=/.test(pre + post) ? '' : ' loading="lazy"';
    return `<img ${pre}src="/posts/${slug}/${src}"${post}${lazy}>`;
  });
}

async function build() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  if (!existsSync(srcDir)) {
    await writeFile(join(outDir, 'index.json'), '[]');
    return;
  }

  const index = [];
  for (const entry of await readdir(srcDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const postSrc = join(srcDir, slug);
    const mdPath = join(postSrc, 'index.md');
    if (!existsSync(mdPath)) continue;

    const { data, content } = matter(await readFile(mdPath, 'utf8'));
    if (data.draft) continue;

    const html = rewriteRawImages(await createRenderer(slug).parse(content), slug);
    const meta = {
      slug,
      title: data.title ?? slug,
      // YAML turns bare dates into Date objects; keep ISO 'YYYY-MM-DD'.
      date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ''),
      excerpt: data.excerpt ?? '',
      hasStyle: existsSync(join(postSrc, 'style.css')),
    };

    const postOut = join(outDir, slug);
    await cp(postSrc, postOut, { recursive: true, filter: src => !src.endsWith('.md') });
    await writeFile(join(postOut, 'post.json'), JSON.stringify({ ...meta, html }));
    index.push(meta);
  }

  index.sort((a, b) => b.date.localeCompare(a.date));
  await writeFile(join(outDir, 'index.json'), JSON.stringify(index, null, 2));
  console.log(`posts: built ${index.length} post(s) → public/posts`);
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
