import { Component } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { RouterLink } from '@angular/router';
import { ProjectData,IProject } from '../project-data';

@Component({
  selector: 'app-projects',
  imports:[RouterLink],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})

export class Projects{
  ProjectsArray: IProject[] = [];
  constructor(private projectData:ProjectData){}
  ngOnInit(){
    this.ProjectsArray = this.projectData.getAllProjects();
  }
  

}

