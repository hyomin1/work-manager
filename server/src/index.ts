import "dotenv/config";

import express, { Express, Request, Response } from "express";
import cors from "cors";
import http from "http";

import { connectDB } from "./config/db";
import session from "express-session";
import authRouter from "./routes/authRouter";
import informRouter from "./routes/employeeInformRouter";
import path from "path";

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
    origin: ["http://localhost:3000", "http://172.16.142.101"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

connectDB();

//api 이하로 바꾸기
app.use("/auth", authRouter);
app.use("/api/employee-inform", informRouter);

app.use(express.static(path.join(__dirname, "../../client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
