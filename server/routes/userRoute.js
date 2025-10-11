import express from 'express';
import { isAuth, login,logout, register,sendVerifyOtp,verifyEmail,
sendResetOtp,resetPassword,verifyResetOtp,googleAuth,checkEmailAuthType} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/googlelogin',googleAuth)
userRouter.get('/logout',authUser,logout)
userRouter.post('/send-verify-otp',authUser,sendVerifyOtp);
userRouter.post('/verify-account',authUser,verifyEmail)
userRouter.get('/is-auth',authUser,isAuth)
userRouter.post('/send-reset-otp',sendResetOtp)
userRouter.post('/verify-reset-otp', verifyResetOtp);
userRouter.post('/reset-password',resetPassword)
userRouter.post("/check-email-auth-type", checkEmailAuthType)



export default userRouter