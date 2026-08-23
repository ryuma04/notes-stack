# Notes Stack

This is a simple 3-tier application consisting of a Next.js frontend, a FastAPI backend, and a PostgreSQL database. It is designed as a foundational project for learning application deployment and networking.

## Prerequisites
*   Node.js installed
*   Python 3.10+ installed
*   A local running instance of PostgreSQL

## Local Setup Instructions

### 1. Database Setup
Ensure PostgreSQL is running locally, then create the database:

```
createdb -U postgres notes_db
```

The `notes` table is created automatically by the backend on startup.

### 2. Backend (FastAPI)
1. Navigate to the `/backend` directory.
2. Create a virtual environment: `python -m venv venv`
3. Activate the environment:
   *   macOS / Linux: `source venv/bin/activate`
   *   Windows: `venv\Scripts\activate`
4. Install requirements: `pip install -r requirements.txt`
5. Copy `.env.example` to `.env` and update your PostgreSQL connection string.
6. Run the server: `uvicorn main:app --reload --port 8000`

Check it is up at `http://localhost:8000/health`.

### 3. Frontend (Next.js)
1. Navigate to the `/frontend` directory.
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL=http://localhost:8000`.
4. Start the development server: `npm run dev`

Visit `http://localhost:3000` to view the application.

## API Reference

| Method | Route | Description |
| --- | --- | --- |
| GET | `/health` | Returns `{"status": "healthy"}` |
| GET | `/api/notes` | Returns an array of note objects |
| POST | `/api/notes` | Accepts `{"author": "...", "content": "..."}`, returns the created note |
