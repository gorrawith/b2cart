import jwt from 'jsonwebtoken';

// const authUser = async (req,res, next)=>{
//     const {token} = req.cookies;
//     if(!token){
//         return res.json({success:false, message:'Not Authorized'});
//     }
//     try{
//         const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
//         req.userId = tokenDecode.id || tokenDecode._id;
//         if(tokenDecode.id){    
//             req.userId = tokenDecode.id; 
//         }else{
//             return res.json({success: false,message: 'Not Authorized'});
//         }
//         next();
//     }catch (error){
//         res.json({success:false, message: error.message});
//     }
// }
// export default authUser;


const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized: No token found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id && !decoded?._id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token data",
      });
    }

    req.userId = decoded.id || decoded._id;
    next();

  } catch (error) {
    console.error("JWT verify error:", error.message);

    // เคลียร์ cookie เผื่อ token หมดอายุหรือไม่ถูกต้อง
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    return res.status(401).json({
      success: false,
      message: "Token expired or invalid",
    });
  }
};

export default authUser;