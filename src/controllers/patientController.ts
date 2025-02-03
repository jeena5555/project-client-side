import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await prisma.patient.findMany();
    res.send(patients);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getPatientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const doctor = await prisma.patient.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        appointment: true,
      }
    });
    res.send(doctor);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
