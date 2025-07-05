import { NextFunction, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { UserData } from '../types/user';

export const getUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.params;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userdata: UserData = req.body;
    // Validate required fields
    if (!userdata.email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: userdata.email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const newUser = await prisma.user.create({
      data: { ...req.body },
    });

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.params;
    const updatedData: Partial<UserData> = req.body;

    const updatedUser = await prisma.user.update({
      where: { email },
      data: updatedData,
    });

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
