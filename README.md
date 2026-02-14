# Personal Expense Tracker

A full-stack web application for tracking personal expenses with a dashboard and currency conversion features.

## Tech Stack

- **Backend:** FastAPI (Python), SQLAlchemy, Pydantic, SQLite (Dev) / PostgreSQL (Prod)
- **Frontend:** React (Vite), Tailwind CSS, Recharts, Axios
- **Integration:** Exchange Rates API (https://open.er-api.com/v6/latest/USD)

## Features

- **Full CRUD for Expenses:** Create, Read, Update, Delete expenses via UI and API.
- **Dashboard:** Visual summary of expenses (Total Amount, Total Count, Pie Chart by Category).
- **Currency Widget:** Real-time currency exchange rates (USD base) integrated into the UI.
- **Deployment Ready:** Configured for deployment on platforms like Render, Vercel, or Railway.

## Setup & Run Locally

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm

### 1. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Create a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  Run the server:
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://localhost:8000`.
    API Documentation: `http://localhost:8000/docs`.

### 2. Frontend Setup

1.  Open a new terminal and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file (optional if defaults work):
    ```bash
    cp .env.example .env
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Deployment Notes

### Backend (e.g., Render)
1.  Create a new Web Service on Render.
2.  Connect your repository.
3.  Set the Root Directory to `backend`.
4.  Set the Build Command to `pip install -r requirements.txt`.
5.  Set the Start Command to `uvicorn main:app --host 0.0.0.0 --port $PORT`.
6.  Add Environment Variable `PYTHON_VERSION` (e.g., `3.10.0`).
7.  Add `SQLALCHEMY_DATABASE_URL` if using an external database (e.g., Supabase, Railway Postgres). If using SQLite on Render (not recommended for persistence due to ephemeral disk), it will work but data resets on redeploy.

### Frontend (e.g., Vercel / Netlify / Render Static Site)
1.  Create a new project.
2.  Connect your repository.
3.  Set the Root Directory to `frontend`.
4.  Set the Build Command to `npm run build`.
5.  Set the Output Directory to `dist`.
6.  Add Environment Variable `VITE_API_URL` pointing to your deployed backend URL (e.g., `https://your-backend.onrender.com`).

## How to Test (Step-By-Step)

1.  **Open the Application:** Navigate to the frontend URL (e.g., `http://localhost:5173` or deployed link).

2.  **Dashboard:**
    -   You will land on the **Dashboard** (`/`).
    -   Verify that "Total Expenses" and "Total Transactions" cards are visible.
    -   Verify the "Expenses by Category" pie chart is visible (it might be empty initially).
    -   **Route:** `/`

3.  **Create Expense:**
    -   Click "New Expense" in the navbar or "Add Expense" button if on the list page.
    -   Fill in the form:
        -   Title: "Lunch"
        -   Amount: 15.50
        -   Category: "Food"
        -   Date: Select today
    -   Click "Save".
    -   You should be redirected to the **Expenses List** (`/expenses`).
    -   Verify the new expense appears in the list.

4.  **View Dashboard Update:**
    -   Click "Dashboard" in the navbar.
    -   Verify that Total Amount and Counts have updated.
    -   Verify the Pie Chart now shows the "Food" slice.

5.  **Edit Expense:**
    -   Go to **Expenses List** (`/expenses`).
    -   Click "Edit" next to the "Lunch" expense.
    -   Change Amount to 20.00.
    -   Click "Save".
    -   Verify the amount is updated in the list.

6.  **Delete Expense:**
    -   Go to **Expenses List** (`/expenses`).
    -   Click "Delete" next to the expense.
    -   Confirm the deletion.
    -   Verify the expense is removed from the list.

7.  **Third-Party API Integration:**
    -   Look at the right sidebar (desktop) or bottom (mobile).
    -   You should see the **Exchange Rates (USD)** widget.
    -   Verify it displays rates for EUR, GBP, JPY, etc.
    -   Click the "Refresh" icon to reload rates.
    -   **Feature:** Integrated via `CurrencyWidget` component calling Backend/External API.

## API Endpoints

-   `GET /expenses/` - List all expenses
-   `POST /expenses/` - Create new expense
-   `GET /expenses/{id}` - Get specific expense
-   `PUT /expenses/{id}` - Update expense
-   `DELETE /expenses/{id}` - Delete expense
-   `GET /dashboard/` - Get dashboard statistics
-   `GET /exchange-rates/` - Get current exchange rates
