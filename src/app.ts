import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db'; // Importa la conexión de la base de datos
import doctorRoutes from './routes/doctorRoutes'; // Importa las rutas (crearemos esto en breve)
import patientRoutes from './routes/patientRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import consultaRoutes from './routes/consultaRoutes';
import cie10Routes from './routes/cie10Routes';
import derivacionRoutes from './routes/derivacionRoutes';
import alertaRoutes from './routes/alertaRoutes';
import consulta_Routes from './routes/consulta_routes'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Habilita CORS
app.use(express.json()); // Habilita la lectura de JSON en solicitudes
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/consultas', consultaRoutes);  
app.use('/api/cie10', cie10Routes);
app.use('/api/derivaciones', derivacionRoutes);
app.use('/api/alertas', alertaRoutes);
app.use('/api', consulta_Routes);

// Conectar al servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
