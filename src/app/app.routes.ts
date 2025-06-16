import { Routes } from '@angular/router';
import { About } from './about/about';
import { Projects } from './projects/projects';

export const routes: Routes = [
    {
        path:'about',
        title:'About Me',
        component: About,
    },
    {
        path:'',
        title:'Home Page',
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
];
