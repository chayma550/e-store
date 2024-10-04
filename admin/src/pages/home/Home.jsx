import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useMemo, useState } from "react";
import { Api } from "@mui/icons-material";
import apiRequest from "../../lib/apiRequest";
import WidgetLg from "../../components/WidgetLg/WidgetLg";

const Home = () => {
  const MONTHS=useMemo(
    ()=>[
    "Jan",
    "Fab",
    "Mar",
    "Apr",
    'May',
    "Juin",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  []
)
const [userStats,setUserStats]=useState([]);
useEffect(() => {
  const getStats = async () => {
    try {
      const res = await apiRequest.get("/users/stats", {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });

      // Correct the sorting logic
      const statsList = res.data.sort((a, b) => a._id - b._id);

      // Iterate through statsList using forEach to update the state
      statsList.forEach((item) => {
        setUserStats((prev) => [
          ...prev,
          {
            name: MONTHS[item._id - 1], // Use the month name based on _id
            "New User": item.total, // Use total users value
          },
        ]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  getStats(); // Call the function

}, [MONTHS]); // MONTHS in the dependency array

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        
        <div className="charts">
          <Featured />
          <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
          </div>
        <div className="listContainer">
          <Widget/>
          <WidgetLg/>
        </div>
      </div>
    </div>
  );
};

export default Home;
