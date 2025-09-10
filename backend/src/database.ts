import sqlite3 from 'sqlite3';
import { promisify } from 'util';

export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database('./database.sqlite');
  }

  public init(): void {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    this.db.run(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('✅ Database initialized successfully');
        this.seedData();
      }
    });
  }

  private seedData(): void {
    const tasks = [
      {
        title: 'Изучить TypeScript',
        description: 'Освоить основы TypeScript для backend разработки',
        completed: false
      },
      {
        title: 'Создать REST API',
        description: 'Разработать API для управления задачами',
        completed: false
      },
      {
        title: 'Настроить Angular',
        description: 'Создать frontend приложение на Angular',
        completed: false
      }
    ];

    const insertQuery = `
      INSERT OR IGNORE INTO tasks (title, description, completed)
      VALUES (?, ?, ?)
    `;

    tasks.forEach(task => {
      this.db.run(insertQuery, [task.title, task.description, task.completed]);
    });
  }

  public async getAllTasks(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM tasks ORDER BY createdAt DESC', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Task[]);
        }
      });
    });
  }

  public async getTaskById(id: number): Promise<Task | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as Task || null);
        }
      });
    });
  }

  public async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO tasks (title, description, completed)
        VALUES (?, ?, ?)
      `;
      
      this.db.run(query, [task.title, task.description, task.completed], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  public async updateTask(id: number, task: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const fields = [];
      const values = [];

      if (task.title !== undefined) {
        fields.push('title = ?');
        values.push(task.title);
      }
      if (task.description !== undefined) {
        fields.push('description = ?');
        values.push(task.description);
      }
      if (task.completed !== undefined) {
        fields.push('completed = ?');
        values.push(task.completed);
      }

      fields.push('updatedAt = CURRENT_TIMESTAMP');
      values.push(id);

      const query = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;
      
      this.db.run(query, values, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  public async deleteTask(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  public close(): void {
    this.db.close();
  }
}
