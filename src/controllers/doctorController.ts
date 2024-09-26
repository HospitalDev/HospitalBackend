import { Request, Response } from 'express';
import pool from '../config/db';
import { Doctor } from '../models/doctorModel';
import asyncHandler from 'express-async-handler';

// Obtener todos los doctores
export const getDoctors = asyncHandler(async (req: Request, res: Response) => {
  const { rows } = await pool.query('SELECT * FROM doctores');
  res.json(rows);
});

// Obtener un doctor por ID
export const getDoctorById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM doctores WHERE doctor_id = $1', [id]);

  if (rows.length === 0) {
    res.status(404).json({ message: 'Doctor no encontrado' });
  } else {
    res.json(rows[0]);
  }
});

export const loginDoctor = async (req: Request, res: Response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el correo existe
    const query = 'SELECT * FROM doctores WHERE correo = $1';
    const result = await pool.query(query, [correo]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor no encontrado' });
    }

    const doctor = result.rows[0];

    // Comparar la contraseña directamente
    if (doctor.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Si las credenciales son correctas, responder con el doctor
    res.status(200).json({ mensaje: 'Login exitoso', doctor });
  } catch (error) {
    console.error('Error al hacer login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo doctor
export const createDoctor = asyncHandler(async (req: Request, res: Response) => {
  const { nombres, apellidos, correo, password }: Doctor = req.body;
  const { rows } = await pool.query(
    'INSERT INTO doctores (nombres, apellidos, correo, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombres, apellidos, correo, password]
  );
  res.status(201).json(rows[0]);
});

// Actualizar un doctor
export const updateDoctor = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombres, apellidos, correo, password }: Doctor = req.body;
  const { rows } = await pool.query(
    'UPDATE doctores SET nombres = $1, apellidos = $2, correo = $3, password = $4 WHERE doctor_id = $5 RETURNING *',
    [nombres, apellidos, correo, password, id]
  );

  if (rows.length === 0) {
    res.status(404).json({ message: 'Doctor no encontrado' });
  } else {
    res.json(rows[0]);
  }
});

// Eliminar un doctor
export const deleteDoctor = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await pool.query('DELETE FROM doctores WHERE doctor_id = $1 RETURNING *', [id]);

  if (rows.length === 0) {
    res.status(404).json({ message: 'Doctor no encontrado' });
  } else {
    res.json({ message: 'Doctor eliminado' });
  }
});
