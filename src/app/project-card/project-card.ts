import { Component,input } from '@angular/core';
import { IProject } from '../projects/projects';
@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {
   project = input<IProject>();
   getProjectLinks(links: { [key: string]: string } | undefined) {
    if (!links) return [];
    return Object.entries(links).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      url: value
    }));
  }
}
