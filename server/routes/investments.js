const express = require('express');
const router = express.Router();

// In-memory data store for investments
let investments = [];

// Handler to add an investment
router.post('/add', (req, res) => {
    const { amount, type, date } = req.body;
    if (!amount || !type || !date) {
        return res.status(400).json({ message: 'Amount, type, and date are required.' });
    }
    investments.push({ amount, type, date });
    res.status(201).json({ message: 'Investment added successfully.' });
});

// Handler to calculate earnings
router.get('/earnings', (req, res) => {
    const totalEarnings = investments.reduce((acc, investment) => acc + investment.amount * 0.1, 0); // Assuming 10% earnings
    res.json({ totalEarnings });
});

// Handler to add dividends
router.post('/dividends', (req, res) => {
    const { investmentId, amount } = req.body;
    const investment = investments[investmentId];
    if (!investment) {
        return res.status(404).json({ message: 'Investment not found.' });
    }
    investment.dividends = (investment.dividends || 0) + amount;
    res.json({ message: 'Dividends added successfully.', investment });
});

// Handler for recurring deposits
router.post('/recurring-deposit', (req, res) => {
    const { amount, frequency } = req.body;
    if (!amount || !frequency) {
        return res.status(400).json({ message: 'Amount and frequency are required.' });
    }
    // Here you would implement logic to handle recurring deposits
    res.json({ message: 'Recurring deposit setup successfully.' });
});

module.exports = router;