import { Router } from 'express';
import { creatProduct, get, list, remove, update, search } from '../controllers/product';
// import { userById } from '../controllers/user';
import { checkAuth, isAuth, requireSingin, isAdmin } from '../middleware/checkAuth';

const router = Router();

router.get('/products', list);
router.get('/products/:id', get);
router.post('/products', creatProduct);
router.delete('/products/:id', remove);
router.put('/products/:id', update);

// router.param("userId", userById)
export default router;
