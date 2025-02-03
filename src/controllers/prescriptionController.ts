import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const getPrescriptions = async (req: Request, res: Response) => {
  try {
    const prescriptions = await prisma.prescription.findMany();
    res.send(prescriptions)
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getPrescriptionById = async (req: Request, res: Response) => {
  try {
    const prescription = await prisma.prescription.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.send(prescription)
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// medicines ต้องส่งมาเป็น list
export const createPrescription = async (req: Request, res: Response) => {
  const { prescriptionDetail, prescriptionDate, appointmentId, medicines } = req.body;
  try {
    const prescription = await prisma.prescription.create({
      data: {
        prescriptionDetail: prescriptionDetail,
        prescriptionDate: prescriptionDate,
        appointmentId: appointmentId
      }
    });

    for (const { medicineId, quantity, duration } of medicines) {
      await prisma.prescriptionMedicines.create({
        data: {
          prescriptionId: prescription.id,
          medicineId: medicineId,
          quantity: quantity,
          duration: duration
        }
      });

      await prisma.medicine.update({
        where: { id: medicineId },
        data: { stockQuantity: { decrement: quantity } }
      });
    }

    res.send(prescription);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

