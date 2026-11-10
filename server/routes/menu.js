import express from 'express';
import { db } from '../db.js';

const router = express.Router();

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Get weekly menu
router.get('/', (req, res) => {
  res.json(db.weeklyMenu);
});

// Get today's menu
router.get('/today', (req, res) => {
  const now = new Date();
  const dayName = DAYS[now.getDay()];
  const menuToday = db.weeklyMenu[dayName] || db.weeklyMenu['Monday'];

  // Determine current active meal window
  const currentHour = now.getHours();
  let currentMeal = 'dinner';
  if (currentHour < 10) {
    currentMeal = 'breakfast';
  } else if (currentHour < 16) {
    currentMeal = 'lunch';
  } else if (currentHour < 19) {
    currentMeal = 'snacks';
  } else {
    currentMeal = 'dinner';
  }

  res.json({
    day: dayName,
    date: now.toISOString().split('T')[0],
    currentMeal,
    menu: menuToday
  });
});

// Admin updates a meal menu
router.put('/:day/:mealType', (req, res) => {
  const { day, mealType } = req.params;
  const updatedData = req.body;

  const result = db.updateMealItem(day, mealType, updatedData);
  if (!result) {
    return res.status(404).json({ error: 'Day or meal type not found' });
  }

  res.json({ success: true, message: 'Menu updated successfully', menu: result });
});

export default router;
