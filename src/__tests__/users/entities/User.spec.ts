import { User } from '../../../modules/users/entities/User';

import { validate } from 'uuid';

describe('User Entity', () => {
  it('should be able to create a user', () => {
    const user = new User();

    Object.assign(user, {
      first_name: 'Mario',
      last_name: 'Luiz',
      email: 'marchetti2@gmail.com',
      password: '123123',
      created_at: new Date(),
      updated_at: new Date(),
    });

    expect(user).toMatchObject({
      first_name: 'Mario',
      last_name: 'Luiz',
      email: 'marchetti2@gmail.com',
    });

    expect(validate(String(user.id))).toBe(true);
    expect(user.created_at).toBeInstanceOf(Date);
    expect(user.updated_at).toBeInstanceOf(Date);
  });
});
