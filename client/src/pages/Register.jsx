import { assets } from "../assets/assets";
import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Register = () => {

    const {setShowUserLogin,setUser,axios,navigate,setCartItems} = useAppContext()

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (event)=>{
        try{
            event.preventDefault();
            const {data} = await axios.post(`/api/user/${state}`,{
                name,email,password
            });
            if (data.success){
                navigate('/')
                setUser(data.user)
                setCartItems({})
                setShowUserLogin(false)
                
            }else{
                toast.error(data.message)
                
            }
        }catch (error){
            toast.error(error.message)
        }       
    }

  return (
        <div className="flex h-[700px] w-full">
            <div className="w-full hidden md:inline-block">
                <img  className="mt-10 h-full" src={assets.register_page} alt="leftSideImage" />
            </div>
        
            <div className="w-full flex flex-col items-center justify-center">
        
                <form 
                    onSubmit={onSubmitHandler}
                    className="md:w-96 w-80 flex flex-col items-center justify-center">
                    <h2 className="text-4xl text-gray-900 font-medium">Sign Up</h2>
                    
        
                
                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-gray-300/90"></div>
                        <p className="w-full text-nowrap text-sm text-gray-500/90">or sign up with email</p>
                        <div className="w-full h-px bg-gray-300/90"></div>
                    </div>
        
                    <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input
                            onChange={(e) => setName(e.target.value)}  
                            value={name} 
                            type="text" 
                            placeholder="Name" 
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" 
                            required 
                        />               
                    </div>
                    <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}   
                            type="email" 
                            placeholder="Email" 
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" 
                            required 
                        />
                    </div>
                    <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} 
                            type="password" 
                            placeholder="Password" 
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" 
                            required 
                        />
                    </div>

        
                    <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                        <div className="flex items-center gap-2">
                            <input className="h-5" type="checkbox" id="checkbox" />
                            <label className="text-sm" htmlFor="checkbox">Remember me</label>
                        </div>
                        <a className="text-sm underline" href="#">Forgot password?</a>
                    </div>
        
                    <button 
                        onClick={() => setState("register")} 
                        type="submit" 
                        className="mt-8 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity cursor-pointer">
                        Register
                    </button>
                    <p className="text-gray-500/90 text-sm mt-4">Already have account?-
                        <a onClick={()=> navigate("/login")} className="text-primary hover:underline" href="#">Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register
