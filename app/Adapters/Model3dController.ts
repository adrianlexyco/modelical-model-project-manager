import { Request, Response } from "express";
import { Model3dService } from "../Application/model3dService";

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

    try {
      const model = await this.model3dService.getById(modelId);
      if (model) {
        res.status(200).send(model);
      } else {
        res.status(404).send({ message: "Model not found" });
      }
    } catch (error) {
      res.status(404).send({ message: error });
    }
  }

  async createModel(req: Request, res: Response) {
    const newModelData = req.body;
    const newModel = await this.model3dService.createModel(newModelData);
    res.status(201).send(newModel);
  }

  async updateModel(req: Request, res: Response) {
    const modelId = req.params.id;
    const newModelData = req.body;
    try {
      const newModel = await this.model3dService.updateModel(
        modelId,
        newModelData
      );
      if (newModel) {
        res.status(201).send(newModel);
      } else {
        res.status(404).send({ message: "Model not found" });
      }
    } catch (error) {
      res.status(404).send({ message: error });
    }
  }

  async deleteModel(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await this.model3dService.deleteById(id);

      res.status(200).send({ message: "Model successfully deleted" });
    } catch (error) {
      res.status(404).send({ message: error });
    }
  }
}

export { Model3dController };
