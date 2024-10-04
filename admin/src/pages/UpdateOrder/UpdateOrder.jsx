import React, { useEffect, useState } from 'react'
import "./updateOrder.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import apiRequest from '../../lib/apiRequest'
import axios from 'axios'
const UpdateOrder = () => {
    const [order, setOrder] = useState({});
    const { id: orderId } = useParams();
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
      quantity: order. quantity || '',
      address: order.address || '',
      
    });
   //get product
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (orderId) {
            const res = await apiRequest.get(`/orders/${orderId}`);
            setOrder(res.data);
            console.log(res.data)
          } else {
            console.error('Order ID is undefined');
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [orderId]);

     //update product
    const handleUpdate = async (e) => {
      e.preventDefault();
      try{
       
        const updateOrder={
          quantity:formData.quantity,
          address:formData.address,
          
        };
        const res = await apiRequest.put(`/orders/${orderId}`,updateOrder)
        navigate("/orders")

      }catch(err){
        console.log(err)
      }
    }
   
 
  return (
    <div className='updateprofile'>
      <Sidebar/>
      <div className="updateContainer">
        <Navbar/>
        <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
             
              <div className="details">
                <h1 className="itemTitle">{order._id}</h1>
                <div className="detailItem">
                  <span className="itemKey">Client ID:</span>
                  <span className="itemValue">{order.userId}</span>
                </div>
               
                <div className="detailItem">
                  <span className="itemKey">Amount:</span>
                  <span className="itemValue">{order.amount}</span>
                </div>
                
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{order.address}</span>

                </div>
               
              </div>
            </div>
          </div>
          <div className="productBottom">
          <form className="productForm">
             
              
          </form>
      </div>
     
      </div>
    </div>
  )
}

export default UpdateOrder
