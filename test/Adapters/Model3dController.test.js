const { Model3dController } = require("../../app/Adapters/Model3dController");

const { Model3dService } = require("../../app/Application/model3dService");

describe("Model3dController", () => {
  let model3dService;
  let model3dController;
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    model3dService = new Model3dService();
    model3dController = new Model3dController(model3dService);

    mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn(),
    };

    mockRequest = {
      params: {},
      body: {},
    };
  });

  it("gets all models", async () => {
    jest.spyOn(model3dService, "getAllModels").mockResolvedValue([]);
    await model3dController.getAllModels(mockRequest, mockResponse);

    expect(mockResponse.send).toHaveBeenCalledWith([]);
  });

  it("gets model by id", async () => {
    const mockModel = { id: "1", name: "test" };
    mockRequest.params.id = "1";
    jest.spyOn(model3dService, "getById").mockResolvedValue(mockModel);

    await model3dController.getModelById(mockRequest, mockResponse);

    expect(mockResponse.send).toHaveBeenCalledWith(mockModel);
  });

  it("creates a new model", async () => {
    const mockModel = { id: "1", name: "test" };
    mockRequest.body = mockModel;
    jest.spyOn(model3dService, "createModel").mockResolvedValue(mockModel);

    await model3dController.createModel(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith(mockModel);
  });

  it("updates a model", async () => {
    const mockModel = { id: "1", name: "test" };
    const updatedModel = { id: "1", name: "updatedTest" };
    mockRequest.params.id = "1";
    mockRequest.body = updatedModel;
    jest.spyOn(model3dService, "updateModel").mockResolvedValue(updatedModel);

    await model3dController.updateModel(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith(updatedModel);
  });

  it("fails to update a non-existing model", async () => {
    const updatedModel = { id: "1", name: "updatedTest" };
    mockRequest.params.id = "1";
    mockRequest.body = updatedModel;
    jest.spyOn(model3dService, "updateModel").mockResolvedValue(null);

    await model3dController.updateModel(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: "Model not found",
    });
  });

  it("deletes a model", async () => {
    const mockModel = { message: "Model successfully deleted" };
    mockRequest.body = mockModel;
    jest.spyOn(model3dService, "deleteById").mockResolvedValue(mockModel);

    await model3dController.deleteModel(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockModel);
  });
});
