import { AppError } from "../../../../shared/errors/AppError";

class UserAvatarError extends AppError {
  constructor() {
    super('Only authenticated users can change avatar.', 401);
  }
}

export { UserAvatarError }
