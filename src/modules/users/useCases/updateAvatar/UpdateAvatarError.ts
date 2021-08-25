import { AppError } from "../../../../shared/errors/AppError";

class UpdateAvatarError extends AppError {
  constructor() {
    super('Only authenticated users can change avatar.', 401);
  }
}

export { UpdateAvatarError }
