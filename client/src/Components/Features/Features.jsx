import React, { useEffect, useState } from 'react';
import "./features.scss";
import Card from '../Card/Card';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Features = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiRequest.get('/products?random=true');  
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchProducts();
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
  }, []);

  return (
    <div className="feature">
      <div className='feature-container'>
        <div className="top" data-aos="fade-up">
          <h1>Recommended for you</h1>
          <Link to="/products" className='link'>
            <span className='arrow'>View All <ChevronRightIcon /></span>
          </Link>
        </div>

        <div className="bottom">
          {data.map((item) => (
            <div key={item._id} data-aos="zoom-in">
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>

      <section className="bg_parallax_scroll" >
        <div className="details">
          <h1>ON TREND</h1>
          <button>Shop Now</button>
        </div>
      </section>
    </div>
  );
};

export default Features;
