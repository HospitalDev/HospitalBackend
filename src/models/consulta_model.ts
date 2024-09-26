export interface ConsultaResponse {
  cita_id: number;
  nombre_completo: string;
  asunto: string;
  fecha_cita: Date;
  estado: string;
}