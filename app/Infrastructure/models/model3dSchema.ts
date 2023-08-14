import mongoose, { Schema, Document } from "mongoose";

export interface IModel3d extends Document {
  name: string;
  description: string;
  projectId: string;
}

const model3dSchema: Schema = new Schema({
  name: String,
  description: String,
  projectId: String,
});

const Model3d = mongoose.model<IModel3d>('Model3d', model3dSchema);

export default Model3d;
