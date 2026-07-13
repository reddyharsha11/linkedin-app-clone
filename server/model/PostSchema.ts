import mongoose, { Schema, Document } from 'mongoose';

interface IPost extends Document {
  profileName: string;
  headline: string;
  description: string;
  postImage: string;
  time: string;
}

const PostSchema: Schema = new Schema({
  profileName: { type: String, required: true },
  headline: { type: String, required: true },
  description: { type: String, required: true },
  postImage: { type: String, required: true },
  time: { type: String, default: 'Just now' },
}, { timestamps: true }); 

const PostModel = mongoose.model<IPost>('Post', PostSchema);

export default PostModel;