import { Routes } from '@angular/router';
import { About } from './about/about';
import { Projects } from './projects/projects';
import { ProjectCard } from './project-card/project-card';
import { Philosophy } from './philosophy/philosophy';
import { BookCard } from './book-card/book-card';
import { BlogPost } from './blog-post/blog-post';
import { Writing } from './writing/writing';
import { Home } from './home/home';

export const routes: Routes = [
    {
        path:'',
        title:'Vaishakh Raveendran',
        component: Home,
    },
    {
        path:'about',
        title:'About',
        component: About,
    },
    {
        path:'projects',
        title:'Work',
        component: Projects,
    },
    {
        path:'writing',
        title:'Writing',
        component: Writing,
    },
    {
        path:'philosophy',
        title:'Reading',
        component: Philosophy,
    },
    {
        path:'projects/:id',
        title:'Project',
        component: ProjectCard,
    },
    {
        path:'philosophy/:id',
        title:'Book',
        component: BookCard,
    },
    {
        path:'blogs/:id',
        title:'Blog',
        component: BlogPost,
    },
    {
        path:'**',
        redirectTo:'',
    },
];
