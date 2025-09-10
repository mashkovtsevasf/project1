import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Database } from '../src/database';
import { TaskController } from '../src/controllers/TaskController';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database
const db = new Database();
db.init();

// Routes
const taskController = new TaskController(db);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.get('/api/tasks', (req, res) => taskController.getAllTasks(req, res));
app.post('/api/tasks', (req, res) => taskController.createTask(req, res));
app.put('/api/tasks/:id', (req, res) => taskController.updateTask(req, res));
app.delete('/api/tasks/:id', (req, res) => taskController.deleteTask(req, res));

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
