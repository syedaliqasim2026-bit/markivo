import express, { Router } from 'express';
import { verifyAdmin, AuthRequest } from '@/middleware/auth';
import { query } from '@/config/database';

const router: Router = express.Router();

// Get dashboard statistics
router.get('/dashboard', verifyAdmin, async (req: AuthRequest, res) => {
  try {
    const users = await query('SELECT COUNT(*) FROM users');
    const vendors = await query('SELECT COUNT(*) FROM vendors');
    const products = await query('SELECT COUNT(*) FROM products');
    const orders = await query('SELECT COUNT(*) FROM orders');
    const revenue = await query('SELECT SUM(total_amount) FROM orders WHERE payment_status = $1', ['completed']);

    res.json({
      totalUsers: parseInt(users.rows[0].count),
      totalVendors: parseInt(vendors.rows[0].count),
      totalProducts: parseInt(products.rows[0].count),
      totalOrders: parseInt(orders.rows[0].count),
      totalRevenue: revenue.rows[0].sum || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get users management
router.get('/users', verifyAdmin, async (req: AuthRequest, res) => {
  try {
    const result = await query('SELECT id, email, name, phone, status, created_at FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get vendors management
router.get('/vendors', verifyAdmin, async (req: AuthRequest, res) => {
  try {
    const result = await query('SELECT * FROM vendors ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
