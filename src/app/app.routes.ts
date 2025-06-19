import { Routes } from '@angular/router';
import { About } from './about/about';
import { Projects } from './projects/projects';
import { ProjectCard } from './project-card/project-card';
import { AddProject } from './add-project/add-project';
import { navAuthGuard } from './nav-auth-guard';
import { Philosophy } from './philosophy/philosophy';

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
        title:'I do More',
        component: Philosophy,
    },
    {
        path:'projects/:id',
        title:'Blurts',
        component: ProjectCard,
    },
    {
        path:'add',
        title:'More Blurts',
        component: AddProject,
        canDeactivate:[navAuthGuard]
    },
];
