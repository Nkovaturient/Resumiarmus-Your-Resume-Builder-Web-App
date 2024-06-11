import express from 'express';
// import wrapAsync from '../utils/wrapAsync.js';
const router=express.Router();
// import authController from '../controllers/auth.js';
import {Sign,Login,ForgotPassword,ResetPassword} from '../controllers/auth.js';


router.post('/signup', Sign);
router.post('/login', Login);

router.post('/password/forgot',ForgotPassword);
router.post('/password/reset',ResetPassword);

export default router;