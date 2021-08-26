import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordEmail = container.resolve(ResetPasswordUseCase);

    await resetPasswordEmail.execute({
      token,
      password,
    });
    return response.status(204).json();
  }
}
