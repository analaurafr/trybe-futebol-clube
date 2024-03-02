import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default class Validations {
  static loginValidation(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (password.length < 6) return res.status(401).json({ message: 'Invalid email or password' });

    next();
  }

  static handle(req: Request, res: Response, next: NextFunction) {
    const tokenAuth = req.headers.authorization;
    if (!tokenAuth) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const [type, token] = tokenAuth.split(' ');
    if (type !== 'Bearer') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    try {
      const secret = process.env.JWT_SECRET ?? 'secret_qualquer';
      const payload = jwt.verify(token, secret);
      res.locals.auth = payload;
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
