import React, { useEffect } from 'react';
import "./solde.scss";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Solde = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation only occurs once
    });
  }, []);

  return (
    <div className="gallery">
      <div className="text-container" data-aos="fade-up">
        <h4>Men</h4>
        <h1>The base collection - Ideal every day.</h1>
        <button>Shop Now</button>
      </div>
      <div className="galleryItems">
        <div className="galleryItem firstImage" data-aos="zoom-in">
          <img
            src="https://i.pinimg.com/564x/4f/6a/4f/4f6a4f2a6d02e776182270e56b0ed051.jpg"
            className="galleryImg" alt=''
          />
        </div>
        <div className="galleryItem secondImage" data-aos="zoom-in" data-aos-delay="200">
          <img
            src="https://i.pinimg.com/564x/3d/bf/f6/3dbff679a9b1a63e5fe51fabbf4b6687.jpg"
            className="galleryImg" alt=''
          />
        </div>
        <div className="galleryItem thirdImage" data-aos="zoom-in" data-aos-delay="400">
          <img
            src="https://i.pinimg.com/564x/be/60/9e/be609edc0b206dc0958b990264b95f0e.jpg"
            className="galleryImg" alt=''
          />
        </div>
      </div>
    </div>
  );
};

export default Solde;
