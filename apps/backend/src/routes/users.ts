import express, { Router } from 'express';
import { verifyToken, AuthRequest } from '@/middleware/auth';
import { query } from '@/config/database';

const router: Router = express.Router();

// Get user profile
router.get('/profile', verifyToken, async (req: AuthRequest, res) => {
  try {
    const result = await query('SELECT id, email, name, phone, profile_picture, status FROM users WHERE id = $1', [req.userId]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile
router.put('/profile', verifyToken, async (req: AuthRequest, res) => {
  try {
    const { name, phone, profilePicture } = req.body;
    const result = await query(
      'UPDATE users SET name = $1, phone = $2, profile_picture = $3, updated_at = NOW() WHERE id = $4 RETURNING id, email, name, phone, profile_picture',
      [name, phone, profilePicture, req.userId]
    );
    res.json({ message: 'Profile updated', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get addresses
router.get('/addresses', verifyToken, async (req: AuthRequest, res) => {
  try {
    const result = await query('SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC', [req.userId]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add address
router.post('/addresses', verifyToken, async (req: AuthRequest, res) => {
  try {
    const { fullName, phoneNumber, streetAddress, city, state, postalCode, country, isDefault } = req.body;
    const result = await query(
      'INSERT INTO addresses (user_id, full_name, phone_number, street_address, city, state, postal_code, country, is_default) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [req.userId, fullName, phoneNumber, streetAddress, city, state, postalCode, country, isDefault || false]
    );
    res.status(201).json({ message: 'Address added', address: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
