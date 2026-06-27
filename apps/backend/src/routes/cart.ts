import express, { Router } from 'express';
import { verifyToken, AuthRequest } from '@/middleware/auth';
import { query } from '@/config/database';

const router: Router = express.Router();

// Get cart
router.get('/', verifyToken, async (req: AuthRequest, res) => {
  try {
    const result = await query('SELECT * FROM cart_items WHERE user_id = $1', [req.userId]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to cart
router.post('/', verifyToken, async (req: AuthRequest, res) => {
  try {
    const { productId, quantity } = req.body;
    const result = await query(
      'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = quantity + $3 RETURNING *',
      [req.userId, productId, quantity]
    );
    res.status(201).json({ message: 'Item added to cart', item: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from cart
router.delete('/:productId', verifyToken, async (req: AuthRequest, res) => {
  try {
    await query('DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2', [req.userId, req.params.productId]);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
