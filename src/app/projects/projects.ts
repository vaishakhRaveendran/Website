import { Component } from '@angular/core';
import { RouterLink ,Router} from '@angular/router';
import { ProjectData,IProject } from '../project-data';

@Component({
  selector: 'app-projects',
  imports:[RouterLink],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})

export class Projects{
  ProjectsArray: IProject[] = [];
  isOwner:boolean=true;
  constructor(private projectData:ProjectData,private router:Router){}
  ngOnInit(){
    this.ProjectsArray = this.projectData.getAllProjects();
  }
  addNewProject(){
    this.router.navigate(['/add']);
  }
}

