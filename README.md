# Task Management App

Full-stack приложение для управления задачами с Angular frontend и Node.js backend.

## 🛠️ Технологии

### Frontend
- Angular 17
- TypeScript
- SCSS
- Angular Router
- Angular Forms

### Backend
- Node.js
- Express.js
- TypeScript
- SQLite3
- CORS

## 🚀 Локальный запуск

1. Установите зависимости:
```bash
npm run install:all
```

2. Соберите backend:
```bash
npm run build:backend
```

3. Запустите в режиме разработки:
```bash
npm run dev
```

Приложение будет доступно:
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000

## 🚂 Развертывание на Railway

### 1. Подготовка
Проект уже настроен для развертывания на Railway с файлами:
- `railway.json` - конфигурация Railway
- `Dockerfile` - для контейнеризации
- `.dockerignore` - исключения для Docker

### 2. Развертывание
1. Зарегистрируйтесь на [Railway.app](https://railway.app)
2. Подключите GitHub репозиторий
3. Railway автоматически определит Node.js проект
4. Приложение будет развернуто автоматически

### 3. Переменные окружения
Railway автоматически настроит:
- `PORT` - порт для приложения
- `NODE_ENV=production`

## 📁 Структура проекта

```
project/
├── backend/           # Node.js API сервер
│   ├── src/
│   │   ├── controllers/
│   │   ├── database.ts
│   │   └── index.ts
│   └── package.json
├── frontend/          # Angular приложение
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── models/
│   │   │   └── services/
│   │   └── main.ts
│   └── package.json
├── railway.json       # Конфигурация Railway
├── Dockerfile         # Docker конфигурация
└── package.json       # Корневой package.json
```

## 🔧 API Endpoints

- `GET /api/tasks` - получить все задачи
- `POST /api/tasks` - создать новую задачу
- `PUT /api/tasks/:id` - обновить задачу
- `DELETE /api/tasks/:id` - удалить задачу

## 📝 Функции

- ✅ Просмотр списка задач
- ✅ Добавление новых задач
- ✅ Редактирование задач
- ✅ Отметка задач как выполненных
- ✅ Удаление задач
- ✅ Поиск и фильтрация

## 🎯 Особенности

- **Responsive дизайн** - работает на всех устройствах
- **Real-time обновления** - изменения сохраняются мгновенно
- **SQLite база данных** - легкая и быстрая
- **TypeScript** - типобезопасность
- **RESTful API** - стандартная архитектура
