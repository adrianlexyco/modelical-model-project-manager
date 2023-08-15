import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import model3dRoutes from "./Adapters/routes/model3dRoutes";
import projectRoutes from './Adapters/routes/projectRoutes'

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

  app.use("/models", model3dRoutes);
  app.use("/project", projectRoutes);

  const port: number = Number(process.env.PORT);
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Error during initialization:", error);
});
