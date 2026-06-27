import express, { Router } from 'express';
import { query } from '@/config/database';

const router: Router = express.Router();

// Get all vendors
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM vendors WHERE status = $1 ORDER BY rating DESC', ['active']);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get vendor by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM vendors WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Vendor not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
