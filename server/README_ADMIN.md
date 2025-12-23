# How to Login as Admin

## Method 1: Create Admin Using Script (Recommended)

1. Make sure your `.env` file has `MONGO_URI` configured
2. Run the create admin script:
   ```bash
   npm run create-admin
   ```
3. Default admin credentials:
   - **Email**: `admin@example.com`
   - **Password**: `admin123`
4. Login with these credentials at `/login`

## Method 2: Update Existing User in Database

If you want to make an existing user an admin:

1. Connect to your MongoDB database
2. Find the user:
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```
3. Login with that user's credentials

## Method 3: Create Admin via MongoDB Shell

1. Open MongoDB shell or MongoDB Compass
2. Run this command:
   ```javascript
   db.users.insertOne({
     name: "Admin User",
     email: "admin@example.com",
     password: "$2a$10$YourHashedPasswordHere", // Use bcrypt to hash password
     role: "admin",
     isVerified: false,
     createdAt: new Date(),
     updatedAt: new Date()
   })
   ```
   **Note**: You need to hash the password first using bcrypt

## After Creating Admin

1. Go to `/login` page
2. Enter admin email and password
3. You'll be redirected to `/admin` dashboard
4. You can now manage all students (view, add, edit, delete)

## Change Default Admin Credentials

Edit `server/scripts/createAdmin.js` and change:
- `email`: Change the admin email
- `password`: Change the admin password
- `name`: Change the admin name

Then run `npm run create-admin` again.

