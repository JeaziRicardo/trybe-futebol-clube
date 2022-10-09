import { Request, Response } from 'express';
import ILogin from '../interfaces/ILogin';
import LoginService from '../services/login.service';

class LoginController {
  private _loginService = new LoginService();

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body as ILogin;

    const token = await this._loginService.login({ email, password });

    return res.status(200).json(token);
  };

  public validate = async (req: Request, res: Response): Promise<Response> => {
    const { authorization: token } = req.headers;

    const role = await this._loginService.validate(token);

    return res.status(200).json(role);
  };
}

export default LoginController;
