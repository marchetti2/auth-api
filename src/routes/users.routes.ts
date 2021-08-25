import { Router } from "express";
import multer from 'multer';

import uploadConfig from '../config/upload';
import { ensureAuthenticated } from '../shared/infra/http/middlewares/ensureAutenticated';
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { UserAvatarController } from "../modules/users/useCases/userAvatar/UserAvatarController";


const usersRoutes = Router();
const createUserController = new CreateUserController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRoutes.post("/", createUserController.execute);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.execute,
);
export { usersRoutes };
