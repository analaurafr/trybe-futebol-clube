import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export default class AuthMiddleware {
  static handle(req: Request, res: Response, next: NextFunction) {
    const tokenHeader = req.header('Authorization');

    if (!tokenHeader) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = tokenHeader.split(' ')[1];

    try {
      const secret = process.env.JWT_SECRET || 'jwt_secret';
      const payload = jwt.verify(token, secret) as unknown;
      console.log(payload);
      res.locals.auth = payload;
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  }
}
