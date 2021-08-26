import { AppError } from "../../../../shared/errors/AppError";

class ForgotPasswordError extends AppError {
  constructor() {
    super("User already exists");
  }
}

export { ForgotPasswordError };
