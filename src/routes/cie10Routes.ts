import { Router } from 'express';
import {
  getCie10Codigos,
  getCie10CodigoById,
  createCie10Codigo,
  updateCie10Codigo,
  deleteCie10Codigo,
} from '../controllers/cie10Controller';

const router = Router();

router.get('/', getCie10Codigos);
router.get('/:codigo', getCie10CodigoById);
router.post('/', createCie10Codigo);
router.put('/:codigo', updateCie10Codigo);
router.delete('/:codigo', deleteCie10Codigo);

export default router;
