import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learning-path',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss']
})
export class LearningPathComponent {
  currentStep: number = 0;

  startStep(step: number): void {
    this.currentStep = step;
  }

  startLearning(): void {
    this.currentStep = 1;
  }
}
