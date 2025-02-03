import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const getTreatments = async (req: Request, res: Response) => {
  try {
    const doctors = await prisma.doctor.findMany();
    res.send(doctors);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getTreatmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const doctor = await prisma.doctor.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.send(doctor);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const createTreatment = async (req: Request, res: Response) => {
  const { treatmentTypeId, details, diagnose, appointmentId } = req.body;
  try {
    const newTreatment = await prisma.treatment.create({
      data: {
        treatmentTypeId: treatmentTypeId,
        details: details,
        diagnose: diagnose,
        appointmentId: appointmentId
      }
    })

    res.send(newTreatment);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
