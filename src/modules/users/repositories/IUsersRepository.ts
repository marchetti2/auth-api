import { User } from "../entities/User";

interface ICreateUserDTO {
  first_name: string;
  last_name: string;
  email: string;
  password:string
}

interface IUsersRepository {
  create({first_name,last_name, password, email }: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>
  delete(id:string): Promise<void>
}

export { IUsersRepository, ICreateUserDTO}
