import "./widget.scss";
import apiRequest from "../../lib/apiRequest";
import { useEffect, useState } from "react";
import { Visibility } from "@mui/icons-material";


const Widget = () => {
  const[newUsers,setNewUsers]=useState([]);
  useEffect(()=>{
    const getNewUsers=async()=>{
     try{
       const res=await apiRequest.get("/users?new=true",{
         headers:{
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
 
         }
       })
       setNewUsers(res.data)
     }catch(err){
       console.log(err)
     }
    }
    getNewUsers();
   },[])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map(user=>(
        <li className="widgetSmListItem">
          <img
            src={user.avatar || "/img/noavatar.jpg"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUserinfo">{user.username}</span>

          </div>
          
     
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
         
        </li>
        ))}
      </ul>
    </div>
  );
};

export default Widget;
