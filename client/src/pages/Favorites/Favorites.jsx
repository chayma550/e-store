import React, { useContext, useEffect, useState } from 'react';
import "./favorites.scss";
import { AuthContext } from '../../Context/AuthContext';
import apiRequest from '../../lib/apiRequest';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userId = currentUser._id;
        const res = await apiRequest.get(`/favorites/${userId}`,{
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}` 
          }});
        setFavorites(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser) {
      fetchFavorites();
    }
  }, [currentUser]);

  const handleDelete = async (productId) => {
    try {
   
     const userId = currentUser._id;
      await apiRequest.delete(`/favorites/${userId}/${productId}`,{
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}` 
        }});
      
      setFavorites(favorites.filter(favorite => favorite.productId._id !== productId));
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className='favorite'>
      <h1>YOUR WISH LIST ({favorites.length})</h1>
      <div className="favoriteList">
        {favorites.length > 0 ? (
          favorites.map((favorite, index) => (
            <div key={index} className='favoriteItem'>
              <div className="images">
                <Link to={`/product/${favorite.productId._id}`} className='link'>
                  <img src={favorite.productId?.images[0]} className='fImg' alt='first'/>
                  <img src={favorite.productId?.images[1]} className='sImg' alt='second'/>
                </Link>
              </div>
              <div className="favoritesDetails">
                <h4>{favorite.productId?.title}</h4>
                <div className="prices">
                  <span>{favorite.productId?.price}.000 TND</span>
                  <DeleteIcon className='icon' onClick={() => handleDelete(favorite.productId._id)} />
                  </div>
              </div>
            </div>
          ))
        ) : (
          <>
          <div className="empty">
            <span>Your list is empty</span>
            <p>Start adding products</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Favorites;
