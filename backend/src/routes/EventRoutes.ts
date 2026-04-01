import { createEvent, getEvents } from "../controllers/EventMethods.js";
import { Router } from "express";
const eventRouter = Router();
eventRouter.post("/newevent", createEvent);
eventRouter.get("/events", getEvents);
export default eventRouter;