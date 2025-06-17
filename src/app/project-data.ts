import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProjectData {
   private projectData : IProject[] = [
       {
         id:11,
         projectName: "E-Commerce Website",
         description: "A full-stack e-commerce platform built with Angular and Node.js featuring user authentication, product catalog, shopping cart, and payment integration.",
         tags: ["Angular", "Node.js", "MongoDB", "TypeScript", "Bootstrap"],
         image:"https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         links: {
           "github": "https://github.com/username/ecommerce-app",
           "demo": "https://ecommerce-demo.netlify.app",
           "design": "https://www.figma.com/design/ecommerce-mockup"
         }
       },
       {
         id:12,
         projectName: "Task Management App",
         description: "A productivity application with drag-and-drop functionality, real-time collaboration, and deadline tracking. Built using React and Firebase.",
         tags: ["React", "Firebase", "Material-UI", "JavaScript", "CSS3"],
         image:"https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         links: {
           "github": "https://github.com/username/task-manager",
           "demo": "https://taskmanager-app.vercel.app"
         }
       },
       {
         id:13,
         projectName: "Weather Dashboard",
         description: "A responsive weather application that displays current conditions, 7-day forecast, and interactive maps using OpenWeatherMap API.",
         tags: ["Vue.js", "API Integration", "Chart.js", "SCSS", "PWA"],
         image:"https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         links: {
           "github": "https://github.com/username/weather-dashboard",
           "demo": "https://weather-dash.herokuapp.com",
           "design": "https://dribbble.com/shots/weather-ui"
         }
       },
       {
         id:14,
         projectName: "Portfolio Website",
         image:"https://plus.unsplash.com/premium_photo-1690749740487-01bbb8e51e71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGphcGFufGVufDB8fDB8fHww",
         description: "A modern, responsive portfolio website showcasing projects and skills with smooth animations and dark/light theme toggle.",
         tags: ["HTML5", "CSS3", "JavaScript", "GSAP", "Responsive Design"],
         links: {
           "github": "https://github.com/username/portfolio",
           "demo": "https://myportfolio.dev"
         }
       },
       {
         id:15,
         projectName: "Chat Application",
         image:"https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         description: "Real-time messaging application with group chats, file sharing, and emoji support. Built with Socket.io and Express.js.",
         tags: ["Socket.io", "Express.js", "MongoDB", "JWT", "Real-time"],
         links: {
           "github": "https://github.com/username/chat-app",
           "demo": "https://chatapp-demo.onrender.com"
         }
       },
       {
         id:16,
         projectName: "Machine Learning Image Classifier",
         image:"https://plus.unsplash.com/premium_photo-1690749740487-01bbb8e51e71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGphcGFufGVufDB8fDB8fHww",
         description: "An image classification model using TensorFlow to identify objects in photos with 95% accuracy. Includes web interface for testing.",
         tags: ["Python", "TensorFlow", "Flask", "OpenCV"],
         links: {
           "github": "https://github.com/username/ml-classifier",
           "notebook": "https://colab.research.google.com/ml-notebook",
           "demo": "https://ml-classifier.streamlit.app"
         }
       }
     ];

     //Get all projects
     getAllProjects(): IProject[] {
      return this.projectData;
    }
  
    // Get a specific project by ID
    getProjectById(id: number): IProject | undefined {
      return this.projectData.find(project => project.id === id);
    }
}
export interface IProject {
  id:number,
  projectName: string;
  description: string;
  image: string;
  tags: string[];
  links: { [key: string]: string };
}
