import React,{useEffect} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext';

const EmailVerify = () => {

    axios.defaults.withCredentials = true;
    const {navigate,fetchUser,user} = useAppContext()

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
    const onSubmitHandler = async (e) =>{
    try{
        const otpArray = inputRefs.current.map(e => e.value)
        const otp = otpArray.join('')
        e.preventDefault();

        const {data} = await axios.post('/api/user/verify-account',
        {otp,})
        if(data.success){
            toast.success(data.message)
            fetchUser()
            navigate('/')
        }else{
            toast.error(data.message)
      }    
    }catch (error){
        toast.error(error.message)
    }
  }

    useEffect(() => {
    if (!user) {
        // ยังไม่ login → เด้งออก
        navigate('/');
    } else if (user.isAccountVerified) {
        // login แล้ว และ verify แล้ว → เด้งออก
        navigate('/');
    }
    }, [user, navigate]);

    return (
        <div className='flex items-center justify-center min-h-screen'>    
        <form 
            onSubmit={onSubmitHandler}
            className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88
            rounded-lg shadow-xl border border-gray-200'>
            <p className='text-2xl font-medium m-auto'>
                <span className='text-primary'>
                    Email Verify 
                </span>
            OTP
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
                Verify email
            </button>
        </form>  
        </div>
    )
}
export default EmailVerify