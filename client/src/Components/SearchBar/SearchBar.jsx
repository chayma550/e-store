import React, { useState, useEffect } from 'react';
import "./searchBar.scss";
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import apiRequest from '../../lib/apiRequest';
import { Link, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const navigate=useNavigate()

  const handleClose = () => {
    setIsOpen(false);
    
  };
  const handleProductClick = (productId) => {
    setIsOpen(false); 
    navigate(`/product/${productId}`); 
  };

  const handleSearch = async (term) => {
    try {
      const res = await apiRequest.get(`/products?title=${encodeURIComponent(term)}`);
     

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    } else {
      setProducts([]); 
    }
  }, [searchTerm]); 

  return (
    isOpen && (
      <div className="searchModal">
        <div className="searchContent">
          <CloseIcon className="close" onClick={handleClose} />
          <div className="Contentdetails">
            <div className="searchTop">
            <h2>Search Products</h2>
            <input
              type="text"
              placeholder="Enter product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            </div>
            
            <div className="productResults">
             
                  {products.map((product) => (

                   <div className="productDetails" key={product._id} onClick={() => handleProductClick(product._id)}>

              <div className="image">
              <Link to={`/product/${product._id}`} className='link' >

                  <img src={product.images[0]} className='fImg' alt='first'/>

                  </Link>                     

              </div>
              <div className="favoritesDetails">
                <h4>{product.title}</h4>
                <div className="prices">
                {product.oldPrice && <span className='oldprice'>{product.oldPrice}.000 TND</span>}
                <span>{product.price}.000 TND</span>
                </div>
                <div className="categories">
               <span > {product.categories?.[0]?.category}</span>


                </div>
              </div>
            </div> 
                  ))}
              
            
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SearchBar;
