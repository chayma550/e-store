import React, { useEffect } from 'react';
import "./categories.scss";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Categories = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation only occurs once
    });
  }, []);

  return (
    <div className="cat">
      <h1 data-aos="fade-up">SELECTION UP TO -30%</h1>    
      <div className="categories">
        <div className="col">
          <div className="row" data-aos="zoom-in">
            <img
              src="https://images.dashhudson.com/aHR0cHM6Ly9jZG4uZGFzaGh1ZHNvbi5jb20vbWVkaWEvZnVsbC8xNzI0MzQ5NjMxLjQ2MjkyMDc4NzEwMS5qcGVn.jpg?w=640&h=640&fit=cover"
              alt="Sale"
            />
            <button>
              <Link className="link" to={`/products?cat=Sale`}>
                Sale
              </Link>
            </button>
          </div>
          <div className="row" data-aos="zoom-in" data-aos-delay="200">
            <img
              src="https://images.dashhudson.com/aHR0cHM6Ly9jZG4uZGFzaGh1ZHNvbi5jb20vbWVkaWEvZnVsbC8xNzI0Nzc4OTk5Ljk1MzI5NTc2OTU5LmpwZWc=.jpg?w=640&h=640&fit=cover"
              alt="Women"
            />
            <button>
              <Link className="link" to={`/products?cat=Women`}>
                Women
              </Link>
            </button>
          </div>
        </div>
        <div className="col">
          <div className="row" data-aos="zoom-in" data-aos-delay="400">
            <img
              src="https://static.e-stradivarius.net/assets/public/fd2a/58f0/b1b94ab698b5/0ff7a71a3e98/2400Vestidos/2400Vestidos.jpg?ts=1726230028881&w=427.5"
              alt="New Season"
            />
            <button>
              <Link className="link" to={`/products?cat=Newseason`}>
                New Season
              </Link>
            </button>
          </div>
        </div>
        <div className="col col-l">
          <div className="row" data-aos="zoom-in" data-aos-delay="600">
            <div className="col">
              <div className="row">
                <img
                  src="https://static.bershka.net/4/static/images/bershkastyle/style_chico_streetwear.jpg?1809&t=20240921015707&imwidth=750&impolicy=bershka-itxhigh"
                  alt="Men"
                />
                <button>
                  <Link className="link" to={`/products?cat=Men`}>
                    Men
                  </Link>
                </button>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <img
                  src="https://static.e-stradivarius.net/assets/public/7ed1/9c56/612540baa8b9/bca15a2df285/03645701001-a3/03645701001-a3.jpg?ts=1725271419294&w=649"
                  alt="Accessories"
                />
                <button>
                  <Link className="link" to={`/products?cat=Accessories`}>
                    Accessories
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="row" data-aos="zoom-in" data-aos-delay="800">
            <img
              src="https://static.e-stradivarius.net/5/photos4/2024/I/1/1/p/9000/370/001/9000370001_2_1_1.jpg?t=1721029119135&impolicy=stradivarius-itxmediumhigh&imwidth=1920&imformat=chrome&imdensity=1.25"
              alt="Shoes"
            />
            <button>
              <Link className="link" to={`/products?cat=Shoes`}>
                Shoes
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
