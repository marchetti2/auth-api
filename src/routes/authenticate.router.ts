import { Router } from "express";

import { AuthenticateUserController } from "../modules/users/useCases/authenticateUser/authenticateUserController";

const usersRoutes = Router();
const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.execute);

export { usersRoutes };
