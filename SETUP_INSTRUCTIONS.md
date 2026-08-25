# ClearClaim AI — Setup Instructions

## What you need to paste (2 things only)

### 1. Open this file:
backend/.env

### 2. Find this line:
DATABASE_URL=postgresql+asyncpg://PASTE_YOUR_NEON_CONNECTION_STRING_HERE

Replace PASTE_YOUR_NEON_CONNECTION_STRING_HERE with your real Neon connection string.
Get it from: https://console.neon.tech -> your project -> Connection String
Keep the "postgresql+asyncpg://" prefix exactly as is — only replace the part after it.

### 3. Find this line:
GEMINI_API_KEY=PASTE_YOUR_GEMINI_API_KEY_HERE

Replace PASTE_YOUR_GEMINI_API_KEY_HERE with your real Gemini API key.
Get it from: https://aistudio.google.com -> Get API Key

### 4. Save the file. That's it — everything else is already configured.

---

## How to run the project

### Step 1 — Create the database tables
Open your Neon dashboard -> SQL Editor -> paste the contents of
database/schema.sql -> Run it once.

### Step 2 — Start the backend
```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend will run at http://localhost:8000
API docs available at http://localhost:8000/docs

### Step 3 — Start the frontend (in a new terminal)
```
cd frontend
npm install
npm start
```
Frontend will run at http://localhost:3000

---

## Folder you don't need to touch
- storage/ — files will be saved here automatically
- database/schema.sql — only needs to be run once in Neon

## Roles in the system
- client — default role on signup, can submit and track own claims
- support — can view all claims, add notes (set manually in DB for now)
- admin — full access (set manually in DB for now)

To make a user an admin or support agent, run this in Neon SQL editor:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```
