# Admin Login Setup

## How It Works

The system now supports admin login using credentials stored in environment variables. When a user logs in with the admin email and password from `.env`, they will automatically be granted admin access.

## Setup Instructions

### 1. Add Admin Credentials to `.env` File

Add these two lines to your `server/.env` file:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

**Important**: 
- Change `admin@example.com` to your desired admin email
- Change `admin123` to your desired admin password
- Keep these credentials secure and never commit them to version control

### 2. Complete `.env` File Example

Your `.env` file should look like this:

```env
# Server Configuration
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

### 3. How to Login as Admin

1. Go to the login page (`/login`)
2. Enter the email you set in `ADMIN_EMAIL`
3. Enter the password you set in `ADMIN_PASSWORD`
4. Click Login
5. You will be automatically redirected to `/admin` dashboard

### 4. Features

- **Automatic Admin Creation**: If the admin user doesn't exist in the database, it will be created automatically on first login
- **Role Assignment**: The user will automatically have `role: 'admin'` set
- **Existing User Update**: If a user with that email already exists, their role will be updated to 'admin'
- **Secure**: Admin credentials are stored in environment variables, not in code

### 5. Security Notes

- Keep your `.env` file secure and never commit it to Git
- Use strong passwords for `ADMIN_PASSWORD`
- Consider using a dedicated email for admin access
- The admin password in `.env` is stored in plain text (for comparison), but once the user is created in the database, the password is hashed

### 6. Testing

1. Make sure your `.env` file has `ADMIN_EMAIL` and `ADMIN_PASSWORD` set
2. Restart your server
3. Try logging in with the admin credentials
4. You should be redirected to `/admin` dashboard

## Troubleshooting

- **Not redirecting to admin**: Check that `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` match exactly what you're entering (case-sensitive for password)
- **Access denied**: Make sure the server has been restarted after adding the env variables
- **User not found**: The admin user will be created automatically on first login

