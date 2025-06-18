// app.js
import express from 'express';
import cors from 'cors';
import EmployeeRoute from './routes/Employee.js'; 

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

app.use('/api/user', EmployeeRoute);

export default app;
