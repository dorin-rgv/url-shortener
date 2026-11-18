require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const { handleRedirect } = require('./controllers/urlController');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

// ==========================================
// 1. CORS CONFIGURATION (MUST BE FIRST)
// ==========================================
app.use(cors({
  origin: 'https://url-shortener-opal-nine.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
// REMOVED: app.options('*', cors()); <-- This was causing the crash!

// ==========================================
// 2. OTHER MIDDLEWARE
// ==========================================
app.use(express.json());
app.use(morgan('dev'));

// ==========================================
// 3. ROUTES
// ==========================================
app.use('/api', urlRoutes);
app.get('/:shortCode', handleRedirect);

// ==========================================
// 4. START SERVER (Bind to 0.0.0.0 for Render)
// ==========================================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
