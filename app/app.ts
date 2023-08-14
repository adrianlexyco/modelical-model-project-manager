import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
require('dotenv').config();

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(String(process.env.DATABASE_URI), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as Parameters<typeof mongoose.connect>[1])
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello, TypeScript Express App!" });
});

const port: number = Number(process.env.PORT);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
