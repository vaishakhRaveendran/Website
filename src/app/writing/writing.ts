import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Reveal } from '../reveal';

/** One entry of public/posts/index.json, written by scripts/build-posts.mjs. */
interface IPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date string, e.g. '2026-09-24'. */
  date: string;
}

@Component({
  selector: 'app-writing',
  imports: [RouterLink, Reveal, DatePipe],
  templateUrl: './writing.html'
})
export class Writing {
  /** Posts from content/posts, already sorted newest first by the build step. */
  readonly posts = signal<IPostSummary[]>([]);

  constructor() {
    this.load();
  }

  private async load(): Promise<void> {
    try {
      const res = await fetch('/posts/index.json');
      // The dev server answers unknown paths with index.html, so check the type too.
      if (res.ok && res.headers.get('content-type')?.includes('json')) {
        this.posts.set(await res.json());
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
}
