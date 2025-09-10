# Frontend - Technical Assessment

## Технологии
- **Angular 17** - современный фреймворк для веб-приложений
- **TypeScript** - типизированный JavaScript
- **SCSS** - препроцессор CSS
- **Standalone Components** - новый подход Angular без NgModules

## Установка и запуск

### 1. Установка зависимостей
```bash
cd frontend
npm install
```

### 2. Запуск в режиме разработки
```bash
npm start
```

### 3. Сборка для продакшена
```bash
npm run build
```

## Структура проекта
```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── task-list/          # Список задач
│   │   │   ├── task-item/          # Отдельная задача
│   │   │   └── task-form/          # Форма создания задачи
│   │   ├── models/
│   │   │   └── task.model.ts       # Интерфейсы TypeScript
│   │   ├── services/
│   │   │   └── task.service.ts     # HTTP сервис для API
│   │   ├── app.component.ts        # Главный компонент
│   │   └── app.routes.ts           # Маршрутизация
│   ├── styles.scss                 # Глобальные стили
│   └── main.ts                     # Точка входа
├── package.json
├── angular.json
└── tsconfig.json
```

## Особенности

### Современный Angular
- Standalone компоненты (без NgModules)
- Новый control flow синтаксис
- Улучшенная производительность

### TypeScript
- Строгая типизация
- Интерфейсы для всех моделей данных
- Типизированные HTTP запросы

### Дизайн
- Современный UI с градиентами
- Адаптивный дизайн
- Анимации и переходы
- Темная тема

## API Integration
Приложение подключается к backend API на `http://localhost:3000/api`
