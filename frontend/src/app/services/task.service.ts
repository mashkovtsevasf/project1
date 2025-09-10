import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskResponse } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://project1-production-3140.up.railway.app/api';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.apiUrl}/tasks`);
  }

  createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(`${this.apiUrl}/tasks`, task);
  }

  updateTask(id: number, task: Partial<Task>): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(`${this.apiUrl}/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<TaskResponse> {
    return this.http.delete<TaskResponse>(`${this.apiUrl}/tasks/${id}`);
  }
}
