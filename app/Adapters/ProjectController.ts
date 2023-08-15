import { Request, Response } from "express";
import { ProjectService } from "../Application/projectService";
import { Model3dService } from "../Application/model3dService";
import { IModel3d } from "../Infrastructure/models/model3dSchema";

class ProjectController {
  ProjectService: ProjectService;
  model3dService: Model3dService;

  constructor(ProjectService: ProjectService, model3dService: Model3dService) {
    this.ProjectService = ProjectService;
    this.model3dService = model3dService;
  }

  async getAllProjects(req: Request, res: Response) {
    const projects = await this.ProjectService.getAllProjects();
    res.status(200).send(projects);
  }

  async getProjectById(req: Request, res: Response) {
    const ProjectId = req.params.id;

    try {
      const project = await this.ProjectService.getById(ProjectId);
      if (project) {
        res.status(200).send(project);
      } else {
        res.status(404).send({ message: "Project not found" });
      }
    } catch (error) {
      res.status(404).send({ message: error });
    }
  }

  async createProject(req: Request, res: Response) {
    const newProjectData = req.body;
    const newProject = await this.ProjectService.createProject(newProjectData);
    res.status(201).send(newProject);
  }

  async updateProject(req: Request, res: Response) {
    const projectId = req.params.id;
    const newProjectData = req.body;
    try {
      const newProject = await this.ProjectService.updateProject(
        projectId,
        newProjectData
      );
      if (newProject) {
        res.status(201).send(newProject);
      } else {
        res.status(404).send({ message: "Project not found" });
      }
    } catch (error) {
      res.status(404).send({ message: error });
    }
  }

  async deleteProject(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await this.ProjectService.deleteById(id);
      res.status(200).send({ message: "Project successfully deleted" });
    } catch (error) {
      res.status(404).send({ message: error });
    }
  }

  async getProjectModels(req: Request, res: Response) {
    const ProjectId = req.params.id;

    try {
      const project = await this.ProjectService.getById(ProjectId);
      if (project) {
        const modelPromises = project.modelList.map(async (modelId) => {
          const model = await this.model3dService.getById(modelId);
          if (model) {
            return model;
          }
          return null;
        });

        const resolvedModels = await Promise.all(modelPromises);
        const filteredModels = resolvedModels.filter(
          (model) => model !== null
        ) as IModel3d[];

        res.status(200).send(filteredModels);
      } else {
        res.status(404).send({ message: "Project not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }

    async addModelToProject(req: Request, res: Response) {
      const projectId = req.params.id;

      try {
        const project = await this.ProjectService.getById(projectId);
        if (project) {
          const newModelData = req.body;
          const newModel = await this.model3dService.createModel(newModelData);

          const newModelList = [...project.modelList, newModel.id];

          const newProject = {name: project.name, description: project.description, modelList: newModelList};

          const updatedProject = await this.ProjectService.updateProject(
            projectId,
            newProject
          );

          res.status(200).send(newModel);
        } else {
          res.status(404).send({ message: "Project not found" });
        }
      } catch (error) {
        res.status(500).send({ message: "Internal server error" });
      }
    }
}

export { ProjectController };
