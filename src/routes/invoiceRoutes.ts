import express from 'express';
import { getInvoice, getInvoiceById, createInvoice } from '../controllers/invoiceController';

const router = express.Router();

router.get('/', getInvoice);
router.get('/:id', getInvoiceById);
router.post('/', createInvoice);

export default router;
