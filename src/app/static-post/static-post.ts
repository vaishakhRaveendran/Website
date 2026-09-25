import { Component, OnDestroy, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Reveal } from '../reveal';

/** Shape of public/posts/<slug>/post.json, written by scripts/build-posts.mjs. */
export interface IStaticPost {
  slug: string;
  title: string;
  /** ISO date string, e.g. '2026-09-24'. */
  date: string;
  excerpt: string;
  /** The post folder ships its own style.css. */
  hasStyle: boolean;
  html: string;
}

@Component({
  selector: 'app-static-post',
  imports: [RouterLink, Reveal, DatePipe],
  templateUrl: './static-post.html',
  styleUrl: './static-post.css'
})
export class StaticPost implements OnDestroy {
  readonly slug: string;
  readonly post = signal<IStaticPost | undefined>(undefined);
  /** True once the fetch has settled, so a missing post shows "Not found". */
  readonly loaded = signal(false);

  // The HTML is generated at build time from Markdown in this repo, never from
  // user input, so it is trusted. Angular's sanitizer would otherwise strip the
  // inline styles KaTeX relies on to lay out equations.
  readonly html = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.post()?.html ?? '')
  );

  private styleLink?: HTMLLinkElement;
  private destroyed = false;

  constructor(private sanitizer: DomSanitizer, route: ActivatedRoute) {
    this.slug = route.snapshot.paramMap.get('slug') ?? '';
    this.load();
  }

  private async load(): Promise<void> {
    try {
      const res = await fetch(`/posts/${encodeURIComponent(this.slug)}/post.json`);
      // The dev server answers unknown paths with index.html, so check the type too.
      if (res.ok && res.headers.get('content-type')?.includes('json')) {
        const post: IStaticPost = await res.json();
        // Skip if the reader already navigated away, or the link would outlive the page.
        if (post.hasStyle && !this.destroyed) this.attachStyle();
        this.post.set(post);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      this.loaded.set(true);
    }
  }

  /** Loads the post's own stylesheet for as long as this page is open. */
  private attachStyle(): void {
    this.styleLink = document.createElement('link');
    this.styleLink.rel = 'stylesheet';
    this.styleLink.href = `/posts/${encodeURIComponent(this.slug)}/style.css`;
    document.head.appendChild(this.styleLink);
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.styleLink?.remove();
  }
}
