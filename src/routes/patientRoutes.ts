import express from 'express';
import { getPatients, getPatientById} from '../controllers/patientController';

const router = express.Router();

router.get('/', getPatients);
router.get('/:id', getPatientById);

export default router;
