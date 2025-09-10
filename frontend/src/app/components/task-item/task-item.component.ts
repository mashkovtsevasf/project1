import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-item" [class.completed]="task.completed">
      <div class="task-content">
        <div class="task-header">
          <label class="task-checkbox">
            <input
              type="checkbox"
              [checked]="task.completed"
              (change)="toggleCompleted()"
              [disabled]="isLoading"
              class="checkbox-input">
            <span class="checkbox-custom"></span>
          </label>
          
          <div class="task-title-section">
            <h4 class="task-title" [class.completed-text]="task.completed">
              {{ task.title }}
            </h4>
            <div class="task-meta">
              <span class="task-date">
                📅 {{ formatDate(task.createdAt) }}
              </span>
              <span class="task-status" [class.completed]="task.completed">
                {{ task.completed ? '✅ Выполнено' : '⏳ В работе' }}
              </span>
            </div>
          </div>
        </div>

        <div class="task-description" *ngIf="task.description">
          <p [class.completed-text]="task.completed">{{ task.description }}</p>
        </div>

        <div class="task-actions" *ngIf="!isEditing">
          <button
            class="btn btn-edit"
            (click)="startEditing()"
            [disabled]="isLoading">
            ✏️ Редактировать
          </button>
          <button
            class="btn btn-delete"
            (click)="deleteTask()"
            [disabled]="isLoading">
            🗑️ Удалить
          </button>
        </div>

        <div class="task-edit-form" *ngIf="isEditing">
          <div class="edit-form-group">
            <input
              type="text"
              [(ngModel)]="editForm.title"
              class="edit-input"
              placeholder="Название задачи">
          </div>
          <div class="edit-form-group">
            <textarea
              [(ngModel)]="editForm.description"
              class="edit-textarea"
              placeholder="Описание задачи"
              rows="2">
            </textarea>
          </div>
          <div class="edit-actions">
            <button
              class="btn btn-save"
              (click)="saveChanges()"
              [disabled]="isLoading || !editForm.title.trim()">
              💾 Сохранить
            </button>
            <button
              class="btn btn-cancel"
              (click)="cancelEditing()"
              [disabled]="isLoading">
              ❌ Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Input() isLoading = false;
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<number>();

  isEditing = false;
  editForm = {
    title: '',
    description: ''
  };

  constructor(private taskService: TaskService) {}

  toggleCompleted(): void {
    if (this.isLoading) return;

    const updatedTask = { ...this.task, completed: !this.task.completed };
    this.updateTask(updatedTask);
  }

  startEditing(): void {
    this.isEditing = true;
    this.editForm = {
      title: this.task.title,
      description: this.task.description
    };
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.editForm = {
      title: '',
      description: ''
    };
  }

  saveChanges(): void {
    if (!this.editForm.title.trim()) return;

    const updatedTask = {
      ...this.task,
      title: this.editForm.title.trim(),
      description: this.editForm.description.trim()
    };

    this.updateTask(updatedTask);
    this.isEditing = false;
  }

  updateTask(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask.id!, updatedTask).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.taskUpdated.emit(response.data as Task);
        }
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }

  deleteTask(): void {
    if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
      this.taskService.deleteTask(this.task.id!).subscribe({
        next: (response) => {
          if (response.success) {
            this.taskDeleted.emit(this.task.id!);
          }
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        }
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
