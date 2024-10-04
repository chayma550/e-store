import React, { useContext, useState } from 'react';
import "./profile.scss";
import { AuthContext } from '../../Context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import apiRequest from '../../lib/apiRequest';
import { useNavigate } from 'react-router';
import UploadWidget from '../../Components/UploadWidget/UploadWidget';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase'
const Profile = () => {
    const { updateUser, currentUser } = useContext(AuthContext);
    const [avatar, setAvatar] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    // Logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            updateUser(null); // Reset the user context
            navigate("/login"); // Navigate to login page or another appropriate page
          } catch (err) {
            console.error("Logout Error: ", err.message);
          }
    };

    // Update profile
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
            },{
                headers: {
                  Authorization: `Bearer ${currentUser.accessToken}` 
                }});
            updateUser(res.data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Update failed. Please try again.");
            console.log(err);
        }
    };
    console.log(currentUser.accessToken)

    return (
        <div className='profile'>
            <div className="wrapper">
                <div className="right">
                    <div className="profileImg">
                        <img src={avatar[0] || currentUser.avatar || "https://static.e-stradivarius.net/5/cms/assets/uploads/2400OnTrend02_3.jpg?imwidth=1600&impolicy=stradivarius-itxmediumhigh&imformat=chrome&ts=20240827021705"} alt='' />
                        <p>Hello,<span>{currentUser.username}</span></p>
                        <UploadWidget
                            uwConfig={{
                                cloudName: "dneg17tpk",
                                uploadPreset: "mystore",
                                multiple: false,
                                maxImageFileSize: 2000000,
                                folder: "avatars",
                            }}
                            setState={setAvatar}
                        />
                    </div>
                </div>
                <div className="left">
                    <div className="top">
                        <h1>PERSONAL DETAILS</h1>
                        <div className="buttons">
                            <button onClick={handleLogout}><PowerSettingsNewIcon /> LOG OFF</button>
                            <button type='submit' form='profileForm'><EditIcon /> UPDATE</button>
                            {error && <span>{error}</span>}
                        </div>
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
    );
};

export default Profile;
