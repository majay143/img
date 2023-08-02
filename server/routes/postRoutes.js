// import express  from 'express'
// import * as dotenv from 'dotenv';
// import {v2 as cloudinary} from 'cloudinary';
// import Post from '../mongodb/models/post.js';
// dotenv.config();
// const router = express.Router();
// // router.route('/').get((req,res)=>{
// //     res.send('Welcome to new the API')
// // })
// // const router = express.Router();
// export default router
/// using post routes we can share our AI gen images publicly 
import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/post.js';
dotenv.config();
const router = express.Router();
///cloudinary hsot images of ai generated 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});/// GET ALL POSTS 
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});
///CREATE A POST  OR SENDING DATA FROM FRONTEND 
router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body; // req.body means sending data from client side 
    /// uploading img to cloudinary and leter geting back the img URL
    const photoUrl = await cloudinary.uploader.upload(photo);
/// abive data ais coming from frontend 
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });/// using above 4 lines we can create a new post in our data base 
    res.status(200).json({ success: true, data: newPost });
    /// if a new post is reuested successfuly then return 200
  } catch (err) {/// error 500 states it is a internal server error 
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

export default router;