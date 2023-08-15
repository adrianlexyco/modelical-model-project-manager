import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
    name: string;
    description: string;
    modelList: string[];
}

const projectSchema: Schema = new Schema({
  name: String,
  description: String,
  modelList: [String],
});

const Project = mongoose.model<IProject>('Project', projectSchema);

export default Project;
