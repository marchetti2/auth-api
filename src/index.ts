import express, { Request, Response, NextFunction } from "express";
import "./database";
import "./shared/container";
import "express-async-errors";

import upload from "./config/upload";
import { usersRoutes } from "./routes/users.routes";
import { authenticateRoutes } from "./routes/authenticate.routes";
import { userProfileRouter } from "./routes/userProfile.routes";
import { passwordRouter } from "./routes/password.routes";
import { AppError } from "./shared/errors/AppError";

const app = express();

app.use(express.json());
app.use("/files", express.static(upload.directory));
app.use("/users", usersRoutes);
app.use("/sessions", authenticateRoutes);
app.use("/profile", userProfileRouter);
app.use("/password", passwordRouter);

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
