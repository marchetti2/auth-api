import { User } from "../../entities/User"

export interface IAuthenticateUserDTO {
  user: Pick<User, 'id' | 'first_name' | 'last_name' | 'email'>
  token: string;
}
