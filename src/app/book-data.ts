import { Injectable, signal } from '@angular/core';
import { collection, getDocs } from '@angular/fire/firestore';
import { db } from '../firebase';
import { USE_DUMMY_DATA, DUMMY_BOOKS } from './dummy-data';

@Injectable({
  providedIn: 'root'
})
export class BookData {

   private bookData = signal<IBook[]>([]);
  constructor() {
    if (USE_DUMMY_DATA) {
      this.bookData.set(DUMMY_BOOKS);
    } else {
      this.fetchdb();
    }
  }
  /////////////////////////////////////////////////////////////////////////
  async fetchdb(): Promise<void> {
  try {
    const projectsCol = collection(db, 'books');
    const projectSnapshot = await getDocs(projectsCol);
    const bookArray= projectSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        authorName: data['authorName'],
        description: data['description'],
        image: data['image'],
        bookName:data['bookName'],
        note: data['note']
      };
    });
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
