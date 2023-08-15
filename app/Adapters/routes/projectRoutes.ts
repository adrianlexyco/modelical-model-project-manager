import express, { Request, Response } from "express";
import { ProjectController } from "../ProjectController";
import { ProjectService } from "../../Application/projectService";
import { ProjectRepository } from "../../Infrastructure/projectRepository";
import Project from "../../Infrastructure/models/projectSchema";
import { Model3dRepository } from "../../Infrastructure/Model3DRepository";
import Model3d from "../../Infrastructure/models/model3dSchema";
import { Model3dService } from "../../Application/model3dService";

const router = express.Router();

const model3Repository = new Model3dRepository({
  Models3d: Model3d,
});
const model3Service = new Model3dService(model3Repository);

const projectRepository = new ProjectRepository({
  Projects: Project,
});
const projectService = new ProjectService(projectRepository);
const projectController = new ProjectController(projectService, model3Service);

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

export default router;
