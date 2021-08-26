import { Router } from 'express';


import { ForgotPasswordController } from '../modules/users/useCases/forgotPassword/ForgotPasswordController';
import { ResetPasswordController } from '../modules/users/useCases/resetPassword/ResetPasswordController';

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot',forgotPasswordController.execute);
passwordRouter.post('/reset',resetPasswordController.execute);

export { passwordRouter };
