import express from 'express';
import EmployeeController from '../controllers/Employee.js';


const Router = express.Router();

Router.post('/Register', EmployeeController.EmployeeRegistration);
Router.post('/LogIn', EmployeeController.Login);


export default Router;
