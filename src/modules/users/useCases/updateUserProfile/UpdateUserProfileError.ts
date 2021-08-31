import { AppError } from '../../../../shared/errors/AppError';

namespace UpdateUserProfileError {
  export class UserNotFoundError extends AppError {
    constructor() {
      super('User not found', 400);
    }
  }

  export class EmailAlreadyInUseError extends AppError {
    constructor() {
      super('E-mail already in use', 400);
    }
  }

  export class OldPasswordNotMatchError extends AppError {
    constructor() {
      super('Old password does not match', 400);
    }
  }

  export class OldPasswordNotSetError extends AppError {
    constructor() {
      super('You need to inform the old password to set a new password', 400);
    }
  }
}

export { UpdateUserProfileError };
