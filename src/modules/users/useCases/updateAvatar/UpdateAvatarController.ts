import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ProfileMap } from '../../mappers/ProfileMap';
import { UpdateAvatarUserUseCase } from './UpdateAvatarUseCase';

class UpdateAvatarController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { filename } = request.file;

    const updateUserAvatar = container.resolve(UpdateAvatarUserUseCase);

    const user = await updateUserAvatar.execute({
      id,
      avatarFilename: filename,
    });

    const profileDTO = ProfileMap.toDTO(user);

    return response.json(profileDTO);
  }
}

export { UpdateAvatarController };
