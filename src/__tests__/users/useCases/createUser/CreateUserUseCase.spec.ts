import { Connection, createConnection } from "typeorm";
import { UsersRepository } from "../../../../modules/users/repositories/implementations/UsersRepository";
import { CreateUserUseCase } from "../../../../modules/users/useCases/createUser/CreateUserUseCase";
import { CreateUserError } from "../../../../modules/users/useCases/createUser/CreateUserError";

describe("CreateUser", () => {
  let connection: Connection;

  let usersRepository: UsersRepository;

  let createUserUseCase: CreateUserUseCase;

  beforeAll(async () => {
    connection = await createConnection();

    usersRepository = new UsersRepository();

    createUserUseCase = new CreateUserUseCase(usersRepository);

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.createQueryRunner().dropTable("user_token", true);
    await connection.createQueryRunner().dropTable("users", true);
    await connection.createQueryRunner().dropTable("migrations", true);

    await connection.close();
  });

  it("Should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      first_name: "Mario",
      last_name: "Luiz",
      email: "marchetti2@gmail.com",
      password: "123123123",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to craete a new user with same email from another", async () => {
    await expect(
      createUserUseCase.execute({
        first_name: "Mario",
        last_name: "Luiz",
        email: "marchetti2@gmail.com",
        password: "123123123",
      })
    ).rejects.toBeInstanceOf(CreateUserError);
  });
});
