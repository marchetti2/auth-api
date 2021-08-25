import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ProfileMap } from '../../mappers/ProfileMap';
import { UpdateUserProfileUseCase } from './UpdateUserProfileUseCase';

class UpdateUserProfileController {

  async execute(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { first_name, last_name, email, password, old_password } = request.body;

    const updateProfile = container.resolve(UpdateUserProfileUseCase);

    const user = await updateProfile.execute({
      first_name,
      last_name,
      old_password,
      email,
      password,
      user_id,
    });

    const profileDTO = ProfileMap.toDTO(user);

    return response.json(profileDTO);
  }
}

export { UpdateUserProfileController }
