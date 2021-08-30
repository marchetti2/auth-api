import { Connection, createConnection, QueryFailedError } from "typeorm";
import { v4 as uuid } from "uuid";
import { compare } from "bcryptjs";

import { User } from "../../../../modules/users/entities/User";
import { UsersRepository } from "../../../../modules/users/repositories/implementations/UsersRepository";

import { CreateUserUseCase } from "../../../../modules/users/useCases/createUser/CreateUserUseCase";
import { UpdateUserProfileUseCase } from "../../../../modules/users/useCases/updateUserProfile/UpdateUserProfileUseCase";
import { UpdateUserProfileError } from "../../../../modules/users/useCases/updateUserProfile/UpdateUserProfileError";

describe("UpdateProfile", () => {
  let connection: Connection;
  let user: User;

  let usersRepository: UsersRepository;

  let createUserUseCase: CreateUserUseCase;
  let updateUserProfileUseCase: UpdateUserProfileUseCase;

  beforeAll(async () => {
    connection = await createConnection();

    usersRepository = new UsersRepository();

    createUserUseCase = new CreateUserUseCase(usersRepository);
    updateUserProfileUseCase = new UpdateUserProfileUseCase(usersRepository);

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.createQueryRunner().dropTable("user_token", true);
    await connection.createQueryRunner().dropTable("users", true);
    await connection.createQueryRunner().dropTable("migrations", true);
    await connection.close();
  });

  it("should be able to update the profile", async () => {
    user = await createUserUseCase.execute({
      first_name: "Mario",
      last_name: "Luiz",
      email: "marchetti2@gmail.com",
      password: "123123",
    });

    user = await updateUserProfileUseCase.execute({
      user_id: user.id,
      first_name: "Mario Luiz",
      last_name: "M. Alves",
      email: "marchetti2@example.com",
    });

    expect(user.first_name).toBe("Mario Luiz");
    expect(user.last_name).toBe("M. Alves");
    expect(user.email).toBe("marchetti2@example.com");
  });

  it("should not be able to update the profile from non-existing user", async () => {
    await expect(
      updateUserProfileUseCase.execute({
        user_id: uuid(),
        first_name: "Mario Luiz",
        last_name: "M. Alves",
        email: "marchetti2@example.com",
      })
    ).rejects.toBeInstanceOf(UpdateUserProfileError.UserNotFoundError);
  });

  it("should not be able to change to another user email", async () => {
    await createUserUseCase.execute({
      first_name: "Mario",
      last_name: "Test",
      email: "test@example.com",
      password: "123123",
    });

    await expect(
      updateUserProfileUseCase.execute({
        user_id: user.id,
        first_name: "Mario Luiz",
        last_name: "M. Alves",
        email: "test@example.com",
      })
    ).rejects.toBeInstanceOf(UpdateUserProfileError.EmailAlreadyInUseError);
  });

  it("should be able to update the password", async () => {
    user = await updateUserProfileUseCase.execute({
      user_id: user.id,
      first_name: "Mario Luiz",
      last_name: "M. Alves",
      email: "marchetti2@example.com",
      old_password: "123123",
      password: "123123123",
    });

    expect(await compare("123123123", user.password)).toBe(true);
  });

  it("should not be able to update the password without old password", async () => {
    await expect(
      updateUserProfileUseCase.execute({
        user_id: user.id,
        first_name: "Mario Luiz",
        last_name: "M. Alves",
        email: "marchetti2@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(UpdateUserProfileError.OldPasswordNotSetError);
  });

  it("should not be able to update the password without wrong old password", async () => {
    await expect(
      updateUserProfileUseCase.execute({
        user_id: user.id,
        first_name: "Mario Luiz",
        last_name: "M. Alves",
        email: "marchetti2@example.com",
        old_password: "wrong-old-password",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(UpdateUserProfileError.OldPasswordNotMatchError);
  });
});
