export interface Alerta {
    alerta_id?: number;
    doctor_id: number;
    derivacion_id: number;
    fecha_alerta?: string; // Se establece por defecto en CURRENT_TIMESTAMP
    vista?: boolean; // Se establece por defecto en FALSE
  }
  