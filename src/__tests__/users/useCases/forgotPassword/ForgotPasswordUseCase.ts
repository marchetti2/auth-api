
import { Connection, createConnection } from "typeorm";

import { User } from "../../../../modules/users/entities/User";
import { UsersRepository } from "../../../../modules/users/repositories/implementations/UsersRepository";
import { UserTokenRepository } from "../../../../modules/users/repositories/implementations/UserTokenRepository";
import { CreateUserUseCase } from "../../../../modules/users/useCases/createUser/CreateUserUseCase";
import { ForgotPasswordUseCase } from "../../../../modules/users/useCases/forgotPassword/ForgotPasswordUseCase";
import { ForgotPasswordError } from "../../../../modules/users/useCases/forgotPassword/ForgotPasswordError";
import { EtherealMailProvider } from '../../../../shared/container/providers/MailProvider/implementations/EtherealMailProvider';

describe('SendForgotPasswordEmail', () => {
  let connection: Connection;
  let user: User;

  let usersRepository: UsersRepository
  let userTokenRepository: UserTokenRepository
  let mailProvider: EtherealMailProvider;

  let forgotPasswordUseCase: ForgotPasswordUseCase;


  beforeEach(async () => {
    connection = await createConnection();

    usersRepository = new UsersRepository();
    userTokenRepository = new UserTokenRepository();
    mailProvider = new EtherealMailProvider();

    forgotPasswordUseCase = new ForgotPasswordUseCase(usersRepository, mailProvider, userTokenRepository );


    await connection.runMigrations();
  });

  afterAll(async () => {

    await connection.createQueryRunner().dropTable("statements", true);
    await connection.createQueryRunner().dropTable("users", true);
    await connection.createQueryRunner().dropTable("migrations", true);
    await connection.close();
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
