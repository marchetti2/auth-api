import { User } from "../entities/User";
import { ICreateUserDTO } from '../useCases/createUser/ICreateUserDTO'

interface IUsersRepository {
  create({first_name,last_name, password, email }: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>
}

export { IUsersRepository }
