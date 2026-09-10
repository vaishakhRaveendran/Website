import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogData, IBlog } from '../blog-data';
import { Reveal } from '../reveal';

@Component({
  selector: 'app-writing',
  imports: [RouterLink, Reveal, DatePipe],
  templateUrl: './writing.html'
})
export class Writing {
  BlogsArray = signal<IBlog[]>([]);

  constructor(private blogData: BlogData) {}

  ngOnInit() {
    this.BlogsArray = this.blogData.getAllBlogs();
  }
}
