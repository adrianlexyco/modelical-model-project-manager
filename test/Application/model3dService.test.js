const { Model3dService } = require("../../app/Application/model3dService");

const {
  Model3dRepository,
} = require("../../app/Infrastructure/Model3dRepository");

jest.mock("mongoose", () => ({
  Model: jest.fn(),
  connect: jest.fn(),
  Schema: jest.fn(),
}));

describe("Model3dService", () => {
  let model3dRepository;
  let mockDb;

  beforeEach(() => {
    mockDb = {
      Models3d: {
        find: jest.fn().mockResolvedValue([]),
        findById: jest.fn().mockResolvedValue({}),
        deleteOne: jest.fn().mockResolvedValue({}),
        findByIdAndUpdate: jest.fn().mockResolvedValue({}),
      },
    };
    model3dRepository = new Model3dRepository(mockDb);
    model3dService = new Model3dService(model3dRepository);

    jest
      .spyOn(model3dRepository, "getAll")
      .mockImplementation(() => Promise.resolve([]));
    jest
      .spyOn(model3dRepository, "create")
      .mockImplementation(() => Promise.resolve({}));
    jest
      .spyOn(model3dRepository, "getById")
      .mockImplementation(() => Promise.resolve({}));
    jest
      .spyOn(model3dRepository, "update")
      .mockImplementation(() => Promise.resolve({}));
    jest
      .spyOn(model3dRepository, "deleteById")
      .mockImplementation(() => Promise.resolve({}));
  });

  test("getAllModels", async () => {
    await model3dService.getAllModels();

    expect(model3dRepository.getAll).toHaveBeenCalled();
  });

  test("createModel", async () => {
    const mockData = { _id: "1" };

    await model3dService.createModel(mockData);

    expect(model3dRepository.create).toHaveBeenCalledWith(mockData);
  });

  test("getById", async () => {
    const mockId = "1";

    await model3dService.getById(mockId);

    expect(model3dRepository.getById).toHaveBeenCalledWith(mockId);
  });

  test("updateModel", async () => {
    const mockId = "1";
    const mockData = { _id: "1", name: "new name" };

    await model3dService.updateModel(mockId, mockData);

    expect(model3dRepository.update).toHaveBeenCalledWith(mockId, mockData);
  });

  test("deleteById", async () => {
    const mockId = "1";

    await model3dService.deleteById(mockId);

    expect(model3dRepository.deleteById).toHaveBeenCalledWith(mockId);
  });
});
