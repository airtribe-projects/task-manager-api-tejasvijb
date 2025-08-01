# 📝 Task Manager API

A simple in-memory task manager built with Express.js that supports basic CRUD operations, filtering by status and priority, and sorting by creation date.

---

## 🚀 Getting Started

### Prerequisites

-   Node.js (v14+)
-   npm

### Installation

```bash
git clone <your-repo-url>
cd <project-directory>
npm install
```

### Running the App

```bash
node app.js
```

The server will run on `http://localhost:3000`.

---

## 📡 API Endpoints

### 📍 `GET /tasks`

Returns all tasks, with optional filtering and sorting.

#### Query Parameters:

| Parameter   | Description                                              | Example                 |
| ----------- | -------------------------------------------------------- | ----------------------- |
| `completed` | Filter by completion status                              | `/tasks?completed=true` |
| `sort`      | Field to sort by (asc or desc) (currently `createdDate`) | `/tasks?sort=asc`       |

✅ Combine filters like:

```
/tasks?completed=false&sort=asc
```

---

### 📍 `POST /tasks`

Creates a new task.

#### Request Body:

```json
{
    "title": "Task Title",
    "description": "Task Description",
    "completed": false,
    "priority": "low"
}
```

`createdDate` is automatically added in UTC format.

---

### 📍 `GET /tasks/:id`

Fetch a specific task by ID.

---

### 📍 `PUT /tasks/:id`

Update an existing task.

#### Request Body (same as POST):

```json
{
    "title": "Updated Title",
    "description": "Updated Description",
    "completed": true,
    "priority": "high"
}
```

---

### 📍 `DELETE /tasks/:id`

Delete a task by ID.

---

### 📍 `GET /tasks/priority/:level`

Filter tasks by priority.

#### Path values:

-   `low`
-   `medium`
-   `high`

Example:

```
GET /tasks/priority/medium
```

---

## 🛠 In-Memory Data Format

```json
{
    "id": 1,
    "title": "Example",
    "description": "Example description",
    "completed": false,
    "priority": "medium",
    "createdDate": "2025-08-01T14:24:36.123Z"
}
```

> Note: All tasks are stored in memory (via `task.json`) and will reset when the server restarts.

---

## 📂 File Structure

```
.
├── app.js            # Express app with routes and logic
├── task.json         # Initial task data (imported into memory)
└── README.md         # Project documentation
```

---

## 📌 Future Enhancements

-   Persistent storage (e.g., file or database)
-   User authentication
-   Pagination support

---

## 🧑‍💻 Author

Built with 💻 using Express.js
