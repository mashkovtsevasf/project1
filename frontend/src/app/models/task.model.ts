export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskResponse {
  success: boolean;
  data: Task | Task[];
  count?: number;
  message?: string;
  error?: string;
}
