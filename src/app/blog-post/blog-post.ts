import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogData, IBlog } from '../blog-data';
import { Reveal } from '../reveal';

@Component({
  selector: 'app-blog-post',
  imports: [RouterLink, Reveal, DatePipe],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.css'
})
export class BlogPost {
  blog: IBlog | undefined;

  constructor(private blogData: BlogData, private route: ActivatedRoute) {}

  ngOnInit() {
    const routeParam = this.route.snapshot.paramMap.get('id') ?? '';
    if (routeParam) {
      this.blog = this.blogData.getBlogById(routeParam);
    }
  }
}
