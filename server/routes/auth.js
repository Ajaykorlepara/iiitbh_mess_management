import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Login endpoint
router.post('/login', (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier) {
    return res.status(400).json({ error: 'Please enter your Roll Number or Email' });
  }

  const user = db.findUserByRollOrEmail(identifier);
  if (!user) {
    // If not found, create a temporary student account to allow testing with any custom roll number!
    const newStudent = {
      id: `usr_custom_${Date.now()}`,
      rollNumber: identifier.toUpperCase(),
      name: `Student (${identifier.toUpperCase()})`,
      email: `${identifier.toLowerCase()}@iiit-bh.ac.in`,
      role: identifier.toLowerCase().includes('admin') ? 'admin' : 'student',
      phone: '+91 99999 88888',
      hostel: 'Kharavela Hostel (KHR-B)',
      room: 'B-302',
      messWing: 'Central Mess 1',
      dietaryPreference: 'Veg',
      walletBalance: 500,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };
    db.users.push(newStudent);
    db.saveData();
    return res.json({ success: true, user: newStudent });
  }

  return res.json({ success: true, user });
});

// Get user profile
router.get('/me/:id', (req, res) => {
  const user = db.findUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// List all demo users for quick switching
router.get('/demo-users', (req, res) => {
  res.json(db.users);
});

export default router;
