# Server - Node.js Express API

A robust RESTful API built with Express.js, MongoDB, and JWT authentication for the Dashboard application.

## 🚀 Features

- **RESTful API**: Clean and organized API endpoints
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Admin and Student roles
- **MongoDB Integration**: Mongoose ODM for database operations
- **Email Support**: Nodemailer integration for email functionality
- **Environment Configuration**: Secure environment variable management
- **Error Handling**: Comprehensive error handling middleware

## 📋 Prerequisites

- Node.js (v20 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/dashboard
JWT_SECRET=your_super_secret_jwt_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:5173

# Admin Credentials (for admin login)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

## 🏃 Running the Server

### Development Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

### With Nodemon (Auto-restart)
```bash
npx nodemon server.js
```

## 📁 Project Structure

```
server/
├── config/
│   ├── db.js           # MongoDB connection
│   └── env.js          # Environment variables
├── controllers/
│   ├── authControllers.js    # Authentication logic
│   └── studentControllers.js # Student CRUD operations
├── middleware/
│   ├── authMiddleware.js    # JWT verification
│   └── roleMiddleware.js    # Role-based access control
├── models/
│   ├── user.js         # User schema
│   └── student.js      # Student schema
├── routes/
│   ├── authRoutes.js   # Authentication routes
│   └── studentRoutes.js # Student routes
├── utils/
│   ├── generateToken.js # JWT token generation
│   └── sendEmail.js    # Email utility
├── scripts/
│   └── createAdmin.js  # Admin user creation script
├── app.js              # Express app configuration
├── server.js           # Server entry point
└── package.json
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/register`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/login`
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Student Routes (`/api/students`)

#### GET `/api/students/me` (Authenticated)
Get current student's profile

#### PUT `/api/students/me` (Authenticated)
Update current student's profile
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "course": "Computer Science"
}
```

#### GET `/api/students` (Admin Only)
Get all students

#### POST `/api/students` (Admin Only)
Create a new student
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "course": "Mathematics"
}
```

#### PUT `/api/students/:id` (Admin Only)
Update a student by ID

#### DELETE `/api/students/:id` (Admin Only)
Delete a student by ID

## 🔐 Authentication

### How It Works

1. User registers or logs in
2. Server generates JWT token with user info
3. Token is sent to client
4. Client includes token in `Authorization: Bearer <token>` header
5. Server verifies token on protected routes

### Admin Login

Admin can login using credentials from `.env`:
- `ADMIN_EMAIL`: Admin email address
- `ADMIN_PASSWORD`: Admin password

If admin user doesn't exist, it's created automatically on first login.

## 🗄️ Database Models

### User Model
- `name`: String (required)
- `email`: String (required, unique, lowercase)
- `password`: String (required, hashed)
- `role`: String (enum: 'admin', 'student', default: 'student')
- `isVerified`: Boolean (default: false)
- `timestamps`: createdAt, updatedAt

### Student Model
- `name`: String (required)
- `email`: String (required, unique, lowercase)
- `course`: String (required)
- `enrollmentDate`: Date (default: now)
- `timestamps`: createdAt, updatedAt

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Role-Based Access**: Middleware for role verification
- **Input Validation**: Mongoose schema validation
- **CORS**: Configured for client access
- **Environment Variables**: Sensitive data in `.env`

## 📝 Available Scripts

- `npm start` - Start the server
- `npm run create-admin` - Create admin user

## 🔧 Configuration

### MongoDB Connection
Set `MONGO_URI` in `.env`:
- Local: `mongodb://localhost:27017/dashboard`
- Atlas: `mongodb+srv://user:pass@cluster.mongodb.net/dashboard`

### JWT Secret
Generate a strong secret for `JWT_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env`
- Verify network connectivity

### Port Already in Use
- Change `PORT` in `.env`
- Kill process using the port

### JWT Errors
- Verify `JWT_SECRET` is set
- Check token expiration (7 days default)
- Ensure token is sent in Authorization header

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT implementation
- **bcryptjs**: Password hashing
- **dotenv**: Environment variables
- **cors**: Cross-origin resource sharing
- **nodemailer**: Email functionality

## 🔄 Data Flow

1. Client sends request → Express middleware
2. Auth middleware verifies JWT token
3. Role middleware checks user permissions
4. Controller processes request
5. Model interacts with MongoDB
6. Response sent back to client

## 📄 License

This project is part of the Dashboard application.

