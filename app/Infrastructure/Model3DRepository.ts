import mongoose from "mongoose";
import { IModel3d } from "./models/model3dSchema";

export interface IDatabase {
  Models3d: mongoose.Model<IModel3d>;
}

class Model3dRepository {
  db: IDatabase;

  constructor(database: IDatabase) {
    this.db = database;
  }

  async getAll(): Promise<IModel3d[]> {
    return await this.db.Models3d.find({});
  }

  async getById(id: string): Promise<IModel3d | null> {
    return await this.db.Models3d.findById(id).exec();
  }

  async create(model3d: IModel3d): Promise<IModel3d> {
    const newModel = new this.db.Models3d(model3d);
    return await newModel.save();
  }

  async delete(id: string) {
    return await this.db.Models3d.deleteOne({ _id: id });
}
}
export default Model3dRepository;
