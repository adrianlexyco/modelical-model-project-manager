const { ProjectService } = require("../../app/Application/projectService");

const { ProjectRepository } = require("../../app/Infrastructure/projectRepository");

jest.mock("mongoose", () => ({
  Model: jest.fn(),
  connect: jest.fn(),
  Schema: jest.fn(),
}));

describe("ProjectService", () => {
  let projectRepository;
  let mockDb;

  beforeEach(() => {
    mockDb = {
      Projects: {
        find: jest.fn().mockResolvedValue([]),
        findById: jest.fn().mockResolvedValue({}),
        deleteOne: jest.fn().mockResolvedValue({}),
        findByIdAndUpdate: jest.fn().mockResolvedValue({}),
      },
    };
    projectRepository = new ProjectRepository(mockDb);
    projectService = new ProjectService(projectRepository);

    jest
      .spyOn(projectRepository, "getAll")
      .mockImplementation(() => Promise.resolve([]));
    jest
      .spyOn(projectRepository, "create")
      .mockImplementation(() => Promise.resolve({}));
    jest
      .spyOn(projectRepository, "getById")
      .mockImplementation(() => Promise.resolve({}));
    jest
      .spyOn(projectRepository, "update")
      .mockImplementation(() => Promise.resolve({}));
    jest
      .spyOn(projectRepository, "deleteById")
      .mockImplementation(() => Promise.resolve({}));
  });

  test("getAllProjects", async () => {
    await projectService.getAllProjects();

    expect(projectRepository.getAll).toHaveBeenCalled();
  });

  test("createProject", async () => {
    const mockData = { _id: "1" };

    await projectService.createProject(mockData);

    expect(projectRepository.create).toHaveBeenCalledWith(mockData);
  });

  test("getById", async () => {
    const mockId = "1";

    await projectService.getById(mockId);

    expect(projectRepository.getById).toHaveBeenCalledWith(mockId);
  });

  test("updateProject", async () => {
    const mockId = "1";
    const mockData = { _id: "1", name: "new name" };

    await projectService.updateProject(mockId, mockData);

    expect(projectRepository.update).toHaveBeenCalledWith(mockId, mockData);
  });

  test("deleteById", async () => {
    const mockId = "1";

    await projectService.deleteById(mockId);

    expect(projectRepository.deleteById).toHaveBeenCalledWith(mockId);
  });
});