import React, { useEffect, useState } from 'react'
import "./updateProduct.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import apiRequest from '../../lib/apiRequest'
import { DriveFolderUploadOutlined, Publish } from '@mui/icons-material'
import axios from 'axios'
const UpdateProduct = () => {
    const [product, setProduct] = useState({});
    const { id: productId } = useParams();
    const [files, setFiles] = useState("");
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
      title: product.title || '',
      desc: product.desc || '',
      categories: product.categories || '',
      price: product.price || '',
      size: product.size|| '',
      color: product.color|| '',
      images: product.images || []
    });
   //get product
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

     //update product
    const handleUpdate = async (e) => {
      e.preventDefault();
      try{
        const list = await Promise.all(
          Object.values(files).map(async (file) => {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "mystore");
            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/dneg17tpk/image/upload",
              data
            );
  
            const { url } = uploadRes.data;
            return url;
          })
        );
        const updateProduct={
          title:formData.title,
          desc:formData.desc,
          categories:formData.categories,
          price:formData.price,
          size:formData.size,
          color:formData.color,
          images:list,
        };
        const res = await apiRequest.put(`/products/${productId}`,updateProduct)
        navigate("/products")

      }catch(err){
        console.log(err)
      }
    }
    //handlechange
    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
  
      if (type === 'file') {
          setFiles(files);
      } else {
          setFormData(prevData => ({
              ...prevData,
              [name]: value
          }));
      }
  };
    //array 
    const renderList = (items) => {
        if (!items || !Array.isArray(items) || items.length === 0) {
          return 'N/A'; 
        }
        return items.map((item, index) => (
          <span key={index} className="itemValue">
            {item}
            {index < items.length - 1 ? ', ' : ''}
          </span>
        ));
      };
  return (
    <div className='updateprofile'>
      <Sidebar/>
      <div className="updateContainer">
        <Navbar/>
        <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={product.images?.[0]}
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
          <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <span>Product title</span>
                  <input type="text" placeholder={product.title} name='title' value={formData.title} onChange={handleChange}/>
                  <span>Description</span>
                  <input type="text" placeholder={product.desc} name='desc' value={formData.desc} onChange={handleChange}/>
                  <span>Categories</span>
                  <input type="text" placeholder={product.categories} name='categories' value={formData.categories} onChange={handleChange}/>
                  <span>Price</span>
                  <input type="text" placeholder={product.price} name='price' value={formData.price} onChange={handleChange}/>
                  <span>Sizes</span>
                  <input type="text" placeholder={product.size} name='size' value={formData.size} onChange={handleChange}/>
                  <span>Colors</span>
                  <input type="text" placeholder={product.color} name='color' value={formData.color} onChange={handleChange}/>
                 
                 
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                  <img
  src={
    files && files[0]
      ? URL.createObjectURL(files[0])
      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
  }
  alt=""
  style={{
    width: '150px',
    height: '200px',
    borderRadius: "15px",
    objectFit: "cover",
    marginRight: "10px"
  }}
/>

                      <label htmlFor="file">
                          <DriveFolderUploadOutlined/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}}  onChange={(e) => setFiles(e.target.files)} />
                  </div>
                  <button className="productButton" onClick={handleUpdate}>Update</button>
              </div>
          </form>
      </div>
     
      </div>
    </div>
  )
}

export default UpdateProduct
