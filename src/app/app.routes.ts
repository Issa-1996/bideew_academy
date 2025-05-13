import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LearningPathComponent } from './features/learning-path/learning-path.component';
import { ResourcesComponent } from './features/resources/resources.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home',
    component: HomeComponent
  },
  { 
    path: 'courses',
    loadChildren: () => import('./features/courses/courses.routes').then(m => m.COURSES_ROUTES)
  },
  { 
    path: 'learning-path',
    component: LearningPathComponent
  },
  { 
    path: 'resources',
    component: ResourcesComponent
  },
  { 
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  { path: '**', redirectTo: '/home' }
];
