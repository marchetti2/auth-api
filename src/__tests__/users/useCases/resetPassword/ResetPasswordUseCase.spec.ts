import { Connection, createConnection } from "typeorm";

import { User } from "../../../../modules/users/entities/User";
import { UsersRepository } from "../../../../modules/users/repositories/implementations/UsersRepository";
import { UserTokenRepository } from "../../../../modules/users/repositories/implementations/UserTokenRepository";
import { CreateUserUseCase } from "../../../../modules/users/useCases/createUser/CreateUserUseCase";
import { ResetPasswordUseCase } from "../../../../modules/users/useCases/resetPassword/ResetPasswordUseCase";
import { ResetPasswordError } from "../../../../modules/users/useCases/resetPassword/ResetPasswordError";

describe('ResetPasswordUseCase', () => {
  let connection: Connection;
  let user: User;

  let usersRepository: UsersRepository
  let userTokenRepository: UserTokenRepository

  let createUserUseCase: CreateUserUseCase;
  let resetPasswordUseCase: ResetPasswordUseCase;


  beforeEach(async () => {
    connection = await createConnection();

    usersRepository = new UsersRepository();
    userTokenRepository = new UserTokenRepository();

    createUserUseCase = new CreateUserUseCase(usersRepository);
    resetPasswordUseCase = new ResetPasswordUseCase(usersRepository,userTokenRepository);

    await connection.runMigrations();
  });

  afterAll(async () => {

    await connection.createQueryRunner().dropTable("statements", true);
    await connection.createQueryRunner().dropTable("users", true);
    await connection.createQueryRunner().dropTable("migrations", true);
    await connection.close();
  });

  it('should be able to reset the password', async () => {
    user = await createUserUseCase.execute({
      first_name: "Mario",
      last_name: "Luiz",
      email: "marchetti2@gmail.com",
      password: "123123123",
    });

    const { token } = await userTokenRepository.generate(user.id);

    await resetPasswordUseCase.execute({
      password: '123123',
      token,
    });

    const updatedUser = await usersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordUseCase.execute({
        token: 'non-existing-token',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(ResetPasswordError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await userTokenRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPasswordUseCase.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(ResetPasswordError);
  });

  it('should not be able to reset password if passed more than two hours', async () => {

    const { token } = await userTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordUseCase.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(ResetPasswordError);
  });
});
