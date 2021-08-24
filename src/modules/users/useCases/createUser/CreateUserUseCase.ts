import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from 'bcryptjs';

import  {ICreateUserDTO } from "../../useCases/createUser/ICreateUserDTO"
import { CreateUserError } from "./CreateUserError";


@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
    ) {}

  async execute({ first_name, last_name, email, password }: ICreateUserDTO) {

    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if(!userAlreadyExists) {
      throw new CreateUserError()
    }

    const passwordHash = await hash(password, 8);

    const user = await this.userRepository.create({
      first_name,
      last_name,
      email,
      password: passwordHash,
    });

    return user;

  }
}

export { CreateUserUseCase };
