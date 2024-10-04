import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link, useParams } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useEffect, useState } from "react";

const Single = () => {
  const [user, setUser] = useState({});
  const { id: userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const res = await apiRequest.get(`/users/${userId}`);
          setUser(res.data); 
        } else {
          console.error('user ID is undefined');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
          <Link to={`/edit/${userId}`} style={{ textDecoration: "none" }}>
          <div className="editButton">Edit</div></Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={user.avatar || "/img/noavatar.jpg"}
                alt="User Avatar"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{user.username }</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email }</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+216{user.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{user.address  }</span>
                </div>
             
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending (Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
