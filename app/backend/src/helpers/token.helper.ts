import * as Jwt from 'jsonwebtoken';
import 'dotenv/config';
import IUser from '../interfaces/IUser';
import CustomError from '../erros/customErros';

const jwtSecret = process.env.JWT_SECRET as string;

function generate(id: number, username: string): string {
  const token = Jwt.sign(
    { id, username },
    jwtSecret,
    { algorithm: 'HS256' },
  );

  return token;
}

function verify(token: string): IUser {
  try {
    const data = Jwt.verify(token, jwtSecret) as IUser;
    return data;
  } catch (error) {
    throw new CustomError(401, 'Token must be a valid token');
  }
}

export default {
  generate,
  verify,
};
