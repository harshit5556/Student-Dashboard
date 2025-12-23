# Dashboard Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for student and admin management with beautiful, modern UI/UX.

## Overview
 - A student dashboard for profile management
 - An admin dashboard for complete student management (CRUD)
 - Secure authentication using JWT
 - Clean, modern UI built with Tailwind CSS

### Features
## Student Features
- Profile dashboard with modern UI
- Update personal details (name, email, course)
- Secure login & authentication
- Fully responsive design (mobile, tablet, desktop)

## Admin Features
- View all students in a structured table
- Add new students
- Edit student details
- Delete students with confirmation
- Role-based access control (Admin only)

## Project Structure

```
Dashboard/
├── client/          # React frontend application
├── server/          # Node.js/Express backend API
├── Admin/           # Additional admin resources
└── README.md        # This file
```

## Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
cd server
```

2. Install dependencies:
npm install
```

3. Create `.env` file:
```env
PORT=
MONGO_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
CLIENT_URL=

# Admin Credentials
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

4. Start the server:
npm start
```

### Frontend Setup

1. Navigate to client directory:
cd client
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

5. Open browser to `http://localhost:5173`

##  Documentation

- **[Client README](./client/README.md)** - Frontend documentation
- **[Server README](./server/README.md)** - Backend API documentation
- **[Admin Flow Guide](./ADMIN_FLOW.md)** - Complete admin functionality guide

##  Authentication

### Student Registration/Login
1. Go to `/signup` to create a new account
2. Or go to `/login` to sign in
3. Students are redirected to `/student` dashboard

### Admin Login
1. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env`
2. Login with those credentials at `/login`
3. Admin is automatically redirected to `/admin` dashboard

##  Tech Stack

### Frontend
- React 19
- Redux Toolkit (State Management)
- React Router (Routing)
- Axios (HTTP Client)
- Tailwind CSS (Styling)
- Vite (Build Tool)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT (Authentication)
- bcryptjs (Password Hashing)
- Nodemailer (Email)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Student (Authenticated)
- `GET /api/students/me` - Get own profile
- `PUT /api/students/me` - Update own profile

### Admin (Admin Only)
- `GET /api/students` - Get all students
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Protected routes
- CORS configuration
- Environment variable security

##  Testing

### Test Admin Access
1. Set admin credentials in `server/.env`
2. Login with admin email/password
3. Verify redirect to `/admin` dashboard
4. Test CRUD operations

### Test Student Access
1. Register a new account
2. Login with student credentials
3. Verify redirect to `/student` dashboard
4. Test profile update

##  Troubleshooting

### Common Issues

**Backend won't start**
- Check MongoDB is running
- Verify `.env` file exists and is configured
- Check port 5000 is available

**Frontend can't connect to backend**
- Verify backend is running on port 5000
- Check `VITE_API_URL` in client `.env`
- Verify CORS is configured

**Admin login not working**
- Ensure `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`
- Restart server after `.env` changes
- Check server logs for errors


