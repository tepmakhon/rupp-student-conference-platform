# RUPP Student Conference & Opportunity Platform

## Introduction

The RUPP Student Conference & Opportunity Platform is a university ecosystem platform designed to connect students with:
- Conferences
- Workshops
- Competitions
- Scholarships
- Internships
- Volunteer Programs
- Career Opportunities

The platform aims to provide a centralized system where students can discover opportunities, register for events, track participation, earn activity scores, and build their academic and professional profiles.

Target Scale:

- 30,000+ active students
- Multiple universities
- Multiple organizations
- Large-scale event and opportunity management

---

# Technology Stack

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt

## Database

- PostgreSQL

## Development Tools

- Prisma Studio
- Postman
- TSX
- Git & GitHub

---

# Project Architecture

Feature-Based Modular Architecture

text src/ │ ├── config/ │   └── prisma.ts │ ├── middlewares/ │   ├── auth.middleware.ts │   └── rbac.middleware.ts │ ├── modules/ │   │ │   ├── admin/ │   ├── auth/ │   ├── attendance/ │   ├── dashboard/ │   ├── event/ │   ├── leaderboard/ │   ├── notification/ │   ├── opportunity/ │   ├── organization/ │   ├── student/ │   └── user/ │ ├── app.ts └── server.ts 

Each module follows:

text module/ │ ├── controller ├── service └── routes 

Flow:

text Request    ↓ Route    ↓ Controller    ↓ Service    ↓ Prisma    ↓ Database 

---

# Database Overview

Current Core Entities:

- Users
- Roles
- Permissions
- Organizations
- Students
- Universities
- Faculties
- Majors
- Event Categories
- Events
- Event Registrations
- Attendance Records
- Activity Score History
- Opportunities
- Applications
- Notifications

Current Database Size:

25+ Tables

Database Design Pattern:

text RBAC + University Structure + Event Management + Opportunity Management + Notification System 

---

# Features Completed

## Authentication

Status: Completed

Features:

- User Registration
- User Login
- Password Hashing (bcrypt)
- JWT Token Generation
- Protected Routes

Endpoints:

http POST /api/auth/register POST /api/auth/login 

---

## Role-Based Access Control (RBAC)

Status: Completed

Roles:

- STUDENT
- ORGANIZATION
- ADMIN

Features:

- Route Protection
- Role Validation
- Permission Enforcement

---

## Organization System

Status: Completed

Features:

- Organization Registration
- Organization Accounts
- Organization Event Management

---

## Event System

Status: Completed

Features:

- Create Event
- View Events
- Event Categories
- Capacity Management

Endpoints:

http POST /api/events GET /api/events GET /api/events/:id 

---

## Event Approval Workflow

Status: Completed

Features:

- Admin Approval
- Event Status Tracking

Endpoints:

http PATCH /api/events/:id/approve 

---

## Event Registration System

Status: Completed

Features:

- Join Event
- Duplicate Prevention
- Capacity Validation

Endpoints:

http POST /api/events/:id/register 

---

## Attendance System

Status: Completed

Features:

- Student Check-In
- Attendance Records
- Attendance Validation

Endpoints:

http POST /api/attendance/checkin/:eventId 

---

## Activity Score System

Status: Completed

Features:

- Score Awarding
- Score History
- Student Ranking Data

Example:

text Attend Event +10 Score 

---

## Leaderboard

Status: Completed

Features:

- Top Students
- Ranking by Activity Score

Endpoints:

http GET /api/leaderboard 

---

# Current Project Progress

text Authentication          ✅ RBAC                    ✅ Organizations           ✅ Events                  ✅ Approval Workflow       ✅ Registration            ✅  Attendance              ✅ Activity Score          ✅ Leaderboard             ✅  Opportunities           ⏳ Applications            ⏳ Notifications           ⏳  Analytics               ⏳  Frontend                ❌ Deployment              ❌ 

---

# How to Run the Project

Install Dependencies

bash npm install 

Configure Environment Variables

Create:

env DATABASE_URL=postgresql://postgres:password@localhost:5432/rupp_platform  JWT_SECRET=super_secure_secret_key  JWT_EXPIRES_IN=7d 

Generate Prisma Client

bash npx prisma generate 

Run Migration

bash npx prisma migrate dev 

Start Server

bash npm run dev 

Expected:

text Server running on port 5050 

---

# How to Test the Project

## 1. Register Student

http POST /api/auth/register 

json {   "email": "student@gmail.com",   "password": "123456",   "role": "STUDENT" } 

---

## 2. Login

http POST /api/auth/login 

Copy the JWT token.

---

## 3. Create Event Category

Using Prisma Studio:

bash npx prisma studio 

Insert:

text Workshop Competition Conference 

---

## 4. Register Organization

json {   "email": "org@gmail.com",   "password": "123456",   "role": "ORGANIZATION" } 

---

## 5. Create Event

http POST /api/events 

Authorization:

text Bearer TOKEN 

---

## 6. Approve Event

Admin Account:

http PATCH /api/events/:id/approve 

---

## 7. Join Event

Student Account:

http POST /api/events/:id/register 

---

## 8. Check In

Student Account:

http POST /api/attendance/checkin/:eventId 

Expected:

text Attendance Created Activity Score +10 

---

## 9. View Leaderboard

http GET /api/leaderboard 

---

# Upcoming Features

Phase 2:

- Opportunity Management
- Internship System
- Scholarship System
- Application Tracking
- Notification Center
- Dashboard Analytics

Phase 3:

- React Frontend
- Admin Dashboard
- Student Dashboard
- Organization Dashboard

Phase 4:

- Docker Deployment
- Cloud Hosting
- CI/CD Pipeline
- Production Monitoring

---

# Author

Royal University of Phnom Penh (RUPP)

Computer Science Project

RUPP Student Conference & Opportunity Platform