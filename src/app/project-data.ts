import { Injectable, signal} from '@angular/core';
import { collection, getDocs } from '@angular/fire/firestore';
import { db } from '../firebase';

@Injectable({
  providedIn: 'root'
})
export class ProjectData{

  private projectData = signal<IProject[]>([]);

  constructor() {
    this.fetchdb();
  }

  async fetchdb(): Promise<void> {
  try {
    const projectsCol = collection(db, 'projects');
    const projectSnapshot = await getDocs(projectsCol);
    const projectArray= projectSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        projectName: data['projectName'],
        description: data['description'],
        image: data['image'],
        tags: data['tags'],
        links: data['links']
      };
    });
    this.projectData.set(projectArray);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  }

  getAllProjects(){
    return this.projectData;
  }

  // Get a specific project by ID
  getProjectById(id: string): IProject | undefined {
    return this.projectData().find(project => project.id === id);
  }

}


export interface IProject {
    id:string,
    projectName: string;
    description: string;
    image: string;
    tags: string[];
    links: { [key: string]: string };
}

