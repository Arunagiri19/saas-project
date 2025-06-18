// server.js
import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGODB)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => console.error('MongoDB connection error:', error));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is Running On Port ${PORT}`);
});
