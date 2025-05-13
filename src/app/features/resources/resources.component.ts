import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resources',
  imports: [CommonModule],
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent {
  currentCategory: string = 'articles';

  constructor() { }

  selectCategory(category: string): void {
    this.currentCategory = category;
  }
}
