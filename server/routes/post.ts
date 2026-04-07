import { Getcode, PostCode } from '../controllers/Postcontroller.js';

import express from 'express';
const router = express.Router();

router.get('/posts', Getcode);
router.post('/posts', PostCode);

export default router;