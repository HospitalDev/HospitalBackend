export interface Appointment {
    cita_id?: number;
    paciente_id: number;
    doctor_id: number;
    fecha_cita: string;
    asunto: string;
    estado: string; // pendiente o completada
  }
  