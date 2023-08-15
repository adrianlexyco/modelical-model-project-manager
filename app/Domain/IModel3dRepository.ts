import { Model3d } from "./model3d";


export interface IModel3dRepository {
  getAll(): Promise<Model3d[]>;
  getById(id: string): Promise<Model3d | null>;
  create(project: Model3d): Promise<Model3d>;
  update(id: string, project: Model3d): Promise<Model3d | null>;
  deleteById(id: string): Promise<void>;
}
