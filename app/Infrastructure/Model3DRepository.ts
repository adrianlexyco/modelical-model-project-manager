import mongoose from "mongoose";
import { Model3d } from "../Domain/model3d";
import { IModel3d } from "./models/model3dSchema";

export interface IDatabaseModel3d {
  Models3d: mongoose.Model<IModel3d>;
}

class Model3dRepository implements Model3dRepository {
  db: IDatabaseModel3d;

  constructor(database: IDatabaseModel3d) {
    this.db = database;
  }

  private toDomainEntity(mongooseModel: IModel3d): Model3d {
    return new Model3d(
      mongooseModel.id,
      mongooseModel.name,
      mongooseModel.description,
      mongooseModel.projectId
    );
  }

  async getAll(): Promise<Model3d[]> {
    const models = await this.db.Models3d.find({});
    return models.map(this.toDomainEntity);
  }

  async getById(id: string): Promise<Model3d | null> {
    const model = await this.db.Models3d.findById(id);
    return model ? this.toDomainEntity(model) : null;
  }

  async create(model3d: Model3d): Promise<Model3d> {
    const newModel = new this.db.Models3d(model3d);
    const savedModel = await newModel.save();
    return this.toDomainEntity(savedModel);
  }

  async deleteById(id: string) {
    await this.db.Models3d.deleteOne({ _id: id });
  }

  async update(id: string, model3d: Model3d): Promise<Model3d | null> {
    const updatedModel = await this.db.Models3d.findByIdAndUpdate(id, model3d, {
      new: true,
    });

    return updatedModel ? this.toDomainEntity(updatedModel) : null;
  }
}
export { Model3dRepository };
