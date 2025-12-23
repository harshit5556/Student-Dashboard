import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';
import env from '../config/env.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    const token = generateToken({ id: user._id, email: user.email, role: user.role });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (env.ADMIN_EMAIL && env.ADMIN_PASSWORD) {
      const adminEmail = env.ADMIN_EMAIL.toLowerCase().trim();
      const adminPassword = env.ADMIN_PASSWORD;
      
      if (email.toLowerCase().trim() === adminEmail && password === adminPassword) {
        let adminUser = await User.findOne({ email: adminEmail });
        
        if (!adminUser) {
          adminUser = await User.create({
            name: 'Admin',
            email: adminEmail,
            password: adminPassword,
            role: 'admin'
          });
        } else {
          if (adminUser.role !== 'admin') {
            adminUser.role = 'admin';
            await adminUser.save();
          }
        }

        const token = generateToken({ 
          id: adminUser._id, 
          email: adminUser.email, 
          role: 'admin' 
        });

        return res.json({
          _id: adminUser._id,
          name: adminUser.name,
          email: adminUser.email,
          role: 'admin',
          token,
        });
      }
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken({ id: user._id, email: user.email, role: user.role });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};