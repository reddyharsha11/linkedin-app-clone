import mongoose, {Document, Schema} from "mongoose";

export interface IEvent extends Document {
    name: string;
    eventImage: string;
    date: String;
    location: string;
    description: string;
};


const EventSchema = new Schema<IEvent>({
    name: { type: String, required: true },
    eventImage: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
});

const eventModel = mongoose.model<IEvent>("Event", EventSchema);

export default eventModel;