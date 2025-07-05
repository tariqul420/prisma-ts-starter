import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import prisma from '../lib/prisma';

interface CustomRequest extends Request {
  user?: JwtPayload;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send({ error: 'Unauthorized access' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      config.cookie.tokenSecret || '',
    ) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized access' });
  }
};

export const verifyAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const email = req.user?.email;
  if (!email) {
    res.status(401).send({ error: 'Unauthorized access' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.role !== 'ADMIN') {
      res
        .status(403)
        .send({ message: 'Forbidden access. Only admins have access!' });
      return;
    }

    next();
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).send({ error: 'Server error', details: error.message });
  }
};
