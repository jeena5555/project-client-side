import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        department: true
      }
    });
    res.send(doctors);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const doctor = await prisma.doctor.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        department: true
      }
    });
    res.send(doctor);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// API ไว้สร้าง mock
export const createAccountDoctor = async (req: Request, res: Response) => {
  const { accountName, password, firstName, lastName, phone, email, address,  doctorImage, shiftDay, startTime, endTime, description, department } = req.body;
  try {
    const newAccount = await prisma.account.create({
      data: {
        accountName: accountName,
        password: password,
        role: "DOCTOR"
      }
    })

    const newDoctor = await prisma.doctor.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        address: address,
        doctorImage: doctorImage,
        shiftDay: shiftDay,
        startTime: startTime,
        endTime: endTime,
        description: description,
        departmentId: department,
        accountId: newAccount.id
      }
    })

    res.send(newAccount);
} catch (err: any) {
  res.status(err.status || 500).json({ message: err.message });
}
};
