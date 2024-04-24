import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

declare module 'express' {
  interface Request {
    user?: JwtPayload;
  }
}

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check to make sure header is not undefined and token exists
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === 'null' || token == null)
    return res.status(401).json({
      message: 'Unauthorized: Please log in first.',
    });

  // Check if JWT_SECRET exists
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      message:
        'Server Error: JWT_SECRET not found in environment variables',
    });
  }

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message:
          'Access forbidden, invalid token or session expired, refresh and log in.',
      });
    }
    req.user = user as JwtPayload | undefined;
    next();
  });
};

export default authenticateToken;
