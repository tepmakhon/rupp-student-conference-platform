🎓 RUPP Student Conference & Opportunity Platform

A full-stack web platform that centralizes student conferences, workshops, scholarships, internships, competitions, and career opportunities for students at the Royal University of Phnom Penh (RUPP).

The platform provides a centralized ecosystem where Students, Organizations, and Administrators collaborate through a secure role-based system.

⸻

📖 Project Overview

Many university opportunities are scattered across Facebook pages, Telegram groups, posters, and individual organization websites, making them difficult for students to discover.

This project solves that problem by creating a single platform where students can:

- Register for conferences and workshops
- Apply for internships and scholarships
- Discover organizations
- Save opportunities
- Track activity history
- Earn activity scores
- Receive notifications
- View personalized recommendations

Organizations can publish events and opportunities, while administrators moderate all submitted content.

⸻

✨ Features

👨‍🎓 Student

- Secure Authentication (JWT)
- Student Profile
- Browse Events
- Register for Events
- QR Event Ticket
- Browse Opportunities
- Apply for Opportunities
- Save Opportunities
- My Applications
- My Events
- Activity History
- Student Badges
- Personalized Recommendations
- Analytics Dashboard
- Real-time Notifications
- Leaderboard

⸻

🏢 Organization

- Organization Dashboard
- Create Events
- Edit Events
- Delete Events
- Create Opportunities
- Edit Opportunities
- Delete Opportunities
- View Event Registrations
- View Opportunity Applicants
- Attendance Scanner
- Organization Analytics

⸻

👨‍💼 Administrator

- Dashboard
- Approve / Reject Events
- Approve / Reject Opportunities
- Manage Universities
- Manage Faculties
- Manage Majors
- Manage Skills
- Manage Event Categories
- Manage Opportunity Types
- Platform Analytics

⸻

🏗️ System Architecture

Frontend (React)

        │

REST API (Express.js)

        │

Business Logic

        │

Prisma ORM

        │

PostgreSQL

The backend follows a 3-Layer Architecture

- Controller Layer
- Service Layer
- Data Layer (Prisma)

⸻

🛠 Technology Stack

Frontend

- React
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios
- Heroicons
- Lucide React
- React Hot Toast
- Socket.IO Client
- Cloudinary Upload Images
  ⸻

Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt
- Socket.IO
- Docker

⸻

Database

- PostgreSQL
- Prisma Schema
- 25+ relational tables
- 3NF database design

⸻

🔒 Security

- JWT Authentication
- Password Hashing (bcrypt)
- Role-Based Access Control (RBAC)
- Protected Routes
- Input Validation
- Audit Logs
- User Sessions

⸻

📊 Current Modules

✅ Authentication

✅ User Profile

✅ Events

✅ Event Registration

✅ Attendance

✅ Opportunities

✅ Applications

✅ Saved Opportunities

✅ Notifications

✅ Analytics

✅ Recommendations

✅ Leaderboard

✅ Dashboard

⸻

📂 Project Structure

frontend/

├── src/
│ ├── api/
│ ├── components/
│ ├── pages/
│ ├── redux/
│ ├── routes/
│ ├── hooks/
│ ├── utils/
│ └── constants/

backend/

├── src/
│ ├── modules/
│ ├── middlewares/
│ ├── config/
│ ├── socket/
│ ├── utils/
│ └── routes/
prisma/
└── schema.prisma

⸻

👥 User Roles

Student

- Register events
- Apply opportunities
- Save opportunities
- Receive recommendations

Organization

- Publish events
- Publish opportunities
- Manage applicants
- Manage registrations

Administrator

- Approve content
- Manage master data
- Monitor analytics

⸻

🚀 Installation

Clone Repository

git clone https://github.com/tepmakhon/rupp-student-conference-platform.git

Backend

cd backend
npm install

Create .env

DATABASE_URL="postgresql://postgres:password@postgres:5432/dbname"

# DATABASE_URL="postgresql://postgres:password@localhost:5433/dbname"

JWT_SECRET="super_secure_secret_key_change_this"
JWT_EXPIRES_IN="7d"

Generate Prisma Client

npx prisma generate

Run Migration

npx prisma migrate dev

Start Server

npm run dev

⸻

Frontend

cd frontend
npm install
npm run dev

⸻

📸 Screenshots

- Login
- Student Dashboard
- Organization Dashboard
- Admin Dashboard
  ![alt text](x0-login.png)
  ![alt text](x1-student.png)
  ![alt text](x2-organization.png)
  ![alt text](x3-admin.png)

⸻

📈 Future Improvements

- AI Recommendation Engine
- Resume Builder
- Certificate Verification
- Email Notifications
- Mobile Application
- Calendar Integration
- Advanced Analytics
- Export Reports (PDF / Excel)
- Multi-University Support
- Khmer Language Support
- Docker Deployment
- CI/CD Pipeline

⸻

🎯 Project Goals

- Increase student participation in academic activities.
- Centralize university opportunities.
- Improve communication between organizations and students.
- Build a scalable platform that can expand beyond RUPP to universities across Cambodia.

⸻

👨‍💻 Developer

Tep Makhon

Computer Science Student

Royal University of Phnom Penh (RUPP)

GitHub: https://github.com/tepmakhon

LinkedIn: https://www.linkedin.com/in/tep-makhon-542ab836b/

⸻

📄 License

This project is developed for educational purposes as part of a Computer Science project at the Royal University of Phnom Penh.
