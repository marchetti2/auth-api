import { Router } from 'express';

import { ShowUserProfileController } from '../modules/users/useCases/showUserProfile/ShowUserProfileController';
import { UpdateUserProfileController } from '../modules/users/useCases/updateUserProfile/UpdateUserProfileController';
import { ensureAuthenticated } from '../shared/infra/http/middlewares/ensureAutenticated';

const userProfileRouter = Router();
const showUserProfileController = new ShowUserProfileController();
const updateUserProfileController = new UpdateUserProfileController();

userProfileRouter.use(ensureAuthenticated);

userProfileRouter.get('/', showUserProfileController.execute);
userProfileRouter.put('/', updateUserProfileController.execute);

export { userProfileRouter };
