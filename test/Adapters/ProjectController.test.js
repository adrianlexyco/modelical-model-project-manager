const { ProjectController } = require("../../app/Adapters/ProjectController");
const { ProjectService } = require("../../app/Application/projectService");

describe("ProjectController", () => {
  let projectService;
  let projectController;
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    projectService = new ProjectService();
    projectController = new ProjectController(projectService);

    mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };

    mockRequest = {
      params: {},
      body: {},
    };
  });

  it("gets all projects", async () => {
    jest.spyOn(projectService, "getAllProjects").mockResolvedValue([]);
    await projectController.getAllProjects(mockRequest, mockResponse);

    expect(mockResponse.send).toHaveBeenCalledWith([]);
  });

  it("gets project by id", async () => {
    const mockProject = { id: "1", name: "test" };
    mockRequest.params.id = "1";
    jest.spyOn(projectService, "getById").mockResolvedValue(mockProject);

    await projectController.getProjectById(mockRequest, mockResponse);

    expect(mockResponse.send).toHaveBeenCalledWith(mockProject);
  });

  it("creates a new project", async () => {
    const mockProject = { id: "1", name: "test" };
    mockRequest.body = mockProject;
    jest.spyOn(projectService, "createProject").mockResolvedValue(mockProject);

    await projectController.createProject(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith(mockProject);
  });

  it("updates a project", async () => {
    const mockProject = { id: "1", name: "test" };
    const updatedProject = { id: "1", name: "updatedTest" };
    mockRequest.params.id = "1";
    mockRequest.body = updatedProject;
    jest
      .spyOn(projectService, "updateProject")
      .mockResolvedValue(updatedProject);

    await projectController.updateProject(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith(updatedProject);
  });

  it("fails to update a non-existing project", async () => {
    const updatedProject = { id: "1", name: "updatedTest" };
    mockRequest.params.id = "1";
    mockRequest.body = updatedProject;
    jest.spyOn(projectService, "updateProject").mockResolvedValue(null);

    await projectController.updateProject(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: "Project not found",
    });
  });

  it("deletes a project", async () => {
    const mockProject = { message: "Project successfully deleted" };
    mockRequest.body = mockProject;
    jest.spyOn(projectService, "deleteById").mockResolvedValue(mockProject);

    await projectController.deleteProject(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockProject);
  });
});
