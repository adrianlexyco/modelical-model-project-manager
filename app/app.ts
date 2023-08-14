import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Model3dService from "./Application/model3dService";
import Model3dController from "./Adapters/Model3dController";
import Model3dRepository from "./Infrastructure/Model3DRepository";
import Model3d, { IModel3d } from "./Infrastructure/models/model3dSchema";

require("dotenv").config();

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function connectToDatabase() {
  try {
    await mongoose.connect(String(process.env.DATABASE_URI), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as Parameters<typeof mongoose.connect>[1]);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function startServer() {
  await connectToDatabase();

  const model3Repository = new Model3dRepository({
    Models3d: Model3d,
  });
  const model3Service = new Model3dService(model3Repository);
  const model3Controller = new Model3dController(model3Service);

  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello, TypeScript Express App!" });
  });

  app.get(
    "/models",
    async (req: Request, res: Response, next: NextFunction) => {
      return await model3Controller.getAllModels(req, res);
    }
  );

  app.get(
    "/models/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      return await model3Controller.getModelById(req, res);
    }
  );

  app.get(
    "/models2",
    async (req: Request, res: Response, next: NextFunction) => {
      const hardcodedModel = {
        name: "example3dModel",
        description: "This is an example model",
        projectId: "asdf",
      };
      req.body = hardcodedModel;
      return await model3Controller.createModel(req, res);
    }
  );

  const port: number = Number(process.env.PORT);
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Error during initialization:", error);
});
