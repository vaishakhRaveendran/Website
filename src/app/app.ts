import { Component } from '@angular/core';
import { About } from './about/about';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [About,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Website';
}
