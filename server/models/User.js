import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email: {type: String,required: true, unique: true},
    password : {type: String,required: true},
    cartItems: {type: Object,default:{}},
    verifyOtp: {type: String,default:''},
    verifyOtpExpireAt: {type:Number,default:0},
    isAccountVerified: {type:Boolean,default:false},
    resetOtp: {type:String,default:''},
<<<<<<< HEAD
    resetOtpExpireAt: {type:Number,default:0},

    // googleId: { type: String, default: null },
    // authType: { type: String, enum: ['local', 'google'], default: 'local' },
    
=======
    resetOtpExpireAt: {type:Number,default:0}
>>>>>>> parent of 5c12888 (password usertable false)
},{minimize : false})

const User = mongoose.models.user || mongoose.model('user',userSchema)

export default User