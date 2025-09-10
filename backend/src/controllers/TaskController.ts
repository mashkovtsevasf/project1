import { Request, Response } from 'express';
import { Database, Task } from '../database';

export class TaskController {
  constructor(private db: Database) {}

  public async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.db.getAllTasks();
      res.json({
        success: true,
        data: tasks,
        count: tasks.length
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch tasks'
      });
    }
  }

  public async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, completed = false } = req.body;

      if (!title || title.trim() === '') {
        res.status(400).json({
          success: false,
          error: 'Title is required'
        });
        return;
      }

      const taskData = {
        title: title.trim(),
        description: description ? description.trim() : '',
        completed: Boolean(completed)
      };

      const taskId = await this.db.createTask(taskData);
      const newTask = await this.db.getTaskById(taskId);

      res.status(201).json({
        success: true,
        data: newTask,
        message: 'Task created successfully'
      });
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create task'
      });
    }
  }

  public async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;

      const taskId = parseInt(id);
      if (isNaN(taskId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid task ID'
        });
        return;
      }

      const existingTask = await this.db.getTaskById(taskId);
      if (!existingTask) {
        res.status(404).json({
          success: false,
          error: 'Task not found'
        });
        return;
      }

      const updateData: Partial<Task> = {};
      if (title !== undefined) updateData.title = title.trim();
      if (description !== undefined) updateData.description = description.trim();
      if (completed !== undefined) updateData.completed = Boolean(completed);

      const success = await this.db.updateTask(taskId, updateData);
      if (!success) {
        res.status(500).json({
          success: false,
          error: 'Failed to update task'
        });
        return;
      }

      const updatedTask = await this.db.getTaskById(taskId);
      res.json({
        success: true,
        data: updatedTask,
        message: 'Task updated successfully'
      });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update task'
      });
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const taskId = parseInt(id);

      if (isNaN(taskId)) {
        res.status(400).json({
          success: false,
          error: 'Invalid task ID'
        });
        return;
      }

      const existingTask = await this.db.getTaskById(taskId);
      if (!existingTask) {
        res.status(404).json({
          success: false,
          error: 'Task not found'
        });
        return;
      }

      const success = await this.db.deleteTask(taskId);
      if (!success) {
        res.status(500).json({
          success: false,
          error: 'Failed to delete task'
        });
        return;
      }

      res.json({
        success: true,
        message: 'Task deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete task'
      });
    }
  }
}
