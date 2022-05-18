import { Router } from 'express';
import AuthenticateController from './controllers/Users/AuthenticateUserController';
import CreateProfileUserController from './controllers/Users/CreateProfileUserController';
import CreateUserController from './controllers/Users/CreateUserController';
import LoggedUserProfileController from './controllers/Users/LoggedUserProfileController';
import AuthenticationHandler from './middlewares/AuthenticationHandler';

const router = Router();

// User routes POST
router.post('/user/create', CreateUserController.handle);
router.post('/user/autheticate', AuthenticateController.handle);
router.post('/user/create/profile', AuthenticationHandler, CreateProfileUserController.handle);

// User routes GET
router.get('/user/profile', AuthenticationHandler, LoggedUserProfileController.handle);

export default router;
