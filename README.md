# Todo Node.js Backend API

![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

Backend API для Todo приложения на Node.js с Express и TypeScript. Проект создан для практики деплоя и настройки серверов с помощью Ansible.

## 📌 Особенности проекта

- REST API для управления задачами (CRUD операции)
- Поддержка перетаскивания и изменения порядка задач
- Локальное хранение данных в JSON-файле
- Написано на TypeScript с полной типизацией

## 🛠 Технологический стек

| Компонент                 | Версия   | Назначение                          |
|---------------------------|----------|-------------------------------------|
| **Node.js**               | 20.x     | Среда выполнения                    |
| **Express**               | 4.18.x   | Веб-фреймворк                       |
| **TypeScript**            | 5.0.x    | Статическая типизация               |
| **CORS**                  | 2.8.x    | Обработка CORS-запросов             |
| **Drizzle**               | 0.43.x   | ORM                                 |

## 🚀 Быстрый старт

### Предварительные требования
- Node.js v20
- npm/pnpm/yarn
- Docker v25

### Установка и запуск
```bash
# Клонировать репозиторий
git clone git@github.com:RenderLifeEx/todo-node-ansible-lab.git
cd todo-node-ansible-lab

# Установка зависимостей
pnpm install

# Копируем и переименовываем .env-файл (Linux/Mac)
cp .env.development.local .env

# Запуск базы
docker-compose up -d

# Накатываем миграции, но если ранее уже был создан контейнер то нужно не забыть удалять volume
pnpm run migrate

# Просмотр базы
pnpm run studio

# Также можно залить тестовые данные *
pnpm run seed

# Запуск приложения в дев режиме
nvm use 20
pnpm run dev

# Запуск приложения в прод режиме
nvm use 20
pnpm run start
```

### Сборка production-версии
```bash
pnpm run build
```

### Запуск production-версии
```bash
pnpm start
```

API будет доступно по адресу: http://localhost:3001

## 📚 API Endpoints

| Метод  | Endpoint           | Описание                          |
|--------|--------------------|-----------------------------------|
| `GET`    | `/todos`           | Получить все задачи              |
| `POST`   | `/todos`           | Создать новую задачу             |
| `PUT`    | `/todos/:id`       | Обновить существующую задачу     |
| `DELETE` | `/todos/:id`       | Удалить задачу                   |
| `POST`   | `/todos/reorder`   | Изменить порядок задач           |

## 📂 Структура проекта
```
todo-node-ansible-lab/
├── src/                   # Исходники TypeScript
│   ├── index.ts           # Точка входа приложения
│   ├── routes/            # Маршруты Express
│   │   └── todos.ts       # Роутер для задач
│   └── drizzle/           # Конфиги "базы данных"
│       ├── db.ts          # Настройки подключения к бд
│       ├── schema.ts      # Схема базы данных
│       └── seed.ts        # Мокабы для базы данных
├── dist/                  # Скомпилированный JS (после сборки)
└── package.json           # Зависимости и скрипты
```

## 🔧 Настройка
Перед деплоем установите необходимые переменные:
- PORT - порт для API (по умолчанию 3001)
- FRONT_PORT - порт фронтенд-приложения для CORS (по умолчанию 3001)

## Команды работы с Docker
```bash
docker ps # посмотреть список контейнеров
docker stop <container_id_or_name>  # останавливаем контейнер
docker rm <container_id_or_name>   # удаляем контейнер
docker volume ls  # посмотреть список томов
docker volume rm <name>  # удалить volume, связанный с PostgreSQL
docker compose down -v  # флаг `-v` удаляет и контейнеры, и volumes
```

## Описание релизных веток
master - API TODO листа с хранением данных в json файле
stage_1 - API TODO листа с хранением в базе данных с использованием postgres, drizzle, docker
stage_1 - Уведомлятор навигатора Сирикса

## 📜 Лицензия
MIT License