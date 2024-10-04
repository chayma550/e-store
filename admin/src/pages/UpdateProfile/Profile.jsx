import React, { useContext, useState } from 'react'
import "./Profile.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import apiRequest from '../../lib/apiRequest'
import { Edit } from '@mui/icons-material'
const Profile = () => {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password, phone, address } = Object.fromEntries(formData);
    try {
        const res = await apiRequest.put(`/users/${currentUser._id}`, {
            username,
            email,
            password,
            phone,
            address,
            avatar: avatar[0]
        });
        updateUser(res.data);
        console.log(res.data);
        navigate("/");
    } catch (err) {
        setError(err.response.data.message);
        console.log(err);
    }
};
  return (
    <div className='profile'>
      <Sidebar />
      <div className="profileContainer">
        <Navbar/>
        <div className="wrapper">
                <div className="right">
                    <div className="profileImg">
                        <img src={avatar[0] || currentUser.avatar || "https://static.e-stradivarius.net/5/cms/assets/uploads/2400OnTrend02_3.jpg?imwidth=1600&impolicy=stradivarius-itxmediumhigh&imformat=chrome&ts=20240827021705"} alt='' />
                        <p>Hello,<span>{currentUser.username}</span></p>
                       
                    </div>
                </div>
                <div className="left">
                    <div className="top">
                        <h1>PERSONAL DETAILS</h1>
                        <button type='submit' form='profileForm'><Edit/> UPDATE</button>

                    </div>
                    <div className="details">
                        <h3>IDENTIFICATION DETAILS</h3>
                        <div className="inputItems">
                        <form id='profileForm' onSubmit={handleSubmit}>
                                <div className="inputItem">
                                    <label>Email</label>
                                    <input type='email' name='email' required placeholder={currentUser.email} />
                                </div>
                                <div className="inputItem">
                                    <label>Password</label>
                                    <input type='password' name='password' required placeholder="*********" />
                                </div>
                                <h4>YOUR DATA</h4>
                                <div className="dataItems">
                                    <div className="inputItem">
                                        <label>Name</label>
                                        <input type='text' placeholder={currentUser.username} required name='username' />
                                    </div>
                                    <div className="inputItem">
                                        <label>Phone</label>
                                        <input type='phone' placeholder={currentUser.phone} required name='phone' />
                                    </div>
                                    <div className="inputItem">
                                        <label>Address</label>
                                        <input type='text' placeholder={currentUser.address} required name='address' />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
      </div>
      
    </div>
  )
}

export default Profile
