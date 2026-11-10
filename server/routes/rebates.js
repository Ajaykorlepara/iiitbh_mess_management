import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Get rebate requests (optional ?studentId=...)
router.get('/', (req, res) => {
  const { studentId } = req.query;
  if (studentId) {
    const list = db.rebateRequests.filter(r => r.studentId === studentId);
    return res.json(list);
  }
  res.json(db.rebateRequests);
});

// Student applies for rebate
router.post('/apply', (req, res) => {
  const {
    studentId,
    startDate,
    endDate,
    reason,
    leaveCategory,
    proofDocName
  } = req.body;

  if (!studentId || !startDate || !endDate || !reason) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  const user = db.findUserById(studentId);
  if (!user) {
    return res.status(404).json({ error: 'Student not found' });
  }

  // Calculate days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  if (diffDays < 3) {
    return res.status(400).json({
      error: 'Rebate policy requires a minimum of 3 consecutive leave days.'
    });
  }

  const rebate = db.createRebate({
    studentId: user.id,
    rollNumber: user.rollNumber,
    studentName: user.name,
    hostel: user.hostel,
    roomNumber: user.room || 'Hostel Room',
    startDate,
    endDate,
    totalDays: diffDays,
    reason,
    leaveCategory: leaveCategory || 'Personal Leave',
    proofDocName: proofDocName || 'Self_Declaration_Signed.pdf'
  });

  res.json({ success: true, message: 'Rebate application submitted successfully', rebate });
});

// Admin reviews rebate (approve or reject)
router.put('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, reviewerName, remarks } = req.body;

  if (!['APPROVED', 'REJECTED'].includes(status)) {
    return res.status(400).json({ error: 'Status must be APPROVED or REJECTED' });
  }

  const updated = db.updateRebateStatus(id, status, reviewerName, remarks);
  if (!updated) {
    return res.status(404).json({ error: 'Rebate record not found' });
  }

  res.json({ success: true, message: `Rebate ${status.toLowerCase()} successfully`, rebate: updated });
});

export default router;
