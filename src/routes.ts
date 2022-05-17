import { Router } from 'express';
import AuthenticateController from './controllers/Users/AuthenticateUserController';
import CreateProfileUserController from './controllers/Users/CreateProfileUserController';
import CreateUserController from './controllers/Users/CreateUserController';

const router = Router();

// User routes
router.post('/user/create', CreateUserController.handle);
router.post('/user/autheticate', AuthenticateController.handle);
router.post('/user/create/profile', CreateProfileUserController.handle);

export default router;
