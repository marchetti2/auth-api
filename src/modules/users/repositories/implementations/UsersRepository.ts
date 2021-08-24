import {getRepository, Repository} from 'typeorm'
import { AppError } from '../../../../shared/errors/AppError';

import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
import { ICreateUserDTO } from '../../useCases/createUser/ICreateUserDTO'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User)
  }

  async create({ first_name, last_name, email, password }: ICreateUserDTO) {

    const user = this.repository.create({
      first_name, last_name, email, password
    })

    await this.repository.save(user)

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {

    return await this.repository.findOne(email);

  }

}

export { UsersRepository }
