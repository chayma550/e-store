import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import apiRequest from "../../lib/apiRequest";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data); 
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await apiRequest.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id, deliveryStatus) => {
    try {
      // Make a PUT request to update the delivery status
      const response = await apiRequest.put(`/${path}/${id}/delivery-status`, { deliveryStatus });
      console.log("Delivery Status Updated:", response.data); // Log the response for debugging
  
      // Update the local state after successfully updating the status
      const updatedList = list.map(item =>
        item._id === id ? { ...item, delivery: { ...item.delivery, deliveryStatus } } : item
      );
      setList(updatedList); // Update the list with the new delivery status
    } catch (err) {
      console.error("Failed to update delivery status:", err.response ? err.response.data : err.message);
    }
  };
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
            {path === "orders" && (
              <div
                className="updateButton"
                onClick={() => handleUpdateStatus(params.row._id, "completed")}              >
                Update Status
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}  
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
