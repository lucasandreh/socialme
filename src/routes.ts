import { Router } from 'express';
import AuthenticateController from './controllers/Users/AuthenticateUserController';
import CreateProfileUserController from './controllers/Profile/CreateProfileUserController';
import CreateUserController from './controllers/Users/CreateUserController';
import LoggedUserProfileController from './controllers/Profile/LoggedUserProfileController';
import AuthenticationHandler from './middlewares/AuthenticationHandler';
import PublicUserProfileController from './controllers/Profile/PublicUserProfileController';

const router = Router();

// User routes POST
router.post('/user/create', CreateUserController.handle);
router.post('/user/autheticate', AuthenticateController.handle);
router.post('/user/create/profile', AuthenticationHandler, CreateProfileUserController.handle);

// User routes GET
router.get('/user/profile', AuthenticationHandler, LoggedUserProfileController.handle);
router.get('/user/profile/:username', PublicUserProfileController.handle);

export default router;
