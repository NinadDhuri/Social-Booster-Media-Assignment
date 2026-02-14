# Deployment Guide

This guide provides options to deploy the Expense Tracker application.

## Option 1: Full Stack on Render.com (Recommended for Simplicity)

### Step 1: Deploy Backend (FastAPI)
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

### Step 2: Deploy Frontend (React)
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

---

## Option 2: Frontend on Vercel & Backend on Railway

### Step 1: Deploy Backend (Railway)
1.  Log in to [Railway.app](https://railway.app/).
2.  Click **New Project** -> **Deploy from GitHub repo**.
3.  Select your repository.
4.  Railway will auto-detect the Python app. Go to **Settings** -> **Root Directory** and set it to `backend`.
5.  Go to **Variables** and add:
    *   `PORT`: `8000` (or leave default and update start command)
    *   `SQLALCHEMY_DATABASE_URL`: Add a PostgreSQL database service in Railway and link it here.
6.  Update **Start Command** in Settings: `uvicorn main:app --host 0.0.0.0 --port $PORT`
7.  Railway will deploy your app. Copy the **Public Domain** URL.

### Step 2: Deploy Frontend (Vercel)
1.  Log in to [Vercel.com](https://vercel.com).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Framework Preset:** Vite
5.  **Root Directory:** Click "Edit" and select `frontend`.
6.  **Environment Variables:**
    *   Key: `VITE_API_URL`
    *   Value: Paste your **Railway Backend URL** (no trailing slash).
7.  Click **Deploy**.

---

## Option 3: Frontend on Netlify

1.  Log in to [Netlify.com](https://www.netlify.com/).
2.  Click **Add new site** -> **Import from existing project**.
3.  Connect to GitHub and pick your repo.
4.  **Base directory:** `frontend`
5.  **Build command:** `npm run build`
6.  **Publish directory:** `dist`
7.  Click **Show advanced** -> **New Variable**:
    *   Key: `VITE_API_URL`
    *   Value: Your backend URL.
8.  Click **Deploy site**.
