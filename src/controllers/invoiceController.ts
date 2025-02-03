import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const getInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = await prisma.invoice.findMany();
    res.send(invoice);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getInvoiceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.send(invoice);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  const { appointmentId } = req.body;
  try {
    const prescriptions = await prisma.prescription.findMany({
      where: { appointmentId },
      select: { prescriptionMedicines: { include: { medicine: true } } }
    });

    const prescriptionTotal = prescriptions.reduce((total, prescription) => {
      const prescriptionSum = prescription.prescriptionMedicines.reduce((sum, pm) => {
        return sum + (pm.quantity * pm.medicine.price);
      }, 0);
      return total + prescriptionSum;
    }, 0);

    const treatments = await prisma.treatment.findMany({
      where: { appointmentId },
      include: {
        treatmentType: true,
      },
    });

    const treatmentTotal = treatments.reduce((total, treatment) => total + treatment.treatmentType.cost, 0);

    const totalAmount = prescriptionTotal + treatmentTotal;

    res.send(totalAmount);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
