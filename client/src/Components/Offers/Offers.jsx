import React from 'react'
import "./offers.scss"
const Offers = () => {
  return (
    <div className='offers'>
        <div className="offerItem">
            <img src='./img/express-delivery.png' alt=''/>
            <h3>FREE SHIPPING</h3>
            <span>Free worldwide shipping on all orders.</span>
        </div>
        <div className="offerItem">
            <img src='./img/exchange.png' alt=''/>
            <h3>30 DAYS RETURN</h3>
            <span>No question return and easy refund in 14 days.</span>
        </div>
        <div className="offerItem">
            <img src='./img/gift-card.png' alt=''/>
            <h3>GIFT CARDS</h3>
            <span>Buy gift cards and use coupon codes easily.</span>
        </div>
        
      
    </div>
  )
}

export default Offers
