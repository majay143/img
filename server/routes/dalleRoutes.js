// import express  from 'express'
// import * as dotenv from 'dotenv';
// // import {v2 as cloudinary} from 'cloudinary';
// import {Configuration,OpenAIApi} from 'openai';
// dotenv.config();

// const router = express.Router();
// const configuration = new Configuration({
//     apiKey : process.env.OPENAI_API_KEY,
// })
// const openai = new OpenAIApi(configuration);

// router.route('/').get((req,res)=>{
//     res.send('Welcome to the API')
// })
// router.route('/').post(async(req,res)=>{
//     try{
// const {prompt} = req.body;
// /* The code `const aiResponse = await openai.createImage({ prompt, n:1, size:'1024x1024',
// response_format:'b64_json' })` is making a request to the OpenAI API to create an image based on the
// provided prompt. */
// /// geting the img from api 
// const aiResponse = await openai.createImage({
//     prompt,
//     n:1,
//     size:'1024x1024',
//     response_format:'b64_json',
// });
// /* The line `const image = aiResponse.data.data[0].b64_json;` is extracting the base64-encoded image
// data from the response received from the OpenAI API. */
// const image = aiResponse.data.data[0].b64_json;
// res.status(200).json({// sending the img back to front end
//     photo:image
// });
//     }catch(error){
//   console.log(error);
//   res.status(500).send(error?.response.data.error.message)
//     }
// })
// export default router;
  /* The `response_format:'b64_json'` option is specifying the format in which the response from the
  OpenAI API should be returned. In this case, it is set to `'b64_json'`, which means that the
  response will be returned as a base64-encoded JSON object. This format allows for easy handling
  and manipulation of the image data in the subsequent code. */
  import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;