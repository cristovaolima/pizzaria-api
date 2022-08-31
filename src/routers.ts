import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { UserController } from './controllers/user/UserController';
import { Authenticated } from './middlewares/Authenticated';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

import { CreateProductController } from './controllers/product/CreateProductController';

import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// Rotas user
router.post('/user', new CreateUserController().handle);
router.get('/user', Authenticated, new UserController().handle);
router.post('/session', new AuthUserController().handle);

// Rotas category
router.get('/category', Authenticated, new ListCategoryController().handle);
router.post('/category', Authenticated, new CreateCategoryController().handle);
router.put('/category', Authenticated, new UserController().handle);
router.delete('/category', Authenticated, new UserController().handle);

// Rotas product
router.get('/product', Authenticated, new ListCategoryController().handle);
router.post('/product', Authenticated, upload.single('file'), new CreateProductController().handle);
router.put('/product', Authenticated, new UserController().handle);
router.delete('/product', Authenticated, new UserController().handle);

export { router };