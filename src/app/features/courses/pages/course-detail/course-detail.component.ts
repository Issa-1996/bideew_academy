import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="course-detail">
      <h2>Course Details</h2>
      <p>Course ID: {{ courseId }}</p>
      <!-- Add more course details here -->
    </div>
  `,
  styles: [`
    .course-detail {
      padding: 1rem;
    }
  `]
})
export class CourseDetailComponent implements OnInit {
  courseId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id') || '';
  }
}
