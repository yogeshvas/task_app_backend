import mongoose from "mongoose";
import express from "express";
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
import { config } from "dotenv";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//using routes
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

//using error middleware
app.use(errorMiddleware);
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is Running at PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode`
      );
    });
  })
  .catch((err) => {
    console.log("MONGO DB Connection failed!!", err);
  });
