import { Router } from 'express';
import {
  getAlertas,
  getAlertaById,
  createAlerta,
  updateAlerta,
  deleteAlerta,
} from '../controllers/alertaController';

const router = Router();

router.get('/', getAlertas);
router.get('/:id', getAlertaById);
router.post('/', createAlerta);
router.put('/:id', updateAlerta);
router.delete('/:id', deleteAlerta);

export default router;
