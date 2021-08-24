import { User } from "../../entities/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  create({ firstName, lastName, email, password }: ICreateUserDTO) {
    const user = new User(firstName, lastName, email, password);
    console.log(user);

    this.users.push(user);
    console.log(this.users);

    return user;
  }

  findByEmail(email: string): User {
    throw new Error("Method not implemented.");
  }
  delete(id: string): void {
    throw new Error("Method not implemented.");
  }
}

export { UsersRepository };
