import { Router } from 'express';
import {
  getDerivaciones,
  getDerivacionById,
  createDerivacion,
} from '../controllers/derivacionController';

const router = Router();

router.get('/', getDerivaciones);
router.get('/:id', getDerivacionById);
router.post('/', createDerivacion);

export default router;
