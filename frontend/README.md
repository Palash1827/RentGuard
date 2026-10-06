# RentGuard Frontend

React 19 + Vite. Talks to the RentGuard Spring Boot backend (JWT auth).

## Run
```bash
cp .env.example .env     # VITE_API_URL=http://localhost:8080
npm install
npm run dev              # http://localhost:5173
```
Start the backend first (see rentguard-backend/README.md). Register an account on /register.

## What changed
- Real login/register (JWT kept in localStorage), protected routes, auto-logout on expired token.
- Complaints, repairs, payments, agreement, evidence and AI chat all use per-user backend data.
- Evidence photos/videos are fetched with the auth header and shown as thumbnails.
- Removed hardcoded user ("Palash"), rent status, deposit and fake notification count.
- Timeline and repair tracker follow the real complaint/repair status.
- Added forms for recording payments and saving the agreement; empty states everywhere.

Still static (no backend yet): the landlord chat on the Communication page and the notification panel.
