import { ProjectRepository } from "../Infrastructure/projectRepository";
import { Project } from "../Domain/project";

class ProjectService {
  ProjectRepository: ProjectRepository;

  constructor(ProjectRepository: ProjectRepository) {
    this.ProjectRepository = ProjectRepository;
  }

  async getAllProjects() {
    return await this.ProjectRepository.getAll();
  }

  async getById(id: string) {
    return await this.ProjectRepository.getById(id);
  }

  async createProject(ProjectData: Project) {
    const newModel = await this.ProjectRepository.create(ProjectData);
    return newModel;
  }

  async updateProject(id: string, ProjectData: Project) {
    const updatedModel = await this.ProjectRepository.update(id, ProjectData);
    return updatedModel;
  }

  async deleteById(id: string) {
    return await this.ProjectRepository.deleteById(id);
  }
}

export { ProjectService };
