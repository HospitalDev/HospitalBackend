import { Request, Response } from 'express';
import pool from '../config/db';
import { Derivacion } from '../models/derivacionModel';
import asyncHandler from 'express-async-handler';

// Obtener todas las derivaciones
export const getDerivaciones = asyncHandler(async (req: Request, res: Response) => {
  const { rows } = await pool.query('SELECT * FROM derivaciones');
  res.json(rows);
});

// Obtener una derivación por ID
export const getDerivacionById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM derivaciones WHERE derivacion_id = $1', [id]);

  if (rows.length === 0) {
    res.status(404).json({ message: 'Derivación no encontrada' });
  } else {
    res.json(rows[0]);
  }
});

// Crear una nueva derivación
export const createDerivacion = asyncHandler(async (req: Request, res: Response) => {
  const { consulta_id, doctor_origen_id, doctor_destino_id, fecha_derivacion, notas, alerta_enviada }: Derivacion = req.body;

  const { rows } = await pool.query(
    `INSERT INTO derivaciones 
    (consulta_id, doctor_origen_id, doctor_destino_id, fecha_derivacion, notas, alerta_enviada) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [consulta_id, doctor_origen_id, doctor_destino_id, fecha_derivacion, notas, alerta_enviada]
  );

  res.status(201).json(rows[0]);
});
