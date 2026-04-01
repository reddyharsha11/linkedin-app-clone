import cricNewsModel from "../models/news.js";
import{Request, Response} from "express";

const CreateNews = async (req:Request, res:Response)=>{
    try{
        const {headline, newsImage, date, description} = req.body;
        const newNews = new cricNewsModel({
            headline,
            newsImage,
            date,
            description
        });
        await newNews.save();
        res.status(201).json({message: "News created successfully", news: newNews});
    }
    catch(err){
        res.status(500).json({message: "Error creating news", error: err});
        console.error("Error creating event:", err);
    }
}

const GetNews = async (req:Request, res:Response)=>{
    try{
        const news = await cricNewsModel.find();
        res.status(200).json(news);
    }
    catch(err){
        res.status(500).json({message: "Error fetching news", error: err});
        console.error("Error fetching news:", err);
    }
}


const BulkNewsUpload = async (req:Request, res:Response)=>{
    try{
        const news = req.body;

        if(!Array.isArray(news)){
            return res.status(400).json({message: "Invalid data format. Expected an array of news items."});
        }
        const insertedNews = await cricNewsModel.insertMany(news);
        res.status(201).json({message: "Bulk news uploaded successfully", news: insertedNews});
    }
    catch(err){
        res.status(500).json({message: "Error uploading bulk news", error: err});
    }
}
export {CreateNews, GetNews, BulkNewsUpload};