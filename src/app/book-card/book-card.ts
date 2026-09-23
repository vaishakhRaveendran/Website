import { Component, computed } from '@angular/core';
import { BookData, IBook } from '../book-data';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Reveal } from '../reveal';
import { parseParagraphs, Segment } from '../rich-text';

@Component({
  selector: 'app-book-card',
  imports: [RouterLink, Reveal],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCard {
  private readonly id: string;

  // Computed from the data signal, so a direct load or refresh (data still in
  // flight) fills in once the fetch lands instead of showing "Not found".
  readonly book = computed<IBook | undefined>(() => this.bookData.getBookById(this.id));
  readonly paragraphs = computed<Segment[][]>(() => parseParagraphs(this.book()?.description));
  readonly loaded;

  constructor(private bookData: BookData, route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('id') ?? '';
    this.loaded = bookData.loaded;
  }
}
