import { Router } from "express";
import { create, listCate, read, removeCate} from "../controllers/category";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

router.get('/categorys', listCate);
router.post('/categorys', create);
router.get('/categorys/:slug', checkAuth, read );
router.delete('/category/:id', removeCate);

export default router;