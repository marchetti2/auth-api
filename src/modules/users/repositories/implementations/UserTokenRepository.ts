import { getRepository, Repository } from 'typeorm';

import { IUserTokenRepository } from '../IUserTokenRepository';

import { UserToken } from '../../entities/UserToken';

class UserTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.repository.findOne({
      where: { token },
    });

    return userToken;
  }

  async generate(user_id: string): Promise<UserToken> {
    const userToken = this.repository.create({ user_id });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UserTokenRepository };
