import { Injectable, signal } from '@angular/core';
import { collection, getDocs } from '@angular/fire/firestore';
import { db } from '../firebase';

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
    const projectsCol = collection(db, 'books');
    const projectSnapshot = await getDocs(projectsCol);
    const bookArray= projectSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        authorName: data['authorName'],
        description: data['description'],
        image: data['image'],
        bookName:data['bookName']
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

}
export interface IBook{
  id:string,
  bookName:string,
  image:string,
  authorName:string,
  description:string
}
