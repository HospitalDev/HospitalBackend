import { Request, Response } from 'express';
import pool from '../config/db';
import { Alerta } from '../models/alertaModel';
import asyncHandler from 'express-async-handler';

// Obtener todas las alertas
export const getAlertas = asyncHandler(async (req: Request, res: Response) => {
  const { rows } = await pool.query('SELECT * FROM alertas');
  res.json(rows);
});

// Obtener una alerta por ID
export const getAlertaById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM alertas WHERE alerta_id = $1', [id]);

  if (rows.length === 0) {
    res.status(404).json({ message: 'Alerta no encontrada' });
  } else {
    res.json(rows[0]);
  }
});

// Crear una nueva alerta
export const createAlerta = asyncHandler(async (req: Request, res: Response) => {
  const { doctor_id, derivacion_id, fecha_alerta, vista }: Alerta = req.body;

  const { rows } = await pool.query(
    `INSERT INTO alertas (doctor_id, derivacion_id, fecha_alerta, vista) 
    VALUES ($1, $2, $3, $4) RETURNING *`,
    [doctor_id, derivacion_id, fecha_alerta, vista]
  );

  res.status(201).json(rows[0]);
});

// Actualizar una alerta
export const updateAlerta = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { doctor_id, derivacion_id, vista }: Alerta = req.body;

  const { rows } = await pool.query(
    `UPDATE alertas SET doctor_id = $1, derivacion_id = $2, vista = $3 WHERE alerta_id = $4 RETURNING *`,
    [doctor_id, derivacion_id, vista, id]
  );

  if (rows.length === 0) {
    res.status(404).json({ message: 'Alerta no encontrada' });
  } else {
    res.json(rows[0]);
  }
});

// Eliminar una alerta
export const deleteAlerta = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await pool.query('DELETE FROM alertas WHERE alerta_id = $1 RETURNING *', [id]);

  if (rows.length === 0) {
    res.status(404).json({ message: 'Alerta no encontrada' });
  } else {
    res.json({ message: 'Alerta eliminada' });
  }
});
