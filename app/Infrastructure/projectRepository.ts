import mongoose from "mongoose";
import { IProject } from "./models/projectSchema";

export interface IDatabaseProject {
  Projects: mongoose.Model<IProject>;
}

class ProjectRepository {
  db: IDatabaseProject;

  constructor(database: IDatabaseProject) {
    this.db = database;
  }

  async getAll(): Promise<IProject[]> {
    return await this.db.Projects.find({});
  }
  
  async getById(id: string): Promise<IProject | null> {
    return await this.db.Projects.findById(id);
  }

  async create(project: IProject): Promise<IProject> {
    const newProject = new this.db.Projects(project);
    return await newProject.save();
  }

  async update(id: string, project: IProject): Promise<IProject | null> {
    return await this.db.Projects.findByIdAndUpdate(id, project, {
      new: true,
    });
  }

  async deleteById(id: string) {
    return await this.db.Projects.deleteOne({ _id: id });
  }
  
}
export { ProjectRepository };
