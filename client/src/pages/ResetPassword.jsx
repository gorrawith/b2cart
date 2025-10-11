import React, { useState,useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { assets } from '../assets/assets'


const ResetPassword = () => {

  const {axios,navigate,user} = useAppContext()
  const [email,setEmail] = useState('')
  const [newPassword ,setNewPassword] = useState('')
  const [isEmailSent,setIsEmailSent] = useState('')
  const [otp,setOtp] = useState(0)
  const [isOtpSubmited,setIsOtpSubmited] = useState(false)
  const [show,setShow] = React.useState(false)
      
  const Showpassword = () =>{
      setShow(!show)
  }

  const inputRefs = React.useRef([])
  const handleInput = (e,index)=>{
    if(e.target.value.length >0 && index < inputRefs.current.length -1){
      inputRefs.current[index+1].focus();
    }
  }

  const handleKeyDown = (e,index) =>{
    if(e.key === 'Backspace' && e.target.value === ''&& index >0){
      inputRefs.current[index-1].focus();
    }
  }

  const handlePaste = (e)=>{
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char,index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value=char;
      }
    })
  }

  const onSubmitEmail = async (e) => {
      e.preventDefault();
      try {
        // เช็ก email ก่อนว่าเป็นของ Google หรือไม่
        const checkRes = await axios.post("/api/user/check-email-auth-type", { email });
        
        if (!checkRes.data.success && checkRes.data.authType === "google") {
          toast.error("บัญชีนี้เข้าสู่ระบบด้วย Google ไม่สามารถรีเซ็ตรหัสผ่านได้");
          return;
        }

        if (!checkRes.data.success) {
          toast.error(checkRes.data.message);
          return;
        }

        // ✅ ถ้าไม่ใช่ Google ค่อยส่ง OTP
        const { data } = await axios.post("/api/user/send-reset-otp", { email });
        data.success ? toast.success(data.message) : toast.error(data.message);
        data.success && setIsEmailSent(true);

      } catch (error) {
        toast.error(error.message);
      }
  };

  const onSubmitOTP = async (e) => {

    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value);
    const enteredOtp = otpArray.join('');
    setOtp(enteredOtp);
  
    try {
      const { data } = await axios.post('/api/user/verify-reset-otp', {
        email,
        otp: enteredOtp,
        
      });
      
      if (data.success) {
        toast.success("OTP ถูกต้อง");
        setIsOtpSubmited(true); // แสดงฟอร์มกรอกรหัสผ่านใหม่
        
      } else {
        toast.error("OTP ไม่ถูกต้อง");
      }
    } catch (error) {
      toast.error(error.message);
    }
}

  const onSubmitNewPassword = async (e) =>{
    e.preventDefault();
    try{
      const {data} = await axios.post('/api/user/reset-password',
        {email,otp,newPassword})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')
    }catch (error){
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user?.email){
      setEmail(user.email)
    }
  },[user])

  return (
    <div className='flex items-center justify-center min-h-screen 
     '>
      {/* enter email id */}
      {!isEmailSent &&
        <form 
          onSubmit={onSubmitEmail}
          className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88
            rounded-lg shadow-xl border border-gray-200'>
          <p className='text-2xl font-medium m-auto'>
            <span className='text-primary'>
                Reset
            </span>
            Password
          </p>
          <p className='text-center mb-6 '>
            Enter your registered email address
          </p>
          <div className='flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 '>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
            </svg>
            {!user?(
              <input
                type='email'
                placeholder='Email id'
                className='bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            ):(
              <p className='text-black'>
                {email}
              </p>
            )}
          </div>
          <button className='mt-8 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity cursor-pointer'>
            Submit
          </button>
        </form>
      }
      {/* otp input form */}
      {!isOtpSubmited && isEmailSent &&
        <form
          onSubmit={onSubmitOTP}         
          className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88
            rounded-lg shadow-xl border border-gray-200'>
          <p className='text-2xl font-medium m-auto'>
            <span className='text-primary'>
                Reset
            </span>
            Password OTP
          </p>
          <p className='text-center mb-6'>
              Enter the 6-digit code sent to your email id.
          </p>
          <div
            onPaste={handlePaste} 
            className='flex justify-between gap-2'>
            {Array(6).fill(0).map((_,index)=>(
              <input
                type='text'
                maxLength='1'
                key={index}
                required
                className='w-12 h-12 bg-orange-300 text-black text-center text-xl
                rounded-md border-2 border-gray-600  outline-none'
                ref={e => inputRefs.current[index]=e}
                onInput={(e)=> handleInput(e,index)}
                onKeyDown={(e)=> handleKeyDown(e,index)}
              /> 
            ))}
          </div>
          <button 
              className='mt-8 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity cursor-pointer'>
              Submit
          </button>
        </form>
      }
      {/* enter new password   */}
      {isOtpSubmited && isEmailSent &&
        <form 
          onSubmit={onSubmitNewPassword}
          className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88
            rounded-lg shadow-xl border border-gray-200'>
          <p className='text-2xl font-medium m-auto'>
            <span className='text-primary'>
                New
            </span>
            Password
          </p>
          <p className='text-center mb-6'>
            Enter the new password below
          </p>
          <div className='flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2'>
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
            </svg>
            <input
              type={show ? "text":"password"}
              placeholder='Password'
              className='bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <p onClick={Showpassword}>
                {show ? 
                <img 
                    src={assets.eyeclose} 
                    width="19" 
                    height="17" 
                    className="m-6"
                    />
                    :<img 
                    className="m-6"
                    width="19" 
                    height="17" 
                    src="https://img.icons8.com/material-outlined/50/4D4D4D/visible.png" 
                    alt="visible"
                />
                }
            </p>
          </div>
          <button className='mt-8 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity cursor-pointer'>
            Submit
          </button>
        </form>
      }
    </div>
  )
}
export default ResetPassword