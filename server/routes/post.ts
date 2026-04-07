import { Getcode, PostCode } from '../controllers/Postcontroller';

import express from 'express';
const router = express.Router();

router.get('/posts', Getcode);
router.post('/posts', PostCode);

export default router;