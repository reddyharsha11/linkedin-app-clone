import mongoose, {Document, Schema} from "mongoose";

export interface ICrircNews extends Document{
    headline: string;
    newsImage: string;
    date: String;
    description: string;
}

const CricNewsSchema = new Schema<ICrircNews>({
    headline: { type: String, required: true },
    newsImage: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
})

const cricNewsModel = mongoose.model<ICrircNews>("CricNews", CricNewsSchema);
export default cricNewsModel;