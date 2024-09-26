export interface Consulta {
    consulta_id?: number;
    paciente_id: number;
    doctor_id: number;
    motivo_consulta: string;
    sintomas_subjetivos: string;
    antecedentes_personales: string;
    antecedentes_familiares: string;
    fecha_consulta: string;
    notas: string;
  }
  