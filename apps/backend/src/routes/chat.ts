import express, { Router } from 'express';
import { verifyToken, AuthRequest } from '@/middleware/auth';
import { query } from '@/config/database';

const router: Router = express.Router();

// Get conversations
router.get('/conversations', verifyToken, async (req: AuthRequest, res) => {
  try {
    const result = await query(
      'SELECT * FROM chat_conversations WHERE $1 = ANY(participants) ORDER BY updated_at DESC',
      [req.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get messages
router.get('/messages/:conversationId', verifyToken, async (req: AuthRequest, res) => {
  try {
    const result = await query(
      'SELECT * FROM chat_messages WHERE conversation_id = $1 ORDER BY created_at ASC',
      [req.params.conversationId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send message
router.post('/messages', verifyToken, async (req: AuthRequest, res) => {
  try {
    const { conversationId, content, type } = req.body;
    const result = await query(
      'INSERT INTO chat_messages (conversation_id, sender_id, content, type) VALUES ($1, $2, $3, $4) RETURNING *',
      [conversationId, req.userId, content, type || 'text']
    );
    res.status(201).json({ message: 'Message sent', message: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
