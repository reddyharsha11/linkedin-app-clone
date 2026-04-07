import PostModel from "../model/PostSchema";
import { Request, Response } from "express";


// GET: Fetch all posts (sorted by newest first)
const Getcode = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

// POST: Create a new user-specific post
const PostCode =  async (req: Request, res: Response) => {
  try {
    const { profileName, headline, description, postImage, time } = req.body;
    
    const newPost = new PostModel({
      profileName,
      headline,
      description,
      postImage,
      time
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error });
  }
};

export { Getcode, PostCode };