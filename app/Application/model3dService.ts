import { Model3dRepository } from "../Infrastructure/Model3DRepository";
import { IModel3d } from "../Infrastructure/models/model3dSchema";

class Model3dService {
  model3dRepository: Model3dRepository;

  constructor(model3dRepository: Model3dRepository) {
    this.model3dRepository = model3dRepository;
  }

  async getAllModels() {
    return await this.model3dRepository.getAll();
  }

  async createModel(model3dData: IModel3d) {
    const newModel = await this.model3dRepository.create(model3dData);
    return newModel;
  }

  async getById(id: string) {
    return await this.model3dRepository.getById(id);
  }

  async updateModel(id: string, model3dData: IModel3d) {
    const updatedModel = await this.model3dRepository.update(id, model3dData);
    return updatedModel;
  }

  async deleteById(id: string) {
    return await this.model3dRepository.deleteById(id);
  }
}

export { Model3dService };
