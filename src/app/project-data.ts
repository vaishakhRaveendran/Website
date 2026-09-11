import { Injectable, signal} from '@angular/core';
import { Query } from 'appwrite';
import { tablesDB, APPWRITE_DATABASE_ID, TABLES } from '../appwrite';

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
      const { rows } = await tablesDB.listRows({
        databaseId: APPWRITE_DATABASE_ID,
        tableId: TABLES.projects,
        queries: [Query.limit(100)],
      });
      const projectArray = rows.map(row => ({
        id: row.$id,
        projectName: row['projectName'],
        description: row['description'],
        image: row['image'],
        tags: row['tags'] ?? [],
        links: parseLinks(row['links'])
      }));
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

/**
 * Appwrite has no map column type, so `links` is stored as a JSON string
 * (e.g. `{"github":"https://..."}`). Anything unparseable degrades to no links
 * rather than breaking the whole list.
 */
function parseLinks(value: unknown): { [key: string]: string } {
  if (!value) return {};
  if (typeof value === 'object') return value as { [key: string]: string };
  if (typeof value !== 'string') return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    console.warn('Project "links" is not valid JSON:', value);
    return {};
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
