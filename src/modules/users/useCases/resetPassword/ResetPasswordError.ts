import { AppError } from "../../../../shared/errors/AppError";

class ResetPasswordError extends AppError {
  constructor() {
    super("User already exists");
  }
}

export { ResetPasswordError };
