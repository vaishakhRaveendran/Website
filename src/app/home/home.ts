import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reveal } from '../reveal';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Reveal],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  readonly sections = [
    { path: '/about', label: 'About', note: 'Who I am, and what I keep coming back to.' },
    { path: '/projects', label: 'Work', note: 'Projects I have built, and why I built them.' },
    { path: '/writing', label: 'Writing', note: 'Notes on software, books, and politics.' },
    { path: '/philosophy', label: 'Reading', note: 'Books worth talking over at length.' }
  ];
}
