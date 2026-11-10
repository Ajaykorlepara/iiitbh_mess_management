import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Get bills (optional ?studentId=...)
router.get('/', (req, res) => {
  const { studentId } = req.query;
  if (studentId) {
    const list = db.bills.filter(b => b.studentId === studentId);
    return res.json(list);
  }
  res.json(db.bills);
});

// Pay a bill
router.post('/:id/pay', (req, res) => {
  const { id } = req.params;
  const { paymentMethod, transactionId } = req.body;

  const paidBill = db.payBill(id, paymentMethod, transactionId);
  if (!paidBill) {
    return res.status(404).json({ error: 'Bill not found' });
  }

  res.json({ success: true, message: 'Payment successful! Digital receipt generated.', bill: paidBill });
});

export default router;
