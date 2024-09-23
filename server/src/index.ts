import "dotenv/config";

import express, { Express, Request, Response } from "express";
import cors from "cors";
import http from "http";
import { connectDB } from "./config/db";
import {
  addCar,
  addDestination,
  addName,
  addStatus,
  getCar,
  getDestination,
  getName,
  getStatus,
  removeName,
} from "./controllers/informController";

const app: Express = express();
const port = 8080;

const httpServer = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.get("/getName", getName);
app.post("/addName", addName);
app.delete("/removeName/:id", removeName);

app.get("/getDestination", getDestination);
app.post("/addDestination", addDestination);

app.get("/getState", getStatus);
app.post("/addState", addStatus);

app.get("/getCar", getCar);
app.post("/addCar", addCar);

connectDB();

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
