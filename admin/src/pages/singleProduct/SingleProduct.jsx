import "./singleProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link, useLocation, useParams } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useEffect, useState } from "react";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id: productId } = useParams();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId) {
          const res = await apiRequest.get(`/products/${productId}`);
          setProduct(res.data);
        } else {
          console.error('Product ID is undefined');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [productId]);

  const renderList = (items) => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return 'N/A'; // or any other fallback text
    }
    return items.map((item, index) => (
      <span key={index} className="itemValue">
        {item}
        {index < items.length - 1 ? ', ' : ''}
      </span>
    ));
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
          <Link to={`/edit/${productId}`} style={{ textDecoration: "none" }}>
          <div className="editButton" >Edit</div>
          </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={product.images?.[0] } 
                alt="Product"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{product.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{product.desc || 'N/A'}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Categories:</span>
                  {renderList(product.categories)}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{product.price ? `${product.price}.000 TND` : 'N/A'}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">In Stock:</span>
                  <span className="itemValue">{product.inStock ? 'Yes' : 'No'}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Sizes:</span>
                  {renderList(product.size)}
                </div>
                <div className="detailItem">
                  <span className="itemKey">Colors:</span>
                  {renderList(product.color)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
