const { Project } = require("../../app/Domain/project");

describe("Project Entity", () => {
  test("should create a project with provided attributes", () => {
    const modelList = ["model1", "model2"];
    const project = new Project("id1", "name", "description", modelList);

    expect(project.id).toBe("id1");
    expect(project.name).toBe("name");
    expect(project.description).toBe("description");
    expect(project.modelList).toEqual(modelList);
  });
});
