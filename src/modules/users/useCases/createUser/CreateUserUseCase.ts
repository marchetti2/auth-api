import {
  IUsersRepository,
  ICreateUserDTO,
} from "../../repositories/IUsersRepository";

class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  execute({ firstName, lastName, email, password }: ICreateUserDTO) {
    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      password,
    });
    console.log(user);
    return user;
  }
}

export { CreateUserUseCase };
