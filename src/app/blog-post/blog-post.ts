import { Component, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogData, IBlog } from '../blog-data';
import { Reveal } from '../reveal';
import { parseParagraphs, Segment } from '../rich-text';

@Component({
  selector: 'app-blog-post',
  imports: [RouterLink, Reveal, DatePipe],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.css'
})
export class BlogPost {
  private readonly id: string;

  // Computed from the data signal, so a direct load or refresh (data still in
  // flight) fills in once the fetch lands instead of showing "Not found".
  readonly blog = computed<IBlog | undefined>(() => this.blogData.getBlogById(this.id));
  // Posts without a body yet fall back to their excerpt.
  readonly paragraphs = computed<Segment[][]>(() => {
    const blog = this.blog();
    return parseParagraphs(blog?.body?.length ? blog.body : blog?.excerpt);
  });
  readonly loaded;

  constructor(private blogData: BlogData, route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('id') ?? '';
    this.loaded = blogData.loaded;
  }
}
