import React, { useState,useContext } from 'react';
import Navbar from '../Components/Navbar';
import PasswordInput from '../Components/PasswordInput';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { validateEmail } from '../Helper/Helper';
import axios from 'axios';
import { AppContent } from '../Context/AppContext.jsx';

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const { backendUrl,setIsLoggedIn,getUserData } = useContext(AppContent);

  async function handleSubmit(event) {
    event.preventDefault();
    try {

      if(!name) return setError("Please enter your name");
      if(!validateEmail(email)) return setError('Please enter a valid email address');
      if(!password) return setError("Please enter the password");
      setError("");

      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/user/register',{
        name,email,password
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
      toast.error(err.msg);
    }
  }

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-24'>
            <div className='w-96 border-0 rounded drop-shadow bg-white px-7 py-10'>
                <form onSubmit={(e) => handleSubmit(e)}>   
                    <h4 className='text-2xl mb-7'>Register</h4>
                    <input type="text" placeholder='Name' className='input-box' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder='Email' className='input-box' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className='text-red-500 text-md mt-4 mb-4'>{error}</p>} 
                    <button className='btn-primary' type='submit'>Submit</button>
                    <p className='text-sm text-center mt-4'>Already have an account? <Link to='/login' className='text-[#2B85FF] underline font-medium'>Login</Link></p>
                </form>
            </div>
        </div>
    </>
  )
}

export default Register