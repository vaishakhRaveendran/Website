import { Injectable, signal } from '@angular/core';
import { Query } from 'appwrite';
import { tablesDB, APPWRITE_DATABASE_ID, TABLES } from '../appwrite';

@Injectable({
  providedIn: 'root'
})
export class BlogData {

  private blogData = signal<IBlog[]>([]);
  /** True once the fetch has settled (success or failure). Until then an
      empty list or missing id means "not loaded yet", not "doesn't exist". */
  readonly loaded = signal(false);

  constructor() {
    this.fetchdb();
  }

  async fetchdb(): Promise<void> {
    try {
      const { rows } = await tablesDB.listRows({
        databaseId: APPWRITE_DATABASE_ID,
        tableId: TABLES.blogs,
        // Newest first — the Writing page lists posts in reverse date order.
        queries: [Query.orderDesc('date'), Query.limit(100)],
      });
      const blogArray = rows.map(row => ({
        id: row.$id,
        title: row['title'],
        excerpt: row['excerpt'],
        date: row['date'],
        image: row['image'],
        body: row['body']
      }));
      this.blogData.set(blogArray);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    } finally {
      this.loaded.set(true);
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
