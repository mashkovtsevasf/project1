# Backend - Technical Assessment

## Технологии
- **Express.js** - веб-фреймворк для Node.js
- **TypeScript** - типизированный JavaScript
- **SQLite** - встроенная база данных

## Установка и запуск

### 1. Установка зависимостей
```bash
cd backend
npm install
```

### 2. Запуск в режиме разработки
```bash
npm run dev
```

### 3. Сборка для продакшена
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- **GET** `/api/health` - проверка состояния сервера

### Задачи (Tasks)
- **GET** `/api/tasks` - получить все задачи
- **POST** `/api/tasks` - создать новую задачу
- **PUT** `/api/tasks/:id` - обновить задачу
- **DELETE** `/api/tasks/:id` - удалить задачу

## Структура проекта
```
backend/
├── src/
│   ├── index.ts          # Главный файл сервера
│   ├── database.ts       # Работа с SQLite
│   └── controllers/
│       └── TaskController.ts  # Контроллер для задач
├── package.json
├── tsconfig.json
└── README.md
```

## Примеры запросов

### Создать задачу
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Новая задача", "description": "Описание задачи", "completed": false}'
```

### Получить все задачи
```bash
curl http://localhost:3000/api/tasks
```
