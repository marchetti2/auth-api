import { User } from "../entities/User";

class ProfileMap {
  static toDTO({ id, first_name, last_name, email, created_at, updated_at }: User) {
    return {
      id,
      first_name,
      last_name,
      email,
      created_at,
      updated_at
    }
  }
}

export { ProfileMap }
