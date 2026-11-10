import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.notices);
});

router.post('/', (req, res) => {
  const { title, category, content, postedBy } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const notice = db.addNotice({
    title,
    category: category || 'General Announcement',
    content,
    postedBy: postedBy || 'Mess Committee'
  });

  res.json({ success: true, message: 'Notice published', notice });
});

router.delete('/:id', (req, res) => {
  const removed = db.deleteNotice(req.params.id);
  if (!removed) {
    return res.status(404).json({ error: 'Notice not found' });
  }
  res.json({ success: true, message: 'Notice removed' });
});

export default router;
