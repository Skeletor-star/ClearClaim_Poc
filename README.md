# ClearClaim AI

Enterprise-grade health insurance claim processing assistant.

## Stack
- Frontend: React
- Backend: FastAPI + SQLAlchemy
- Database: Neon PostgreSQL (cloud)
- AI: Google Gemini 1.5 Flash (free)
- Storage: Local folder
- Auth: JWT + bcrypt + RBAC

## Setup

### 1. Fill environment variables
Backend: `backend/.env`
- Add your Neon DATABASE_URL
- Add your Gemini API key

Frontend: `frontend/.env`
- Already configured for localhost

### 2. Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

### 3. Database
Run `database/schema.sql` on your Neon dashboard

### 4. Frontend
cd frontend
npm install
npm start

## Roles
- client: submit and track own claims
- support: review all claims, add notes
- admin: full system access, user management

## API Docs
Visit http://localhost:8000/docs after starting backend
