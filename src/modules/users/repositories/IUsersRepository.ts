import { User } from "../entities/User";

interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password:string
}

interface IUsersRepository {
  create({firstName,lastName, password, email }: ICreateUserDTO): User ;
  findByEmail(email: string): User | undefined
  delete(id:string): void
}

export { IUsersRepository, ICreateUserDTO}
