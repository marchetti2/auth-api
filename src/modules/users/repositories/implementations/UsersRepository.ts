import {getRepository, Repository} from 'typeorm'

import { User } from "../../entities/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User)
  }

  async create({ first_name, last_name, email, password }: ICreateUserDTO) {

    const user = await this.repository.create({
      first_name, last_name, email, password
    })

    this.repository.save(user)

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
