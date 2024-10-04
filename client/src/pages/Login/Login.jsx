import React, { useContext, useState } from 'react'
import "./login.scss"
import { Link, useNavigate } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { AuthContext } from '../../Context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../../firebase';



const Login = () => {
  const[error,setError]=useState("")
  const[loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const {updateUser}=useContext(AuthContext)

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true)
    const formData=new FormData(e.target)
    const username=formData.get("username")
    const password=formData.get("password")
    try{
      const res=await apiRequest.post("/auth/login",{username,password})
      updateUser(res.data)
      navigate("/")

    }catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }

  }
  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const userData={
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      }
      updateUser(userData);

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="login">
    <div className="login-container">
      <div className="right-side">
        <div className="login-box">
            <div className="top">
          <h2>Welcome to </h2>
          <div className="logo">
                <span className='dot'>.</span>
                <span className='text'>STORE</span>
            </div>
            </div>
          <p>We make it easy for everyone to buy </p>
          <form  onSubmit={handleSubmit}>
            <input type="text" 
            placeholder="username"
             name="username" 
             required />
            <input type="password"
             placeholder="Password"
              name="password"
               required />
            <div className="actions">
              <Link className='link'>Forgot password?</Link>
            </div>
            <button  disabled={loading} >Login</button>
            {error && <span>{error}</span>}

            <Link to="/register">
              <button type="button" className="create-profile">Create profile</button>
            </Link>
          </form>
          <div className="social-login">
            <div className="log">
            <hr/>  
            <p>Or login with</p>
            <hr/>
            </div>
          
            <div className="buttons">
              
              <div className="media">
                <button type="button"  className="social-btn" onClick={handleGoogleLogin} >
                  <GoogleIcon/>Google
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login
