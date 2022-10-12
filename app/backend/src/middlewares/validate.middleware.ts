import CustomError from '../erros/customErros';
import ILogin from '../interfaces/ILogin';
import Schema from '../schemas/login.schema';

const UNAUTHORIZED = 'It is not possible to create a match with two equal teams';

const login = ({ email, password }: ILogin) => {
  const { error } = Schema.login.validate({ email, password });
  if (error) {
    const [status, message] = error.message.split('|');
    throw new CustomError(+status, message);
  }
};

const match = async (teams: number[]) => {
  if (teams[0] === teams[1]) {
    throw new CustomError(401, UNAUTHORIZED);
  }
};

export default {
  login,
  match,
};
