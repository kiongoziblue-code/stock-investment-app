const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const stockRoutes = require('./routes/stocks');
const investmentRoutes = require('./routes/investments');
const alertRoutes = require('./routes/alerts');

const app = express();

app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/alerts', alertRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});