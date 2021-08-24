import { Request, Response } from "express";
import { ICreateUserDTO } from "../../repositories/IUsersRepository";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { firstName, lastName, password, email } = request.body;

      const user = this.createUserUseCase.execute({
        firstName,
        lastName,
        password,
        email,
      });
      console.log(user);

      return response.status(201).json(user);
    } catch (error) {
      console.log(error);
    }
  }
}

export { CreateUserController };
