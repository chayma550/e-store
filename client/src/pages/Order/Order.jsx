import React, { useContext, useEffect, useState } from 'react';
import './order.scss';
import { AuthContext } from '../../Context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StripeCheckout from 'react-stripe-checkout';
import { Key } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const Order = () => {
 
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const [stripeToken,setStripeToken]=useState(null) ;
    const navigate=useNavigate()
    const KEY = process.env.REACT_APP_STRIPE;

    useEffect(() => {
      const fetchCartItems = async () => {
        setLoading(true);
        try {
            const userId = currentUser._id;
            const cartRes = await apiRequest.get(`/cart/${userId}`);
            const cartData = cartRes.data;
        
            if (Array.isArray(cartData) && cartData.length > 0) {
                const cart = cartData[0]; 
                const products = cart.products;
    
                if (Array.isArray(products) && products.length > 0) {
                    const productIds = products.map(item => item.productId);
                    
                    if (productIds.length > 0) {
                        const productRes = await apiRequest.post('/products/bulk', { productIds });
                        const productsWithDetails = productRes.data;
    
                        const itemsWithDetails = products.map(item => ({
                            ...item,
                            productDetails: productsWithDetails.find(p => p._id === item.productId)
                        }));
    
                        setCartItems(itemsWithDetails);
                    } else {
                        setCartItems([]);
                    }
                } else {
                    setCartItems([]);
                }
            } else {
                setCartItems([]);
            }
        } catch (err) {
            console.error("Failed to fetch cart items:", err.response || err.message || err);
            setError("Failed to fetch cart items");
        } finally {
            setLoading(false);
        }
    };

    if (currentUser) {
        fetchCartItems();
    }
  }, [currentUser]);


  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
        const price = parseFloat(item.productDetails?.price) || 0;
        return acc + (price * item.quantity);
    }, 0);
};
const onToken=(token)=>{
  setStripeToken(token)
}
useEffect(()=>{
const makeRequest=async()=>{
  try{
     const res=await apiRequest.post("/checkout/payment",{
      tokenId:stripeToken.id,
      amount:calculateSubtotal()*100,

     })
     navigate("/success",
       { state: { data: res.data    } }
      );

  }catch(err){
    console.log(err)
  }
}
stripeToken && makeRequest()
},[stripeToken,calculateSubtotal,navigate  ])

  return (
    <div className="order-page">
     
      <h1>YOUR ORDERS</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
     
        <div className="order-items">
            
          {cartItems.map(cartItem => (
            <div key={cartItem._id} className="order-item">
                
                  <img src={cartItem.productDetails?.images[0]} alt="" className="order-item-image" />
                  <div className="order-item-details">
                  
                    <h2 className="order-item-name">{cartItem.productDetails?.title}</h2>
                    <p className="order-item-quantity">Quantity: {cartItem.quantity}</p>
                    <p className="order-item-price">Price: {cartItem.productDetails?.price}.000 TND</p>
                    <p className="order-item-address">Address: {currentUser.address}</p>

                </div>
             
            </div>
          ))}
        </div>
      )}

      <div className="order-summary">
        <h2>Order Summary</h2>
        <p>Total : {calculateSubtotal()}.000 TND</p>
        <StripeCheckout
        name="e-store"
        image='/img/logo.png'
        shippingAddress
        description={`Your total is  ${calculateSubtotal()}`}
       
        amount={calculateSubtotal() * 100}
        token={onToken}
        stripeKey={KEY}
        />

      </div>
    </div>
  );
};

export default Order;
