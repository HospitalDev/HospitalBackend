// src/routes/consulta.routes.ts

import { Router } from 'express';
import { obtenerCitasPorDoctor } from '../controllers/consulta_controller';

const router = Router();

// Ruta para obtener citas por doctor
router.get('/citas/doctor/:doctorId', obtenerCitasPorDoctor);

export default router;
