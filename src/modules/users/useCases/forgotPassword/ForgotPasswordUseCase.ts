import { injectable, inject } from "tsyringe";
import path from "path";

import { ForgotPasswordError } from "./ForgotPasswordError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/models/IMailProvider";
import { IUserTokenRepository } from "../../repositories/IUserTokenRepository";

interface IRequest {
  email: string;
}

@injectable()
class ForgotPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider,

    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ForgotPasswordError();
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const forgotPasswordTempalte = path.resolve(
      __dirname,
      "..",
      "..",
      "views",
      "forgot_password.hbs"
    );

    await this.mailProvider.sendMail({
      to: {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
      },
      subject: "Recuperação de senha",
      templateData: {
        file: forgotPasswordTempalte,
        variables: {
          name: `${user.first_name} ${user.last_name}`,
          link: `http://localhost:3000/reset-password?token=${token}`,
        },
      },
    });
  }
}

export { ForgotPasswordUseCase };
