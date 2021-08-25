import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';

import authConfig from '../../../../config/auth';
import { JWTTokenError } from "../../../errors/JWTTokenError";

interface IPayload {
  sub: string;
}

async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new JWTTokenError.JWTTokenMissingError()
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new JWTTokenError.JWTInvalidTokenError()
  }
}

export { ensureAuthenticated }
