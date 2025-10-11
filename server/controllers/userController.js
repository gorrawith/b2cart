import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from '../configs/nodemailer.js'
import oauth2Client from '../configs/googleConfig.js'
import axios from 'axios';

//Register User : /api/user/register
export const register = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.json({
                success: false,
                message:'Miss Details'
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser)
            return res.json({
                success: false,
                message: 'User already exists'
            })
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({name,email,password:hashedPassword})
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET ,{expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly: true, // Prevent JavaScript to access cookie
            secure : process.env.NODE_ENV === 'production', //Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie expiration time
        })
        const mailOptions = {
            from:process.env.SENDER_EMAIL, //ใครเป็นคนส่ง
            to: email, //ส่งไปเมลไหน
            subject:'Welcome to b2time',
            text:`Welcome to b2time website. your account has been created with 
            email id: ${email}`
        }
        await transporter.sendMail(mailOptions);
        return res.json({success: true,user: 
            {
                email: user.email,
                name: user.name
            }
        })
    } catch (error){
        console.log(error.message);
        res.json({success:false, message: error.message});
    }
}

// Login User : /api/user/login
export const  login = async (req,res) =>{
    try {
        const {email,password} = req.body;
        if(!email||!password){
            return res.json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.json({success: false,
                message: 'Invalid email or password'
            });
        }

        const isMath = await bcrypt.compare(password, user.password)
        if(!isMath){
            return res.json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET ,{expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly: true, // Prevent JavaScript to access cookie
            secure : process.env.NODE_ENV === 'production', //Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie expiration time
        })
        return res.json({success: true,user: 
            {
                email: user.email,
                name: user.name
            }
        })
    }catch(error){
        res.json({success:false, message: error.message});
    }
}

//Check Auth : /api/user/is-auth
export const isAuth = async (req,res) =>{
    try{
        const userId = req.userId;
        const user = await User.findById(userId).select("-password")
        return res.json({success: true,user})
    }catch (error){
        console.log(error.message);
        res.json({success:false, message: error.message});
    }
}

//Logout User : /api/user/logout
export const logout = async (req,res) =>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            
        });
        return res.json({
            success:true, 
            message:"Logged Out"
        })
    }catch(error){
        console.log(error.message);
        res.json({
            success:false, 
            message: error.message
        });
    }
}

// Send Verifiaction to the User's Email : /api/user/send-verify-otp
export const sendVerifyOtp = async (req,res) =>{
    try{
        const userId = req.userId;
        const user = await User.findById(userId);
        if(user.isAccountVerified){
            return res.json({
                success : false,
                message : "Account Already verified"
            });
        }
        const otp = String(Math.floor(100000+Math.random()*900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24*60*60*1000

        await user.save();

        const mailOption = {
            from:process.env.SENDER_EMAIL, //ใครเป็นคนส่ง
            to: user.email,
            subject:'Account Verification OTP',
            text:`Your OTP is ${otp}. Verify your account using this OTP.`
        }
        await transporter.sendMail(mailOption);
        res.json({
            success: true,
            message: 'Verification OTP Sent on Email'
        });
    }catch(error){
        res.json({
            success : false,
            message: error.message
        });
    }
}

// Verify the Email using the OTP : /api/user/verify-account
export const verifyEmail = async (req,res) =>{
    
    const otp = req.body.otp;
    const userId = req.userId 

    if(!userId||!otp){
        return res.json({
            success:false,
            message: 'Missing Details'
        });
    }
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.json({
                success: false,
                message: 'User not found'
            })
        }
        if(user.verifyOtp===''|| user.verifyOtp !== otp){
            return res.json({
                success:false,
                message: 'Invalid OTP'
            })
        }
        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({
                success: false,
                message: 'OTP Expired'
            })
        }
        user.isAccountVerified = true;
        user.verifyOtp= '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.json({
            success:true,
            message:'Email verified Successfully'
        })
    }catch (error){
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// Send Password Reset OTP : /api/user/send-reset-otp
export const sendResetOtp = async (req,res)=>{

    const {email} = req.body;
    if(!email){
        return res.json({
            success:false,
            message:'Email is required'
        })
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:'User not found'
            });
        }
        const otp = String(Math.floor(100000+Math.random()*900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15*60*1000

        await user.save();

        const mailOption = {
            from:process.env.SENDER_EMAIL, //ใครเป็นคนส่ง
            to: user.email,
            subject:'Password Reset OTP',
            text:`Your OTP for resetting your password is ${otp}. use this OTP
            to proceed with resetting your password`
        }

        await transporter.sendMail(mailOption);

        return res.json({
            success:true,
            message:'OTP sent to your email'
        })

    }catch (error){
        return res.json({
            success:false,
            message: error.message
        })
    }
}
// CheckOtp : /api/user/verify-reset-otp
export const verifyResetOtp = async (req,res)=>{
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.json({
            success:false,
            message:'User not found'
        });
        if(user.resetOtp !== otp) return res.json({
            success:false,
            message:'OTP ไม่ถูกต้อง'
        });
        if(user.resetOtpExpireAt < Date.now()) return res.json({
            success:false,
            message:'OTP หมดอายุ'
        });
        return res.json({
            success:true,
            message:'OTP ถูกต้อง'
        });
    } catch(err){
        return res.json({
            success:false,
            message:err.message
        });
    }
}

// Reset User Password /api/user/reset-password
export const resetPassword = async (req,res)=>{
    const {email,otp,newPassword} = req.body;

    if(!email || !otp||!newPassword){
        return res.json({
            success:false,
            message:'Email,OTP,and new password are required'
        })
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:'User not found'
            })
        }
        
        if(user.resetOtp === ""|| user.resetOtp !==otp){
            return res.json({
                success:false,
                message:'Invalid OTP'
            })
        }
        if(user.resetOtpExpireAt<Date.now){
            return res.json({
                success:false,
                message:'OTP Expired'
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();
        return res.json({
            success: true,
            message: 'Password has been reset successfully'
        })
    }catch(error){
         return res.json({
            success:false,
            message: error.message
        })
    }
}


// googlelogin /api/user/googlelogin
export const googleAuth = async (req, res) => {
  const code = req.query.code;
  try {
    // ✅ ดึง token จาก Google
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);

    // ✅ ดึงข้อมูลผู้ใช้จาก Google
    const userRes = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${googleRes.tokens.access_token}`,
      },
    });

    const { email, name, picture } = userRes.data;

    // ✅ ค้นหาผู้ใช้ใน DB
    let user = await User.findOne({ email });

    if (!user) {
      // ถ้าไม่เคยมี user มาก่อน → สร้างใหม่
      user = await User.create({
        name,
        email,
        image: picture,
        authType: "google", // ระบุว่า login ด้วย Google
      });
    } else if (!user.authType) {
      // ถ้ามี user อยู่แล้วแต่ยังไม่มี field authType → อัปเดต
      user.authType = "google";
      await user.save();
    }
    // ✅ สร้าง JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // ✅ ส่ง token กลับไปใน cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ ส่งข้อมูลกลับไปให้ frontend
    res.status(200).json({
      success: true,
      message: "Login with Google successful!",
      token,
      user,
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized",
      error: error.response?.data || error.message,
    });
  }
};

// googlelogin /api/user/check-email-auth-type
export const checkEmailAuthType = async (req, res) => {

  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.authType === "google") {
      return res.json({
        success: false,
        message: "บัญชีนี้เข้าสู่ระบบด้วย Google ไม่สามารถรีเซ็ตรหัสผ่านได้",
        authType: "google",
      });
    }
    return res.json({ success: true, message: "Email is valid", authType: user.authType });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};