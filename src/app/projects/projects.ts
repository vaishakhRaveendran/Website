import { Component,signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectData,IProject } from '../project-data';
import { Reveal } from '../reveal';

@Component({
  selector: 'app-projects',
  imports:[RouterLink, Reveal],
  templateUrl: './projects.html'
})

export class Projects{
  ProjectsArray = signal<IProject[]>([]);
  constructor(private projectData:ProjectData){}
  ngOnInit(){
    this.ProjectsArray = this.projectData.getAllProjects();
  }
}
