import { AppError } from './AppError';

namespace JWTTokenError {
  export class JWTInvalidTokenError extends AppError {
    constructor() {
      super('JWT invalid token!', 401);
    }
  }

  export class JWTTokenMissingError extends AppError {
    constructor() {
      super('JWT token is missing!', 401);
    }
  }
}

export { JWTTokenError };
