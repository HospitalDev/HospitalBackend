import { Request, Response } from 'express';
import pool from '../config/db';
import { Appointment } from '../models/appointmentModel';
import asyncHandler from 'express-async-handler';

// Obtener todas las citas
export const getAppointments = asyncHandler(async (req: Request, res: Response) => {
  const { rows } = await pool.query('SELECT * FROM citas');
  res.json(rows);
});

// Obtener una cita por ID
export const getAppointmentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM citas WHERE cita_id = $1', [id]);

  if (rows.length === 0) {
    res.status(404).json({ message: 'Cita no encontrada' });
  } else {
    res.json(rows[0]);
  }
});

// Crear una nueva cita
export const createAppointment = asyncHandler(async (req: Request, res: Response) => {
  const { paciente_id, doctor_id, fecha_cita, asunto, estado }: Appointment = req.body;

  const { rows } = await pool.query(
    'INSERT INTO citas (paciente_id, doctor_id, fecha_cita, asunto, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [paciente_id, doctor_id, fecha_cita, asunto, estado]
  );

  res.status(201).json(rows[0]);
});

// Actualizar una cita
export const updateAppointment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { paciente_id, doctor_id, fecha_cita, asunto, estado }: Appointment = req.body;

  const { rows } = await pool.query(
    'UPDATE citas SET paciente_id = $1, doctor_id = $2, fecha_cita = $3, asunto = $4, estado = $5 WHERE cita_id = $6 RETURNING *',
    [paciente_id, doctor_id, fecha_cita, asunto, estado, id]
  );

  if (rows.length === 0) {
    res.status(404).json({ message: 'Cita no encontrada' });
  } else {
    res.json(rows[0]);
  }
});

// Eliminar una cita
export const deleteAppointment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await pool.query('DELETE FROM citas WHERE cita_id = $1 RETURNING *', [id]);

  if (rows.length === 0) {
    res.status(404).json({ message: 'Cita no encontrada' });
  } else {
    res.json({ message: 'Cita eliminada' });
  }
});
