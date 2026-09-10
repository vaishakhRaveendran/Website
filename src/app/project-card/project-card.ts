import { Component } from '@angular/core';
import { IProject,ProjectData } from '../project-data';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Reveal } from '../reveal';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, Reveal],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {
   project : IProject|undefined;
   constructor(private projectData:ProjectData, private router:ActivatedRoute,){}

   ngOnInit(){
    const routeParam = this.router.snapshot.paramMap.get('id')??'0';
    if (routeParam) {
      this.project = this.projectData.getProjectById(routeParam);
   }}

  getProjectLinks(links: { [key: string]: string } | undefined): {name: string, url: string}[] {
    if (!links) return [];
    return Object.keys(links).map(name => ({ name, url: links[name] }));
  }
}
