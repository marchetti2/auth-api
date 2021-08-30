import { Connection, createConnection, QueryFailedError } from "typeorm";
import { v4 as uuid } from "uuid";
import { validate } from "uuid";

import { User } from "../../../modules/users/entities/User";
import { UserToken } from "../../../modules/users/entities/UserToken";

import { UserTokenRepository } from "../../../modules/users/repositories/implementations/UserTokenRepository";
import { UsersRepository } from "../../../modules/users/repositories/implementations/UsersRepository";

describe("UserTokenRepository", () => {
  let connection: Connection;

  let user: User;
  let userToken: UserToken;

  let userTokenRepository: UserTokenRepository;
  let usersRepository: UsersRepository;

  beforeAll(async () => {
    connection = await createConnection();

    usersRepository = new UsersRepository();
    userTokenRepository = new UserTokenRepository();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.createQueryRunner().dropTable("user_token", true);
    await connection.createQueryRunner().dropTable("users", true);
    await connection.createQueryRunner().dropTable("migrations", true);

    await connection.close();
  });

  it("Should be able to create a new token for a user", async () => {
    user = await usersRepository.create({
      first_name: "Mario",
      last_name: "Luiz",
      email: "marchetti2@gmail.com",
      password: "123123",
    });

    userToken = await userTokenRepository.generate(user.id);

    expect(userToken).toHaveProperty("id");
    expect(userToken.user_id).toMatch(user.id);
    expect(validate(String(userToken.user_id))).toBe(true);
  });

  it("should not be able to create a new user with same email from another", async () => {
    await expect(
      usersRepository.create({
        first_name: "Mario",
        last_name: "Luiz",
        email: "marchetti2@gmail.com",
        password: "123123123",
      })
    ).rejects.toBeInstanceOf(QueryFailedError);
  });

  it("Should be able to find a user by email", async () => {
    const response = await usersRepository.findByEmail(user.email);

    expect(response?.email).toBe("marchetti2@gmail.com");
  });

  it("should not be able to show the profile from non-existing user", async () => {
    expect(await usersRepository.findByEmail("wrong@gmail.com")).toBe(
      undefined
    );
  });

  it("Should be able to find a user by id", async () => {
    const response = await usersRepository.findById(String(user.id));

    expect(response?.first_name).toBe("Mario");
    expect(response?.email).toBe("marchetti2@gmail.com");
  });

  it("should not be able to show the profile from non-existing user", async () => {
    expect(await usersRepository.findById(uuid())).toBe(undefined);
  });
});
