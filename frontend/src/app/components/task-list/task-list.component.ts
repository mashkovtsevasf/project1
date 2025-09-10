import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskItemComponent, TaskFormComponent],
  template: `
    <div class="task-list-container">
      <div class="task-list-header">
        <h2>Мои задачи</h2>
        <div class="task-stats">
          <span class="stat">
            <span class="stat-number">{{ tasks.length }}</span>
            <span class="stat-label">Всего</span>
          </span>
          <span class="stat">
            <span class="stat-number">{{ completedTasks }}</span>
            <span class="stat-label">Выполнено</span>
          </span>
          <span class="stat">
            <span class="stat-number">{{ pendingTasks }}</span>
            <span class="stat-label">В работе</span>
          </span>
        </div>
      </div>

      <app-task-form 
        (taskCreated)="onTaskCreated($event)"
        [isLoading]="isLoading">
      </app-task-form>

      <div class="task-list" *ngIf="tasks.length > 0; else noTasks">
        <app-task-item
          *ngFor="let task of tasks; trackBy: trackByTaskId"
          [task]="task"
          (taskUpdated)="onTaskUpdated($event)"
          (taskDeleted)="onTaskDeleted($event)"
          [isLoading]="isLoading">
        </app-task-item>
      </div>

      <ng-template #noTasks>
        <div class="no-tasks">
          <div class="no-tasks-icon">📝</div>
          <h3>Пока нет задач</h3>
          <p>Создайте свою первую задачу выше</p>
        </div>
      </ng-template>

      <div class="loading-overlay" *ngIf="isLoading">
        <div class="spinner"></div>
        <p>Загрузка...</p>
      </div>
    </div>
  `,
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isLoading = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  get completedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get pendingTasks(): number {
    return this.tasks.filter(task => !task.completed).length;
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getAllTasks().subscribe({
      next: (response) => {
        if (response.success && Array.isArray(response.data)) {
          this.tasks = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.isLoading = false;
      }
    });
  }

  onTaskCreated(newTask: Task): void {
    this.tasks.unshift(newTask);
  }

  onTaskUpdated(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

  onTaskDeleted(deletedTaskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== deletedTaskId);
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id || index;
  }
}
