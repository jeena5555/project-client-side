import express from 'express';
import { getTreatments, getTreatmentById, createTreatment } from '../controllers/treatmentController';

const router = express.Router();

router.get('/', getTreatments);
router.get('/:id', getTreatmentById);
router.post('/', createTreatment);

export default router;
