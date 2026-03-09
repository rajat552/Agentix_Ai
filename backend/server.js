const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const aiRoutes = require('./src/routes/aiRoutes');
const errorHandler = require('./src/middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-productivity-copilot')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/ai', aiRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'active', timestamp: new Date() });
});

// Error handling - must be last
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 AI Productivity Copilot Server running on port ${PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV || 'development'}`);
});
