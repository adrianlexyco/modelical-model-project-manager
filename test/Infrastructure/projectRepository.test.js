const { Project } = require("../../app/Domain/project");

const {
  ProjectRepository,
} = require("../../app/Infrastructure/projectRepository");

jest.mock("mongoose", () => ({
  Model: jest.fn(),
  connect: jest.fn(),
  Schema: jest.fn(),
}));

describe("ProjectRepository", () => {
  let mockDb;
  let projectRepository;

  beforeEach(() => {
    mockDb = {
      Projects: {
        find: jest.fn(),
        findById: jest.fn(),
        deleteOne: jest.fn(),
        findByIdAndUpdate: jest.fn(),
      },
    };
    projectRepository = new ProjectRepository(mockDb);
  });

  test("getAll", async () => {
    const mockData = [new Project(), new Project()];
    mockDb.Projects.find.mockResolvedValueOnce(mockData);

    const result = await projectRepository.getAll();

    expect(mockDb.Projects.find).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  test("getById", async () => {
    const mockData = new Project();
    mockDb.Projects.findById.mockResolvedValueOnce(mockData);

    const result = await projectRepository.getById("1");

    expect(mockDb.Projects.findById).toHaveBeenCalledWith("1");
    expect(result).toEqual(mockData);
  });

  test("create", async () => {
    const mockData = new Project();
    const mockNewProject = {
      ...mockData,
      save: jest.fn().mockResolvedValueOnce(mockData),
    };

    mockDb.Projects = jest.fn().mockImplementation(() => mockNewProject);

    const result = await projectRepository.create(mockData);

    expect(new mockDb.Projects()).toEqual(mockNewProject);
    expect(mockNewProject.save).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  test("deleteById", async () => {
    const mockId = "2";

    const mockProject = new Project();
    mockDb.Projects.findById.mockResolvedValueOnce(mockProject);

    await projectRepository.deleteById(mockId);

    expect(mockDb.Projects.deleteOne).toHaveBeenCalledWith({ _id: mockId });
  });

  test("update", async () => {
    const mockData = new Project("1", "new name", null, undefined);
    mockDb.Projects.findByIdAndUpdate.mockResolvedValueOnce(mockData);

    const result = await projectRepository.update("1", { name: "new name" });

    expect(mockDb.Projects.findByIdAndUpdate).toHaveBeenCalledWith(
      "1",
      { name: "new name" },
      {
        new: true,
      }
    );
    expect(result).toEqual(mockData);
  });
});
