import * as Jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwtSecret = process.env.JWT_SECRET as string;

function generate(id: number, username: string): string {
  const token = Jwt.sign(
    { id, username },
    jwtSecret,
    { algorithm: 'HS256' },
  );

  return token;
}

export default {
  generate,
};
