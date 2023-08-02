import mongoose from  'mongoose';
const Post = new mongoose.Schema({
    name:{// req field name and field type 
        type : String,required:true},
   prompt:{type:String,required:true},
   phot:{type:String,required:true},
}); /// 
/* The line `const PostSchema  = mongoos.model('Post',Post);` is creating a model for the 'Post'
collection in the MongoDB database using the defined schema 'Post'. It assigns the model to the
variable 'PostSchema', which can be used to perform CRUD operations on the 'Post' collection. */
const PostSchema  = mongoose.model('Post',Post);
export default PostSchema;