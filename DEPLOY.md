# Deployment Guide (Render.com)

This guide provides step-by-step instructions to deploy the Expense Tracker application for free using **Render.com**.

## Prerequisites
1.  Push your code to a **GitHub repository**.

## Step 1: Deploy Backend (FastAPI)

1.  Log in to [Render.com](https://render.com).
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub repository.
4.  **Name:** `expense-tracker-backend` (or similar).
5.  **Root Directory:** `backend`
6.  **Runtime:** Python 3
7.  **Build Command:** `pip install -r requirements.txt`
8.  **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
9.  **Environment Variables:** (Optional for persistent DB)
    *   Key: `PYTHON_VERSION` Value: `3.10.0`
    *   Key: `SQLALCHEMY_DATABASE_URL` Value: (Add your Postgres URL here if you have one)
10. Click **Create Web Service**.
11. **Wait** for the deployment to finish.
12. **Copy the Backend URL** (e.g., `https://expense-backend.onrender.com`).

## Step 2: Deploy Frontend (React)

1.  Go back to the Render Dashboard.
2.  Click **New +** and select **Static Site**.
3.  Connect the **same** GitHub repository.
4.  **Name:** `expense-tracker-frontend`.
5.  **Root Directory:** `frontend`
6.  **Build Command:** `npm run build`
7.  **Publish Directory:** `dist`
8.  **Environment Variables:**
    *   Key: `VITE_API_URL`
    *   Value: Paste your **Backend URL** from Step 1 (no trailing slash).
9.  Click **Create Static Site**.
10. **Wait** for the deployment to finish.
11. **Open your Frontend URL** – your app is now live!

## Troubleshooting

*   **CORS Issues:** The backend is configured to allow all origins (`*`) for this demo, so it should work immediately.
*   **Database:** By default, this setup uses SQLite, which will reset if the backend restarts (ephemeral storage). For a production-ready DB, create a **PostgreSQL** instance on Render and add the `SQLALCHEMY_DATABASE_URL` environment variable to your Backend service.
