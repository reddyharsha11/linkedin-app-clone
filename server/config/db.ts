import mongoose, { Schema, Document } from 'mongoose';

const MONGO_URI = ''; 

const ConnectDB = mongoose.connect(MONGO_URI)
  .then(() => console.log('🍃 Connected to MongoDB Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

  export default ConnectDB;
