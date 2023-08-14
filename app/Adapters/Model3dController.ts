import { Request, Response } from "express";
import Model3dService from "../Application/model3dService";

class Model3dController {
  model3dService: Model3dService;

  constructor(model3dService: Model3dService) {
    this.model3dService = model3dService;
  }

  async getAllModels(req: Request, res: Response) {
    const models = await this.model3dService.getAllModels();
    res.status(200).send(models);
  }

  async getModelById(req: Request, res: Response) {
    const modelId = req.params.id;
    const models = await this.model3dService.getById(modelId);
    res.status(200).send(models);
  }

  async createModel(req: Request, res: Response) {
    const newModelData = req.body;
    const newModel = await this.model3dService.createModel(newModelData);
    res.status(201).send(newModel);
  }
}

export default Model3dController;
