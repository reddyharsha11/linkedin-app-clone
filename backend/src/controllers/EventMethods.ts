import eventModel from "../models/events.js";
import { Request, Response } from "express";

const createEvent = async (req:Request,res:Response)=>{
    try{
        const {name,eventImage,date,location,description} = req.body;
        const newEvent = new eventModel({
            name,
            eventImage,
            date,
            location,
            description
        });
        await newEvent.save();
        res.status(201).json({message:"Event created successfully", event: newEvent});
    }
    catch(err){
        console.error("Error creating event:", err);
        res.status(500).json({message:"Failed to create event"});
    }
}

const getEvents = async (req:Request,res:Response)=>{
    try{
        const events = await eventModel.find();
        res.status(200).json(events);
    }
    catch(err){
        console.error("Error fetching events:", err);
        res.status(500).json({message:"Failed to fetch events"});
    }
}
export {createEvent, getEvents};