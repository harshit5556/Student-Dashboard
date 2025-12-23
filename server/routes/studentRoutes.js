import express from 'express';
import auth from '../middleware/authMiddleware.js';
import role from '../middleware/roleMiddleware.js';

import {
  getMyProfile,
  updateMyProfile,
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentControllers.js';

const router = express.Router();

router.get('/me', auth, getMyProfile);
router.put('/me', auth, updateMyProfile);

router.use(auth);
router.use(role('admin'));

router.get('/', getAllStudents);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
