import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import { ensureAuthenticated } from '../shared/infra/http/middlewares/ensureAutenticated';
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController';
import { UpdateAvatarController } from '../modules/users/useCases/updateAvatar/UpdateAvatarController';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();
const upload = multer(uploadConfig);

usersRoutes.post('/', createUserController.execute);
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateAvatarController.execute
);
export { usersRoutes };
