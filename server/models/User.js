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
    resetOtpExpireat: {type:Number,default:0}
},{minimize : false})

const User = mongoose.models.user || mongoose.model('user',userSchema)

export default User