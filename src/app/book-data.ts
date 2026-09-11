import { Injectable, signal } from '@angular/core';
import { Query } from 'appwrite';
import { tablesDB, APPWRITE_DATABASE_ID, TABLES } from '../appwrite';

@Injectable({
  providedIn: 'root'
})
export class BookData {

  private bookData = signal<IBook[]>([]);

  constructor() {
    this.fetchdb();
  }
  /////////////////////////////////////////////////////////////////////////
  async fetchdb(): Promise<void> {
    try {
      const { rows } = await tablesDB.listRows({
        databaseId: APPWRITE_DATABASE_ID,
        tableId: TABLES.books,
        queries: [Query.limit(100)],
      });
      const bookArray = rows.map(row => ({
        id: row.$id,
        authorName: row['authorName'],
        description: row['description'],
        image: row['image'],
        bookName: row['bookName'],
        note: row['note']
      }));
      this.bookData.set(bookArray);
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  }

  getAllBooks(){
    return this.bookData;
  }

  // Get a specific book by ID
  getBookById(id: string): IBook | undefined {
    return this.bookData().find(book => book.id === id);
  }

}
export interface IBook{
  id:string,
  bookName:string,
  image:string,
  authorName:string,
  description:string,
  /** One-line summary for the Reading list; `description` is the full text. */
  note?:string
}
