import { Request, Response } from "express";
import { container } from "tsyringe";

import { ForgotPasswordUseCase } from "./ForgotPasswordUseCase";

class ForgotPasswordController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const forgotPasswordUseCase = container.resolve(ForgotPasswordUseCase);

    await forgotPasswordUseCase.execute({
      email,
    });
    return response.status(204).send();
  }
}

export { ForgotPasswordController };
