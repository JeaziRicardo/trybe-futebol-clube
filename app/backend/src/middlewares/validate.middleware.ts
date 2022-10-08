import CustomError from '../erros/customErros';
import ILogin from '../interfaces/ILogin';
import Schema from '../schemas/login.schema';

const login = ({ email, password }: ILogin) => {
  const { error } = Schema.login.validate({ email, password });
  if (error) {
    const [status, message] = error.message.split('|');
    throw new CustomError(+status, message);
  }
};

export default {
  login,
};
