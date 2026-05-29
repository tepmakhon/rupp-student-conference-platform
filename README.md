
📄 README.md

# 🎓 RUPP Student Conference & Opportunity Platform
A modern full-stack university ecosystem platform for Royal University of Phnom Penh (RUPP) students.
This system connects students with:
- Conferences
- Workshops
- Scholarships
- Internships
- Competitions
- Academic opportunities
- Student profiles and achievements
---
# 🚀 Current Project Status (Day 1 Setup)
Today’s progress focuses on:
### ✅ Frontend Setup
- React (Vite) initialized
- Tailwind CSS configured
- React Router setup
- Redux Toolkit installed
- Dashboard layout system created
- Authentication UI started
### ✅ Backend Setup
- Express.js project initialized
- Modular structure created (app.js + server.js)
- Basic authentication API created
- CORS enabled for frontend communication
### ✅ Full-Stack Connection
- Axios configured for API requests
- Frontend ↔ Backend communication established
- Basic login flow working (mock authentication)
---
# 🏗️ Tech Stack
## Frontend
- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
## Backend
- Node.js
- Express.js
- Nodemon
## Planned Database
- PostgreSQL
- Prisma ORM (next phase)
---
# 📁 Project Structure

rupp-student-conference-platform/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── routes/
│   │   ├── api/
│   │   └── styles/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│
├── README.md

---
# 🔐 Authentication Flow (Current Stage)
1. User enters email/password
2. Frontend sends request via Axios
3. Backend validates credentials
4. JWT token (mock) returned
5. Redux stores authentication state
6. User redirected to dashboard
---
# 📊 Features Implemented So Far
### 🎯 Authentication
- Login UI
- Redux auth state
- Protected routes (basic)
### 🎨 UI System
- Dashboard layout (Sidebar + Navbar)
- Responsive Tailwind design
- Basic SaaS dashboard structure
### 🔗 API Layer
- Axios instance setup
- Backend API structure ready
---
# ⚙️ How to Run Project
## 1. Frontend
```bash
cd frontend
npm install
npm run dev

Runs at:

http://localhost:5173

⸻

2. Backend

cd backend
npm install
npm run dev

Runs at:

http://localhost:5000

⸻

🧠 Next Development Phase

We will implement:

Phase 2

* Prisma + PostgreSQL database
* Real authentication (JWT + bcrypt)
* User registration system
* Student profile system

Phase 3

* Event management system
* Opportunity system
* Admin dashboard

Phase 4

* Notifications system
* Activity scoring system
* Analytics dashboard

⸻

👨‍💻 Architecture Style

This project follows:

* 3-layer architecture
* MVC backend structure
* Modular React frontend
* REST API design
* Scalable SaaS architecture

⸻

🏆 Goal

To build a production-level university ecosystem platform that connects students with real opportunities and improves academic engagement.

⸻

📌 Author

Developed as a full-stack engineering learning project for Royal University of Phnom Penh (RUPP).
