// src/controllers/consulta.controller.ts

import { Request, Response } from 'express';
import pool from '../config/db'; // Asegúrate de que esta importación sea correcta
import { ConsultaResponse } from '../models/consulta_model'; // Importar el modelo

export const obtenerCitasPorDoctor = async (req: Request, res: Response) => {
  const doctorId = parseInt(req.params.doctorId, 10);

  try {
    const query = `
      SELECT
        c.cita_id,
        p.nombres || ' ' || p.apellidos AS nombre_completo,
        c.asunto,
        c.fecha_cita,
        c.estado
      FROM
        citas c
      JOIN
        pacientes p ON c.paciente_id = p.paciente_id
      WHERE
        c.doctor_id = $1;
    `;

    const result = await pool.query(query, [doctorId]);

    // Convertir el resultado a tipo ConsultaResponse
    const citas: ConsultaResponse[] = result.rows;

    res.status(200).json(citas);
  } catch (error) {
    console.error('Error al obtener citas por doctor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
