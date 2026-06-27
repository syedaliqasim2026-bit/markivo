import express, { Router } from 'express';
import { verifyToken, AuthRequest } from '@/middleware/auth';
import { query } from '@/config/database';

const router: Router = express.Router();

// Get user orders
router.get('/', verifyToken, async (req: AuthRequest, res) => {
  try {
    const result = await query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [req.userId]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create order
router.post('/', verifyToken, async (req: AuthRequest, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    const result = await query(
      'INSERT INTO orders (user_id, items, shipping_address, payment_method, order_status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.userId, JSON.stringify(items), JSON.stringify(shippingAddress), paymentMethod, 'pending']
    );
    res.status(201).json({ message: 'Order created', order: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
