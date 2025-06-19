import { Component,WritableSignal,signal } from '@angular/core';
import { BookData,IBook } from '../book-data';


@Component({
  selector: 'app-philosophy',
  imports: [],
  templateUrl: './philosophy.html',
  styleUrl: './philosophy.css'
})
export class Philosophy {
  BooksArray:WritableSignal<IBook[]> = signal<IBook[]>([]);
  selectedBook:IBook|null=null;
  constructor(private bookData:BookData){}
  ngOnInit(){
    this.BooksArray = this.bookData.getAllBooks();
  }
  selectBook(book:IBook){
    this.selectedBook=book;
  }
  deselectBook(){
    this.selectedBook=null;
  }

}
