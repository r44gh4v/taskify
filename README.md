# Taskify ✅

A simple To-Do app made with the MERN stack for CLASS ASSIGNMENT. 

You can sign up, log in, and keep track of your tasks.

---

## 🚀 Get It Running

Here's how to get this thing running on your computer.

### **What you'll need:**

* **Node.js** (v18 or newer is best)
* A **MongoDB database** (you can run it on your machine or use a free one from MongoDB Atlas)

### **Setup Steps:**

1.  **Clone the code**:
    ```bash
    git clone https://github.com/r44gh4v/taskify.git
    cd taskify
    ```

2.  **Install backend stuff**:
    Go into the `server` folder and run:
    ```bash
    cd server
    npm install
    ```

3.  **Install frontend stuff**:
    Now, in a **new terminal**, go into the `client` folder and run:
    ```bash
    cd client
    npm install
    ```

4.  **Create your secrets file**:
    In the `server` folder, create a file called `.env`:
    ```env
    # server/.env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=make_up_any_random_secret_string
    CORS_ORIGINS=http://localhost:5173
    ```

---

## 🏃‍♀️ Run the App

You'll need **two terminals** open at the same time for this.

1.  **Start the Backend API**:
    In your first terminal (inside the `/server` folder):
    ```bash
    npm run dev
    ```
    Your API is now listening at `http://localhost:5000`.

2.  **Start the Frontend App**:
    In your second terminal (inside the `/client` folder):
    ```bash
    npm run dev
    ```
    The app is now running at `http://localhost:5173`.

Just open `http://localhost:5173` in your browser and you're good to go!

---

## 🧪 Test the API (with Postman)

If you want to poke around the API, Postman is a great tool for it.

**The API lives at**: `http://localhost:5000`

### **How to test protected routes**

1.  Log in first: `POST /auth/login` with your email and password.
2.  The server sets an HTTP-only cookie. Postman will store it and send it automatically for subsequent requests.
3.  You can now call `/tasks` endpoints directly.

### **API List**

#### **Auth (`/auth`)**

| Action      | Method | Endpoint    | What it Does                 | Example Body                                     |
| :---------- | :----- | :---------- | :--------------------------- | :----------------------------------------------- |
| **Sign Up** | `POST` | `/auth/register` | Creates a new user.          | `{ "name": "Alex", "email": "a@a.com", "password": "123" }` |
| **Log In** | `POST` | `/auth/login`    | Logs you in (sets cookie). | `{ "email": "a@a.com", "password": "123" }`     |
| **Log Out** | `POST` | `/auth/logout`   | Logs you out (clears cookie). | (No body needed)                                 |

#### **Tasks (`/tasks`) - login required**

| Action            | Method   | Endpoint          | What it Does                         | Example Body                                       |
| :---------------- | :------- | :---------------- | :----------------------------------- | :------------------------------------------------- |
| **Get Tasks** | `GET`    | `/tasks`               | Gets all your tasks.                 | (No body needed)                                   |
| **Filter Tasks** | `GET`    | `/tasks?category=work` | Gets only your 'work' tasks.         | (No body needed)                                   |
| **Add a Task** | `POST`   | `/tasks`               | Adds a new task.                     | `{ "title": "Finish README", "category": "work" }` |
| **Update a Task** | `PATCH`  | `/tasks/:id`            | Updates a task (like marking it done). | `{ "isDone": true }`                               |
| **Delete a Task** | `DELETE` | `/tasks/:id`            | Deletes a task.                      | (No body needed)                                   |