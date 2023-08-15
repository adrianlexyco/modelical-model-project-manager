const {
  Model3dRepository,
} = require("../../app/Infrastructure/Model3dRepository");

jest.mock("mongoose", () => ({
  Model: jest.fn(),
  connect: jest.fn(),
  Schema: jest.fn(),
}));

describe("Model3dRepository", () => {
  let mockDb;
  let model3dRepository;

  beforeEach(() => {
    mockDb = {
      Models3d: {
        find: jest.fn(),
        findById: jest.fn(),
        deleteOne: jest.fn(),
        findByIdAndUpdate: jest.fn(),
      },
    };
    model3dRepository = new Model3dRepository(mockDb);
  });

  test("getAll", async () => {
    const mockData = [{ _id: "1" }, { _id: "2" }];
    mockDb.Models3d.find.mockResolvedValueOnce(mockData);

    const result = await model3dRepository.getAll();

    expect(mockDb.Models3d.find).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  test("getById", async () => {
    const mockData = { _id: "1" };
    mockDb.Models3d.findById.mockResolvedValueOnce(mockData);

    const result = await model3dRepository.getById("1");

    expect(mockDb.Models3d.findById).toHaveBeenCalledWith("1");
    expect(result).toEqual(mockData);
  });

  test("create", async () => {
    const mockData = { _id: "3" };
    const mockNewModel = {
      ...mockData,
      save: jest.fn().mockResolvedValueOnce(mockData),
    };

    mockDb.Models3d = jest.fn().mockImplementation(() => mockNewModel);

    const result = await model3dRepository.create(mockData);

    expect(new mockDb.Models3d()).toEqual(mockNewModel);
    expect(mockNewModel.save).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  test("deleteById", async () => {
    const mockId = "2";
    await model3dRepository.deleteById(mockId);

    expect(mockDb.Models3d.deleteOne).toHaveBeenCalledWith({ _id: mockId });
  });

  test("update", async () => {
    const mockData = { _id: "1", name: "new name" };
    mockDb.Models3d.findByIdAndUpdate.mockResolvedValueOnce(mockData);

    const result = await model3dRepository.update("1", { name: "new name" });

    expect(mockDb.Models3d.findByIdAndUpdate).toHaveBeenCalledWith(
      "1",
      { name: "new name" },
      {
        new: true,
      }
    );
    expect(result).toEqual(mockData);
  });
});
