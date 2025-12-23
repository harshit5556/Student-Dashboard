# Client - React Dashboard Application

A modern, responsive React application built with Vite, Redux, and Tailwind CSS for managing student profiles and admin operations.

## 🚀 Features

- **User Authentication**: Login and Signup with JWT tokens
- **Student Dashboard**: Beautiful profile management interface
- **Admin Dashboard**: Complete CRUD operations for student management
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI/UX**: Beautiful gradients, animations, and user-friendly interface
- **State Management**: Redux Toolkit for efficient state management

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running (see server README)

## 🛠️ Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults to localhost:5000):
```env
VITE_API_URL=http://localhost:5000
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on `http://localhost:5173` (or the next available port)

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin-specific components
│   │   ├── student/        # Student-specific components
│   │   └── common/         # Shared components (Navbar, ProtectedRoute)
│   ├── pages/
│   │   ├── admin/          # Admin dashboard page
│   │   ├── auth/           # Login and Signup pages
│   │   └── student/        # Student dashboard page
│   ├── redux/
│   │   ├── authSlice.jsx   # Authentication state
│   │   └── studentSlice.jsx # Student profile state
│   ├── services/
│   │   ├── api.js          # Axios instance with interceptors
│   │   └── studentService.jsx # Student API calls
│   ├── App.jsx             # Main app component with routes
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── package.json
└── vite.config.js
```

## 🔑 Key Features Explained

### Authentication Flow
1. User signs up or logs in
2. JWT token is stored in localStorage
3. Token is automatically added to API requests
4. User is redirected based on role (admin/student)

### Student Dashboard
- View and update personal profile
- Edit name, email, and course
- Real-time validation and feedback
- Beautiful form with animations

### Admin Dashboard
- View all students in a table
- Add new students
- Edit student information inline
- Delete students with confirmation
- Responsive table design

## 🎨 Styling

The application uses **Tailwind CSS** for styling:
- Gradient backgrounds
- Smooth transitions and animations
- Responsive grid layouts
- Modern color schemes
- Icon integration with SVG

## 🔐 Protected Routes

Routes are protected using the `ProtectedRoute` component:
- `/student` - Requires authentication
- `/admin` - Requires authentication AND admin role

## 📡 API Integration

All API calls are made through:
- `services/api.js` - Configured Axios instance
- Automatic token injection
- Error handling and redirects

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite will automatically use the next available port.

### API Connection Issues
- Ensure the backend server is running
- Check `VITE_API_URL` in `.env` matches your backend URL
- Verify CORS is configured on the backend

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔄 State Management

The app uses Redux Toolkit for state management:
- **authSlice**: Manages authentication state (token, user, role)
- **studentSlice**: Manages student profile data and operations

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is part of the Dashboard application.
