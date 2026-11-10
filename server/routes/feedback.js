import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Get all feedback
router.get('/', (req, res) => {
  const { mealType, category } = req.query;
  let items = db.feedback;

  if (mealType) {
    items = items.filter(f => f.mealType.toLowerCase() === mealType.toLowerCase());
  }
  if (category) {
    items = items.filter(f => f.category.toLowerCase() === category.toLowerCase());
  }

  res.json(items);
});

// Submit feedback
router.post('/', (req, res) => {
  const {
    studentId,
    mealType,
    ratingFood,
    ratingHygiene,
    ratingService,
    category,
    comment,
    isAnonymous
  } = req.body;

  if (!studentId || !ratingFood || !comment) {
    return res.status(400).json({ error: 'Please fill in all rating metrics and your comment.' });
  }

  const user = db.findUserById(studentId);
  const studentName = isAnonymous ? 'Anonymous Hostelite' : (user ? user.name : 'Student');
  const rollNumber = isAnonymous ? 'HIDDEN' : (user ? user.rollNumber : 'N/A');

  const foodScore = Number(ratingFood) || 4;
  const hygieneScore = Number(ratingHygiene) || 4;
  const serviceScore = Number(ratingService) || 4;
  const overall = Number(((foodScore + hygieneScore + serviceScore) / 3).toFixed(1));

  const newFeedback = db.addFeedback({
    studentId,
    rollNumber,
    studentName,
    mealType: mealType || 'Lunch',
    date: new Date().toISOString().split('T')[0],
    ratingFood: foodScore,
    ratingHygiene: hygieneScore,
    ratingService: serviceScore,
    overallRating: overall,
    category: category || 'Food Quality',
    comment,
    isAnonymous: !!isAnonymous
  });

  res.json({ success: true, message: 'Feedback submitted. Thank you for helping us improve!', feedback: newFeedback });
});

// Admin responds to feedback
router.post('/:id/reply', (req, res) => {
  const { id } = req.params;
  const { adminReply } = req.body;

  if (!adminReply) {
    return res.status(400).json({ error: 'Reply text cannot be empty' });
  }

  const updated = db.replyFeedback(id, adminReply);
  if (!updated) {
    return res.status(404).json({ error: 'Feedback item not found' });
  }

  res.json({ success: true, message: 'Response posted successfully', feedback: updated });
});

export default router;
