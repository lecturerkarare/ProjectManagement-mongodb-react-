import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, NextFunction, Request, Response } from "express";
import { PORT } from "./config/index";

import cors from "cors";
import path from "path";
import passport from "passport";
require("./lib/passport")(passport);

//importing routes
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";
import { roleRoutes } from "./routes/role";
import { projectRoutes } from "./routes/project";
import { TaskRoutes } from "./routes/task";
import { CommentSRoute } from "./routes/comment";
import { FeedbackRoute } from "./routes/feedback";
import { FileRoutes } from "./routes/file";
import multer from "multer";

import { IssuesRoute } from "./routes/issue";
import { DefaultRoles } from "./data/DefaultRoles";

import { connectDb } from "./utils/connects";
import { destroyData } from "./seeder";
const app: Application = express();
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});

const startServer = async () => {
  try {
    await connectDb();
     await DefaultRoles.createDefaultRoles();

     await destroyData(); 
    app.listen(PORT, () => {
      console.log(`Server connected to http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Cannot connect to the server:", error);
  }

};

app.use(cors());

//file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  return res.json("Welcome to Ticket management  API");
});

app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ticket", IssuesRoute);
app.use("/api/role", roleRoutes);
app.use("/api/task", TaskRoutes);
app.use("/api/comment", CommentSRoute);
app.use("/api/feedback", FeedbackRoute);
app.use("/api/file", upload.single("file"), FileRoutes);

//updated body-parser for ts node

app.use('/uploads', express.static(path.resolve('uploads')));

app.use(express.json());
startServer();

export default app;
