import request from "supertest";
import { Connection, createConnection } from "typeorm";
import {v4 as uuid} from 'uuid'

import { app } from "../";
import { User } from "../modules/users/entities/User";
import { UserToken } from "../modules/users/entities/UserToken";

import { UserTokenRepository } from "../modules/users/repositories/implementations/UserTokenRepository";

describe("All routes", () => {
  let connection: Connection;

  let userTokenRepository: UserTokenRepository;

  let user: User;
  let userToken: UserToken;
  let token: string;
  let wrongToken: string;

  beforeAll(async () => {
    connection = await createConnection();
    userTokenRepository = new UserTokenRepository();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.createQueryRunner().dropTable("user_token", true);
    await connection.createQueryRunner().dropTable("users", true);
    await connection.createQueryRunner().dropTable("migrations", true);

    await connection.close();
  });

  it("should be able to create a new user", async () => {
    await request(app)
      .post("/users")
      .send({
        first_name: "Mario",
        last_name: "Luiz",
        email: "marchetti2@gmail.com",
        password: "123123",
      })
      .expect(201);
  });

  it("should not be able to create a new user with same email from another", async () => {
    await request(app)
      .post("/users")
      .send({
        first_name: "Mario",
        last_name: "Luiz",
        email: "marchetti2@gmail.com",
        password: "123123",
      })
      .expect(400);
  });

  it("should be able to authenticate a user", async () => {
    const response = await request(app)
      .post("/sessions")
      .send({
        email: "marchetti2@gmail.com",
        password: "123123",
      })
      .expect(200);

    user = response.body.user;
    token = response.body.token;

    expect(response.body).toHaveProperty("token");
  });

  it("should not be able to authenticate with non existing user", async () => {
    await request(app)
      .post("/sessions")
      .send({
        email: "johndoe@example.com",
        password: "123456",
      })
      .expect(401);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await request(app)
      .post("/sessions")
      .send({
        email: "marchetti2@gmail.com",
        password: "wrong-password",
      })
      .expect(401);
  });

  it("should be able to show the profile", async () => {
    const response = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${String(token)}`)
      .expect(200);

    expect(response.body).toMatchObject(user);
  });

  it("should not be able to show the profile if token is missing", async () => {
    await request(app).get("/profile").expect(401);
  });

  it("should be able to update a avatar", async () => {
    const response = await request(app)
      .patch("/users/avatar")
      .set("Authorization", `Bearer ${String(token)}`)
      .field('avatar', 'avatar')
      .attach('avatar', 'src/__tests__/avatar.png')
      .expect(200);

    expect(response.body).toMatchObject(user);
  });

  it("should not be able to update a avatar if token is missing", async () => {
    await request(app)
      .patch("/users/avatar")
      .set("Authorization", `Bearer ${String(wrongToken)}`)
      .set('Connection', 'keep-alive')
      .field('avatar', 'avatar')
      .attach('avatar', 'src/__tests__/avatar.png')
      .expect(401);
  });

  it("should be able to update a profile", async () => {
    const response = await request(app)
      .put("/profile")
      .set("Authorization", `Bearer ${String(token)}`)
      .send({
        first_name:"Mario Luiz",
        last_name:" M. Alves",
        email: "marchetti2@gmail.com",
        old_password: "123123",
        password: "123123"
      })
      .expect(200);

    user = response.body

    expect(response.body).toMatchObject({
      first_name: 'Mario Luiz',
      last_name: ' M. Alves',
    });
  });

  it("should not be able to update a profile with non existing user ", async () => {
    await request(app)
      .put("/profile")
      .set("Authorization", `Bearer ${String(wrongToken)}`)
      .send({
        first_name:"Mario Luiz",
        last_name:" M. Alves",
        email: "marchetti2@gmail.com",
        old_password: "123123",
        password: "123123"
      })
      .expect(401);
  });

  it("should not be able to update a profile with a existing email ", async () => {
    await request(app)
    .post("/users")
    .send({
      first_name: "Test",
      last_name: "Test",
      email: "existing-email@test.com",
      password: "123123",
    })
    .expect(201);

    await request(app)
      .put("/profile")
      .set("Authorization", `Bearer ${String(token)}`)
      .send({
        first_name:"Mario Luiz",
        last_name:" M. Alves",
        email: "existing-email@test.com",
        old_password: "123123",
        password: "123123"
      })
      .expect(400);
  });

  it("should not be able to update a profile with a wrong old password ", async () => {
    await request(app)
      .put("/profile")
      .set("Authorization", `Bearer ${String(token)}`)
      .send({
        first_name:"Mario Luiz",
        last_name:" M. Alves",
        email: "marchetti2@gmail.com",
        old_password: "wrong-old-password",
        password: "123123"
      })
      .expect(400);
  });

  it("should not be able to update a profile without a old password  ", async () => {
    await request(app)
      .put("/profile")
      .set("Authorization", `Bearer ${String(token)}`)
      .send({
        first_name:"Mario Luiz",
        last_name:" M. Alves",
        email: "marchetti2@gmail.com",
        password: "123123"
      })
      .expect(400);
  });

  it("should be able to recover a password with a email", async () => {
    await request(app)
      .post("/password/forgot")
      .send({
        email: "marchetti2@gmail.com",
      })
      .expect(200);
  });

  it("should not be able to recover a password if a user does not exists", async () => {
    await request(app)
      .post("/password/forgot")
      .send({
        email: "non-existing-email@test.com",
      })
      .expect(400);
  });

  it("should be able to reset a password", async () => {

    userToken = (await userTokenRepository.generate(user.id))

    await request(app)
      .post("/password/reset")
      .send({
        password: "111111",
        password_confirmation: "111111",
        token: userToken.token
      })
      .expect(204);
  });

  it("should not be able to reset a password without a token", async () => {

    await request(app)
      .post("/password/reset")
      .send({
        password: "111111",
        password_confirmation: "111111",
        token: uuid()
      })
      .expect(400);
  });

  it("should not be able to reset a password if token as expired", async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await request(app)
      .post("/password/reset")
      .send({
        password: "111111",
        password_confirmation: "111111",
        token: userToken.token
      })
      .expect(400);
  });

});
