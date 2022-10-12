import tokenHelper from '../helpers/token.helper';
import Team from '../database/models/TeamModel';
import CustomError from '../erros/customErros';
import ILogin from '../interfaces/ILogin';
import Schema from '../schemas/login.schema';

const NOT_FOUND = 'There is no team with such id!';
const UNAUTHORIZED = 'It is not possible to create a match with two equal teams';

const login = ({ email, password }: ILogin) => {
  const { error } = Schema.login.validate({ email, password });
  if (error) {
    const [status, message] = error.message.split('|');
    throw new CustomError(+status, message);
  }
};

const match = async (teams: number[], token: string) => {
  tokenHelper.verify(token);

  if (teams[0] === teams[1]) {
    throw new CustomError(401, UNAUTHORIZED);
  }

  const { count } = await Team.findAndCountAll({ where: { id: teams } });
  if (count !== teams.length) {
    throw new CustomError(404, NOT_FOUND);
  }
};

export default {
  login,
  match,
};
