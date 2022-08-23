import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { UserController } from './controllers/user/UserController';

import { Authenticated } from './middlewares/Authenticated';

const router = Router();

router.post('/user', new CreateUserController().handle);
router.get('/user', Authenticated, new UserController().handle);
router.post('/session', new AuthUserController().handle);

export { router };