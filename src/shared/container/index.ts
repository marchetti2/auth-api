import { container } from 'tsyringe';

import './providers';

import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository';
import { IUserTokenRepository } from '../../modules/users/repositories/IUserTokenRepository';
import { UserTokenRepository } from '../../modules/users/repositories/implementations/UserTokenRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository
);
