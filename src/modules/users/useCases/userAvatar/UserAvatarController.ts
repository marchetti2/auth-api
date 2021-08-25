import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UserAvatarUserUseCase } from './UserAvatarUseCase';

class UserAvatarController {

  async execute(request: Request, response: Response): Promise<Response> {

    const { id } = request.user;
    const { filename } = request.file;

    const updateUserAvatar = container.resolve(UserAvatarUserUseCase);

    const user = await updateUserAvatar.execute({
      id,
      avatarFilename: filename,
    });

    return response.json(user)
  }
}

export { UserAvatarController }
