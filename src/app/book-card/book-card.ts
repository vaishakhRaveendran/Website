import { Component } from '@angular/core';
import { BookData, IBook } from '../book-data';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Reveal } from '../reveal';

@Component({
  selector: 'app-book-card',
  imports: [RouterLink, Reveal],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCard {
  book: IBook | undefined;

  constructor(private bookData: BookData, private route: ActivatedRoute) {}

  ngOnInit() {
    const routeParam = this.route.snapshot.paramMap.get('id') ?? '';
    if (routeParam) {
      this.book = this.bookData.getBookById(routeParam);
    }
  }
}
