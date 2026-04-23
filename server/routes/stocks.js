const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, symbol, current_price, interest_rate, min_deposit, max_deposit, tier FROM stocks ORDER BY interest_rate DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM stocks WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/compare/tiers', async (req, res) => {
    try {
        const result = await pool.query('SELECT tier, COUNT(*) as count, AVG(interest_rate) as avg_rate, MIN(min_deposit) as min_invest FROM stocks GROUP BY tier');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;