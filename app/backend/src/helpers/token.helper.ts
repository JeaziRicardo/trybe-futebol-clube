import * as Jwt from 'jsonwebtoken';
import 'dotenv/config';
import IUser from '../interfaces/IUser';

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
  const data = Jwt.verify(token, jwtSecret) as IUser;

  return data;
}

export default {
  generate,
  verify,
};
