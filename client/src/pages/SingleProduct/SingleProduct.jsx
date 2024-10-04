import React, { useContext, useEffect, useState } from 'react';
import "./singleProduct.scss";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BalanceIcon from '@mui/icons-material/Balance';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useParams } from 'react-router';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../Context/AuthContext';
import Skeleton from 'react-loading-skeleton';
import FavoriteIcon from '@mui/icons-material/Favorite';

const SingleProduct = () => {
    const [selectedImg, setSelectedImg] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { id: productId } = useParams();
    const [product, setProduct] = useState({});
    const [selectedColor, setSelectedColor] = useState('');
    const{currentUser}=useContext(AuthContext);
    const [isFavorite, setIsFavorite] = useState(false); // Track favorite status
    const [loading, setLoading] = useState(true); 
    const [favoriteMessage, setFavoriteMessage] = useState('');


    const addTocart = async () => {
        try {
            if (!currentUser) {
                console.error("User not logged in");
                return;
            }
    
            const userId = currentUser._id;
            const validatedQuantity = Number(quantity);
    
    
            if (isNaN(validatedQuantity) || validatedQuantity <= 0) {
                console.error("Invalid quantity");
                return;
            }
    
            const response = await apiRequest.post("/cart", { userId, productId, quantity: validatedQuantity });
            
    
        } catch (err) {
            console.log(err);
        }
    }
    
    
  
    const addTofavorite = async () => {
        try {
            const userId = currentUser._id; 
            const quantity=1;
            const res = await apiRequest.post("/favorites", { userId, productId,quantity });
            setIsFavorite(true)
            setFavoriteMessage("Added to favorites");
            setTimeout(() => setFavoriteMessage(''), 3000); // Clear the message after 3 seconds

        } catch (err) {
            console.log(err);
        }
    }





    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                if (productId) {
                    const res = await apiRequest.get(`/products/${productId}`);
                    setProduct(res.data);
                    console.log(res.data)
                    setSelectedColor(res.data.colors?.[0]); 
                } else {
                    console.error('Product ID is undefined');
                }
            } catch (err) {
                console.log(err);
            }finally{
                setTimeout(() => setLoading(false), 300); 
            }
        };
        fetchData();
    }, [productId]);
   
    return (
        <div className='singProduct'>
            {loading ? (
                <Skeleton count={5}/>

            ):(
                <>
            <div className="left">
                <div className="images">
                    {product.images?.map((img, index) => (
                        <img key={index} src={img} alt='' onClick={() => setSelectedImg(index)} />
                    ))}
                </div>
                <div className="mainImg">
                    <img src={product.images?.[selectedImg]} alt="" />
                </div>
            </div>  

            <div className="right">
                <h1>{product.title}</h1>
                <span className='price'>{product.price}.000 TND</span>
                <p>{product.desc}</p>
                <div className="quantity">
                    <button onClick={() => setQuantity(prev => prev === 1 ? 1 : prev - 1)}>-</button>
                    <input type="text" value={quantity} readOnly />
                    <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                </div>
                <div className="Items">
                    <div className="colorItem">
                        {product.color && product.color.length>0 && (
                            <>
                            <span>COLORS:</span>
                            <div className="colors">
                            {product.color?.map((color, index) => (
                                <div 
                                    key={index} 
                                    className={`colorOption ${selectedColor === color ? 'selected' : ''}`} 
                                    style={{ backgroundColor: color }} 
                                    onClick={() => setSelectedColor(color)}
                                    title={color} 
                                />
                            ))}
                        </div>
                        </>
                        )}
                        
                       
                    </div>
                    <div className="sizeItem">
                        {product.size && product.size.length > 0 && (
                            <>
                        <span>SIZE: </span>
                        <select name='size' id='size'>
                        {product.size?.map((size, index) => (
                            <option key={index} value={size}>{size}</option>
                        ))}
                    </select>
                    </>
                        )}
                       
                    </div>
                </div>
                <button className='shoppingCart'  onClick={addTocart}><ShoppingCartIcon /> Add To Cart</button>
                <div className="links">
                <div className="item" onClick={addTofavorite} style={{ cursor: 'pointer' }}>
        {isFavorite ? <FavoriteIcon  /> : <FavoriteBorderIcon />} Add To Wish List
        {favoriteMessage && <div className="popup-message">{favoriteMessage}</div>}

    </div>
                    <div className="item">
                        <BalanceIcon /> Add To Compare
                    </div>
                </div>
                <div className="stock" style={{fontWeight:"600"}}>
                       <span style={{color:product.inStock ?"green" :"red"}}>{product.inStock ?"In Stock":"Out of Stock "}</span>
                    </div>
                <div className="info">
                    <span>Vendor: STRADIVARIUS</span>
                    <span>Product Type: {product.categories?.[0]?.category}</span> 
                    <span>Tag: Trousers,Women,Top</span>
                </div>
                <div className="details">
                    <span>DESCRIPTION</span>
                    <hr />
                    <span>ADDITIONAL INFORMATION</span>
                    <hr />
                    <span>FAQ</span>
                </div>
            </div>
            </> )}
        </div>
    )
}

export default SingleProduct;
