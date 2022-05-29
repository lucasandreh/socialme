import { Router } from 'express';
import AuthenticateController from './controllers/Users/AuthenticateUserController';
import CreateProfileUserController from './controllers/Profile/CreateProfileUserController';
import CreateUserController from './controllers/Users/CreateUserController';
import LoggedUserProfileController from './controllers/Profile/LoggedUserProfileController';
import AuthenticationHandler from './middlewares/AuthenticationHandler';
import PublicUserProfileController from './controllers/Profile/PublicUserProfileController';
import CreatePostController from './controllers/Post/CreatePostController';
import UpdatePostController from './controllers/Post/UpdatePostController';
import DeletePostController from './controllers/Post/DeletePostController';
import ListAllPostsController from './controllers/Post/ListAllPostsController';

const router = Router();

// User routes
router.post('/user/create', CreateUserController.handle);
router.post('/user/login', AuthenticateController.handle);
router.post('/user/create/profile', AuthenticationHandler, CreateProfileUserController.handle);

router.get('/user/profile', AuthenticationHandler, LoggedUserProfileController.handle);
router.get('/user/profile/:username', PublicUserProfileController.handle);

// Posts routes
router.post('/post/create', AuthenticationHandler, CreatePostController.handle);
router.put('/post/update/:postId', AuthenticationHandler, UpdatePostController.handle);
router.delete('/post/delete/:postId', AuthenticationHandler, DeletePostController.handle);
router.get('/post/all', AuthenticationHandler, ListAllPostsController.handle);

export default router;
