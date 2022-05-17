import { verify } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

interface PayloadInterface {
    id: number;
}

export default async function AuthenticationHandler(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    response.status(401).json({
      error: 'Não autorizado',
    });
  }

  const [, token] = authToken!.split(' ');

  try {
    const { id } = verify(token, `${process.env.JWT_SECRET}`) as PayloadInterface;
    request.user_id = id;

    return next();
  } catch (error) {
    return response.status(401).json({
      error: 'Não autorizado',
    });
  }
}
