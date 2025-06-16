import { Component } from '@angular/core';
import { About } from './about/about';
import { Footer } from './footer/footer';
import { Projects } from './projects/projects';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [About,Footer,Projects,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Website';
}
