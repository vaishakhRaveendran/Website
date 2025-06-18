import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
@Component({
  selector: 'app-fetchdb',
  imports: [CommonModule],
  templateUrl: './fetchdb.html',
  styleUrl: './fetchdb.css'
})
export class Fetchdb implements OnInit {
  projects:any[]=[];
  construcotr(){}
  async ngOnInit() {
    await this.fetchdb();
  }
  async fetchdb() {
    const projectsCol = collection(db, 'projects');
    const projectSnapshot = await getDocs(projectsCol);
    this.projects = projectSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Projects fetched:', this.projects);
  }
}
