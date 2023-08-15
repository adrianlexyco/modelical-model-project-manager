import mongoose from "mongoose";
import { IProject } from "./models/projectSchema";
import { IProjectRepository } from "../Domain/IProjectRepository";

import Project from "../Domain/project";

export interface IDatabaseProject {
  Projects: mongoose.Model<IProject>;
}

class ProjectRepository implements IProjectRepository {
  db: IDatabaseProject;

  constructor(database: IDatabaseProject) {
    this.db = database;
  }

  private toDomainEntity(mongooseModel: IProject): Project {
    return new Project(
      mongooseModel.id!,
      mongooseModel.name,
      mongooseModel.description,
      mongooseModel.modelList
    );
  }

  async getAll(): Promise<Project[]> {
    const projects = await this.db.Projects.find({});
    return projects.map(this.toDomainEntity);
  }

  async getById(id: string): Promise<Project | null> {
    return await this.db.Projects.findById(id);
  }

  async create(project: Project): Promise<Project> {
    const newProject = new this.db.Projects(project);
    return await newProject.save();
  }

  async update(id: string, project: Project): Promise<Project | null> {
    return await this.db.Projects.findByIdAndUpdate(id, project, {
      new: true,
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.db.Projects.deleteOne({ _id: id });
  }
}
export { ProjectRepository };
