export class Project {
  id?: string;
  name: string;
  description: string;
  modelList: string[];

  constructor(
    id: string,
    name: string,
    description: string,
    modelList: string[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.modelList = modelList;
  }
}
