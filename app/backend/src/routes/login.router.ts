import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const login = Router();

const loginController = new LoginController();

login.post('/', loginController.login);
login.get('/validate', loginController.validate);

export default login;
