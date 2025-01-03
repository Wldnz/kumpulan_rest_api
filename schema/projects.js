
import {Schema} from "mongoose";
 
const projects = Schema({
    title : String,
    description : String,
    image_path  : String,
    url : String,
    hasUrl : Boolean,
    author : String,
    time : String
});

export default projects;
