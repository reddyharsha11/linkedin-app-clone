import mongoose, { Schema, Document } from 'mongoose';

const MONGO_URI = 'your_mongodb_connection_string_here'; 

const ConnectDB = mongoose.connect(MONGO_URI)
  .then(() => console.log('🍃 Connected to MongoDB Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

  export default ConnectDB;