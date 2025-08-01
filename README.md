# Task Management API

## Overview

This is a simple RESTful API built with Express.js to manage a list of tasks. It supports creating, retrieving, updating, and deleting tasks. Each task includes a title, description, completion status, and a unique `id`.

The API validates input to ensure data integrity, managing errors gracefully with appropriate HTTP status codes.

## Setup Instructions

### Prerequisites

-   Node.js (version 12 or higher recommended)
-   npm (Node package manager)

### Installation

1. Clone this repository (or create a new project and copy code):

```bash
git clone <repository_url>
cd <repository_folder>
```

2. Install dependencies:

```bash
npm install express
```

3. Create an `index.js` (or `app.js`) and paste the API code.

### Run the Server

Start the server by running:

```bash
node index.js
```

The API will be accessible at: `http://localhost:3000` (default port 3000)

## API Endpoints

### 1. Get All Tasks

-   **URL**: `/tasks`
-   **Method**: `GET`
-   **Description**: Retrieves an array of all tasks.
-   **Response**: `200 OK` with a JSON array of all tasks.

**Example using cURL:**

```bash
curl http://localhost:3000/tasks
```

### 2. Create a New Task

-   **URL**: `/tasks`
-   **Method**: `POST`
-   **Description**: Creates a new task with the provided `title`, `description`, and `completed` status.
-   **Request Body** (JSON):

```json
{
    "title": "Task Title",
    "description": "Task Description",
    "completed": false
}
```

-   **Validations**:
    -   `title` and `description` must be non-empty strings.
    -   `completed` must be a boolean.
-   **Responses**:
    -   `201 Created` with the newly created task JSON.
    -   `400 Bad Request` if validation fails.

**Example using cURL:**

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Task details","completed":false}'
```

### 3. Get a Task by ID

-   **URL**: `/tasks/:id`
-   **Method**: `GET`
-   **Description**: Retrieves a task by its unique `id`.
-   **Response**:
    -   `200 OK` with the task JSON if found.
    -   `404 Not Found` if no task with the given `id` exists.

**Example using cURL:**

```bash
curl http://localhost:3000/tasks/1
```

### 4. Update a Task by ID

-   **URL**: `/tasks/:id`
-   **Method**: `PUT`
-   **Description**: Updates a task's `title`, `description`, and `completed` status.
-   **Request Body** (JSON):

```json
{
    "title": "Updated Title",
    "description": "Updated Description",
    "completed": true
}
```

-   **Validations**:
    -   Same as create — all fields required and validated.
-   **Responses**:
    -   `200 OK` with updated task JSON.
    -   `400 Bad Request` if validation fails.
    -   `404 Not Found` if no task with the given `id` exists.

**Example using cURL:**

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Task","description":"Updated info","completed":true}'
```

### 5. Delete a Task by ID

-   **URL**: `/tasks/:id`
-   **Method**: `DELETE`
-   **Description**: Deletes the task with the specified `id`.
-   **Responses**:
    -   `204 No Content` on successful deletion.
    -   `404 Not Found` if no task with the given `id` exists.

**Example using cURL:**

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## Notes

-   The API uses simple in-memory storage (an array named `tasks`), so data is lost if the server restarts.
-   The server expects JSON request bodies for POST and PUT requests.
-   Validation errors return JSON with an `error` message explaining the input issue.
-   The `id` is assigned automatically when creating new tasks.
