export interface Doctor {
    doctor_id?: number;
    nombres: string;
    apellidos: string;
    foto?: Buffer;
    ciudad?: string;
    pais_nacimiento?: string;
    fecha_nacimiento?: string;
    genero?: string;
    especializacion?: string;
    correo: string;
    telefono?: string;
    password: string;
  }
  