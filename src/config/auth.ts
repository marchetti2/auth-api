export default {
  jwt: {
    secret: "default",
    expiresIn: "1d",
  },
};

//secret: (process.env.JWT_SECRET as string) || "default",
