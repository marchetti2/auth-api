interface IMailConfig {
  driver: string;

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: 'ethereal',

  defaults: {
    from: {
      email: 'marchetti2@gmail.com',
      name: 'Mario',
    },
  },
} as IMailConfig;
