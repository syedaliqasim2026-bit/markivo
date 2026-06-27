import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const verifyAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  verifyToken(req, res, () => {
    if (req.userRole !== 'admin' && req.userRole !== 'owner') {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }
    next();
  });
};
