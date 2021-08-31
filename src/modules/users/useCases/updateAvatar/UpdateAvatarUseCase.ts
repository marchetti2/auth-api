import { injectable, inject } from 'tsyringe';
import { join } from 'path';
import fs from 'fs';

import { User } from '../../entities/User';
import upload from '../../../../config/upload';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { UpdateAvatarError } from './UpdateAvatarError';

interface IRequest {
  id: string;
  avatarFilename: string;
}

@injectable()
class UpdateAvatarUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UpdateAvatarError();
    }

    if (user.avatar) {
      const userAvatarFilePath = join(upload.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);
    return user;
  }
}

export { UpdateAvatarUserUseCase };
