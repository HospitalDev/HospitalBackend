import { Request, Response } from 'express';
import pool from '../config/db';
import { Cie10Codigo } from '../models/cie10Model';
import asyncHandler from 'express-async-handler';

// Obtener todos los códigos CIE10
export const getCie10Codigos = asyncHandler(async (req: Request, res: Response) => {
  const { rows } = await pool.query('SELECT * FROM cie10_codigos');
  res.json(rows);
});

// Obtener un código CIE10 por código
export const getCie10CodigoById = asyncHandler(async (req: Request, res: Response) => {
  const { codigo } = req.params;
  const { rows } = await pool.query('SELECT * FROM cie10_codigos WHERE codigo = $1', [codigo]);

  if (rows.length === 0) {
    res.status(404).json({ message: 'Código CIE10 no encontrado' });
  } else {
    res.json(rows[0]);
  }
});

// Crear un nuevo código CIE10
export const createCie10Codigo = asyncHandler(async (req: Request, res: Response) => {
  const { codigo, descripcion, detalles }: Cie10Codigo = req.body;

  const { rows } = await pool.query(
    'INSERT INTO cie10_codigos (codigo, descripcion, detalles) VALUES ($1, $2, $3) RETURNING *',
    [codigo, descripcion, detalles]
  );

  res.status(201).json(rows[0]);
});

// Actualizar un código CIE10
export const updateCie10Codigo = asyncHandler(async (req: Request, res: Response) => {
  const { codigo } = req.params;
  const { descripcion, detalles }: Cie10Codigo = req.body;

  const { rows } = await pool.query(
    'UPDATE cie10_codigos SET descripcion = $1, detalles = $2 WHERE codigo = $3 RETURNING *',
    [descripcion, detalles, codigo]
  );

  if (rows.length === 0) {
    res.status(404).json({ message: 'Código CIE10 no encontrado' });
  } else {
    res.json(rows[0]);
  }
});

// Eliminar un código CIE10
export const deleteCie10Codigo = asyncHandler(async (req: Request, res: Response) => {
  const { codigo } = req.params;
  const { rows } = await pool.query('DELETE FROM cie10_codigos WHERE codigo = $1 RETURNING *', [codigo]);

  if (rows.length === 0) {
    res.status(404).json({ message: 'Código CIE10 no encontrado' });
  } else {
    res.json({ message: 'Código CIE10 eliminado' });
  }
});
