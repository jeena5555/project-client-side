import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany();
    res.send(appointments);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        patient: true,
        doctor: true,
        prescription: true,
        invoice: true,
        treatment: true
      }
    });
    res.send(appointment);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  const { appointmentDate, appointmentTime, patientId, doctorId, symptom, startSymptomDate, note } = req.body;
  try {
    const appointment = await prisma.appointment.create({
      data: {
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        patientId: patientId,
        doctorId: doctorId,
        symptom: symptom,
        startSymptomDate: startSymptomDate,
        note: note
      }
    });
    res.send(appointment);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { appointmentDate, appointmentTime, createdAt, patientId, doctorId, symptom, startSymptomDate, note } = req.body;
  try {
    const appointment = await prisma.appointment.update({
      where: {
        id: Number(id)
      },
      data: {
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        patientId: patientId,
        doctorId: doctorId,
        symptom: symptom,
        startSymptomDate: startSymptomDate,
        note: note
      }
    });
    res.send(appointment);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

export const deleteAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const appointment = await prisma.appointment.delete({
      where: {
        id: Number(id)
      }
    });
    res.send(appointment);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}
