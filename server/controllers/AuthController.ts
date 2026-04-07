import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';

// SECRET KEY for JWT (In a real app, put this in a .env file)
const JWT_SECRET = 'your_super_secret_key_123'; 

/**
 * LOGIC: Register a new user
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, headline } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email' });
      return;
    }

    // 2. Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      headline: headline || 'LinkedIn Member'
    });

    const savedUser = await newUser.save();

    // 4. Generate a token so they are logged in immediately
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        headline: savedUser.headline,
        avatar: savedUser.avatar
      }
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * LOGIC: Login an existing user
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // 2. Check if the password matches the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // 3. Generate a token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // 4. Send back the token and user data (except the password)
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        headline: user.headline,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: 'Server error during login' });
  }
};