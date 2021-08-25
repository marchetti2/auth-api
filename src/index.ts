import express, { Request, Response, NextFunction } from "express";
import "./database";
import "./shared/container";
import "express-async-errors";

import { usersRoutes } from "./routes/users.router";
import { AppError } from "./shared/errors/AppError";

const app = express();

app.use(express.json());
app.use("/users", usersRoutes);

app.use((error: Error, _: Request, response: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${error.message}`,
  });
});

export { app };
