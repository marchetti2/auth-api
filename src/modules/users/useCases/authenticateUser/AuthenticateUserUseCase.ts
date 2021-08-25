import { inject, injectable } from "tsyringe";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../../../../config/auth';

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";
import { IAuthenticateUserDTO } from './IAuthenticateUserDTO'

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IAuthenticateUserDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new IncorrectEmailOrPasswordError();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new IncorrectEmailOrPasswordError();
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ user }, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      },
      token
    }
  }
}

export { AuthenticateUserUseCase };
