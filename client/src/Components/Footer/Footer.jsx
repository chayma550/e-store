import React from 'react'
import "./footer.scss"
import { Link } from 'react-router-dom'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
const Footer = () => {
  return (
    <div className="footer">
    <div className="top">
      <div className="item">
        <h1>Categories</h1>
        <span>Women</span>
        <span>Men</span>
        <span>Shoes</span>
        <span>Accessories</span>
        <span>New Arrivals</span>
      </div>
      <div className="item">
        <h1>Links</h1>
        <span>FAQ</span>
        <span>Pages</span>
        <span>Stores</span>
        <span>Compare</span>
        <span>Cookies</span>
      </div>
      <div className="item">
        <h1>About</h1>
        <span>
          Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
         
        </span>
      </div>
      <div className="item">
        <h1>Follow Us</h1>
        <div className="social-icons">
          <InstagramIcon className='social-icon'/>
          <FacebookIcon className='social-icon'/>
          <XIcon className='social-icon'/>
          <PinterestIcon className='social-icon'/>
        </div>
      </div>
    </div>
    <div className="bottom">
      <div className="left">
      <div className="logo">
                <Link  to="/" className='link'>
                <span className='dot'>.</span>
                <span className='text'>STORE</span>
                </Link>
            </div>
        <span className="copyright">
        &copy; {new Date().getFullYear()} .Store. All rights reserved.
        </span>
      </div>
      <div className="right">
        <img src="/img/payment.png" alt="" />
      </div>
    </div>
  </div>
  )
}

export default Footer