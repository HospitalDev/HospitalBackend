export interface Patient {
    paciente_id?: number;
    doctor_id: number;
    foto?: Buffer;
    nombres: string;
    apellidos: string;
    correo: string;
    genero: string;
    fecha_nacimiento: string;
    numero_telefono: string;
    dia_registro: string;
    direccion: string;
    ciudad: string;
    estado_civil: string;
    estado: string; // Activo o Inactivo
    codigo_ciudad: string;
    ocupacion: string;
    numero_carnet: string;
    lugar_expedicion_carnet: string;
  }
  