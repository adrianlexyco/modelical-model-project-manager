import express, { Request, Response } from "express";
import { ProjectRepository } from "../../Infrastructure/projectRepository";
import { Model3dRepository } from "../../Infrastructure/Model3DRepository";
import { ProjectService } from "../../Application/projectService";
import { Model3dService } from "../../Application/model3dService";
import { ProjectController } from "../ProjectController";
import Model3d from "../../Infrastructure/models/model3dSchema";
import Project from "../../Infrastructure/models/projectSchema";

const router = express.Router();

const projectRepository = new ProjectRepository({
  Projects: Project,
});

const model3dRepository = new Model3dRepository({
  Models3d: Model3d,
});

const projectService = new ProjectService(projectRepository);
const model3dService = new Model3dService(model3dRepository);

const projectController = new ProjectController(projectService, model3dService);

router.get("/", async (req: Request, res: Response) => {
  await projectController.getAllProjects(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
  await projectController.getProjectById(req, res);
});

router.post("/", async (req: Request, res: Response) => {
  await projectController.createProject(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  await projectController.updateProject(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await projectController.deleteProject(req, res);
});

router.get("/:id/models", async (req: Request, res: Response) => {
  await projectController.getProjectModels(req, res);
});

router.put("/:id/addModel", async (req: Request, res: Response) => {
  await projectController.addModelToProject(req, res);
});

export default router;
