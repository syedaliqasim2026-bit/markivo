import express, { Router } from 'express';
import { query } from '@/config/database';

const router: Router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    const offset = ((Number(page) - 1) * Number(limit));

    let queryStr = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];

    if (category) {
      queryStr += ` AND category = $${params.length + 1}`;
      params.push(category);
    }

    if (search) {
      queryStr += ` AND (name ILIKE $${params.length + 1} OR description ILIKE $${params.length + 1})`;
      params.push(`%${search}%`);
    }

    queryStr += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await query(queryStr, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
