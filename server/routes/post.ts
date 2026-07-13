import { Getcode, PostCode } from '../controllers/Postcontroller.js';

import express from 'express';
const router = express.Router();

router.get('/getallposts', Getcode);
router.post('/uplodpost', PostCode);

export default router;