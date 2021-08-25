import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "./ICreateUserDTO";
import { CreateUserError } from "./CreateUserError";


@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ first_name, last_name, email, password }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new CreateUserError();
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      first_name,
      last_name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserUseCase };
