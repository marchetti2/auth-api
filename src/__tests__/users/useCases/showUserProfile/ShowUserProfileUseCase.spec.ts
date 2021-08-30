import { Connection, createConnection } from "typeorm";
import { v4 as uuid } from "uuid";

import { UsersRepository } from "../../../../modules/users/repositories/implementations/UsersRepository";
import { CreateUserUseCase } from "../../../../modules/users/useCases/createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "../../../../modules/users/useCases/showUserProfile/ShowUserProfileUseCase";
import { ShowUserProfileError } from "../../../../modules/users/useCases/showUserProfile/ShowUserProfileError";

describe("ShowUserProfile", () => {
  let connection: Connection;

  let usersRepository: UsersRepository;

  let createUserUseCase: CreateUserUseCase;
  let showUserProfileUseCase: ShowUserProfileUseCase;

  beforeAll(async () => {
    connection = await createConnection();

    usersRepository = new UsersRepository();

    createUserUseCase = new CreateUserUseCase(usersRepository);
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepository);

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.createQueryRunner().dropTable("user_token", true);
    await connection.createQueryRunner().dropTable("users", true);
    await connection.createQueryRunner().dropTable("migrations", true);

    await connection.close();
  });

  it("should be able to show the profile", async () => {
    const user = await createUserUseCase.execute({
      first_name: "Mario",
      last_name: "Luiz",
      email: "marchetti2@gmail.com",
      password: "123123",
    });

    const response = await showUserProfileUseCase.execute(String(user.id));

    expect(response.first_name).toBe("Mario");
    expect(response.email).toBe("marchetti2@gmail.com");
  });

  it("should not be able to show the profile from non-existing user", async () => {
    await expect(showUserProfileUseCase.execute(uuid())).rejects.toBeInstanceOf(
      ShowUserProfileError
    );
  });
});
