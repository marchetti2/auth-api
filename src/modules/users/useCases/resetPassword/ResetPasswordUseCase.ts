import { injectable, inject } from "tsyringe";
import { isAfter, addHours } from "date-fns";
import { hash } from "bcryptjs";

import { ResetPasswordError } from "./ResetPasswordError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {

    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new ResetPasswordError.TokenDoesNotExistsError();
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new ResetPasswordError.UserDoesNotExistsError();
    }

    const tokenCraetedAt = userToken.created_at;
    const compareDate = addHours(tokenCraetedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new ResetPasswordError.TokenExpiredError();
    }

    user.password = await hash(password, 8);

    await this.usersRepository.save(user);
  }
}

export { ResetPasswordUseCase };
