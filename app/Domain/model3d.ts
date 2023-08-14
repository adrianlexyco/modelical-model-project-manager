class Model3d {
  name: string;
  description: string;
  projectId: string;

  constructor(
    name: string,
    description: string,
    projectId: string
  ) {
    this.name = name;
    this.description = description;
    this.projectId = projectId;
  }
}

export default Model3d;