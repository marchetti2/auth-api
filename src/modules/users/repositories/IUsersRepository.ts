import { User } from '../entities/User';
import { ICreateUserDTO } from '../useCases/createUser/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}

export { IUsersRepository };
