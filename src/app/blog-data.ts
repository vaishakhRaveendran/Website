import { Injectable, signal } from '@angular/core';
import { collection, getDocs } from '@angular/fire/firestore';
import { db } from '../firebase';
import { USE_DUMMY_DATA, DUMMY_BLOGS } from './dummy-data';

@Injectable({
  providedIn: 'root'
})
export class BlogData {

  private blogData = signal<IBlog[]>([]);

  constructor() {
    if (USE_DUMMY_DATA) {
      this.blogData.set(DUMMY_BLOGS);
    } else {
      this.fetchdb();
    }
  }

  async fetchdb(): Promise<void> {
  try {
    const blogsCol = collection(db, 'blogs');
    const blogSnapshot = await getDocs(blogsCol);
    const blogArray = blogSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data['title'],
        excerpt: data['excerpt'],
        date: data['date'],
        image: data['image'],
        body: data['body']
      };
    });
    this.blogData.set(blogArray);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  }

  getAllBlogs(){
    return this.blogData;
  }

  // Get a specific blog by ID
  getBlogById(id: string): IBlog | undefined {
    return this.blogData().find(blog => blog.id === id);
  }

}

export interface IBlog {
  id: string;
  title: string;
  excerpt: string;
  /** ISO date string, e.g. '2026-04-18'. */
  date: string;
  image?: string;
  /** Full post, one string per paragraph. */
  body?: string[];
}
