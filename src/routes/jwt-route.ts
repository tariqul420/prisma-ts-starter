import { RequestHandler, Router } from 'express';
import { createToken, removeToken } from '../controllers/jwt-controller';

const router = Router();

router.post('/create', createToken as RequestHandler);
router.get('/remove', removeToken as RequestHandler);

export { router as jwtRoute };
