import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link, useParams } from 'react-router-dom';
import './singleOrders.scss';
import apiRequest from '../../lib/apiRequest';

const SingleOrder = () => {
  const [order, setOrder] = useState({});
  const [productTitles, setProductTitles] = useState({});
  const [username, setUsername] = useState(''); 
  const [avatar, setAvatar] = useState(''); 

  const { id: orderId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (orderId) {
          const res = await apiRequest.get(`/orders/${orderId}`);
          setOrder(res.data);

          // Fetch the username for the userId
          if (res.data.userId) {
            const userRes = await apiRequest.get(`/users/${res.data.userId}`);
            setUsername(userRes.data.username); 
            setAvatar(userRes.data.avatar); 

          }

          // Fetch the title for each product
          if (res.data.products && res.data.products.length > 0) {
            const titles = await Promise.all(
              res.data.products.map(async (product) => {
                const productRes = await apiRequest.get(`/products/${product.productId}`);
                return { productId: product.productId, title: productRes.data.title };
              })
            );
            
            // Store the titles in the state
            const titlesMap = titles.reduce((acc, cur) => {
              acc[cur.productId] = cur.title;
              return acc;
            }, {});
            setProductTitles(titlesMap);
          }
        } else {
          console.error('Order ID is undefined');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [orderId]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
          <Link to={`/edit/${orderId}}`} style={{ textDecoration: "none" }}>
          <div className="editButton">Edit</div></Link>
            <h1 className="title">Order Information</h1>
            <div className="item">
              <img
                src={avatar||"/img/noavatar.jpg"}
                alt="User Avatar"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Order ID: {order._id}</h1>
                <div className="detailItem">
                  <span className="itemKey">Client Name:</span>
                  <span className="itemValue">{username }</span> 
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{order.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Amount:</span>
                  <span className="itemValue">{order.amount} TND</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Products:</span>
                  <span className="itemValue">
                    {order.products && order.products.length > 0 ? (
                      order.products.map((product, index) => (
                        <div key={index}>
                          <div>
                            Product Title: {productTitles[product.productId] }</div>
                          <div>Quantity: {product.quantity}</div>
                        </div>
                      ))
                    ) : (
                      <div>No products in this order.</div>
                    )}
                  </span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
