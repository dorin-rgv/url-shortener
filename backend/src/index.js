require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const { handleRedirect } = require('./controllers/urlController');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);

app.use(cors({
  origin: 'https://url-shortener-opal-nine.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.options('*', cors());

app.use(express.json());
app.use(morgan('dev'));

// THIS IS THE MAGIC LINE
app.use('/api', urlRoutes); 

app.get('/:shortCode', handleRedirect);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
