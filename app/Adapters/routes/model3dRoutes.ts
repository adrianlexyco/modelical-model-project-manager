import express, { Request, Response } from "express";
import { Model3dController } from "./Model3dController";
import { Model3dService } from "../Application/model3dService";
import { Model3dRepository } from "../Infrastructure/Model3DRepository";
import Model3d from "../Infrastructure/models/model3dSchema";
//USAR AQUI EL MODEL3D DEL DOMINIO

const router = express.Router();

const model3Repository = new Model3dRepository({
  Models3d: Model3d,
});
const model3Service = new Model3dService(model3Repository);
const model3Controller = new Model3dController(model3Service);

router.get("/", async (req: Request, res: Response) => {
  await model3Controller.getAllModels(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await model3Controller.getModelById(req, res);
});

router.post("/", async (req: Request, res: Response) => {
  await model3Controller.createModel(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await model3Controller.updateModel(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await model3Controller.deleteModel(req, res);
});

export default router;
