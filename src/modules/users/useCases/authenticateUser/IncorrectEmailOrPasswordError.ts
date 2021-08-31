import { AppError } from '../../../../shared/errors/AppError';

class IncorrectEmailOrPasswordError extends AppError {
  constructor() {
    super('Incorrect email or password', 401);
  }
}
export { IncorrectEmailOrPasswordError };
