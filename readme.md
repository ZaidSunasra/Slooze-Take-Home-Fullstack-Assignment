# Multiverse Kitchens – Local Setup Guide

This guide explains how to run the project locally step by step.

---

## Prerequisites

Make sure you have the following installed:

* **Node.js** (v18 or above recommended)
* **npm** or **pnpm**
* **PostgreSQL** (running locally or accessible via connection string)
* **Git**

---

## 1. Clone the Repository

```bash
git clone https://github.com/ZaidSunasra/Slooze-Take-Home-Fullstack-Assignment.git
cd <your-repo-folder>
```

---

## 2. Setup Client (Frontend)

Open a terminal and run:

```bash
cd client
npm install
```

### Create Environment File

Create a `.env` file inside the **client** folder:

```env
VITE_BE_URL=http://localhost:PORT
```

> Replace `PORT` with the backend server port (example: `3000`).

### Run Frontend

```bash
npm run dev
```

The frontend will start in development mode.

---

## 3. Setup Server (Backend)

Open a **new terminal** and run:

```bash
cd server
npm install
```

### Create Environment File

Create a `.env` file inside the **server** folder:

```env
JWT_SECRET=
URL=http://localhost:5173
PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME
```

> Update the values according to your local setup.

---

## 4. Setup Database (Prisma)

Run the following Prisma commands:

```bash
npx prisma migrate dev
npx prisma generate
```

This will:

* Apply database migrations
* Generate the Prisma client

---

## 5. Build & Start Backend Server

```bash
npm run build
nodemon
```

The backend server should now be running.

---

## 6. Access the Application

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend:** [http://localhost:3001](http://localhost:3000)

---

## Notes

* If the server was idle, initial startup may take a few moments.
* Ensure PostgreSQL is running before starting the backend.
* Tester credentials (if available) are shown on the landing page or else create account via signup route in postman.

---

Happy coding 🚀
