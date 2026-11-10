import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.polls);
});

router.post('/:id/vote', (req, res) => {
  const { id } = req.params;
  const { optionId, userId } = req.body;

  if (!optionId || !userId) {
    return res.status(400).json({ error: 'Missing optionId or userId' });
  }

  const result = db.castVote(id, optionId, userId);
  if (!result) {
    return res.status(404).json({ error: 'Poll or option not found' });
  }
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.json({ success: true, poll: result });
});

export default router;
