import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { AccessibilityToolbarComponent } from './shared/components/accessibility-toolbar/accessibility-toolbar.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AccessibilityToolbarComponent,
    NavigationComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'cyber-academy';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Initialisation du thème
    this.themeService.getSettings().subscribe();
  }
}
