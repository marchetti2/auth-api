import { inject, injectable } from "tsyringe";
import {
  IUsersRepository,
  ICreateUserDTO,
} from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
    ) {}

  async execute({ first_name, last_name, email, password }: ICreateUserDTO) {
    const user = await this.userRepository.create({
      first_name,
      last_name,
      email,
      password,
    });
    return user;
  }
}

export { CreateUserUseCase };
