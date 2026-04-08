import mongoose, { Schema, Document } from 'mongoose';

const MONGO_URI = 'mongodb+srv://bharsha4567_db_user:WsTuVm2zjsUZ4dEu@cluster0.fy5sxib.mongodb.net/?appName=Cluster0'; 

const ConnectDB = mongoose.connect(MONGO_URI)
  .then(() => console.log('🍃 Connected to MongoDB Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

  export default ConnectDB;
