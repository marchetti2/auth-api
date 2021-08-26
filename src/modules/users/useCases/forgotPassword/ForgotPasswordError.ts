import { AppError } from "../../../../shared/errors/AppError";

class ForgotPasswordError extends AppError {
  constructor() {
    super("User does not exists");
  }
}

export { ForgotPasswordError };
