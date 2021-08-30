import { injectable, inject } from "tsyringe";
import { hash, compare } from "bcryptjs";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

import { UpdateUserProfileError } from "./UpdateUserProfileError";

interface IRequest {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateUserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    user_id,
    first_name,
    last_name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new UpdateUserProfileError.UserNotFoundError();
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new UpdateUserProfileError.EmailAlreadyInUseError();
    }

    Object.assign(user, { first_name, last_name, email });

    if (password && !old_password) {
      throw new UpdateUserProfileError.OldPasswordNotSetError();
    }

    if (password && old_password) {
      console.log(typeof old_password, typeof user.password);
      console.log(old_password, user.password);
      const checkOldPassword = await compare(old_password, user.password);
      console.log(checkOldPassword);
      if (!checkOldPassword) {
        throw new UpdateUserProfileError.OldPasswordNotMatchError();
      }

      user.password = await hash(password, 8);
    }

    return this.usersRepository.save(user);
  }
}

export { UpdateUserProfileUseCase };
