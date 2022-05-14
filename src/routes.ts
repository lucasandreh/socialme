import { Router } from 'express';
import CreateUserController from './controllers/Users/CreateUserController';

const router = Router();

// User routes
router.post('/user/create', CreateUserController.handle);

export default router;
