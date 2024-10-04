export const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.avatar || "/img/noavatar.jpg"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "address",
    headerName: "City",
    width: 100,
  },
 

  {
    field: "phone",
    headerName: "Phone",
    width: 160,
    renderCell: (params) => {
      return (
        <div className="cellWithPhone">
        {params.row.phone} 
      </div>
      );
    },
  },
];


export const productColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  {
    field: "product",
    headerName: "Product",
    width: 80,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.images[0] } alt="" />
        
        </div>
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },

  {
    field: "desc",
    headerName: "Description",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },

 

  {
    field: "inStock",
    headerName: "InStock",
    width: 160,
    renderCell: (params) => {
      return (
        <div className="cellWithInStock">
        {params.row.inStock ? "Yes" : "No"} 
      </div>
      );
    },
  },
];


export const orderColumns = [
  { field: "_id", headerName: "ID", width: 220 },
  
 

  
  
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
  },
  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
  {
    field: "deliveryStatus",
    headerName: "Delivery Status",
    width: 150,
    renderCell: (params) => {
      // Safely access deliveryStatus
      const deliveryStatus = params.row.delivery ? params.row.delivery.deliveryStatus : "N/A";
      return (
        <div className="cellWithDeliveryStatus">
          {deliveryStatus}
        </div>
      );
    },
  },


 

  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className="cellWithInStock">
        {params.row.status} 
      </div>
      );
    },
  },
];






