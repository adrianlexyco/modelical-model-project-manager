export class Model3d {
  id?: string;
  name: string;
  description: string;
  projectId: string;

  constructor(
    id: string,
    name: string,
    description: string,
    projectId: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.projectId = projectId;
  }
}
