import React, { useContext, useState } from 'react';
import Navbar from '../Components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../Components/PasswordInput';
import { validateEmail } from '../Helper/Helper.js';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { AppContent } from '../Context/AppContext.jsx';

function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const { backendUrl,setIsLoggedIn,getUserData } = useContext(AppContent);
  
  async function handleLogin(event) {
    event.preventDefault();
    try {

    if(!validateEmail(email)) return setError('Please enter a valid email address');
    if(!password) return setError("Please enter the password");
    setError("");

    axios.defaults.withCredentials = true;
    const { data } = await axios.post(backendUrl + '/api/user/login',{
      email,password
    });

    if(data.success){
      setIsLoggedIn(true);
      getUserData();
      toast.success(data.msg);
      navigate('/home');
    }else{
      toast.error(data.msg);
    }
    } catch (err) {
      toast.error(err.message);
    }

  }

  return (
    <>
        <Navbar />
        <div className='flex items-center justify-center mt-28'>
            <div className='w-96 border-0 rounded drop-shadow bg-white px-7 py-10'>
                <form onSubmit={(e) => handleLogin(e)}>   
                    <h4 className='text-2xl mb-7'>Login</h4>
                    <input type="text" placeholder='Email' className='input-box' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className='text-red-500 text-md mt-4 mb-4'>{error}</p>} 
                    <button className='btn-primary' type='submit'>Login</button>
                    <p className='text-sm text-center mt-4'>Not registered yet? <Link to='/register' className='text-[#2B85FF] underline font-medium'>Create an account</Link></p>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login