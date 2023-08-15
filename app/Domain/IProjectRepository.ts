import Project from "./project";

export interface IProjectRepository {
  getAll(): Promise<Project[]>;
  getById(id: string): Promise<Project | null>;
  create(project: Project): Promise<Project>;
  update(id: string, project: Project): Promise<Project | null>;
  deleteById(id: string): Promise<void>;
}
