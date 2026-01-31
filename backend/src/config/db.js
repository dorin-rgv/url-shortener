const mongoose = require('mongoose');

async function connectDB (uri){
    try {
        if (!uri) {
            throw new Error ('MONGO_URI is not defined');
        }

        await mongoose.connect(uri);
          
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
    
}
module.exports = connectDB;