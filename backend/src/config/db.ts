import mongoose from "mongoose";

const connectDB = async () :Promise<void>=>{
    try{
        const mongoURL = process.env.MONGODB_URL || "";
        await mongoose.connect(mongoURL);
        console.log("MongoDB connected successfully");
    }
    catch(err){
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

export default connectDB; 