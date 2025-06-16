import { Component } from '@angular/core';
import { About } from './about/about';

@Component({
  selector: 'app-root',
  imports: [About],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Website';
}
