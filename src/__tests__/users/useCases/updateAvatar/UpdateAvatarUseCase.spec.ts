import { Connection, createConnection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from '../../../../modules/users/entities/User';
import { UsersRepository } from '../../../../modules/users/repositories/implementations/UsersRepository';
import { UpdateAvatarError } from '../../../../modules/users/useCases/updateAvatar/UpdateAvatarError';
import { CreateUserUseCase } from '../../../../modules/users/useCases/createUser/CreateUserUseCase';
import { UpdateAvatarUserUseCase } from '../../../../modules/users/useCases/updateAvatar/UpdateAvatarUseCase';

describe('UpdateAvatarUser', () => {
  let connection: Connection;

  let user: User;
  let usersRepository: UsersRepository;
  let createUserUseCase: CreateUserUseCase;
  let updateAvatarUserUseCase: UpdateAvatarUserUseCase;

  beforeAll(async () => {
    connection = await createConnection();

    usersRepository = new UsersRepository();

    createUserUseCase = new CreateUserUseCase(usersRepository);
    updateAvatarUserUseCase = new UpdateAvatarUserUseCase(usersRepository);

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.createQueryRunner().dropTable('user_token', true);
    await connection.createQueryRunner().dropTable('users', true);
    await connection.createQueryRunner().dropTable('migrations', true);

    await connection.close();
  });

  it('should be able to update the user avatar', async () => {
    user = await createUserUseCase.execute({
      first_name: 'Mario',
      last_name: 'Luiz',
      email: 'marchetti2@gmail.com',
      password: '123123',
    });

    user = await updateAvatarUserUseCase.execute({
      id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateAvatarUserUseCase.execute({
        id: uuid(),
        avatarFilename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(UpdateAvatarError);
  });
});
