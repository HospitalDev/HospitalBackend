export interface Derivacion {
    derivacion_id?: number;
    consulta_id: number;
    doctor_origen_id: number;
    doctor_destino_id: number;
    fecha_derivacion: string;
    notas: string;
    alerta_enviada: boolean;
  }
  