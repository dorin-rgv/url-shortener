require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const {handleRedirect} = require('./controllers/urlController');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI);//connect to MongoDB

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//health check
app.get('/health', (req,res)=>{
    res.json({status: 'ok'});
});

app.use('/api',urlRoutes); //API Routes

app.get('/:shortCode', handleRedirect); //redirect from short URL

//start server
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);

});