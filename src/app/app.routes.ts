import { Routes } from '@angular/router';
import { About } from './about/about';
import { Projects } from './projects/projects';
import { ProjectCard } from './project-card/project-card';

export const routes: Routes = [
    {
        path:'about',
        title:'About Me',
        component: About,
    },
    {
        path:'projects',
        title:'My Projects',
        component: Projects,
    },
    {
        path:'philosophy',
        title:'Blurts',
        component: About,
    },
    {
        path:'projects/:id',
        title:'Blurts',
        component: ProjectCard,
    },
];
