import { User } from '../../../modules/users/entities/User';
import { UserToken } from '../../../modules/users/entities/UserToken';

import { validate } from 'uuid';

describe('UserToken Entity', () => {
  it('should be able to create a user token', () => {
    const user = new User();
    const userToken = new UserToken();

    Object.assign(user, {
      first_name: 'Mario',
      last_name: 'Luiz',
      email: 'marchetti2@gmail.com',
      password: '123123',
      created_at: new Date(),
      updated_at: new Date(),
    });

    Object.assign(userToken, {
      user_id: user.id,
      token: '111',
      created_at: new Date(),
      updated_at: new Date(),
    });

    expect(userToken.user_id).toMatch(user.id);
    expect(validate(String(userToken.user_id))).toBe(true);
    expect(user.created_at).toBeInstanceOf(Date);
    expect(user.updated_at).toBeInstanceOf(Date);
  });
});
