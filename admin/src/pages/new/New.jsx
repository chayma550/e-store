import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import apiRequest from "../../lib/apiRequest"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const[info,setInfo]=useState({})
  const navigate=useNavigate()



  const handleChange=(e)=>{
    setInfo((prev)=>({...prev,[e.target.id]:e.target.value}))

  }

  
  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "mystore");
  
    try {
      const uploadRes = await apiRequest.post(
        "https://api.cloudinary.com/v1_1/dneg17tpk/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false, 
        }
      );
      const { url } = uploadRes.data;
      const newUser = { ...info, avatar: url };
      await apiRequest.post("/auth/register", newUser);
      navigate("/users")
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
  <div className="formInput" key={input.id}>
    <label>{input.label}</label>
    <input 
      type={input.type} 
      onChange={handleChange} 
      placeholder={input.placeholder}
      id={input.id} 
    />
  </div>
))}

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
