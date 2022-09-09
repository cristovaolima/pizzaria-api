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
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// Rotas user
router.post('/user', new CreateUserController().handle);
router.get('/user', Authenticated, new UserController().handle);
router.post('/session', new AuthUserController().handle);

// Rotas category
router.get('/category', Authenticated, new ListCategoryController().handle);
router.post('/category', Authenticated, new CreateCategoryController().handle);

// Rotas product
router.get('/product', Authenticated, new ListByCategoryController().handle);
router.post('/product', Authenticated, upload.single('file'), new CreateProductController().handle);

// Rotas order
router.post('/order', Authenticated, new CreateOrderController().handle);
router.delete('/order', Authenticated, new RemoveOrderController().handle);

router.put('/order/send', Authenticated, new SendOrderController().handle);

router.post('/item', Authenticated, new AddItemController().handle);
router.delete('/item', Authenticated, new RemoveItemController().handle);

export { router };