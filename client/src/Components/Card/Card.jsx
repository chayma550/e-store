import React from 'react';
import "./card.scss";
import { Link } from 'react-router-dom';

const Card = ({ item }) => {
  return (
    <Link to={`/product/${item._id}`} className='link'>
      <div className='card'>
        <div className="images">
         <span >{item.isNew && "New Season" }</span>
         <img src={item.images[0]} alt='fImg' className='fImg' />
         <img src={item.images[1]} alt='sImg' className='sImg' />

         
        </div>

        <h5>{item.title}</h5>
        <div className="prices">
        {item.oldPrice && <span className='oldprice'>{item.oldPrice}.000 TND</span>}
        <span className='price'>{item.price }.000TND</span>
        </div>
      </div>
    </Link>
  );
}

export default Card;
