import { Router } from 'express';
import AuthenticateController from './controllers/Users/AuthenticateUserController';
import CreateUserController from './controllers/Users/CreateUserController';

const router = Router();

// User routes
router.post('/user/create', CreateUserController.handle);
router.post('/user/autheticate', AuthenticateController.handle);

export default router;
