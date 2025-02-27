const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { processQuestion } = require('./claude-api');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API endpoints
app.post('/api/ask', async (req, res) => {
    try {
        const { question } = req.body;
        
        if (!question || typeof question !== 'string') {
            return res.status(400).json({ error: 'Invalid question format' });
        }
        
        const response = await processQuestion(question);
        res.json({ response });
        
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ 
            error: 'An error occurred while processing your request',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});