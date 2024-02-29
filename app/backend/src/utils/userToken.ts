import * as jwt from 'jsonwebtoken';

export type payloadEmail = {
  email: string;
  role: string;
};
export default class userToken {
  private jwtSecret = process.env.JWT_SECRET || 'jwt_secret';
  private config = {
    expiresIn: '69d',
  };

  sign(payload: payloadEmail): string {
    return jwt.sign(payload, this.jwtSecret, this.config);
  }
}
