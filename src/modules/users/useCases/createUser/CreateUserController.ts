import { Request, Response } from "express";
import { container } from 'tsyringe';

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {

  async execute(request: Request, response: Response): Promise<Response> {

      const createUser = container.resolve(CreateUserUseCase)

      const { first_name, last_name, password, email } = request.body;

      const user = await createUser.execute({
        first_name,
        last_name,
        password,
        email,
      });

      return response.status(201).json(user);
    }
  }


export { CreateUserController };
