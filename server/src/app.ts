import "reflect-metadata";
import "./database/connection";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import uploadConfig from "./config/upload";
import cors from "cors";
import router from "./routes/router";
import AppError from "./errors/AppError";

const app = express();

app.use(express.json());
app.use("/static", express.static(uploadConfig.directory));
app.use(cors());
app.use(router);

/**
 * Global Exception Handler
 */
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
    console.error(err);

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

export default app;
