import { AppError } from '../../../../shared/errors/AppError';

namespace ResetPasswordError {
  export class TokenDoesNotExistsError extends AppError {
    constructor() {
      super('User token does not exists', 400);
    }
  }

  export class UserDoesNotExistsError extends AppError {
    constructor() {
      super('User does not exists', 400);
    }
  }

  export class TokenExpiredError extends AppError {
    constructor() {
      super('Token expired', 400);
    }
  }
}

export { ResetPasswordError };
