# TaskListManager

TaskListManager is a feature-rich, full-stack to-do list management app. It allows users to create, update, delete, and manage tasks efficiently. Users can also drag and drop tasks to reorder them and paginate through the list of tasks.

## Features

- **Add Task:** Create a new task with a title, description, and deadline.
- **Edit Task:** Update an existing task with new details.
- **Delete Task:** Remove a task permanently after confirmation.
- **Drag and Drop Task Reordering:** Reorder tasks using a drag handle.
- **Real-time Updates:** Updates task order, completion status, and deletion in real-time.

## Technologies Used

- **Frontend:** React.js with TypeScript for type safety and better development experience
- **Backend:** Node.js with Express (API), Axios for making HTTP requests
- **Database:** MySQL for persistent storage
- **Drag-and-Drop:** `react-sortable-hoc` for drag-and-drop functionality
- **Styling:** Tailwind CSS for responsive UI

## Installation and Setup

### Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (>=12.x)
- MySQL server

**Clone the repository:**

```bash
git clone https://github.com/yourusername/TaskListManager.git
cd TaskListManager
```

### Setting up the MySQL Database

1. Install MySQL and start the server.
2. Create a new database for the app:

```sql
CREATE DATABASE tasklist_manager;
```

3. Update the `server/config/db.config.ts` file with your own MySQL credentials (host, user, password, and database name):

```js
const db = mysql.createPool({
  host: "localhost",
  user: "your-username",
  password: "your-password",
  database: "tasklist_manager",
});
```

4. Run the database migrations or any setup scripts to initialize the required tables.

### Installing Dependencies

Server-side:

```bash
cd server
npm install
```

Client-side:

```bash
cd client
npm install
```

Running the Application
Server:

```bash
cd server
npm start
```

Client:

```bash
cd client
npm run dev
```

By default, the server will run on `http://localhost:3001`, and the client will run on `localhost`.

## Custom MySQL Configuration

Ensure you configure the MySQL connection settings based on your local MySQL instance. If MySQL is running on a different host or port, adjust the `db.config.ts` file accordingly.
