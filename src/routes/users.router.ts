import { request, response, Router } from "express";
import { Request, Response } from "express";

import { createUserController } from "../modules/users/useCases/createUser/";

const routes = Router();

routes.get("/", createUserController.handle(request, response));

export { routes };
