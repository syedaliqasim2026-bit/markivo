const { Pool } = require('pg');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seedDatabase() {
  const client = await pool.connect();
  try {
    console.log('Seeding database...');

    // Create admin/owner user
    const hashedPassword = await bcryptjs.hash('admin@123', 10);
    await client.query(
      'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
      ['admin@markivo.com', hashedPassword, 'Markivo Admin', 'owner']
    );

    // Create brand settings
    await client.query(
      `INSERT INTO brand_settings (site_name, slogan) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING`,
      ['Markivo', 'Shop from thousands of sellers with the best prices and quality']
    );

    console.log('✅ Database seeding completed!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    client.release();
    pool.end();
  }
}

seedDatabase();
