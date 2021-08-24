import express from "express";
import './database'

import { usersRoutes } from "./routes/users.router";

const app = express();

app.use(express.json());
app.use("/users", usersRoutes);

export { app };
