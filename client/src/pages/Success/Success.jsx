import React, { useContext, useEffect, useState, useRef } from 'react';
import './success.scss';
import { useLocation } from 'react-router';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../Context/AuthContext';

const SuccessPage = () => {
    const location = useLocation();
    const { state } = location;
    const { currentUser } = useContext(AuthContext);
    const [cartItems] = useState(state?.cartItems || []); 
    const orderData = state?.data;
    const orderCreatedRef = useRef(false); 

    useEffect(() => {
        // Check localStorage to prevent duplicate order creation
        const orderAlreadyCreated = localStorage.getItem(`order_${orderData?.id}`);
        
        if (!orderAlreadyCreated) {
            const createOrder = async () => {
                if (orderData && cartItems.length > 0 && !orderCreatedRef.current) {
                    try {
                        const products = cartItems.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                        }));

                        await apiRequest.post('/orders', {
                            userId: currentUser._id,
                            products,
                            amount: orderData.amount,
                            address: currentUser.address,
                            status: orderData.status,
                        });

                        // Mark the order as created
                        orderCreatedRef.current = true;

                        // Set the order creation flag in localStorage
                        localStorage.setItem(`order_${orderData.id}`, 'created');
                    } catch (err) {
                        console.error('Failed to create order:', err);
                    }
                }
            };

            createOrder();
        }
    }, [orderData, cartItems, currentUser]);

    if (!orderData) {
        return <div className="error-message">Something went wrong!</div>;
    }

    const { id, amount, status } = orderData;

    return (
        <div className="success-page">
            <div className="success-message">
                <h1>Payment Successful!</h1>
                <p>Thank you for your purchase. Your order has been processed successfully.</p>
            </div>

            <div className="order-details">
                <h2>Order Details</h2>
                <div className="detail-item title">Order ID:</div>
                <div className="detail-item value">{id}</div>

                <div className="detail-item title">Amount Paid:</div>
                <div className="detail-item value">${amount / 100}</div>

                <div className="detail-item title">Status:</div>
                <div className="detail-item value">{status}</div>
            </div>

            <div className="button-container">
                <a href="/" className="button">Back to Home</a>
            </div>
        </div>
    );
};

export default SuccessPage;
