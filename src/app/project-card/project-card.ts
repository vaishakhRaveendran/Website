import { Component,input } from '@angular/core';
import { IProject,ProjectData } from '../project-data';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {
   project : IProject|undefined;
   constructor(private projectData:ProjectData, private router: ActivatedRoute,){}
   ngOnInit(){
    const routeParam = parseInt(this.router.snapshot.paramMap.get('id')??'0');
    if (routeParam) {
      this.project = this.projectData.getProjectById(routeParam);
      console.log(this.project?.description);
   }}

   getProjectLinks(links: { [key: string]: string } | undefined) {
    if (!links) return [];
    return Object.entries(links).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      url: value
    }));
  }
}
