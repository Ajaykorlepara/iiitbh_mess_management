import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Get tokens for a student
router.get('/student/:studentId', (req, res) => {
  const { studentId } = req.params;
  const tokens = db.mealTokens.filter(t => t.studentId === studentId);
  res.json(tokens);
});

// Generate dynamic token for meal
router.post('/generate', (req, res) => {
  const { studentId, mealType, date } = req.body;
  if (!studentId || !mealType) {
    return res.status(400).json({ error: 'Missing studentId or mealType' });
  }

  const mealDate = date || new Date().toISOString().split('T')[0];
  const token = db.getOrCreateMealToken(studentId, mealType, mealDate);

  if (!token) {
    return res.status(400).json({ error: 'Failed to generate token. Student not found.' });
  }

  res.json({ success: true, token });
});

// Counter scanner endpoint
router.post('/scan', (req, res) => {
  const { tokenCode, scannerName } = req.body;
  if (!tokenCode) {
    return res.status(400).json({ success: false, message: 'No token code provided.' });
  }

  const result = db.scanMealToken(tokenCode, scannerName);
  res.json(result);
});

// Recent scans for live gate monitor
router.get('/recent', (req, res) => {
  const recent = db.mealTokens
    .filter(t => t.status === 'USED')
    .sort((a, b) => new Date(b.scannedAt) - new Date(a.scannedAt))
    .slice(0, 15);
  res.json(recent);
});

export default router;
