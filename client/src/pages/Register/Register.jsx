import React, { useState } from 'react'
import "./register.scss"
import { Link, useNavigate } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import apiRequest from '../../lib/apiRequest';
const Register = () => {
  const[error,setError]=useState("")
  const navigate=useNavigate()
  const[loading,setLoading]=useState(false)
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    const formData=new FormData(e.target)
    const username=formData.get("username");
    const email=formData.get("email");
    const password=formData.get("password");
    const phone=formData.get("phone");
    const address=formData.get("address");

    try{
      const res= await apiRequest.post("/auth/register",{username,email,password,phone,address})
      navigate("/login")

    }catch(err){
      setError(err.response.data.message)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="register">
    <div className="register-container">
     
      <div className="right-side">
        <div className="register-box">
          <h2>Create Account</h2>
          <div className="icons">
          <GoogleIcon className='icon'/>
          </div>
          
          <form  onSubmit={handleSubmit} >
          <input type="text" placeholder="username" name="username" required  />
            <input type="email" placeholder="Email" name="email" required  />
            <input type="password" placeholder="Password" name="password" required />
            <input type="text" placeholder="+2150580" name="phone" required />
            <input type="address" placeholder="address" name="address" required />



            <div className="actions">
              
             <Link className='link' to="/login">Have an Account?</Link>  
            </div>
            <button type="submit" disabled={loading} >Register</button>
            {error && <span>{error}</span>}

          </form>
         
        </div>
      </div>
    </div>
    </div>
  )
}

export default Register
