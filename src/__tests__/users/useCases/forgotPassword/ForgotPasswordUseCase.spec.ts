import { Connection, createConnection } from "typeorm";

import { User } from "../../../../modules/users/entities/User";
import { UsersRepository } from "../../../../modules/users/repositories/implementations/UsersRepository";
import { UserTokenRepository } from "../../../../modules/users/repositories/implementations/UserTokenRepository";
import { CreateUserUseCase } from "../../../../modules/users/useCases/createUser/CreateUserUseCase";
import { ForgotPasswordUseCase } from "../../../../modules/users/useCases/forgotPassword/ForgotPasswordUseCase";
import { ForgotPasswordError } from "../../../../modules/users/useCases/forgotPassword/ForgotPasswordError";
import { EtherealMailProvider } from "../../../../shared/container/providers/MailProvider/implementations/EtherealMailProvider";
import { HandlebarsMailTemplateProvider } from "../../../../shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/models/IMailProvider";

describe("ForgotPassword", () => {
  let connection: Connection;

  let user: User;

  let usersRepository: UsersRepository;
  let userTokenRepository: UserTokenRepository;
  let mailProvider: IMailProvider;
  let mailTemplateProvider: HandlebarsMailTemplateProvider;

  let forgotPasswordUseCase: ForgotPasswordUseCase;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    connection = await createConnection();

    usersRepository = new UsersRepository();
    userTokenRepository = new UserTokenRepository();
    mailTemplateProvider = new HandlebarsMailTemplateProvider();
    mailProvider = new EtherealMailProvider(mailTemplateProvider);

    createUserUseCase = new CreateUserUseCase(usersRepository);
    forgotPasswordUseCase = new ForgotPasswordUseCase(
      usersRepository,
      mailProvider,
      userTokenRepository
    );

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.createQueryRunner().dropTable("statements", true);
    await connection.createQueryRunner().dropTable("users", true);
    await connection.createQueryRunner().dropTable("migrations", true);

    await connection.close();
  });

  it("should be able to recover the password using the email", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    user = await createUserUseCase.execute({
      first_name: "Mario",
      last_name: "Luiz",
      email: "marchetti2@gmail.com",
      password: "123123123",
    });

    await forgotPasswordUseCase.execute({
      email: "marchetti2@gmail.com",
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to recover a non-existing user password", async () => {
    await expect(
      forgotPasswordUseCase.execute({
        email: "johndoe@example.com",
      })
    ).rejects.toBeInstanceOf(ForgotPasswordError);
  });

  it("should generate a forgot password token", async () => {
    const generateToken = jest.spyOn(userTokenRepository, "generate");

    await forgotPasswordUseCase.execute({
      email: "marchetti2@gmail.com",
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
