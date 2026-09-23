import { Component, computed } from '@angular/core';
import { IProject,ProjectData } from '../project-data';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Reveal } from '../reveal';
import { parseParagraphs, Segment } from '../rich-text';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, Reveal],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {
  private readonly id: string;

  // Computed from the data signal, so a direct load or refresh (data still in
  // flight) fills in once the fetch lands instead of showing "Not found".
  readonly project = computed<IProject | undefined>(() => this.projectData.getProjectById(this.id));
  readonly paragraphs = computed<Segment[][]>(() => parseParagraphs(this.project()?.description));
  readonly loaded;

  constructor(private projectData: ProjectData, route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('id') ?? '';
    this.loaded = projectData.loaded;
  }

  getProjectLinks(links: { [key: string]: string } | undefined): {name: string, url: string}[] {
    if (!links) return [];
    return Object.keys(links).map(name => ({ name, url: links[name] }));
  }
}
