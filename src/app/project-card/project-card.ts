import { Component,input } from '@angular/core';
import { IProject,ProjectData } from '../project-data';
import {ActivatedRoute} from '@angular/router';
import { Fetchdb } from '../fetchdb/fetchdb';
@Component({
  selector: 'app-project-card',
  imports: [Fetchdb],
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

    // In your component.ts
  getLinkIcon(linkName: string): string {
    const iconMap: {[key: string]: string} = {
      'github': '⌘',
      'demo': '↗',
      'website': '🌐',
      'documentation': '📄',
      'playstore': '⏵',
      'appstore': ''
    };
    
    const lowerName = linkName.toLowerCase();
    return iconMap[lowerName] || '↗';
  }

  getProjectLinks(links: { [key: string]: string } | undefined): {name: string, url: string}[] {
    if (!links) return [];
    return Object.keys(links).map(name => ({ name, url: links[name] }));
  }
}
