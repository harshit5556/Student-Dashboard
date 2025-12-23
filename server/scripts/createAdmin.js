import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const adminData = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    };

    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
      await mongoose.connection.close();
      return;
    }

    const admin = await User.create(adminData);
    console.log('Admin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Password:', adminData.password);
    console.log('Role:', admin.role);
    console.log('\nYou can now login with these credentials.');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();

