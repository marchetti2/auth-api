import { User } from "../../model/User"
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository"

export class UsersRepository implements IUsersRepository {

  private users: User[]

  constructor() {
    this.users
  }

  create({ firstName, lastName, email, password}: ICreateUserDTO ){

    const user = new User(firstName, lastName, email, password)

    this.users.push(user)

    return user

  }

  findByEmail(email: string): User {
    throw new Error("Method not implemented.")
  }
  delete(id: string): void {
    throw new Error("Method not implemented.")
  }
}