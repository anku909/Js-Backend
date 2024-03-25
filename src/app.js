import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// initialize express app
const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import

import userRouter from "./routes/user.routes.js";

// routes declartion

app.get("/", (req, res) => {
  res.send("This ' / ' route is working properly");
});

app.use("/api/v1/users", userRouter);

export { app };
