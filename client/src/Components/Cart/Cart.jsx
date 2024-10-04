import React, { useContext, useEffect, useState } from 'react';
import "./cart.scss";
import DeleteIcon from '@mui/icons-material/Delete';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useContext(AuthContext);
 
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
                        const productRes = await apiRequest.post('/products/bulk', { productIds },{
                            headers: {
                              Authorization: `Bearer ${currentUser.accessToken}` 
                            }});
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

  // Calculate subtotal
  const calculateSubtotal = () => {
      return cartItems.reduce((acc, item) => {
          const price = parseFloat(item.productDetails?.price) || 0;
          return acc + (price * item.quantity);
      }, 0);
  };
  //reset the cart
  const handleReset=async()=>{
    if(currentUser){
        try{
            const userId=currentUser._id;
            setCartItems([]);

            await apiRequest.delete(`/cart/${userId}`,{
                headers: {
                  Authorization: `Bearer ${currentUser.accessToken}` 
                }})

        }catch(err){
            console.log(err)
        }
    }else{
        setCartItems([])

    }
   

  }

  // Handle delete
  const handleDelete = async (productId) => {
    if(currentUser){
      try {
        const userId = currentUser._id;
        setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
        await apiRequest.delete(`/cart/${userId}/${productId}`,{
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}` 
            }});
      } catch (err) {
        console.log(err);
        setCartItems((prevItems) => [...prevItems, cartItems.find(item => item.productId === productId)]);
      }
    }else{
      setCartItems([])

    }
    
  };

  return (
      <div className='cart'>
          <h1>Products in Your Cart</h1>
          {loading ? (
              <p>Loading...</p>
          ) : (
              <>
                  {cartItems.length === 0 ? (
                    <>
                          <div className="header">
                            <img src='/img/empty.png' alt=''/>
                          <span >You don’t have any purchases!</span>
                          <p >Find clothes and accessories from our collection!</p>
                        <Link to="/products" className="link"> <button>SEE COLLECTION</button></Link> 
                          </div>
                      
                      </>
                  ) : (
                      <>
                          {cartItems.map(cartItem => (
                              <div className="items" key={cartItem._id}>
                                  <img src={cartItem.productDetails?.images[0]} alt="" />
                                  <div className="details">
                                      <span className='title'>{cartItem.productDetails?.title}</span>
                                      <p>{cartItem.productDetails?.desc.substring(0, 20)}</p>
                                      <div className="price">{cartItem.quantity} * {cartItem.productDetails?.price}.000 TND</div>
                                  </div>
                                  <DeleteIcon className='delete' onClick={() => handleDelete(cartItem.productId)} />
                              </div>
                          ))}
                          <div className="total">
                              <span>SUBTOTAL</span>
                              <span>{calculateSubtotal()}.000 TND</span>
                          </div>
                         <Link className='link' to='/order'>
                         <button>PROCEED ORDER</button>
                         </Link>
                          <span className='reset' onClick={handleReset}>Reset Cart</span>
                      </>
                  )}
              </>
          )}
      </div>
  );
};

export default Cart;
