import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.inventory);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { quantityChange, remarks } = req.body;

  const item = db.updateStock(id, Number(quantityChange) || 0, remarks);
  if (!item) {
    return res.status(404).json({ error: 'Inventory item not found' });
  }

  res.json({ success: true, item });
});

export default router;
