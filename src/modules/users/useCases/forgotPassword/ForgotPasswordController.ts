import { Request, Response } from "express";
import { container } from "tsyringe";

import { ForgotPasswordUseCase } from "./ForgotPasswordUseCase";

class ForgotPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(ForgotPasswordUseCase);
    await sendForgotPasswordEmail.execute({
      email,
    });
    return response.status(204).json();
  }
}

export { ForgotPasswordController };
