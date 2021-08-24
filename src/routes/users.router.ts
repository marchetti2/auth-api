import { Router, Request, Response } from "express";

import { createUserController } from "../modules/users/useCases/createUser";

const usersRoutes = Router();

usersRoutes.post("/", (request: Request, response: Response) => {
  createUserController.handle(request, response);
});

export { usersRoutes };
