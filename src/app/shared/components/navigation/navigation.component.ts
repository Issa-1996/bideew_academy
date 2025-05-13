import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  menuItems = [
    { path: '/home', label: 'Accueil' },
    { path: '/courses', label: 'Cours' },
    { path: '/learning-path', label: 'Parcours d\'Apprentissage' },
    { path: '/resources', label: 'Ressources' }
  ];
}
