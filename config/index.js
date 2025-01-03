import mongoose from "mongoose";
import "dotenv/config";
import projects from "../schema/projects.js"

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection.useDb('wldnz');
db.model('projects',projects);
export default db;

