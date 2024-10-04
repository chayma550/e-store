import React, { useEffect } from 'react';
import "./collection.scss";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Collection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation only occurs once
    });
  }, []);

  return (
    <div className="parent-container">    
      <div className="collection-banner" data-aos="fade-up">
        <div className="image-banner">
          <div className="background-overlay"></div>
          <div className="image-container">
            <img src="./img/women.png" alt="Stylish Woman" />
          </div>
        </div>

        <div className="content" data-aos="fade-up" data-aos-delay="200">
          <h4>Women</h4>
          <h1>Winter Collection</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id leo tempor,
            congue justo at, lobortis orci. Aliquam venenatis dui lectus, eu convallis
            turpis convallis et. Pellentesque.
          </p>
          <button>See Whole Collection</button>
        </div>
      </div>
    </div>
  );
};

export default Collection;
