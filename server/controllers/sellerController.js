import jwt from 'jsonwebtoken';

//Login Seller : /api/seller/login

export const sellerLogin = async (req,res) =>{
    try{
        const {email,password} = req.body;

        if(password === process.env.SELLER_PASSWORD && 
        email === process.env.SELLER_EMAIL){
            const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn: '7d'})
            console.log("SELLER TOKEN", token);
            res.cookie('sellerToken',token,{
                httpOnly: true, // Prevent JavaScript to access cookie
                secure : process.env.NODE_ENV === 'production', //Use secure cookies in production
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
                maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie expiration time
            });
            return res.json({success: true,message:"Logged In"});
        }else{
            return res.json({success: false,message: "Invalid Credentials"});
        }
    }catch(error){
        console.log(error.message);
        res.json({success: false,message: error.message})
    }     
}

//Seller isAuth : /api/seller/is-auth

export const isSellerAuth = async (req,res) =>{
    try{
        return res.json({success: true})
    }catch (error){
        console.log(error.message);
        res.json({success:false, message: error.message});
    }
}

//Logout Seller : /api/seller/logout

export const sellerLogout = async (req,res) =>{
    try{
        res.clearCookie('sellerToken',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({success:true, message:"Logged Out"})
        
    }catch(error){
        console.log(error.message);
        res.json({success:false, message: error.message});
    }
}

// export const sellerCheckAuth = async (req, res) => {
//   try {
//     const { sellerToken } = req.cookies;
//     if (!sellerToken) {
//       return res.json({ success: false, message: "Not Authorized" });
//     }

//     const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
//     if (tokenDecode.email === process.env.SELLER_EMAIL) {
//       return res.json({ success: true, seller: tokenDecode });
//     } else {
//       return res.json({ success: false, message: "Not Authorized" });
//     }
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };