import { Request, Response } from 'express';
import pool from '../config/db';
import { Patient } from '../models/patientModel';
import asyncHandler from 'express-async-handler';

// Obtener todos los pacientes
export const getPatients = asyncHandler(async (req: Request, res: Response) => {
  const { rows } = await pool.query('SELECT * FROM pacientes');
  res.json(rows);
});

// Obtener un paciente por ID
export const getPatientById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM pacientes WHERE paciente_id = $1', [id]);

  if (rows.length === 0) {
    res.status(404).json({ message: 'Paciente no encontrado' });
  } else {
    res.json(rows[0]);
  }
});

// Crear un nuevo paciente
export const createPatient = asyncHandler(async (req: Request, res: Response) => {
  const {
    doctor_id,
    nombres,
    apellidos,
    correo,
    genero,
    fecha_nacimiento,
    numero_telefono,
    dia_registro,
    direccion,
    ciudad,
    estado_civil,
    estado,
    codigo_ciudad,
    ocupacion,
    numero_carnet,
    lugar_expedicion_carnet,
  }: Patient = req.body;

  const { rows } = await pool.query(
    `INSERT INTO pacientes 
    (doctor_id, nombres, apellidos, correo, genero, fecha_nacimiento, numero_telefono, dia_registro, 
    direccion, ciudad, estado_civil, estado, codigo_ciudad, ocupacion, numero_carnet, lugar_expedicion_carnet) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
    [
      doctor_id,
      nombres,
      apellidos,
      correo,
      genero,
      fecha_nacimiento,
      numero_telefono,
      dia_registro,
      direccion,
      ciudad,
      estado_civil,
      estado,
      codigo_ciudad,
      ocupacion,
      numero_carnet,
      lugar_expedicion_carnet,
    ]
  );

  res.status(201).json(rows[0]);
});

// Actualizar un paciente
export const updatePatient = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    doctor_id,
    nombres,
    apellidos,
    correo,
    genero,
    fecha_nacimiento,
    numero_telefono,
    dia_registro,
    direccion,
    ciudad,
    estado_civil,
    estado,
    codigo_ciudad,
    ocupacion,
    numero_carnet,
    lugar_expedicion_carnet,
  }: Patient = req.body;

  const { rows } = await pool.query(
    `UPDATE pacientes SET 
    doctor_id = $1, nombres = $2, apellidos = $3, correo = $4, genero = $5, fecha_nacimiento = $6, 
    numero_telefono = $7, dia_registro = $8, direccion = $9, ciudad = $10, estado_civil = $11, 
    estado = $12, codigo_ciudad = $13, ocupacion = $14, numero_carnet = $15, lugar_expedicion_carnet = $16 
    WHERE paciente_id = $17 RETURNING *`,
    [
      doctor_id,
      nombres,
      apellidos,
      correo,
      genero,
      fecha_nacimiento,
      numero_telefono,
      dia_registro,
      direccion,
      ciudad,
      estado_civil,
      estado,
      codigo_ciudad,
      ocupacion,
      numero_carnet,
      lugar_expedicion_carnet,
      id,
    ]
  );

  if (rows.length === 0) {
    res.status(404).json({ message: 'Paciente no encontrado' });
  } else {
    res.json(rows[0]);
  }
});

// Cambiar el estado de un paciente a "inactivo" (eliminar)
export const deletePatient = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await pool.query(
    'UPDATE pacientes SET estado = $1 WHERE paciente_id = $2 RETURNING *',
    ['inactivo', id]
  );

  if (rows.length === 0) {
    res.status(404).json({ message: 'Paciente no encontrado' });
  } else {
    res.json({ message: 'Paciente marcado como inactivo' });
  }
});
