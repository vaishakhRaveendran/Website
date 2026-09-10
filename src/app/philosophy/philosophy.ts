import { Component, WritableSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookData,IBook } from '../book-data';
import { Reveal } from '../reveal';


@Component({
  selector: 'app-philosophy',
  imports: [RouterLink, Reveal],
  templateUrl: './philosophy.html',
  styleUrl: './philosophy.css'
})
export class Philosophy {
  BooksArray:WritableSignal<IBook[]> = signal<IBook[]>([]);
  constructor(private bookData:BookData){}
  ngOnInit(){
    this.BooksArray = this.bookData.getAllBooks();
  }
}
