import ILogin from '../interfaces/ILogin';
import tokenHelper from '../helpers/token.helper';
import User from '../database/models/UserModel';
import IToken from '../interfaces/IToken';
import CustomError from '../erros/customErros';
import Validate from '../middlewares/validate.middleware';
import IUser from '../interfaces/IUser';

class LoginService {
  private _userModel = User;

  async login(login: ILogin): Promise<IToken> {
    Validate.login(login);

    const user = await this._userModel.findOne(
      { where: { email: login.email } },
    );

    if (!user) throw new CustomError(401, 'Incorrect email or password');

    const token = tokenHelper.generate(user.id, user.username);

    return { token };
  }

  async validate(token: string | undefined): Promise<IUser> {
    if (!token) throw new CustomError(404, 'Token not found');

    const { id } = tokenHelper.verify(token);

    const { role } = await this._userModel.findOne(
      { where: { id } },
    ) as User;

    return { role };
  }
}

export default LoginService;
