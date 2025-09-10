import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="container">
          <h1 class="app-title">
            <span class="icon">📋</span>
            Управление задачами
          </h1>
          <p class="app-subtitle">Техническое задание - Angular + TypeScript + Express + SQLite</p>
        </div>
      </header>
      
      <main class="app-main">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>
      
      <footer class="app-footer">
        <div class="container">
          <p>&copy; 2024 Техническое задание. Создано с помощью AI инструментов.</p>
        </div>
      </footer>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tech-assessment-frontend';
}
