import "dotenv/config";

import express, { Express, Request, Response } from "express";
import cors from "cors";
import http from "http";
import { connectDB } from "./config/db";
import session from "express-session";
import {
  addCar,
  addDestination,
  addName,
  addStatus,
  getCar,
  getDestination,
  getName,
  getStatus,
  removeDestination,
  removeName,
  removeStatus,
  removeCar,
  addInform,
  getInform,
  getBusiness,
  addBusiness,
  removeBusiness,
} from "./controllers/informController";
import { adminLogin, joinAdmin } from "./controllers/adminController";
import { joinUser, loginUser } from "./controllers/userController";

const app: Express = express();
const port = 8080;

const httpServer = http.createServer(app);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: false,
    //cookie: { secure: false }, // for HTTPS시 true로 설정
    cookie: {
      maxAge: 60 * 1000 * 30, // 30분
    },
  })
);

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
app.delete("/removeDestination/:id", removeDestination);

app.get("/getBusiness", getBusiness);
app.post("/addBusiness", addBusiness);
app.delete("/removeBusiness/:id", removeBusiness);

app.get("/getState", getStatus);
app.post("/addState", addStatus);
app.delete("/removeState/:id", removeStatus);

app.get("/getCar", getCar);
app.post("/addCar", addCar);
app.delete("/removeCar/:id", removeCar);

app.get("/getInform", getInform);
app.post("/addInform", addInform);

app.post("/join", joinAdmin);
app.post("/adminLogin", adminLogin);

app.post("/login", loginUser);
app.post("/register", joinUser);

connectDB();

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
