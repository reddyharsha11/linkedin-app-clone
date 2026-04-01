import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
import eventRouter from './routes/EventRoutes.js';
import newsRouter from './routes/NewsRoutes.js';
import cors from 'cors';

const app = express(); // Creates an server instance 

app.use(cors()); // Enable CORS for all routes

app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/', eventRouter);

app.use('/', newsRouter);

const startServer = async () => {
    try {

    // Connect to the database
    await connectDB();
    const PORT = process.env.PORT || 3000;

    
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
     
    } 
    catch (error) {

    
    console.error('Failed to start server:', error);

    
    process.exit(1);
}

}
startServer();
