import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-form-container">
      <h3>Добавить новую задачу</h3>
      <form (ngSubmit)="onSubmit()" #taskForm="ngForm">
        <div class="form-group">
          <label for="title">Название задачи *</label>
          <input
            type="text"
            id="title"
            name="title"
            [(ngModel)]="newTask.title"
            required
            minlength="3"
            maxlength="100"
            placeholder="Введите название задачи..."
            class="form-input"
            [class.error]="taskForm.submitted && !newTask.title.trim()">
          <div class="error-message" *ngIf="taskForm.submitted && !newTask.title.trim()">
            Название задачи обязательно
          </div>
        </div>

        <div class="form-group">
          <label for="description">Описание</label>
          <textarea
            id="description"
            name="description"
            [(ngModel)]="newTask.description"
            maxlength="500"
            placeholder="Добавьте описание задачи (необязательно)..."
            class="form-textarea"
            rows="3">
          </textarea>
          <div class="char-count">{{ newTask.description.length }}/500</div>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input
              type="checkbox"
              name="completed"
              [(ngModel)]="newTask.completed"
              class="checkbox-input">
            <span class="checkbox-custom"></span>
            Задача уже выполнена
          </label>
        </div>

        <div class="form-actions">
          <button
            type="submit"
            class="btn btn-primary"
            [disabled]="isLoading || !newTask.title.trim()">
            <span *ngIf="!isLoading">➕ Добавить задачу</span>
            <span *ngIf="isLoading">⏳ Добавление...</span>
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            (click)="resetForm()"
            [disabled]="isLoading">
            🔄 Сбросить
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Input() isLoading = false;
  @Output() taskCreated = new EventEmitter<Task>();
  
  newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
    title: '',
    description: '',
    completed: false
  };

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    if (!this.newTask.title.trim()) {
      return;
    }

    this.isLoading = true;
    this.taskService.createTask(this.newTask).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.taskCreated.emit(response.data as Task);
          this.resetForm();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error creating task:', error);
        this.isLoading = false;
      }
    });
  }

  resetForm(): void {
    this.newTask = {
      title: '',
      description: '',
      completed: false
    };
  }
}
