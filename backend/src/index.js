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
// 1. CORS CONFIGURATION (Fixes the CORS Error)
// ==========================================
const corsOptions = {
  // Allow your exact Vercel frontend URL
  origin: 'https://url-shortener-opal-nine.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // Some browsers require a 200 OK for preflight
};

// Apply CORS middleware FIRST, before any routes
app.use(cors(corsOptions));

// Explicitly handle OPTIONS preflight requests
app.options('*', cors(corsOptions));

// ==========================================
// 2. OTHER MIDDLEWARE
// ==========================================
app.use(express.json()); // Parses incoming JSON payloads
app.use(morgan('dev'));  // Logs HTTP requests to the console

// ==========================================
// 3. ROUTES (Fixes the 404 Not Found Errors)
// ==========================================
// Mount your API routes. This ensures /api/urls and /api/shorten work.
app.use('/api', urlRoutes); 

// Redirect route (usually for the short links themselves)
// IMPORTANT: This must come AFTER your API routes so it doesn't catch /api requests
app.get('/:shortId', handleRedirect);

// ==========================================
// 4. START SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
