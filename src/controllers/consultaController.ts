import { Request, Response } from 'express';
import pool from '../config/db';
import { Consulta } from '../models/consultaModel';
import asyncHandler from 'express-async-handler';

// Obtener todas las consultas
export const getConsultas = asyncHandler(async (req: Request, res: Response) => {
  const { rows } = await pool.query('SELECT * FROM consultas');
  res.json(rows);
});

// Obtener una consulta por ID
export const getConsultaById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM consultas WHERE consulta_id = $1', [id]);

  if (rows.length === 0) {
    res.status(404).json({ message: 'Consulta no encontrada' });
  } else {
    res.json(rows[0]);
  }
});

// Crear una nueva consulta
export const createConsulta = asyncHandler(async (req: Request, res: Response) => {
  const {
    paciente_id,
    doctor_id,
    motivo_consulta,
    sintomas_subjetivos,
    antecedentes_personales,
    antecedentes_familiares,
    fecha_consulta,
    notas,
  }: Consulta = req.body;

  const { rows } = await pool.query(
    `INSERT INTO consultas 
    (paciente_id, doctor_id, motivo_consulta, sintomas_subjetivos, antecedentes_personales, antecedentes_familiares, fecha_consulta, notas) 
    VALUES ($1, $2, $3, $4, $5, $6, $7 , $8) RETURNING *`,
    [
      paciente_id,
      doctor_id,
      motivo_consulta,
      sintomas_subjetivos,
      antecedentes_personales,
      antecedentes_familiares,
      fecha_consulta,
      notas,
    ]
  );

  res.status(201).json(rows[0]);
});

// Actualizar una consulta
export const updateConsulta = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    paciente_id,
    doctor_id,
    motivo_consulta,
    sintomas_subjetivos,
    antecedentes_personales,
    antecedentes_familiares,
    fecha_consulta,
    notas,
  }: Consulta = req.body;

  const { rows } = await pool.query(
    `UPDATE consultas SET 
    paciente_id = $1, doctor_id = $2, motivo_consulta = $3, sintomas_subjetivos = $4, antecedentes_personales = $5, 
    antecedentes_familiares = $6, fecha_consulta = $7 , notas = $8 WHERE consulta_id = $9 RETURNING *`,
    [
      paciente_id,
      doctor_id,
      motivo_consulta,
      sintomas_subjetivos,
      antecedentes_personales,
      antecedentes_familiares,
      fecha_consulta,
      notas,
      id,
    ]
  );

  if (rows.length === 0) {
    res.status(404).json({ message: 'Consulta no encontrada' });
  } else {
    res.json(rows[0]);
  }
});

// Eliminar una consulta
export const deleteConsulta = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await pool.query('DELETE FROM consultas WHERE consulta_id = $1 RETURNING *', [id]);

  if (rows.length === 0) {
    res.status(404).json({ message: 'Consulta no encontrada' });
  } else {
    res.json({ message: 'Consulta eliminada' });
  }
});
