import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="courses-list">
      <h2>Available Courses</h2>
      <ul>
        <li *ngFor="let course of courses">
          <a [routerLink]="['/courses', course.id]">{{ course.title }}</a>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .courses-list {
      padding: 1rem;
    }
    
    ul {
      list-style: none;
      padding: 0;
    }
    
    li {
      margin: 0.5rem 0;
    }
    
    a {
      color: #1976d2;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  `]
})
export class CoursesListComponent {
  courses = [
    { id: '1', title: 'Introduction to Cybersecurity' },
    { id: '2', title: 'Network Security Fundamentals' },
    { id: '3', title: 'Ethical Hacking' }
  ];
}
